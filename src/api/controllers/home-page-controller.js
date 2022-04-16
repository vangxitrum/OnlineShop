const { render } = require('node-sass')
const ProductDetail = require('../models/productDetail')
const Photo = require('../models/photo')
const { mongooseToObject } = require('../../../util/mongoose')
class HomePageController {
  show(req, res, next) {
    // var dbo = ProductDetail.db('onlineshop');
    // dbo.conllection('productdetail')
    ProductDetail.find({})
      .then((products) => {
        Photo.find({})
          .then((photos) => {
            res.render('pages/user/index.ejs', {
              products, photos, auth: true, pageIndex: 0,pageName: "homePage"
            })
          });
      })
      .catch((error)=>{
          console.log(error)
      })

  }
}
module.exports = new HomePageController;