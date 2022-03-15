const { render } = require('node-sass')

class BlogDetailController{
    show(req,res,next){
        res.render('pages/user/BlogPage/blog-detail.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new BlogDetailController;