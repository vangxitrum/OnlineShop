const { render } = require('node-sass')
const Cart = require('../../models/user/cart')

class ContactController{
    show(req,res,next){
        let miniCartQuery = { customerID: "undifineUser" }
        if (req.user) {
            miniCartQuery.customerID = req.user._id;
        }
        Cart.find(miniCartQuery).then(result=>{
            res.render('pages/user/InfoPage/contact-page.ejs',{auth:req.auth, pageIndex: 0,pageName: "contactPage",cartList:result});



        })
    }


}

module.exports = new ContactController;