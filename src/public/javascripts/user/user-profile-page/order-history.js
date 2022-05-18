$('#order_history_filter_button').on('click', function() {
    let orderSearch = $('#filter_input').val()
    let startday=$('#start_date').val();
    let endday=$('#end_date').val();
    alert(`${startday}---- ${endday}`)
    $.ajax({
        url: '/order',
        type: 'POST',
        data: {orderSearch,startday},
        success: function (view, result) {
            alert(view)
            $('#order-history-container').html(view)
        }
    });
})