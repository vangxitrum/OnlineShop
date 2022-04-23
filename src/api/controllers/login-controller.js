const { render } = require('node-sass')
const mongoose = require('mongoose');
const { redirect } = require('express/lib/response');
const User = require('../models/user');
const user = require('../models/user');
const JWT = require("jsonwebtoken")
const {JWT_CODE} = require('../config')
const ProductDetail = require('../models/productDetail')
const Photo = require('../models/photo')
const encodedToken = (userID) => {
    return JWT.sign({
        iss: "Chum",
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 0.042)
    }, JWT_CODE)
}

class LoginController{

    
    show(req,res,next){
        res.render('pages/user/AccountPage/login-page.ejs',{auth:false, pageIndex: -1,pageName: "loginPage"});
    }

    async secret(req,res,next){
      res.render('shared/alert.ejs',{auth:false, pageIndex: -1,pageName: "alertPage"});
       
    }

    async signIn(req,res,next){
        const token = encodedToken(req.user._id)
        res.cookie('token', token, {
          httpOnly: true,
          sameSite: true,
          signed: true,
          secure: true
        });
        return res.redirect('/');
    }

    async signUp(req,res,next){
        console.log("call sign up")
        const {username,password,email} = req.body
        const foundUser = await User.findOne({email})
        if (foundUser){
            return res.status(403).json({
                message: "Duplicate email"
            })
        }
        const newUser = new User({username,password,email})
        newUser.save();
        const token = encodedToken(newUser._id)
        res.setHeader('Authorization', "Bearer " + token)
        console.log("Authorization= Bearer + {$token}")
        
        return ProductDetail.find({})
        .then((products) => {
          Photo.find({})
            .then((photos) => {
              res.redirect();
              res.render('pages/user/index.ejs', {
                products, photos, auth: true, pageIndex: 0,pageName: "homePage"
              })
            });
        });
        return res.status(201).json({
            token: token
        })
    }

}

module.exports = new LoginController;