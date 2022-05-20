
$("#add-to-cart-button").click(function () {
    
    selectedColor = $('#color-select').find(":selected").val();
    selectedSize = $('#size-select').find(":selected").val();
    quantity = $('#quantity').val()
    if (selectedColor != '0' && selectedSize != '0') {
        cartUrl = `cart/${productid}?size=${selectedSize}&color=${selectedColor}&quantity=${quantity}`
        //   $('#add-to-cart-form').submit()
        let cartObject = {
            productid: productid,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            image: $('#zoom1').attr('src'),
            name: $('#product-name').attr('data-name'),
            price: $('.product_price').attr('data-price')
        }
      
        $.post("/cart",
            cartObject,
            function (data, status) {
                reFetchCartList({})
                $( document ).ready(function() {
                    serverResponse= JSON.parse(data)
                    $('.modal-body').html(serverResponse.msg)
                    $('#add-popup').modal('show')
                });
            });
    } else {
        $('.modal-body').html("Please select color and size !")
        $('#add-popup').modal('show')
    }
})


$('#add-review').on("click",function () { 
        let rate=0
        for(let i=5;i>0;i--){
            if ($(`#star${6-i}`).prop("checked")) {
                rate=i
             break 
             }
        }

        if ($('#author').val() && $('#comment').val()) {
          let  reviewObject = {
                name: $('#author').val(),
                comment: $('#comment').val(),
                productid: productid,
                rate: rate
            }
            alert(JSON.stringify(reviewObject))
            $.post("/productdetail",
                reviewObject,
                function (data, status) {
                    alert(data)
                    if(data.status===404){
                        $('.modal-body').html(data.message)
                        $('#add-popup').modal('show')
                    } else{
                        $('#reviewscontainer').html(data)
                        refreshInput()
                        $('#reviewscontainer').animate({ scrollTop: 0 }, "smooth")
                    }
                });
        } else{
            $('.modal-body').html("Please add name and comment")
            $('#add-popup').modal('show')
        }
    })

$('#add_to_wishlist').on('click', function () {
    let wantProduct = {}
    wantProduct['image'] = $('#zoom1').attr('src')
    wantProduct['name'] = $('#product-name').attr('data-name')
    wantProduct['price'] = $('.product_price').attr('data-price')
    wantProduct['productid'] = productid
    wantProduct['discount'] = parseInt(discount) 
    $.post('/userprofile', { wantProduct: wantProduct }, function (data) {
        serverResponse= JSON.parse(data)
        $('.modal-body').html(serverResponse.msg)
        $('#add-popup').modal('show')
    })
})

function refreshInput() {
    $('#comment').val('')
    $('#author').val('')
    $('#email').val('')
}

  
