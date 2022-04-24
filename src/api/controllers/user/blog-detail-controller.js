const { render } = require('node-sass')

class BlogDetailController{
    show(req,res,next){
        res.render('pages/user/BlogPage/blog-detail.ejs',{auth:false, pageIndex: 0,pageName: "blogDetailPage"});
    }


}

module.exports = new BlogDetailController;