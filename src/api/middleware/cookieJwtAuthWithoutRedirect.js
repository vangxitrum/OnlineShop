const jwt = require('jsonwebtoken')
const {JWT_CODE} = require('../config')
const User = require('../models/user/user')
const loginController = require('../controllers/user/login-controller')
exports.cookieJwtAuthWithoutRedirect = async (req,res,next) => {
    const token = req.signedCookies.token;
    if (!token){
        req.user = null;
        req.auth = false;
        next();
    }
    else{
        try{
            const payload = jwt.verify(token, JWT_CODE);
            const user = await User.findById(payload.sub)
            if (!user){
                return loginController.show;
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
    
}
