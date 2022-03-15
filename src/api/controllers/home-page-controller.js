const { render } = require('node-sass')

class HomePageController{
    show(req,res,next){
        res.render('pages/user/index.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new HomePageController;