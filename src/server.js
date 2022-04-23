// includes packages
const express = require('express')
const logger = require('morgan')
require('dotenv').config()
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// includes routes /shop
app.use(express.json())
const allRoute = require('./api/routes/all.js')
const adminRoute = require('./api/routes/adminRoute')
const DB=require('./api/models/connnectDb')
//middleware
//app.use(logger('dev'))
app.use(cookieParser("secret"));
//database conect
 DB.connectDB()
// setting
app.set('view engine', 'ejs')
app.set('views', __dirname+ '/api/views')
app.set('layout', 'layouts/user-layout')

// utilities
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname+ '/public'))

app.use('/', allRoute)
app.use('/admin', adminRoute)
app.use(express.urlencoded());
// routes
//Catch 404
app.use((req,res,next) => {
 const err = new Error('Not Found')
 err.status = 404
 next(err)
})

// error handler

app.use((err,req,res,next) =>{
  const error =  app.get('env') === 'development' ? err : {}
  const status = err.status || 500
  return res.status(status).json({
    message: error.message
  })
})


// listen
const port = app.get('port') || 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
