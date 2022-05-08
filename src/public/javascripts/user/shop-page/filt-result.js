
function refreshResultFilt(current, pages, perPage, count){
    alert("nothing");
    current= +current;
    pages= +pages;
    perPage= +perPage
   count= +count
    $('#filt_result').html(`Showing ${(current-1)*perPage+1}  – ${ (current-1)*perPage+count
        -(perPage*(current-1)) } of  ${pages} results`)
      
}