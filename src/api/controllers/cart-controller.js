const { render } = require('node-sass')

class CartPageController{
    show(req,res,next){
        res.render('pages/ShopPage/cart.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new CartPageController;