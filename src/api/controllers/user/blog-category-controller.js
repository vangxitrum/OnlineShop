const { render } = require('node-sass')
const Cart = require('../../models/user/cart')

class BlogCategoryController{
    show(req,res,next){
        let miniCartQuery = { customerID: "undifineUser" }
        if (req.user) {
            miniCartQuery.customerID = req.user._id;
        }
        Cart.find(miniCartQuery).then(result=>{
            res.render('pages/user/BlogPage/blog-category.ejs',{auth:req.auth, pageIndex: 0,pageName: "blogPage",cartList:result});


        })
    }


}

module.exports = new BlogCategoryController;