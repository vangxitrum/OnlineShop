const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Review = new Schema(
    {
        _id:ObjectId,
        date:Date,
        name:String,
        email:String,
        review:String,
        rate:Number,
        productDetailID:ObjectId

    }
)
module.exports=mongoose.model('review',Review,'review')
