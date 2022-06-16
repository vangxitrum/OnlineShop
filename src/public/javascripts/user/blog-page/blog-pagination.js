function reRenderPagination(c,p){
let currentPage= + c
let perPage= + p
let htmlPagination=`<ul>`

for(let i=1; i<=perPage;i++){
    if(currentPage==i){
        htmlPagination+=`<li  class="current">${i}</li>`
    } else {
        htmlPagination+=`<li><a class="blog-pagination" onclick="blogPaginationOnClick(${i})" >${i}</a></li>`
    }
}
htmlPagination+="</ul>"
$('.pagination').html(htmlPagination)
}

$(document).ready(function() {
    $('.blog-pagination').on('click',function (){
        let index = $(this).html()
        blogPaginationOnClick(index)
        })
});

function blogPaginationOnClick(index){
    $.ajax({
        url: '/blogcategory',
        type: 'post',
        data: {page:index},
        success: function(view){
            let rhef = `/blogcategory?${addParam("page",index)}`
            let currentUrl = window.location.href.toString()
            let newUrl = currentUrl.slice(0, currentUrl.search('/blogcategory')) + rhef
            window.history.pushState({}, "", newUrl);
           $('#blog_list').html(view)
          reRenderPagination(index,BLOGPAGE)
        }
    })
}