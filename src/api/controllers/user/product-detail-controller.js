const Photo = require('../../models/user/photo')
const ProductDetail = require('../../models/user/productDetail')
const ProductQuantity = require('../../models/user/productQuantity')
const Review = require('../../models/user/review')
const Cart = require('../../models/user/cart')
const moment = require('moment');
const user = require('../../models/user/user')
class ProductDetailController {
  show(req, res, next) {
    let miniCartQuery = { customerID: "undifineUser" }
    if (req.user) {
      miniCartQuery.customerID = req.user._id;
    }
    const productID = req.query.id
    Promise.all([ProductDetail.find({ _id: productID }),
    Photo.find({ productDetailID: productID }),
    ProductQuantity.find({ productDetailID: productID }),
    ProductDetail.find(),
    Photo.find(),
    Review.find({ productDetailID: productID }),
    Cart.find(miniCartQuery)
    ])
      .then(values => {
        res.render('pages/user/ShopPage/product-detail.ejs', {
          auth: req.auth, pageIndex: 1, pageName: "productDetailPage",
          product: values[0],
          photos: values[1],
          quantity: values[2],
          allProducts: values[3],
          allPhotos: values[4],
          reviews: values[5],
          moment,
          cartList: values[6],
        });
      })


  }
  addReview(req, res, next) {
    console.log('AJAX ADD REVIEW')
    let reviewObject = {}
    reviewObject = {
      date: new Date(),
      name: req.body.name,
      review: req.body.comment,
      rate: parseInt(req.body.rate),
      productDetailID: req.body.productid
    }

    if (req.user) {

      Review.insertMany([reviewObject]).then(result => {
        Review.find({ productDetailID: req.body.productid })
          .then(reviews => {
            res.render('pages/user/ShopPage/review.ejs', { layout: false, reviews: reviews, moment: moment })
          })
          .catch(erro => {
            console.log(erro)
          })
      })
        .catch(error => {
          console.log(error)
          let response = {
            status: 400,
            success: 'Added Review Unsuccessfully'
          }
          res.end(JSON.stringify(response));

        })
    } else {
      console.log("User not logged in")
      res.send({ status: 404, message: 'User is not logged in' })
    }


  }

}

module.exports = new ProductDetailController; 