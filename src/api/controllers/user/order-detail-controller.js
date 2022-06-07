const { render } = require('node-sass')
const ProductDetail = require('../../models/user/productDetail')
const Cart = require('../../models/user/cart')
const Order = require('../../models/user/order')
const zaloPayment = require('../user/zalo-payment');
const GHN_API = require('../user/GHN');
class OrderdetailController {
    show(req, res, next) {
        console.log(req.query.orderID)
        if (req.query.orderID) {
            Promise.all([ProductDetail.find({}),
                 Cart.find({ customerID: req.user._id }),
                  Order.find({ _id: req.query.orderID })])
                .then(function  (results) { 
               Promise.all([zaloPayment.getstatus(results[2][0].payment),GHN_API.getDeliveryStatus("GHN_api")]).then(function (status){
                  
                res.render('pages/user/AccountPage/user-order-detail.ejs',
                {
                    auth: req.auth,
                    pageIndex: 0, pageName: "OrderDetailPage",
                    allProducts: results[0],
                    cartList: results[1],
                    orderDetail: results[2][0],
                    paymentStatus:  status[0],
                    deliveryStatus: status[1],
                });
               })
                   
               })
                       
                   
            
        }

    }
}

module.exports = new OrderdetailController;