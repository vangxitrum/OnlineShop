function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload =  function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
         reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function() {
    readURL(this);
});


$(window).resize(function() {
    var width = $(window).width();
    if (width < 1100){
        $('#menu-area').removeClass("row")
        $('#menu-area').addClass("col")
        $('#tag-area').removeClass("col-4")
        $('#tag-area').addClass("row")
        $('#content-area').removeClass("col-8")
        $('#content-area').addClass("row")
    }
    else if (width >= 1100){
        $('#menu-area').removeClass("col")
        $('#menu-area').addClass("row")
        $('#tag-area').removeClass("row")
        $('#tag-area').addClass("col-4")
        $('#content-area').removeClass("row")
        $('#content-area').addClass("col-8")
    }
})