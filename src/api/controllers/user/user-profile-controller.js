const { redirect } = require('express/lib/response');
const { render } = require('node-sass')
const passport = require('passport')
require('../../middleware/passport')
class UserProfileController{
    show(req,res,next){
        res.render('pages/user/AccountPage/user-profile-page.ejs',{auth:req.auth, pageIndex: 1,pageName: "userPage",user: req.user});
    }


}

module.exports = new UserProfileController;