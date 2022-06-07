const { render } = require('node-sass')
const Cart = require('../../models/user/cart')
const nodemailer = require('nodemailer')
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

class ContactController{
    show(req,res,next){
        let miniCartQuery = { customerID: "undifineUser" }
        if (req.user) {
            miniCartQuery.customerID = req.user._id;
        }
        Cart.find(miniCartQuery).then(result=>{
            res.render('pages/user/InfoPage/contact-page.ejs',{auth:req.auth, pageIndex: 0,pageName: "contactPage",cartList:result});



        })
    }

    sendMail(req,res,next){
        //res.send(req.body);
        const mailOptions = {
            from: req.body.email,
            to: process.env.AUTH_EMAIL,
            subject:"User: " + req.body.name + " with email: " + req.body.email + " send mail with subject: " + req.body.subject,
            html: req.body.message
            //
          }
        transporter.sendMail(mailOptions)
        .then(()=>{
            res.redirect('back')
        })
    }

}

module.exports = new ContactController;