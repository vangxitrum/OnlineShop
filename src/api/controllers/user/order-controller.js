const moment = require('moment');
const Order = require('../../models/user/order')
const Cart = require('../../models/user/cart')
const Shared = require('../user/_shared')
const zaloPayment = require('../user/zalo-payment');

const { NULL } = require('node-sass');
class orderController {
  show(req, res, next) {
    console.log("Order search ")
    if (req.user) {
      let queryObject = {}
      let dateQuery = {}
      if (req.body.startday) {
        let dateMomentObject = moment(req.body.startday, "YYYY-MM-DD");
        let startday = dateMomentObject.toDate();
        dateQuery["$gte"] = startday
      }
      if (req.body.endday) {
        let dateMomentObject = moment(req.body.endday, "YYYY-MM-DD");
        let endday = dateMomentObject.toDate();
        dateQuery["$lte"] = endday
      }
      if (JSON.stringify(dateQuery)!="{}") {
        queryObject['startday'] = dateQuery
      }
      if (req.body.orderSearch) {
        queryObject['tempUserId'] = { $regex: new RegExp(`.*${req.body.orderSearch}.*`, 'i') }
      }
      Order.aggregate([
        {
          $addFields: {
            tempUserId: { $toString: '$_id' },
          }
        },
        {
          $match: queryObject
        }
      ])
        .then(orderList => {
          console.log(orderList)
          res.render("pages/user/AccountPage/partial/user-order-history.ejs", { layout: false, moment, orderList })
          res.end()
        })


      // Error: Not found

    }

  }
   add(req, res, next) {
    console.log("add order AJAX")
    console.log(req.body)
    if (req.body && req.user) {
      let orderObject = req.body
      orderObject['customerID'] = req.user._id
      Cart.find({ customerID: orderObject.customerID })
        .then( async cartList => {
          if (cartList.length > 0) {
            orderObject['items'] = cartList
            orderObject['startday'] = new Date()
            orderObject['status'] = "CODE_GHN"
            orderObject['paymethod'] = req.body.paymethod
            let result_payment//  COD result_payment is null
            if (orderObject['paymethod']==2) {//this zalo payment method
              result_payment= await  zaloPayment.payment(orderObject)
              orderObject['payment']=result_payment
            }else{
              orderObject['payment']={paymethod:"COD"}
            }
              Order.insertMany([orderObject])
                .then(r => {
                  Cart.deleteMany({ customerID: req.user._id }).then(deleteItem => {
                    console.log(`rerult-payment ${JSON.stringify(result_payment)}`)
                    if(result_payment){
                      /// is ZaloPay
                      res.send(JSON.stringify({orderUrl:result_payment.order_url,msg:result_payment.return_message}))
                    } else {
                      /// is COD
                      res.send(Shared.jsonResponse(200, "Place Order Successfully"))
                    }
                  })
                })
          } else {
            /// cart is empty
            res.send(Shared.jsonResponse(300, "Your cart has no items"))
          }
        })
    }
  }
}
module.exports = new orderController;