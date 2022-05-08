const { render } = require('node-sass')
const ProductDetail = require('../../models/user/productDetail')
const Photo = require('../../models/user/photo')
const Cart = require('../../models/user/cart')
class ShopCategoryController {

    show(req, res, next) {

        let page = req.params.page || 1;
        let perPage = 12;
        let categoryObject = {}
        let manufacture = {}
        let tag = {}
        let color = {}
        let sortQuery = {}
        let compareQuery={}
        console.log(req.query.sort)

        let queryObject = {};
        if (req.query.type) {
            queryObject["type"] = req.query.type;
        }
        if (req.query.brand) {
            queryObject["brand"] = req.query.brand;
        }
        if (req.query.tag) {
            queryObject["tag"] = req.query.tag;
        }
        if (req.query.color) {
            queryObject["color"] = req.query.color;
        }
        switch (req.query.sort) {

            case '1': sortQuery = { price: 1 }
                break;
            case '2': sortQuery = { price: -1 }
                break;
            case '3': sortQuery = { name: 1 }
                break;
            case '4': sortQuery = { name: -1 }
                break;

        }
        console.log(sortQuery)
        //Load manufacturer ,product category, color ,tag
        ProductDetail.find()
            .exec((err, allProducts) => {
                allProducts.forEach(element => {
                    if (categoryObject.hasOwnProperty(element.type)) {
                        categoryObject[element.type] += 1
                    } else {
                        categoryObject[element.type] = 1
                    }

                    if (manufacture.hasOwnProperty(element.brand)) {
                        manufacture[element.brand] += 1
                    } else {
                        manufacture[element.brand] = 1
                    }

                    if (tag.hasOwnProperty(element.tag)) {
                        tag[element.tag] += 1
                    } else {
                        tag[element.tag] = 1
                    }

                    if (Array.isArray(element.color)) {
                        element.color.forEach(item => {
                            if (color.hasOwnProperty(item)) {
                                color[item] += 1
                            } else {
                                color[item] = 1
                            }
                        })
                    }
                })
                if(req.query.gt){
                    compareQuery['$gt']=req.query.gt
                }
                if(req.query.lt){
                    compareQuery['$lt']=req.query.lt
                }
                if(req.query.gt||req.query.lt){
                    queryObject["price"]=compareQuery
                }
                let sort = req.query.sort || "0"
                loadPage(queryObject, sortQuery, sort)
            })

        // Load pagination
        function loadPage(queryObject, sortQuery, sort) {
            ProductDetail.find(queryObject)
                .sort(sortQuery)
                .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(perPage)
                .exec((err, products) => {
                    ProductDetail.find(queryObject).exec((err, count) => { // đếm để tính xem có bao nhiêu trang
                        if (err) return next(err);
                        Photo.find()
                            .exec((err, photos) => {
                                res.render('pages/user/ShopPage/shop-category.ejs', {
                                    products, // sản phẩm trên một page
                                    current: page,// page hiện tại
                                    perPage,
                                    pages: Math.ceil(count.length / perPage),// tổng số các page
                                    auth: false,
                                    photos,
                                    pageIndex: 0,pageName: "shopPage",
                                    count:count.length,
                                    categoryObject,
                                    manufacture,
                                    tag,
                                    color,
                                    sort,
                                    paramObject: req.query
                                });
                            })
                    });
                })
        }
    }
    showPagination(req, res, next) {
        console.log('Ajax has called showPagination function')
        let page = req.params.page || 1;
        let perPage=12
        let sortQuery = {}
        let queryObject = {}
        let compareQuery={}
        
        if (req.query.type) {
            queryObject["type"] = req.query.type;
        }
        if (req.query.brand) {
            queryObject["brand"] = req.query.brand;
        }
        if (req.query.tag) {
            queryObject["tag"] = req.query.tag;
        }
        if (req.query.color) {
            queryObject["color"] = req.query.color;
        }
        if(req.query.gt){
            compareQuery['$gt']=req.query.gt
        }
        if(req.query.lt){
            compareQuery['$lt']=req.query.lt
        }
        if(req.query.gt||req.query.lt){
            queryObject["price"]=compareQuery
        }
        
        switch (req.query.sort) {

            case '1': sortQuery = { price: 1 }
                break;
            case '2': sortQuery = { price: -1 }
                break;
            case '3': sortQuery = { name: 1 }
                break;
            case '4': sortQuery = { name: -1 }
                break;

        }
        console.log(queryObject)
        ProductDetail.find(queryObject)
            .sort(sortQuery)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, products) => {
                ProductDetail.find(queryObject).exec((err, count) => {
                    if (err) return next(err);
                    console.log('finding product has done')
                    Photo.find()
                        .exec((err, photos) => {
                            let quantityPage= Math.ceil(count.length / perPage)
                            quantityPage==0?quantityPage=1:quantityPage=quantityPage
                            console.log('finding Photos  has done')
                            res.render('pages/user/ShopPage/product-category.ejs', {
                                layout: false,
                                 products:products,
                                  photos: photos,
                                  pages: quantityPage,
                                  current: page,
                                  paramObject: req.query,
                                  perPage,
                                  count:count.length
                            })
                        })

                });
            })
    }

    loadFilterList() {
        let categoryObject = {}
        let manufacture = {}
        let tag = {}
        let color = {}
        ProductDetail.find()
            .exec((err, allProducts) => {
                allProducts.forEach(element => {
                    if (categoryObject.hasOwnProperty(element.type)) {
                        categoryObject[element.type] += 1
                    } else {
                        categoryObject[element.type] = 1
                    }

                    if (manufacture.hasOwnProperty(element.brand)) {
                        manufacture[element.brand] += 1
                    } else {
                        manufacture[element.brand] = 1
                    }

                    if (tag.hasOwnProperty(element.tag)) {
                        tag[element.tag] += 1
                    } else {
                        tag[element.tag] = 1
                    }

                    if (Array.isArray(element.color)) {
                        element.color.forEach(item => {
                            if (color.hasOwnProperty(item)) {
                                color[item] += 1
                            } else {
                                color[item] = 1
                            }
                        })
                    }
                })
                res.render('pages/user/ShopPage/filter.ejs', {
                    layout: false,
                    categoryObject,
                    manufacture,
                    color,
                    tag
                });

            })
    }
    

}

module.exports = new ShopCategoryController;