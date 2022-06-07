
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
                    let index=3
                  switch(serverResponse.status) {
                      case 200: index=3; break;
                      case 300: index=1; break;
                      case 400: index=0; 
                  }
                  $('.message_container').html(createAlertHtml(index,serverResponse.msg))
                  alertSettimer()
                });
            });
    } else {
        $('.message_container').html(createAlertHtml(1,"Please select size and color !"))
        alertSettimer()
      
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
                    if(data.status===404){
                        $('.message_container').html(createAlertHtml(0,"Please add name and comment !"))
                        alertSettimer()
                    } else{
                        $('.message_container').html(createAlertHtml(3,"Add review successfully !"))
                        alertSettimer()
                        $('#reviewscontainer').html(data)
                        refreshInput()
                        $('#reviewscontainer').animate({ scrollTop: 0 }, "smooth")
                    }
                });
        } else{
            
            $('.message_container').html(createAlertHtml(1,"Please add name and comment !"))
            alertSettimer()
            // $('.modal-body').html("Please add name and comment")
            // $('#add-popup').modal('show')
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
        let index=3
      switch(serverResponse.status){
          case 200: index=3;break
          case 300: index=1;break
          default: index=0
      }
        $('.message_container').html(createAlertHtml(index,serverResponse.msg))
        alertSettimer()
    })
})

function refreshInput() {
    $('#comment').val('')
    $('#author').val('')
    $('#email').val('')
}


  
