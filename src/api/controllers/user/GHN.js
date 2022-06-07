var axios = require('axios');



var config = {
    method: 'post',
    url: 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
    headers: { 
      'Token': 'c8253183-c5f2-11ec-afaa-3e25cc8db6e0', 
      'Content-Type': 'application/json'
    },
  };

async function  getDeliveryStatus(order_code){
    var data = JSON.stringify({
        "order_code": order_code
      });
      config['data']=data
      let responseData="Processing"
   await   axios(config)
      .then(function (response) {
          responseData=response.data.data.status;
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      return responseData
}

module.exports = {getDeliveryStatus};



