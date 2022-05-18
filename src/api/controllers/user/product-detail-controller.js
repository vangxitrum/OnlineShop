const Photo = require('../../models/user/photo')
const ProductDetail = require('../../models/user/productDetail')
const ProductQuantity = require('../../models/user/productQuantity')
const Review= require('../../models/user/review')
const Cart = require('../../models/user/cart')
var moment = require('moment');
const user = require('../../models/user/user')
class ProductDetailController{
    show(req,res,next){
       const productID= req.query.id
       Promise.all([ProductDetail.find({_id: productID}),
        Photo.find({ productDetailID: productID }),
        ProductQuantity.find({ productDetailID: productID }),
        ProductDetail.find() .limit(5),
        Photo.find(),
        Review.find({productDetailID: productID}),
        Cart.find({customerID:req.user._id})
      ])
        .then(values=>{
          res.render('pages/user/ShopPage/product-detail.ejs',{auth:false,pageIndex: 1,pageName: "productDetailPage",
            product:values[0],
            photos:values[1],
            quantity:values[2],
            allProducts:values[3],
            allPhotos:values[4],
            reviews:values[5],
            moment,
            cartList:values[6],
          });
        })
      
     
    }
    addReview(req,res,next){

      console.log('AJAX ADD REVIEW')
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
          let response = {
              status: 200,
              success: 'Added Review Successfully'
          }
          Review.find({productDetailID: req.body.productid})
          .then(reviews=>{
            res.render('pages/user/ShopPage/review.ejs',{ layout:false,reviews: reviews,moment:moment})
          })
          .catch(erro=>{
            console.log(erro)
            res.end(JSON.stringify(response));
          })
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