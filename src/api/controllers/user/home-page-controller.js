const ProductDetail = require('../../models/user/productDetail')
const Photo = require('../../models/user/photo')
class HomePageController {
  show(req, res, next) {
    // var dbo = ProductDetail.db('onlineshop');
    // dbo.conllection('productdetail')
    ProductDetail.find({})
      .then((products) => {
        Photo.find({})
          .then((photos) => {
            res.render('pages/user/index.ejs', {
              products, photos, auth: req.auth, pageIndex: 0,pageName: "homePage",user :req.user
            })
          });
      })
      .catch((error)=>{
          console.log(error)
      })

  }

}
module.exports = new HomePageController;