const { render } = require('node-sass')

class ShopCategoryController{
    show(req,res,next){
        res.render('pages/user/ShopPage/shop-category.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new ShopCategoryController;