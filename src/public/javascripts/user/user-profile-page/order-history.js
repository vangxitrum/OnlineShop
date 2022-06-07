$('#order_history_filter_button').on('click', function() {
    let orderSearch = $('#filter_input').val()
    let startday=$('#start_date').val();
    let endday=$('#end_date').val();
    $.ajax({
        url: '/order',
        type: 'POST',
        data: {orderSearch,startday,endday},
        success: function (view, result) {
            
            $('#order-history-container').html(view)
        }
    });
})