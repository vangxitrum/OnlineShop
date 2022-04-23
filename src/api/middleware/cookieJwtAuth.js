const jwt = require('jsonwebtoken')
const {JWT_CODE} = require('../config')
const User = require('../models/user')

exports.cookieJwtAuth = async (req,res,next) => {
    const token = req.signedCookies.token;
    try{
        const payload = jwt.verify(token, JWT_CODE);
        const user = await User.findById(payload.sub)
        if (!user){
            return res.redirect('/login')
        }
        req.user = user;
        req.auth = true;
        next();
    }
    catch(err){
        res.clearCookie("token")
        req.auth = false;
        return res.redirect('/login')
    }
}
