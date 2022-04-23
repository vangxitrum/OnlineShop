// includes packages
const express = require('express')
const logger = require('morgan')
require('dotenv').config()
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
const {cloudinary}= require('../util/cloudinary')
app.use( bodyParser.json());   // to support JSON-encoded bodies   
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//database connect
const DB=require('./api/models/connnectDb')
DB.connectDB()
// includes routes /shop
const allRoute = require('./api/routes/all.js')
//const Users = require('./api/data').users
app.use(express.json())
//middleware
app.use(logger('dev'))



// setting
app.set('view engine', 'ejs')
app.set('views', __dirname+ '/api/views')
app.set('layout', 'layouts/layout')

// utilities
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname+ '/public'))

app.use('/', allRoute)
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
  console.log(`Server is lisntening on port ${port}`)
})
