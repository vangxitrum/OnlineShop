
$('.blog-tag').on('click',function(){
    $('.blog-tag').removeClass("tag-hold-on")
    $(this).addClass("tag-hold-on")
    let selectTag=$(this).html()
    BLOGPAGE
    $.ajax({
        url: '/blogcategory',
        type: 'post',
        data: {tag:selectTag},
        success: function(view){
            let rhef = `/blogcategory?${addParam("tags",selectTag)}`
            let currentUrl = window.location.href.toString()
            let newUrl = currentUrl.slice(0, currentUrl.search('/blogcategory')) + rhef
            window.history.pushState({}, "", newUrl);
           $('#blog_list').html(view) 
           let currentPage=getValueOfParam("page")||"1"
           reRenderPagination("1",BLOGPAGE)
        }
    })
})

