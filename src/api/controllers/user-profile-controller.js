const { render } = require('node-sass')

class ShopCategoryController{
    show(req,res,next){
        res.render('pages/user/AccountPage/user-profile-page.ejs',{auth:false, PageIndex: 1});
    }


}

module.exports = new ShopCategoryController;