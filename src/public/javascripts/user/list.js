
function refreshList( id,listObject,param ){

    let itemp=''
    let temp2
    let conntain= key.charAt(0).toUpperCase() + key.slice(1)
   for (const [key, value] of Object.entries(listObject)) { 
    if(key===getValueOfParam(param)) {
        param=='tag'?temp2='':temp2=value
        itemp+=  `<li><a class='text-warning ${param}' >${conntain}<span>${temp2}</span></a> </li>`
   } else{
       itemp +=  `<li><a class=' ${param}' >${conntain}<span>${temp2}</span></a> </li>`
   }
  
    }
    $(`#${id}`).empty()
    $(`#${id}`).append(itemp)
  
}

