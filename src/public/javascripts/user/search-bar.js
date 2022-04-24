 var temp =['12', '13', '14', '15', '16', '17', '18']
 $(document).ready(function(){
    alert('searchbar')
    $('.search-input').keyup(function(e) {
        clearTimeout($.data(this, 'timer'));
          $(this).data('timer', setTimeout(search, 500));
       
    });
    function search() {
        var existingString = $(".search-input").val();
        if ( existingString.length < 3) return; //wasn't enter, not > 2 char
        alert('Search shownewsletter')
        $("#suggesstion-box").show();
        $("#suggesstion-box").html('<div>Orange</div><div>Banana</div><div>Cocos</div><div>Papua</div><div>Papua</div>');
        // $.post('/'+existingString, function(data) {
        //     suggesstionView= `<div class="`
        //     $("#suggesstion-box").show();
        //     $("#suggesstion-box").html(data);
        // });
    }

 })
