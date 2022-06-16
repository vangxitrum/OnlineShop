const { render } = require('node-sass')
const Cart = require('../../models/user/cart')
const ProductDetail = require('../../models/user/productDetail')
const Blog= require('../../models/user/blog')
const moment = require('moment');
class BlogDetailController{
    show(req,res,next){
       if(req.params.blog){
        let miniCartQuery = { customerID: "undifineUser" }
        if (req.user) {
            miniCartQuery.customerID = req.user._id;
        }
        Promise.all([ Cart.find(miniCartQuery),ProductDetail.find({}),Blog.find({_id:req.params.blog}),Blog.find({}) ])
        .then(results=>{

            res.render('pages/user/BlogPage/blog-detail.ejs',
             { auth: req.auth, 
                pageIndex: 0, 
                pageName:"aboutPage",
                cartList:results[0],
                allProducts:results[1],
                currentBlog:results[2][0],
                blogs:results[3],
                moment
             });
        })
       }
        
    }
}

module.exports = new BlogDetailController;