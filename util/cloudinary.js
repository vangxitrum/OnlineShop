require('dotenv').config()
var cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name:'dxe2ab3x2',
    api_key:'941326926822229',
    api_secret:'ykUhekN2FurBMzq_88WEkdimEKA',
    secure:true
})
module.exports=cloudinary;