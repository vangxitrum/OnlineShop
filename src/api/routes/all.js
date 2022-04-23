const express = require('express')
const router = express.Router()
const expressLayout = require('express-ejs-layouts')
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
const passport = require('passport')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
require('../middleware/passport')
router.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'layouts/user-layout');
    next();
});
//index router
router.get('/shopcategory/:page', expressLayout, ShopCategoryController.show)
router.get('/shopcategory', expressLayout, ShopCategoryController.show)
router.post('/shopcategory', expressLayout, ShopCategoryController.show)



router.get('/home', expressLayout, HomePageController.show)

router.get('/', expressLayout,expressLayout,cookieJwtAuth,HomePageController.show)

router.get('/productdetail',expressLayout, productDetailController.show)
router.post('/productdetail',expressLayout, productDetailController.addReview)
router.post('/cart',expressLayout,cartController.add)
router.get('/cart',expressLayout, cartController.show)

router.get('/blogdetail',expressLayout, blogDetail.show)

router.get('/blogcategory',expressLayout, blogCategory.show)

router.get('/about',expressLayout, aboutController.show)

router.get('/contact',expressLayout, contactController.show)

router.get('/userprofile',expressLayout,cookieJwtAuth, userProfileController.show)

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
