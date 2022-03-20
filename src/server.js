// includes packages
const express = require('express')
//const passport = require('passport')
//const passportConfig = require('./api/passport-config.js')
//const methodOverride = require('method-override')
//const flash = require('express-flash')
//const session = require('express-session')
const app = express()
const path = require('path')
// includes routes /shop
const allRoute = require('./api/routes/all.js')
const authRoute = require('./api/routes/auth.js')
//const Users = require('./api/data').users
const port = 3000
const DB=require('./api/models/connnectDb')
/*passportConfig.init(
  passport, 
  email => Users.find(user=> user.email == email),
  id => Users.find(user => user.id = id)
)
app.use(flash())
app.use(session({
  secret: "REtVxemV2Q25",
  resave: false,
  saveUninitialized: false
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(passport.initialize())
app.use(passport.session())*/

//connect to database

 DB.connectDB()
// setting
app.set('view engine', 'ejs')
app.set('views', __dirname+ '/api/views')
app.set('layout', 'layouts/layout')

// utilities
// app.use(expressLayout)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname+ '/public'))

app.use('/', allRoute)
//app.use('/auth', authRoute(passport))
// routes
// listen
app.listen(port)
