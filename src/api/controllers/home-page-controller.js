const { render } = require('node-sass')

class HomePageController{
    show(req,res,next){
        res.render('pages/index.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new HomePageController;