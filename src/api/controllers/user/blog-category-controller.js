const { render } = require('node-sass')
const Cart = require('../../models/user/cart')
const ProductDetail = require('../../models/user/productDetail')
const Blog= require('../../models/user/blog')
const moment = require('moment');
class BlogCategoryController{
    show(req,res,next){
  
        let currentPage= req.query.page||1
       
        let perPage= 4
        let miniCartQuery = { customerID: "undifineUser" }
        let queryObject ={}
        if(req.query.tag){
            queryObject['tags']=req.query.tag
        }
        if (req.user) {
            miniCartQuery.customerID = req.user._id;
        }
        Promise.all([ Cart.find(miniCartQuery),
            ProductDetail.find({}),
            Blog.find(queryObject),
        ])
        .then(results=>{
            res.render('pages/user/BlogPage/blog-category.ejs', 
            { auth: req.auth,
                 pageIndex: 0,
                  moment, 
                 pageName: "aboutPage",
                 cartList:results[0],
                 allProducts:results[1],
                 blogs:results[2],
                 pages:results[2].length/perPage+1,
                 currentPage,
                 perPage
            });
        })
    }
    categoryShow(req,res,next){
        console.log("AJAx call")
        let currentPage= + req.body.page||1
        let perPage= 4
         let queryObject = {}
         console.log(req.body)
         if(req.body.tag){
             queryObject['tags']=req.body.tag
         }
         Blog.find(queryObject)
         .then(blogs=>{
            
             res.render('pages/user/BlogPage/partial/blog-list.ejs',
             {  layout: false,
                moment,
                blogs,
                currentPage,
                perPage,
                pages:blogs.length/perPage+1})
         })
       
    }


}

module.exports = new BlogCategoryController;