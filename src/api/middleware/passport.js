const passport = require('passport')
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo')
const LocalStrategy = require('passport-local').Strategy
const {ExtractJwt} = require('passport-jwt')
const {JWT_CODE} = require('../config')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const res = require('express/lib/response')
//passport jwt

passport.use(new JwtCookieComboStrategy({
    secretOrPublicKey: JWT_CODE
}, async (payload,done)=>{
    try{
        const user = await User.findById(payload.sub)
        if (!user){
            return done(null,false)
        }
        done(null,user)
    }
    catch(error){
        done(error,false)
    }
}))

//passport local

passport.use(new LocalStrategy({
    usernameField: 'username'
}, async (username,password,done) => {
    try{
        const user = await User.findOne({ username })
        if (!user){
            return done(null,false)
        }
        const isCorrectPassword = user.isValidPassword(password)
        if (!isCorrectPassword) return done(null,false)
        done(null, user)
    }
    catch(error){
        done(error,false)
    }
}))


