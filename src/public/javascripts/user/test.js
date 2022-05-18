// $(document).ready(()=>{
//     $("#test-btn").on('click', ()=>{
//         $.post('https://test-payment.momo.vn', 
//         {
//             partnerCode:"MOMODECM20220512",
//             accessKey: "xIr3KpWb7dyHaVHu",
//             requestId: "1",
//             amount: 10000,
//             orderId	: "1",
//             returnUrl: "http://localhost:3000/policy&term",
//             notifyUrl: "",
//             requestType: "captureMoMoWallet",
//             signature: "test",
//         },
//         function(data) {
//             console.log(data);
//          });
//     })
// })

//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//parameters
var accessKey = 'xIr3KpWb7dyHaVHu';
var secretKey = 'HbBF0YsBk7f8lmtYOCoVKxGVwLKveoQO';
var orderInfo = 'pay with MoMo';
var partnerCode = 'MOMODECM20220512';
var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
var amount = '50000';
var orderId = partnerCode + new Date().getTime();
var requestId = orderId;
var extraData ='';
var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
var orderGroupId ='';
var autoCapture =true;
var lang = 'vi';

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
//var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&paymentCode=" + paymentCode + "&requestId=" + requestId;
//puts raw signature
console.log("--------------------RAW SIGNATURE----------------")
//console.log(rawSignature)
//signature
//const crypto = require(['crypto']);
// var signature = crypto.createHmac('sha256', secretKey)
//     .update(rawSignature)
//     .digest('hex');
// console.log("--------------------SIGNATURE----------------")
// console.log(signature)
var signature = "tests"

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    partnerName : "Test",
    storeId : "MomoTestStore",
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    lang : lang,
    autoCapture: autoCapture,
    extraData : extraData,
    paymentCode : paymentCode,
    orderGroupId: orderGroupId,
    signature : signature
});
//Create the HTTPS objects
var moduleName = 'https';
require([moduleName], function(https){
    // do something with fooModule
})
const https = require('https');
const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/gw_payment/transactionProcessor',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
    }
}
//Send the request and get the response
const req = https.request(options, res => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (body) => {
        console.log('Body: ');
        console.log(body);
        console.log('resultCode: ');
        console.log(JSON.parse(body).resultCode);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
})

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});
// write data to request body
console.log("Sending....")
req.write(requestBody);
req.end();