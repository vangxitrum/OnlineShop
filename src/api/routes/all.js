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
const orderController = require('../controllers/user/order-controller')

const loginController = require('../controllers/user/login-controller')
const productDetailController = require('../controllers/user/product-detail-controller')
const ShopCategoryController = require('../controllers/user/shop-page-controller')
const userProfileController = require('../controllers/user/user-profile-controller')
const passport = require('passport')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const { cookieJwtAuthWithoutRedirect } = require('../middleware/cookieJwtAuthWithoutRedirect')
const searchController = require('../controllers/user/search-controller')
const orderDetailController = require('../controllers/user/order-detail-controller')
const zalopaymentController = require('../controllers/user/zalo-payment')


require('../middleware/passport')
router.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'layouts/user-layout');
    req.app.use(express.static(path.join(__dirname, 'public')))
    req.app.use('/public', express.static(__dirname+ '/public'))
    next();
});
//index router

router.post('/zalopayemt',expressLayout,cookieJwtAuth,zalopaymentController.payment )

router.get('/shopcategory/:page', expressLayout,cookieJwtAuthWithoutRedirect, ShopCategoryController.show)
router.get('/shopcategory', expressLayout,cookieJwtAuthWithoutRedirect, ShopCategoryController.show)
router.post('/shopcategory/:page', expressLayout,cookieJwtAuthWithoutRedirect, ShopCategoryController.showPagination)
router.post('/shopcategory', expressLayout,cookieJwtAuthWithoutRedirect, ShopCategoryController.showPagination)

router.post('/search', expressLayout, searchController.showSuggestion)

router.get('/home', expressLayout,cookieJwtAuthWithoutRedirect, HomePageController.show)

router.get('/', expressLayout,expressLayout,cookieJwtAuthWithoutRedirect,HomePageController.show)

router.get('/productdetail',expressLayout,cookieJwtAuthWithoutRedirect, productDetailController.show)
router.post('/productdetail',expressLayout,cookieJwtAuthWithoutRedirect, productDetailController.addReview)

router.post('/cart/:code',expressLayout,cookieJwtAuth,cartController.checkCoupon)
router.post('/cart',expressLayout,cookieJwtAuth,cartController.add)
router.get('/cart',expressLayout,cookieJwtAuth, cartController.show)
router.put('/cart',expressLayout,cookieJwtAuth, cartController.update)
router.delete('/cart',expressLayout,cookieJwtAuth, cartController.delete)

router.post('/order',expressLayout,cookieJwtAuth,orderController.show)
router.put('/order',expressLayout,cookieJwtAuth,orderController.add)

router.get('/blogdetail',expressLayout,cookieJwtAuthWithoutRedirect, blogDetail.show)

router.get('/blogcategory',expressLayout,cookieJwtAuthWithoutRedirect, blogCategory.show)

router.get('/about',expressLayout,cookieJwtAuthWithoutRedirect, aboutController.show)
        
router.get('/contact',expressLayout,cookieJwtAuthWithoutRedirect, contactController.show)

router.get('/userprofile',expressLayout,cookieJwtAuth, userProfileController.show)
router.get('/userprofile/order-detail',expressLayout,cookieJwtAuth, orderDetailController.show)
router.post('/userprofile/wishlist',expressLayout,cookieJwtAuth, userProfileController.showWishLish)
router.post('/userprofile',expressLayout,cookieJwtAuth, userProfileController.updateProfile)
router.delete('/userprofile/wishlist',expressLayout,cookieJwtAuth, userProfileController.deleteWishItem)
router.put('/userprofile/password',expressLayout,cookieJwtAuth, userProfileController.changePassword)


router.get('/login',expressLayout, loginController.show)
router.get('/logout',expressLayout, loginController.LogOut);
router.post('/login',expressLayout,passport.authenticate('local',{failureRedirect: '/login',failureFlash: {
    type: 'messageFailure',
    message: 'Invalid email and/ or password.'
  },
  successFlash: {
    type: 'messageSuccess',
    message: 'Successfully logged in.'
  }}), loginController.signIn)

router.post('/register',expressLayout, loginController.signUp)

router.get('/secret',expressLayout,loginController.secret)

router.get('/verify/:userID/:uniqueString',expressLayout,loginController.verify)

router.get('/policy&term',expressLayout,(req,res,next) =>{
    res.render('pages/user/InfoPage/policy-page.ejs',{auth:false, pageIndex: 0,pageName: "policyPage"});
})
router.get('/return-policy',expressLayout,(req,res,next) =>{
  
    res.render('pages/user/InfoPage/return-policy-page.ejs',{auth:false, pageIndex: 0,pageName: "policyPage"});
})
//router.get('/secret',expressLayout,passport.authenticate('jwt',{session: false}),loginController.secret)
module.exports = router
