const { render } = require('node-sass')

class ProductDetailController{
    show(req,res,next){
        res.render('pages/user/ShopPage/product-detail.ejs',{auth:false,PageIndex: 1});
    }


}

module.exports = new ProductDetailController;