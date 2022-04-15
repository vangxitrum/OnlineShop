function addParam(param, value){
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set(param, value)
    return searchParams.toString()
}
function addMultibleParam(prameObject){
    var searchParams = new URLSearchParams(window.location.search)
    for (const [key, value] of Object.entries(prameObject)) { 
        searchParams.set(key, value)
    }
    return searchParams.toString()
}
function deleteParam (param)
{
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.delete(param)
    return searchParams.toString()
}
function getValueOfParam(param){
    var searchParams = new URLSearchParams(window.location.search)
  return   searchParams.get(param)
}
function getParam(){
    var searchParams = new URLSearchParams(window.location.search)
    return searchParams.toString()
}


  function formatPrice (price){
    rs = price.toString();
    index = rs.length-3;
    len = rs.length;
    while (index > 0){
        txt = rs.slice(0, index) + "." + rs.slice(index);
        rs = txt;
        index -=3;
    }

    rs += ' ₫'
    return rs;
}