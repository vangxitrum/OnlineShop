const { render } = require('node-sass')

class AboutController{
    show(req,res,next){
        res.render('pages/InfoPage/about-page.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new AboutController;