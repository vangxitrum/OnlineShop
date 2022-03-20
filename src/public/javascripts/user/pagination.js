function pagination(c , l){
    var currentPage = c||1;
    var last = l||1
    currentPage = parseInt(currentPage);
    last = parseInt(last);
    var range = []
    for(let i=1;i<=last;i++){
        if(i!=c){
            range.push(`<li><a href="/shopcategory/${i}/?${getParam()}">${i}</a></li>`)
        } else{
            range.push(`<li class="current">${i}</li>`)
    }
}
    $("#myPagination").empty();
    range.forEach(element => {
            $("#myPagination").append(element)
    });
    
}

function getParam(){
    var searchParams = new URLSearchParams(window.location.search)
    return searchParams.toString()
}

