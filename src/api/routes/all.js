const express = require('express')
const router = express.Router()
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const aboutController = require('../controllers/user/about-controller')
const blogCategory = require('../controllers/user/blog-category-controller')
const blogDetail = require('../controllers/user/blog-detail-controller')
const cartController = require('../controllers/user/cart-controller')
const contactController = require('../controllers/user/contact-controller')
const HomePageController = require('../controllers/user/home-page-controller')
const loginController = require('../controllers/user/login-controller')
const productDetailController = require('../controllers/user/product-detail-controller')
const ShopCategoryController = require('../controllers/user/shop-page-controller')
const userProfileController = require('../controllers/user/user-profile-controller')
const passport = require('passport')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const searchController = require('../controllers/user/search-controller')
require('../middleware/passport')
router.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'layouts/user-layout');
    req.app.use(express.static(path.join(__dirname, 'public')))
    req.app.use('/public', express.static(__dirname+ '/public'))
    next();
});
//index router
router.get('/shopcategory/:page', expressLayout, ShopCategoryController.show)
router.get('/shopcategory', expressLayout, ShopCategoryController.show)
router.post('/shopcategory/:page', expressLayout, ShopCategoryController.showPagination)
router.post('/shopcategory', expressLayout, ShopCategoryController.showPagination)

router.post('/search/:keyword', expressLayout, searchController.showSuggestion)

router.get('/home', expressLayout, HomePageController.show)

router.get('/', expressLayout,expressLayout,cookieJwtAuth,HomePageController.show)

router.get('/productdetail',expressLayout, productDetailController.show)
router.post('/productdetail',expressLayout, productDetailController.addReview)

router.post('/cart/:code',expressLayout,cartController.checkCoupon)
router.post('/cart',expressLayout,cartController.add)
router.get('/cart',expressLayout, cartController.show)
router.put('/cart',expressLayout, cartController.update)

router.get('/blogdetail',expressLayout, blogDetail.show)

router.get('/blogcategory',expressLayout, blogCategory.show)

router.get('/about',expressLayout, aboutController.show)

router.get('/contact',expressLayout, contactController.show)

router.get('/userprofile',expressLayout,cookieJwtAuth, userProfileController.show)
router.post('/userprofile',expressLayout,cookieJwtAuth, userProfileController.updateProfile)


router.get('/login',expressLayout, loginController.show)

router.post('/login',expressLayout,passport.authenticate('local',{session: false}), loginController.signIn)

router.post('/register',expressLayout, loginController.signUp)

router.get('/secret',expressLayout,loginController.secret)

router.get('/policy&term',expressLayout,(req,res,next) =>{
    res.render('pages/user/InfoPage/policy-page.ejs',{auth:false, pageIndex: 0,pageName: "policyPage"});
})
router.get('/return-policy',expressLayout,(req,res,next) =>{
    res.render('pages/user/InfoPage/return-policy-page.ejs',{auth:false, pageIndex: 0,pageName: "policyPage"});
})
//router.get('/secret',expressLayout,passport.authenticate('jwt',{session: false}),loginController.secret)
module.exports = router
