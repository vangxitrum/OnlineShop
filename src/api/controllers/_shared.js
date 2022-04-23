 function jsonResponse( status, msg, result){
     if(!result) result={}
    let response= {
        status:status,
        msg:msg,
        dataObject:result
    }
    return JSON.stringify(response)
 }
 module.exports={ jsonResponse}