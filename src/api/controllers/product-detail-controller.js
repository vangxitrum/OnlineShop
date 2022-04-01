const { query } = require('express');
const { render } = require('node-sass')
const Photo = require('../models/photo')
var mongoose = require('mongoose');
const ProductDetail = require('../models/productDetail')
const ProductQuantity = require('../models/productQuantity')
class ProductDetailController{
    show(req,res,next){
       const productID= req.query.id
       console.log("productID:"+productID)
       ProductDetail.find({_id: productID})
       .then((product) => {
        Photo.find({ productDetailID: productID })
        .then((photos) => {
            ProductQuantity.find({ productDetailID: productID })
            .then((quantity)=>{
              console.log(`solong la :${quantity.length}`)
              res.render('pages/user/ShopPage/product-detail.ejs',{auth:false,PageIndex: 1,product,photos,quantity});
            })   
         });
       })
     
    }
}

module.exports = new ProductDetailController;