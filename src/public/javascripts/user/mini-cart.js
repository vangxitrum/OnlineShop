

function reFetchCartList(cartID){

  $.ajax({
    url: "/cart",
    type: "DELETE", 
    data: { cartID },
    success: function(data) {
      $('.mini_cart').html(data)
    },
    error: function() {
    }
});
}
