const { render } = require('node-sass')

class LoginController{
    show(req,res,next){
        res.render('pages/user/AccountPage/login-page.ejs',{auth:false, PageIndex: -1});
    }


}

module.exports = new LoginController;