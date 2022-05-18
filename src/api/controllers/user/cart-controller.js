const { render } = require('node-sass')
const Coupon = require('../../models/user/coupon')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Shared = require('../user/_shared')
const Cart = require('../../models/user/cart')
const productQuantity = require('../../models/user/productQuantity');
const { deleteMany } = require('../../models/user/coupon');

class CartPageController {
    show(req, res, next) {
        console.log(` my user${req.user._id}`)
        Cart.find({ customerID: ObjectId(req.user._id) })
            .then(items => {
                console.log(items)
                res.render('pages/user/CartPage/cart.ejs', { cartList: items, pageIndex: 0, pageName: "cartPage", auth: false });
            })
    }

    add(req, res, next) {
        console.log(' Cart AJAX FUNC HAS CALLED ')
        let quantity = req.body.quantity || 1
        let productObject = {}
        if (req.body.productid && req.body.size && req.body.color && req.user) {
            productObject['productDetailID'] = req.body.productid
            productObject['size'] = req.body.size
            productObject['color'] = req.body.color

            productQuantity.findOne(productObject)
                .then(quantityObject => {
                    let cartObject = {
                        productID: quantityObject._id,
                        customerID: req.user._id,
                        quantity: quantity,
                        productDt: productObject.productDetailID,
                        image: req.body.image,
                        color: req.body.color,
                        size: req.body.size,
                        name: req.body.name,
                        price: req.body.price
                    }
                    Cart.updateOne({ productID: cartObject.productID, customerID: req.user._id }, { $inc: { quantity: parseInt(cartObject.quantity) } })
                        .then(updataResult => {
                            console.log(updataResult)
                            if (!updataResult.modifiedCount) {
                                Cart.insertMany([cartObject]).then(result => {
                                    res.end(Shared.jsonResponse(200, ' New Item  Has Added  Successfully'));
                                    return
                                })
                                    .catch(error => {
                                        res.end(Shared.jsonResponse(400, ' New Item Has Added Unsuccessfully'), error);
                                    })
                            }
                            else {
                                res.end(Shared.jsonResponse(200, 'Exist Item Has Added Successfully'));
                            }
                        })
                        .catch(error => {
                            res.end(Shared.jsonResponse(400, 'Exist Item Has Added Unsuccessfully'), error);
                        })
                })
                .catch(error => {
                    res.end(Shared.jsonResponse(400, 'Cant Find Product'), error);
                })
        } else {
            res.end(Shared.jsonResponse(400, 'Not Enought Info To Add'));
        }
    }


    checkCoupon(req, res, next) {
        let _code = req.params.code
        console.log(_code)
        Coupon.aggregate([
            { $match: { code: _code } },
            { $project: { _id: -1, startday: 1, expire: 1, percent: 1, value: 1 } }
        ]).then(value => {
            if (value.length > 0) {
                res.end(Shared.jsonResponse(200, 'Coupon is valid', value[0]));
            } else {
                let msg = Shared.jsonResponse(300, 'Coupon is not valid')
                res.end(msg);

            }
        })
            .catch(error => {
                res.end(Shared.jsonResponse(400, 'Coupon is not valid', error));
            })

    }

    update(req, res, next) {
        let cartList = req.body.products
        Cart.deleteMany({ customerID: req.user._id }).then(r => {
            if (cartList) {
                cartList.forEach(element => {
                    element['customerID'] = req.user._id
                });
                console.log(`cartList:${cartList}`)
                Cart.insertMany(cartList).then(result => {
                    
                    res.end(Shared.jsonResponse(200, "Update Successfully"))
                    return
                })
                    .catch(error => {
                        console.log('insertMany failed')
                        console.log(error);
                        Cart.insertMany(cartList).then(result => {
                            res.end(Shared.jsonResponse(400, "Update Unsuccessfully"))
                            return
                        })
                    })
            } else {
                res.end(Shared.jsonResponse(200, "Update Successfully"))
                return
            }

        })

    }

    delete(req, res, next) {
        let cartItemID = req.body.cartID
        let userID = req.user._id
        Cart.deleteOne({ customerID: userID, _id: cartItemID })
            .then(r => {
                Cart.find({ customerID: userID }).then(cartList => {
                    console.log(cartList)
                    res.render('shared/user/mini-cart.ejs', { layout: false, cartList })
                })
            })

    }

}

module.exports = new CartPageController;