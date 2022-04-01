const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductQuantity = new Schema(
    {
        _id:{type:ObjectId,required: true},
        productDetailID:ObjectId,
        size:String,
        color:String,
        quantity:Number
    }
)
module.exports=mongoose.model('productQuantity',ProductQuantity,'product')