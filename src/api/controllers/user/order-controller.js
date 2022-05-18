const moment = require('moment');
const Order = require('../../models/user/order')
const Cart = require('../../models/user/cart')
const Shared = require('../user/_shared')
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
        let dateMomentObject = moment(req.body.startday, "YYYY-MM-DD");
        let endday = dateMomentObject.toDate();
        dateQuery["$lte"] = endday
      }
      if (req.body.orderSearch) {
        queryObject['tempUserId'] = { $regex: new RegExp(`.*${req.body.orderSearch}.*`, 'i') }
      }
      if(dateQuery){
        queryObject['startday']=dateQuery
      }
      console.log(queryObject)
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
    if (req.body && req.user) {
      let orderObject = req.body
      orderObject['customerID'] = req.user._id
      Cart.find({ customerID: orderObject.customerID })
        .then(cartList => {
          if (cartList.length > 0) {
            orderObject['items'] = cartList
            orderObject['startday'] = new Date()
            orderObject['status'] = "CODE_GHN"
            orderObject['address'] = {}
            orderObject['paymethot'] = 1
            Order.insertMany([orderObject])
              .then(r => {
                Cart.deleteMany({ customerID: req.user._id }).then(deleteItem => {
                  console.log(r)
                  res.render('shared/user/mini-cart.ejs', { layout: false, cartList: {} })
                })

              })
          } else {
            //your cart is empty
          }

        })

    }
  }
}
module.exports = new orderController;