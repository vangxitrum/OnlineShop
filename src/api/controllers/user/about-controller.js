const { render } = require('node-sass');
const Cart = require('../../models/user/cart')

class AboutController {
    show(req, res, next) {
        let miniCartQuery = { customerID: "undifineUser" }
        if (req.user) {
            miniCartQuery.customerID = req.user._id;
        }
        Cart.find(miniCartQuery).then(result=>{
            res.render('pages/user/InfoPage/about-page.ejs', { auth: req.auth, pageIndex: 0, pageName: "aboutPage",cartList:result });

        })
    }


}

module.exports = new AboutController;