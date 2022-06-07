var indexAddress=0
const quantityInput = document.querySelectorAll(".input_quantity")
let discountCode = ""
function setAddressDelivery( isSet){
    if(deliveryAddress){
        $('#delivery_name').html(`Name: ${deliveryAddress[indexAddress].address}`)
        $('#delivery_phone').html(`<span>Address:</span>${deliveryAddress[indexAddress].phone}`)
        $('#delivery_address').html(`<span>Phone number:</span> ${deliveryAddress[indexAddress].address}, ${deliveryAddress[indexAddress].ward}, ${deliveryAddress[indexAddress].district}, ${deliveryAddress[indexAddress].province}.`)
       
    }

    if(isSet){
        let index=0
        deliveryAddress.forEach(function(delivery){
            if(delivery.default==='true'){
                indexAddress=index
                $('#delivery_name').html(`Name: ${delivery.address}`)
                $('#delivery_phone').html(`<span>Address:</span>${delivery.phone}`)
                $('#delivery_address').html(`<span>Phone number:</span> ${delivery.address}, ${delivery.ward}, ${delivery.district}, ${delivery.province}.`)
            }
            index++
            
        })
       
    }
   
  
}
setAddressDelivery(true)
loadCartTotal()
$('.remove-product').on('click', function () {
    $(`#item${$(this).attr('data-id')}`).remove()
    loadCartTotal()
})
$('.input_quantity').on('change', function () {
    let quantity = +$(this).val()
    let price = +$(this).attr('data-price')
    let indentfy = `product-total${$(this).attr('data-id')}`
    $(`#${indentfy}`).html(formatPrice(price * quantity))
    loadCartTotal()

})
function loadPrice() {
    let total = 0
    quantityInput.forEach(input => {
        let quantity = parseInt(input.value)
        let price = parseInt(input.dataset.price)
        total += quantity * price
    })
    return total
}
function loadCartTotal() {
    let total = loadPrice()
    $('#cart-total').html(formatPrice(total))
    $('#cart-total').attr('data-price', total)
    $('#price-total').html(formatPrice(total))
    $('#price-total').attr('data-price', total)
}
$('#update-button').on('click', function () {
    let deleteInput = document.querySelectorAll(".remove-product")
    let quantity = document.querySelectorAll(".input_quantity")
    let cartArray = []
    deleteInput.forEach(input => {
        let cartObject = {}
        cartObject['name'] = input.dataset.name
        cartObject['productID'] = input.dataset.productid
        cartObject['productDt'] = input.dataset.productdt
        cartObject['image'] = input.dataset.image
        cartObject['color'] = input.dataset.color
        cartObject['size'] = input.dataset.size
        cartObject['price'] = input.dataset.price
        cartObject['quantity'] = quantity[parseInt(input.dataset.id)].value
        cartArray.push(cartObject)
    })
    $.ajax({
        url: '/cart',
        type: 'PUT',
        //   dataType:JSON,
        data: { products: cartArray },
        success: function (data, result) {
            let dataObject = JSON.parse(data)
            if(dataObject.status === 200) {
                $('.message_container').html(createAlertHtml(3, dataObject.msg))
                alertSettimer()
            } else{
                $('.message_container').html(createAlertHtml(0, dataObject.msg))
                alertSettimer()
            }
        
        }
    });
    reFetchCartList()



})
$('#coupon-button').on('click', function () {
    discountCode = ""
    let code = $("#code-input").val()
    if (code) {
        $.post(`/cart/${code}`, {},
            function (data, status) {
                dataObject= JSON.parse(data)
                if(dataObject.status === 200) {
                    $('.message_container').html(createAlertHtml(3, dataObject.msg))
                    alertSettimer()
                } else{
                    $('.message_container').html(createAlertHtml(0, dataObject.msg))
                    alertSettimer()
                }
                let coupon = JSON.parse(data).dataObject
                let price = parseInt($('#cart-total').attr('data-price'))
                let discount = 0
                startday = Date.parse(coupon.startday)
                expire = Date.parse(coupon.expire)
                current = Date.now()
                if (expire < current || startday > current) {
                    $('.message_container').html(createAlertHtml(0, "Your coupon is expired!"))
                    alertSettimer()
                   
                    return
                }

                if (coupon.percent) {
                    discount = price * (coupon.percent / 100)
                    $('#price-total').attr('data-price', price -= discount)
                    discountCode = code
                } else if (coupon.value) {
                    discount = coupon.value
                    $('#price-total').attr('data-price', price -= discount)
                    discountCode = code
                }

                $('#price-total').html(formatPrice(price))
                $('#discount').html(formatPrice(discount))
            });
    } else {
        discountCode = ""
        $('.message_container').html(createAlertHtml(1, "Please fill the coupon box!"))
        alertSettimer()
    }

})
$('#place_order_btn').on('click', function () {
    let paymethod = 2
    if ($('#flexRadioDefault1').prop('checked')) {
        paymethod = 1
    }
    let orderObject = {}
    orderObject['price'] = parseInt($('#price-total').attr('data-price'))
    orderObject['code'] = discountCode
    orderObject['paymethod'] = paymethod
    orderObject['address'] = deliveryAddress[indexAddress]
    discountCode = ""
    $.ajax({
        url: '/order',
        type: 'put',
        data: orderObject,
        success: function (data, result) {
            reFetchCartList()
            let ObjectOrderPayment = JSON.parse(data)
            if (ObjectOrderPayment.orderUrl) {
                $('.message_container').html(createAlertHtml(3, ObjectOrderPayment.msg))
                alertSettimer()
                window.open(ObjectOrderPayment.orderUrl)
            } else {
                if (ObjectOrderPayment.status === 300) {
                    $('.message_container').html(createAlertHtml(1, ObjectOrderPayment.msg))
                    alertSettimer()
                }else if(ObjectOrderPayment.status === 200) {
                    $('.cart-button').remove()
                    $('#place_order_btn').remove()
                    $('.message_container').html(createAlertHtml(3, ObjectOrderPayment.msg))
                    alertSettimer()
                } else {
                    $('.message_container').html(createAlertHtml(0, ObjectOrderPayment.msg | "Can not place your order. Please try again!"))
                    alertSettimer()
                }
            }

        }
    });
})
$('.modify-address').on('click', function () {
    indexAddress= parseInt($(this).attr('data-index'))
    setAddressDelivery(false)

})