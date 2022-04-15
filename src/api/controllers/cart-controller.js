const { render } = require('node-sass')
const Cart = require('../models/cart')
const productQuantity = require('../models/productQuantity')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
class CartPageController {
    show(req, res, next) {
        Cart.find({ customerID: ObjectId('6222cd37bcd8e3cabfde0323') })
            .then(items => {
                console.log(items)
                res.render('pages/user/CartPage/cart.ejs', { items, pageIndex: 0,pageName: "cartPage"});
            })
    }

    add(req, res, next) {
        console.log(req.body)
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
                    console.log('tim` doi tuong them vao gio hang')
                    console.log(quantityObject)
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
                    console.log('them vao gio hang')
                    Cart.insertMany([cartObject]).then(result => {
                        let response = {
                            status: 200,
                            success: 'Added Successfully'
                        }
                        res.end(JSON.stringify(response));
                    })
                        .catch(error => {
                            console.log(error)
                            let response = {
                                status: 400,
                                error: 'Added Unsuccessfully'
                            }
                            res.end(JSON.stringify(response));
                        })
                })
                .catch(error => {
                    console.log(error)
                    let response = {
                        status: 400,
                        error: 'Cant Find Product'
                    }
                    res.end(JSON.stringify(response));

                })
        } else {
            let response = {
                status: 400,
                error: 'Not Enought Info To Add'
            }
            res.end(JSON.stringify(response));
        }



    }





    update(req, res, next) {
        if (req.body.products) {
            console.log('product array from cart')
            Cart.deleteMany({ customerID: '6222cd37bcd8e3cabfde0323' }).then(r => {
                let cartList = req.body.products
                cartList.forEach(element => {
                    element['customerID'] = '6222cd37bcd8e3cabfde0323'
                });
                console.log(cartList)
                Cart.insertMany(cartList).then(result => {
                    let response = {
                        status: 200,
                        success: 'Added Successfully'
                    }
                    res.end(JSON.stringify(response));
                })
            })
            console.log(cartList)
            res.end(JSON.stringify({ status: 200 }))
        } else {
            res.end({ status: 400 })
        }
    }

}

module.exports = new CartPageController;