const { query } = require('express');
const { render } = require('node-sass')
const Photo = require('../models/photo')
var mongoose = require('mongoose');
const ProductDetail = require('../models/productDetail')
const ProductQuantity = require('../models/productQuantity')
class ProductDetailController{
    show(req,res,next){
       const productID= req.query.id
       Promise.all([ProductDetail.find({_id: productID}),
        Photo.find({ productDetailID: productID }),
        ProductQuantity.find({ productDetailID: productID }),
        ProductDetail.find() .limit(5),
        Photo.find()
      ])
        .then(values=>{
          res.render('pages/user/ShopPage/product-detail.ejs',{auth:false,PageIndex:1,
            product:values[0],
             photos:values[1],
             quantity:values[2],
             allProducts:values[3],
            allPhotos:values[4]} );
        })
      //  ProductDetail.find({_id: productID})
      //  .then((product) => {
      //   Photo.find({ productDetailID: productID })
      //   .then((photos) => {
      //       ProductQuantity.find({ productDetailID: productID })
      //       .then((quantity)=>{
      //         console.log(`solong la :${quantity.length}`)
      //         res.render('pages/user/ShopPage/product-detail.ejs',{auth:false,PageIndex: 1,product,photos,quantity});
      //       })   
      //    });
         
      //  })
     
    }


}

module.exports = new ProductDetailController;