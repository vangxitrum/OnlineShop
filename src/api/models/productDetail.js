const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductDetail = new Schema(
    {
        _id:ObjectId,
        name:String,
        price: Number,
        descript: String,
        type: String,
        brand:String,
        discount:Number,
        status:Array,
        moreinfo:String,
        image:String,
    }
)
module.exports=mongoose.model('productdetail',ProductDetail,'productdetail')
