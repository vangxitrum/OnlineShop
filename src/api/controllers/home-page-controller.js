const { render } = require('node-sass')
const ProductDetail = require('../models/productDetail')
const Photo = require('../models/photo')
class HomePageController {
  show(req, res, next) {
    // var dbo = ProductDetail.db('onlineshop');
    // dbo.conllection('productdetail')
    ProductDetail.find({})
      .then((products) => {
        Photo.find({})
          .then((photos) => {
            res.render('pages/user/index.ejs', {
              products, photos, auth: false, PageIndex: 0
            })
          });
      })
      .catch((error)=>{
          console.log(error)
      })

  }

}
module.exports = new HomePageController;