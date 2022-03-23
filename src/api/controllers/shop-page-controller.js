const { render } = require('node-sass')
const ProductDetail = require('../models/productDetail')
const Photo = require('../models/photo')
class ShopCategoryController {
    
    show(req, res, next) {
        let page =  req.params.page || 1;
        let perPage = 3;
       
           let queryObject={} ;
            if(  req.query.type){
                queryObject["type"] = req.query.type;
            }
            if( req.query.brand)
            {
                queryObject["brand"] = req.query.brand;
            }
            if( req.query.tag)
            {
                queryObject["tag"] = req.query.tag;
            }
            console.log("my query object" )
            console.log(queryObject )
        let categoryObject = {}
        let manufacture = {}
        let tag={}
        ProductDetail.find()
            .exec((err, allProducts) => {

                allProducts.forEach(element => {
                    if (categoryObject.hasOwnProperty(element.type)) {
                        categoryObject[element.type] += 1
                    } else {
                        categoryObject[element.type] = 1
                    }
                })
                allProducts.forEach(element => {
                    if (manufacture.hasOwnProperty(element.brand)) {
                        manufacture[element.brand] += 1
                    } else {
                        manufacture[element.brand] = 1
                    }
                })
                allProducts.forEach(element => {
                    if (tag.hasOwnProperty(element.tag)) {
                        tag[element.tag] += 1
                    } else {
                        tag[element.tag] = 1
                    }
                })
                loadPage(queryObject)
            })
        function loadPage(queryObject ) {
            ProductDetail.find(queryObject)
                .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(perPage)
                .exec((err, products) => {
                   console.log(products.length)
                    ProductDetail.find(queryObject).exec((err,count) => { // đếm để tính xem có bao nhiêu trang
                        if (err) return next(err);
                        Photo.find()
                            .exec((err, photos) => {
                                res.render('pages/user/ShopPage/shop-category.ejs', {
                                    products, // sản phẩm trên một page
                                    current: page, // page hiện tại
                                    pages: Math.ceil(   count.length / perPage),// tổng số các page
                                    auth: false,
                                    photos,
                                    PageIndex: 0,
                                    count:count.length,
                                    categoryObject,
                                    manufacture,
                                    tag
                                });
                            })

                    });
                })
        }

        // res.render('pages/user/ShopPage/shop-category.ejs',{auth:false, PageIndex: 0});

    }


}

module.exports = new ShopCategoryController;