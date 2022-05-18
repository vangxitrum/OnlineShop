
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
                    changeReviews(review)
                    refreshInput()
                    $('#reviewscontainer').animate({ scrollTop: 0 }, "smooth");;
                });
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

function changeReviews(review) {
    $('#reviewscontainer').html(review)
}
function refreshInput() {
    $('#comment').val('')
    $('#author').val('')
    $('#email').val('')
}

  