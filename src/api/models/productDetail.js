const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductDetail = new Schema(
    {
        _id:{type:ObjectId,required: true},
        name:String,
        price: Number,
        descript: String,
        type: String,
        brand:String,
        discount:Number,
        status:Array,
        moreinfo:String,
        tag:String
    }
)
module.exports=mongoose.model('productdetail',ProductDetail,'productdetail')
