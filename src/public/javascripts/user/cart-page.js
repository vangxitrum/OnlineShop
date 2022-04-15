

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
    $('#price-total').html(formatPrice(total+50000))
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
        dataType:JSON,
        data:{ products:cartArray},
        success: function(result) {
         alert(result)
        }
    });
})