

const sideMenu = $("aside");
const menuBtn = $("#menu-btn");
const closeBtn = $("#close-btn");
const menuItem = $(".menuItem");



$(document).ready(function(){
    menuBtn.on('click',function(){
        sideMenu.css('display','block');
    })
    
    closeBtn.on('click',function(){
        sideMenu.css('display','none');
    })

    menuItem.on('click',function(){
        menuItem.removeClass('active');
        $(this).addClass('active');
    })


    $(window).resize(function() {
        var width = $(window).width();
        if (width > 768){
            sideMenu.css('display','block');
        }
    })
}
)