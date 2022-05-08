
class ProductPageController{
    show(req,res,next){
        res.render('pages/admin/product-page.ejs',{pageName: "productPage"});
    }


}

module.exports = new ProductPageController;