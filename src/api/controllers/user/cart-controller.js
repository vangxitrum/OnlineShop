const { render } = require('node-sass')
const Coupon=require ('../../models/user/coupon')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Shared= require('../user/_shared')
const Cart = require('../../models/user/cart')
const productQuantity = require('../../models/user/productQuantity')

class CartPageController {
    show(req, res, next) {
        Cart.find({ customerID: ObjectId('6222cd37bcd8e3cabfde0323') })
            .then(items => {
                res.render('pages/user/CartPage/cart.ejs', { items, pageIndex: 0,pageName: "cartPage",auth:req.auth});
            })
    }

    add(req, res, next) {
        console.log('AJAX FUNC HAS CALLED ')
        let quantity = req.body.quantity || 1
        let productObject = {}
        if (req.body.productid && req.body.size && req.body.color) {
            productObject['productDetailID'] = req.body.productid
            productObject['size'] = req.body.size
            productObject['color'] = req.body.color
            productObject['image'] = req.body.image

            productQuantity.findOne(productObject)
                .then(quantityObject => {
                    let cartObject = {
                        productID: quantityObject._id,
                        customerID: '6222cd37bcd8e3cabfde0323',
                        quantity: quantity,
                        productDt: productObject.productDetailID,
                        image: productObject['image'],
                        color: req.body.color,
                        size: req.body.size,
                        name: req.body.name,
                        price: req.body.price
                    }
                    Cart.updateOne({productID:cartObject.productID},{$inc :{quantity:parseInt(cartObject.quantity)}})
                    .then( updataResult=>{
                        if(!updataResult.modifiedCount) {
                            Cart.insertMany([cartObject]).then(result => {
                                res.end(Shared.jsonResponse(200,' New Item  Has Added  Successfully'));
                                return
                            })
                                .catch(error => {
                                    res.end(Shared.jsonResponse(400,' New Item Has Added Unsuccessfully'),error);
                                })
                        }
                        else{
                            res.end(Shared.jsonResponse(200,'Exist Item Has Added Successfully'));
                        }
                    })
                    .catch(error => {
                        res.end(Shared.jsonResponse(400,'Exist Item Has Added Unsuccessfully'),error);
                    })   
                })
                .catch(error => {
                    res.end(Shared.jsonResponse(400,'Cant Find Product'),error);
                })
        } else {
            res.end(Shared.jsonResponse(400,'Not Enought Info To Add'));
        }
    }


    checkCoupon(req,res,next){
       let _code= req.params.code
       console.log(_code)
       Coupon.aggregate([
           {$match:{code:_code}},
            {$project:{_id:-1,startday:1,expire:1,percent:1,value:1}}
        ]).then( value=>{
            if(value.length>0){
                res.end(Shared.jsonResponse(200,'Coupon is valid',value[0]));
            } else{
              let msg=   Shared.jsonResponse(300,'Coupon is not valid')
                res.end(msg);

            }
        })
        .catch( error=>{
            res.end(Shared.jsonResponse(400,'Coupon is not valid',error));
        })
        
    }

    update(req, res, next) {
        let cartList = req.body.products
        if (cartList) {
            Cart.deleteMany({ customerID: '6222cd37bcd8e3cabfde0323' }).then(r => {
                cartList.forEach(element => {
                    element['customerID'] = '6222cd37bcd8e3cabfde0323'
                });
                Cart.insertMany(cartList).then(result => {
                    res.end(Shared.jsonResponse(200,"Update Successfully"))
                   
                })
            })
            .catch( r=>{
                res.end({ status: 400 })
            }
            )
        } else {
            res.end({ status: 400 })
        }
    }

}

module.exports = new CartPageController;