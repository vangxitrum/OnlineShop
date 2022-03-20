
function createList( id,parem,key ,value ){
    
    let itemp=  `<li><a href="/shopcategory/?${addParam(parem,key)}">${key}<span>${value}</span></a> </li>`
    $(`#${id}`).append(itemp)
}
function addParam(param, value){
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set(param, value)
    return searchParams.toString()
}