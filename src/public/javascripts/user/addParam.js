function addParam(param, value){
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set(param, value)
    return searchParams.toString()
}
