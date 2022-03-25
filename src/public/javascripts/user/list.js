
function createList( id,param,key ,value ){
    let itemp
    if(key===getValue(param)) {
         itemp=  `<li><a class='text-warning' href="/shopcategory/?${deleteParam(param)}">${key}<span>${value}</span></a> </li>`
    } else{
        itemp=  `<li><a href="/shopcategory/?${addParam(param,key)}">${key}<span>${value}</span></a> </li>`
    }
    $(`#${id}`).append(itemp)
}
function addParam(param, value){
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set(param, value)
    return searchParams.toString()
}
function deleteParam (param )
{
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.delete(param)
    return searchParams.toString()
}
function getValue(param){
    var searchParams = new URLSearchParams(window.location.search)
  return   searchParams.get(param)
}