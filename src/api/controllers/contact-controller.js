const { render } = require('node-sass')

class ContactController{
    show(req,res,next){
        res.render('pages/InfoPage/contact-page.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new ContactController;