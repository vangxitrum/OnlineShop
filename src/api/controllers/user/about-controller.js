const { render } = require('node-sass')

class AboutController{
    show(req,res,next){
        res.render('pages/user/InfoPage/about-page.ejs',{auth:false, pageIndex: 0,pageName: "aboutPage"});
    }


}

module.exports = new AboutController;