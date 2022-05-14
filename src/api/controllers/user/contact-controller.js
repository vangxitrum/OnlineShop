const { render } = require('node-sass')

class ContactController{
    show(req,res,next){
        res.render('pages/user/InfoPage/contact-page.ejs',{auth:req.auth, pageIndex: 0,pageName: "contactPage"});
    }


}

module.exports = new ContactController;