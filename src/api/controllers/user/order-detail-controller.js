const { render } = require('node-sass')

class OrderdetailController{
    show(req,res,next){
        res.render('pages/user/AccountPage/user-order-detail.ejs',{auth:req.auth, pageIndex: 0,pageName: "OrderDetailPage"});
    }


}

module.exports = new OrderdetailController;