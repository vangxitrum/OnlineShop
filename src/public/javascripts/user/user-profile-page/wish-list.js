 $(document).on('click','.pagination_button', function() {
    let current=  + $(this).attr('data-index')
    $.post('/userprofile/wishlist', { currentPage: current}, function (view) {
        $('#list-wishlist').html(view)
    })

});
$(document).on('click','.product_remove', function() {
    let productid= $(this).attr('data-id')
    // $.post('/userprofile/wishlist', { currentPage: _currentPage, deleteItem: productid }, function (view) {
    //     $('#list-wishlist').html(view)
    // })
    
    $.ajax({
        url: "/userprofile/wishlist",
        type: "DELETE", 
        data: { currentPage: _currentPage, deleteItem: productid },
        success: function(data) {
          $('#list-wishlist').html(data)
        },
        error: function() {
        }
    });
})
