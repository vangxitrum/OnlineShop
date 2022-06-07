const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const qs = require('qs')



  async function  payment( orderObject){
    const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };
        const embed_data = {};
        const items = orderObject.items
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: 'demo',
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: orderObject.price,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: 'zalopayapp',
        };
        
        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        
    let res = await  axios.post(config.endpoint, null, { params: order })
  
    console.log(` this is zalo${ JSON.stringify(res.data)}`);
    res.data['stansID']= order.app_trans_id;
        return res.data

    }
  async function  getstatus(orderID){
      if(orderID.paymethod){
          return {return_code:3}
      }
    const axios = require('axios').default; // npm install axios
    const CryptoJS = require('crypto-js'); // npm install crypto-js
    const qs = require('qs')
    
    const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/query"
    };
    
    let postData = {
        app_id: config.app_id,
        app_trans_id: orderID.stansID, // Input your app_trans_id
    }
    
    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    
    
    let postConfig = {
        method: 'post',
        url: config.endpoint,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };
    let temp='ioerweoruwi'

   await axios(postConfig)
    .then(function (response) {
        temp= response.data
        return response.data;

       
    })
    .catch(function (error) {
        console.log(error);
       
    });

    return temp
 }
module.exports = {payment,getstatus};