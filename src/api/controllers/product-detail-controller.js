const { query } = require('express');
const { render } = require('node-sass')
const Photo = require('../models/photo')
var mongoose = require('mongoose');
const ProductDetail = require('../models/productDetail')
const ProductQuantity = require('../models/productQuantity')
const Review= require('../models/review')
var moment = require('moment');
const { resolveInclude } = require('ejs');
class ProductDetailController{
    show(req,res,next){
       const productID= req.query.id
       Promise.all([ProductDetail.find({_id: productID}),
        Photo.find({ productDetailID: productID }),
        ProductQuantity.find({ productDetailID: productID }),
        ProductDetail.find() .limit(5),
        Photo.find(),
        Review.find({productDetailID: productID})
      ])
        .then(values=>{
          console.log(values[5])
          res.render('pages/user/ShopPage/product-detail.ejs',{auth:false,PageIndex:1,
            product:values[0],
            photos:values[1],
            quantity:values[2],
            allProducts:values[3],
            allPhotos:values[4],
            reviews:values[5],
            moment
          });
        })
      
     
    }
    addReview(req,res,next){

      console.log('AJAX ADD REVIEW')
      console.log(req.body)
      if(req.body.name&&req.body.email&&req.body.comment&&req.body.productid){
      let  reviewObject={
          date:new Date(),
          name:req.body.name,
          email:req.body.email,
          review:req.body.comment,
          rate:5,
          productDetailID:req.body.productid
        }
        Review.insertMany([reviewObject]).then(result => {
          console.log(result)
          let response = {
              status: 200,
              success: 'Added Review Successfully'
          }
          res.end(JSON.stringify(response));
      })
       .catch( error=>{
         console.log(error)
         let response = {
          status: 400,
          success: 'Added Review Unsuccessfully'
      }
      res.end(JSON.stringify(response));
       })
      }
      

    }

}

module.exports = new ProductDetailController;