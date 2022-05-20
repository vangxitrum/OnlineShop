

function reFetchCartList(cartID){

  $.ajax({
    url: "/cart",
    type: "DELETE", 
    data: { cartID },
    success: function(data) {
      $('.cart_link').html(data)
    },
    error: function() {
    }
});
}
