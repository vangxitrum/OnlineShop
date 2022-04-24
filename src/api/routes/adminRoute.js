const express = require('express')
const router = express.Router()
const expressLayout = require('express-ejs-layouts')
const path = require('path');
const DashboardPageController = require('../controllers/admin/dashboard-page-controller');
router.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'layouts/admin-layout');
    next();
});


router.get('/login',expressLayout ,(req,res,next) => {
    res.render('pages/admin/login-page.ejs', {
        pageIndex: 0,pageName: "adminLoginPage"
      })
})

router.get('/dashboard',expressLayout, DashboardPageController.show);

module.exports = router