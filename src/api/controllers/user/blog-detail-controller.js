const { render } = require('node-sass')
const Cart = require('../../models/user/cart')
const ProductDetail = require('../../models/user/productDetail')
class BlogDetailController{
    show(req,res,next){
        let miniCartQuery = { customerID: "undifineUser" }
        if (req.user) {
            miniCartQuery.customerID = req.user._id;
        }
        Promise.all([ Cart.find(miniCartQuery),ProductDetail.find({})])
        .then(results=>{
            res.render('pages/user/BlogPage/blog-detail.ejs', { auth: req.auth, pageIndex: 0, pageName: "aboutPage",cartList:results[0],allProducts:results[1] });

        })
    }
}

module.exports = new BlogDetailController;