const { render, renderSync } = require('node-sass')
const mongoose = require('mongoose');
const { redirect } = require('express/lib/response');
const User = require('../../models/user/user');
const JWT = require("jsonwebtoken")
const {JWT_CODE} = require('../../config')
const ProductDetail = require('../../models/user/productDetail')
const Photo = require('../../models/user/photo')
const UserVerification = require('../../models/user/userVerification')
const nodemailer = require('nodemailer')
const {v4: uuidv4} = require("uuid")

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD
  }
})

transporter.verify((error, success) =>{
  if (error){
    console.log(error)
  } else{
  }
})
const bcrypt = require('bcryptjs')
require("dotenv").config
const encodedToken = (userID) => {
    return JWT.sign({
        iss: "Chum",
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 0.042)
    }, JWT_CODE)
}

const sendVerificationEmail = ({_id,email},res) =>{
  const currentUrl = "http://localhost:3000/"
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Verify your email address to complete the sign in process then you can log in your account.</p><p>This link expires in 6 hours.</p><p>Press <a href = ${currentUrl+ "verify/"+ _id + "/" + uniqueString}> here</a> to proceed.`
    //
  }
  const salt = 10;
  bcrypt
    .hash(uniqueString,salt)
    .then((hashedString) =>{
      const newUserVerification = new UserVerification({
        userID: _id,
        uniqueString: hashedString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000
      })

      newUserVerification
        .save()
        .then(
          transporter
            .sendMail(mailOptions)
            .then(()=>{
              console.log("Pending")
            })

        )
    })
}


 

class LoginController{

    
    show(req,res,next){
      var type;
      
      if (req.flash("messageFailure").length > 0){
        console.log(req.flash("messageFailure").length);
        type = 0;
      }
      else{
        type = 1;
      }
      res.render('pages/user/AccountPage/login-page.ejs',{auth:false, pageIndex: -1,pageName: "loginPage", type: type});
    }

    async secret(req,res,next){
      res.render('shared/alert.ejs',{auth:false, pageIndex: -1,pageName: "alertPage"});
    }

    async signIn(req,res,next){
      console.log(req.flash('messageSuccess'));
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

        const {username,password,email} = req.body
        const foundUser = await User.findOne({email})
        if (foundUser){
            return res.status(403).json({
                message: "Duplicate email"
            })
        }
        const newUser = new User({username,password,email})
        newUser
        .save()
        .then((result)=>{
          sendVerificationEmail(result,res);
          res.render('pages/user/AccountPage/login-page.ejs',{auth:false, pageIndex: -1,pageName: "loginPage", type: 3});
        }
        ).catch(() =>{
          res.render('pages/user/AccountPage/login-page.ejs',{auth:false, pageIndex: -1,pageName: "loginPage", type: 0});
        })
        
    }

    async LogOut(req,res,next){
      res.clearCookie("token");
      res.redirect('back');
    }


    verify(req,res,next){
      let {userID,uniqueString} = req.params;
      
      UserVerification
        .find({userID})
        .then((result) =>{
          if (result.length > 0){
            const {expiresAt} = result[0]
            const hashedString = result[0].uniqueString
            
            if (expiresAt < Date.now()){
             
                UserVerification
                  .deleteOne({userID})
                  .then((result) =>{
                    User
                      .deleteOne({userID})
                      .then(()=>{
                        res.render('pages/user/AccountPage/verify.ejs', {
                          pageIndex: -1,pageName: "homePage", verify: false
                        })
                      })
                      .catch((er) =>{
                        res.render('pages/user/AccountPage/verify.ejs', {
                          pageIndex: -1,pageName: "homePage", verify: false
                        })
                      })
                  })
                  .catch((er) =>{
                    res.render('pages/user/AccountPage/verify.ejs', {
                      pageIndex: -1,pageName: "homePage", verify: false
                    })
                  })
            }
            else{
              bcrypt
              .compare(uniqueString,hashedString)
              .then((result) => {
                if (result){
                  
                  User.updateOne({_id:userID},{verified:true})
                  .then(()=>{
                    console.log(userID)
                    UserVerification
                      .deleteOne({userID})
                      .then(()=>{
                        
                        res.render('pages/user/AccountPage/verify.ejs', {
                          pageIndex: -1,pageName: "homePage", verify: true
                        })
                      })
                      .catch((er)=>{
                        
                        res.render('pages/user/AccountPage/verify.ejs', {
                          pageIndex: -1,pageName: "homePage", verify: false
                        })
                      })
                  })
                  .catch((er)=>{
                    res.render('pages/user/AccountPage/verify.ejs', {
                      pageIndex: -1,pageName: "homePage", verify: false
                    })
                  })
                } else{
                  res.render('pages/user/AccountPage/verify.ejs', {
                    pageIndex: -1,pageName: "homePage", verify: false
                  })
                }
              })
              .catch((er)=>{
                res.render('pages/user/AccountPage/verify.ejs', {
                  pageIndex: -1,pageName: "homePage", verify: false
                })
              })
            }
          }else{
            res.render('pages/user/AccountPage/verify.ejs', {
              pageIndex: -1,pageName: "homePage", verify: false
            })
          }
        })
        .catch((error) =>{
          res.render('pages/user/AccountPage/verify.ejs', {
            pageIndex: -1,pageName: "homePage", verify: false
          })
        })
      
    }
  }

module.exports = new LoginController;