const express = require('express')
const router = express.Router()
const expressLayout = require('express-ejs-layouts')
var flash      = require('req-flash');
const aboutController = require('../controllers/about-controller')
const blogCategory = require('../controllers/blog-category-controller')
const blogDetail = require('../controllers/blog-detail-controller')
const cartController = require('../controllers/cart-controller')
const contactController = require('../controllers/contact-controller')
const HomePageController = require('../controllers/home-page-controller')
const loginController = require('../controllers/login-controller')
const productDetailController = require('../controllers/product-detail-controller')
const ShopCategoryController = require('../controllers/shop-page-controller')
const userProfileController = require('../controllers/user-profile-controller')


//index router
router.get('/shopcategory/:page', expressLayout, ShopCategoryController.show)
router.get('/shopcategory', expressLayout, ShopCategoryController.show)
router.post('/shopcategory', expressLayout, ShopCategoryController.show)



router.get('/home', expressLayout, HomePageController.show)

router.get('/', expressLayout, HomePageController.show)

router.get('/productdetail',expressLayout, productDetailController.show)
router.post('/productdetail',expressLayout, productDetailController.addReview)
router.post('/cart',expressLayout,cartController.add)
router.get('/cart',expressLayout, cartController.show)

router.get('/blogdetail',expressLayout, blogDetail.show)

router.get('/blogcategory',expressLayout, blogCategory.show)

router.get('/about',expressLayout, aboutController.show)

router.get('/contact',expressLayout, contactController.show)

router.get('/login',expressLayout, loginController.show)

router.get('/userprofile',expressLayout, userProfileController.show)

module.exports = router
