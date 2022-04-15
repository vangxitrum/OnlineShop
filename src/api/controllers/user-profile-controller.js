const { render } = require('node-sass')

class ShopCategoryController{
    show(req,res,next){
        res.render('pages/user/AccountPage/user-profile-page.ejs',{auth:false, pageIndex: 1,pageName: "userPage"});
    }


}

module.exports = new ShopCategoryController;