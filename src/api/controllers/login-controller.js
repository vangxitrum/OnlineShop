const { render } = require('node-sass')

class LoginController{
    show(req,res,next){
        res.render('pages/AccountPage/login-page.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new LoginController;