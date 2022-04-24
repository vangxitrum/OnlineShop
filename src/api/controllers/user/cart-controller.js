const { render } = require('node-sass')
const Cart = require('../../models/user/cart')
const productQuantity = require('../../models/user/productQuantity')

class CartPageController {
    show(req, res, next) {
        res.render('pages/user/ShopPage/cart.ejs', { auth: false, pageIndex: 0,pageName: "cartPage"});
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

            productQuantity.findOne(productObject)
                .then(quantityObject => {
                    console.log('tim` doi tuong them vao gio hang')
                    console.log(quantityObject)
                    let cartObject = {
                        productID: quantityObject._id,
                        customerID: '6222cd37bcd8e3cabfde0323',
                        quatity: quantity
                    }
                    console.log('them vao gio hang')
                    Cart.insertMany([cartObject]).then(result => {
                        let response = {
                            status: 200,
                            success: 'Added Successfully'
                        }
                        res.end(JSON.stringify(response));
                    })
                    .catch(error=>{
                        console.log(error)
                        let response = {
                            status: 400,
                            error: 'Added Unsuccessfully'
                        }
                        res.end(JSON.stringify(response));
                    })
                })
                .catch(error=>{
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





    delete(req, res, next) {
        if (req.params.id) {

        }
    }


}

module.exports = new CartPageController;