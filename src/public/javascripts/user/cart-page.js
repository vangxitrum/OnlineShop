
const quantityInput = document.querySelectorAll(".input_quantity")

loadCartTotal()
$('.remove-product').on('click',function(){
    $(`#item${$(this).attr('data-id')}`).remove()
})
$('.input_quantity').on('change',function(){
    let quantity= +$(this).val()
    let price = +$(this).attr('data-price')
    let indentfy=`product-total${$(this).attr('data-id')}`
    $(`#${indentfy}`).html( formatPrice(price*quantity))
    loadCartTotal()

})
function loadPrice(){
    let total=0
    quantityInput.forEach(input => {
        let quantity= parseInt(input.value)
        let price = parseInt(input.dataset.price) 
        total+= quantity*price
    })
   return total
}
function loadCartTotal(){
    let total=loadPrice()
    $('#cart-total').html(formatPrice(total))
    $('#cart-total').attr('data-price',total)
    $('#price-total').html(formatPrice(total))
    $('#price-total').attr('data-price',total)
}
$('#update-button').on('click',function(){
    let deleteInput = document.querySelectorAll(".remove-product")
    let quantity = document.querySelectorAll(".input_quantity")
    let cartArray=[]
    deleteInput.forEach(input => {
        let cartObject={}
        cartObject['name']=input.dataset.name
        cartObject['productID']=input.dataset.productid
        cartObject['productDt']=input.dataset.productdt
        cartObject['image']=input.dataset.image
        cartObject['color']=input.dataset.color
        cartObject['size']=input.dataset.size
        cartObject['price']=input.dataset.price
        cartObject['quantity']=quantity[parseInt(input.dataset.id)].value
       cartArray.push(cartObject)
    })
    $.ajax({
        url: '/cart',
        type: 'PUT',
     //   dataType:JSON,
        data:{ products:cartArray},
        success: function(data ,result) {
         alert(data)
        }
    });
    
    
})
$('#coupon-button').on('click',function(){
   let code= $("#code-input").val()
   if(code){
    $.post(`/cart/${code}`,{},
    function (data, status) {
        alert(data)
        let coupon=JSON.parse(data).dataObject 
        let price= parseInt( $('#cart-total').attr('data-price'))
        let discount=0
        startday=Date.parse(coupon.startday)
        expire=Date.parse(coupon.expire)
        current= Date.now()
        if(expire<current||startday>current){
            alert( "Your coupon is expired")
            return
        }
        if(coupon.percent){
            discount=price*(coupon.percent/100)
            $('#price-total').attr('data-price',price-=discount)
            
        }else if( coupon.value){
            discount=coupon.value
            $('#price-total').attr('data-price',price-=discount)
        }
        alert(price)
        $('#price-total').html(formatPrice(price))
        $('#discount').html(formatPrice(discount))
     });
   }else{
       alert("Is empty")
   }
  
})