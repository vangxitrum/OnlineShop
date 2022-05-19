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
            let loadedPagination= ProductDetail.find(queryObject)
                .sort(sortQuery)
                .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
                .limit(perPage)
                let  miniCartQuery={customerID:"undifineUser"}
                if(req.user){
                  miniCartQuery.customerID=req.user._id;
                }
            let countProduct= ProductDetail.find(queryObject)
            let loadedPhotos= Photo.find()
            Promise.all([loadedPagination,countProduct,loadedPhotos,Cart.find(miniCartQuery)])
            .then(result => {
                res.render('pages/user/ShopPage/shop-category.ejs', {
                                                products:result[0], // sản phẩm trên một page
                                                current: page,// page hiện tại
                                                perPage,
                                                pages: Math.ceil(result[1].length / perPage),// tổng số các page
                                                auth: req.auth,
                                                photos:result[2],
                                                pageIndex: 0,pageName: "shopPage",
                                                count:result[1].length,
                                                categoryObject,
                                                manufacture,
                                                tag,
                                                color,
                                                sort,
                                                paramObject: req.query,
                                                cartList:result[3]
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
                                  count:count.length,
                                  auth:req.auth
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