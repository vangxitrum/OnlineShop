const { render } = require('node-sass')

class BlogCategoryController{
    show(req,res,next){
        res.render('pages/user/BlogPage/blog-category.ejs',{auth:false, pageIndex: 0,pageName: "blogPage"});
    }


}

module.exports = new BlogCategoryController;