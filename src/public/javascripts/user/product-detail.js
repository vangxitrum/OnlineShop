
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
            image:$('#zoom1').attr('src'),
            name:$('#product-name').attr('data-name'),
            price:$('.product_price').attr('data-price')
        }
        $.post("/cart",
            cartObject,
            function (data, status) {
                // add popup here
                alert(data)
            });
    } else {
        $('#add-popup').modal('show')
    }
})


$('#add-review').click(
    function () {
        if ($('#author').val() && $('#email').val() && $('#comment').val() && $('#comment').val()) {
            reviewObject = {
                name: $('#author').val(),
                email: $('#email').val(),
                comment: $('#comment').val(),
                productid: productid
            }
            $.post("/productdetail",
                reviewObject,
                function (review, status) {
                    if (status === 200)
                        alert(review)
                    changeReviews(review)
                    refreshInput()
                    $('#reviewscontainer').animate({scrollTop:0}, "smooth");;
                });
        }
    })


function changeReviews(review) {
    $('#reviewscontainer').html(review)
}
function refreshInput(){
    $('#comment').val('')
    $('#author').val('')
    $('#email').val('')
}

