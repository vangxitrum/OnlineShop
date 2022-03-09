const { render } = require('node-sass')

class BlogCategoryController{
    show(req,res,next){
        res.render('pages/BlogPage/blog-category.ejs',{auth:false, PageIndex: 0});
    }


}

module.exports = new BlogCategoryController;