const { render } = require('node-sass')

class ContactController{
    show(req,res,next){
        res.render('pages/user/InfoPage/contact-page.ejs',{auth:false, pageIndex: 0,pageName: "contactPage"});
    }


}

module.exports = new ContactController;