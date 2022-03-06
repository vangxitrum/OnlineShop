const express = require('express')
const router = express.Router()
const expressLayout = require('express-ejs-layouts')

//index router
router.get('/', expressLayout, (req, res)=>{
    res.render('pages/index.ejs', {auth: false})
})


module.exports = router
