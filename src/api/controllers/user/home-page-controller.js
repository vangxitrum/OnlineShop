const ProductDetail = require('../../models/user/productDetail')
const Photo = require('../../models/user/photo')
const Cart = require('../../models/user/cart')
class HomePageController {
  show(req, res, next) {
    Promise.all([ ProductDetail.find({}),Photo.find({}),Cart.find({customerID:req.user._id})])
    .then((result)=>{
      console.log(result[2])
      res.render('pages/user/index.ejs', {
        products:result[0], photos:result[1], auth: req.auth, pageIndex: 0,pageName: "homePage",user :req.user,cartList:result[2]
      })
    })
    .catch((err)=>{
      console.log(err)
    })

  }

}
module.exports = new HomePageController;