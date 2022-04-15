const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Cart = new Schema(
    {
        _id:ObjectId,
        productID:{type:ObjectId,required: true},
        customerID:{type:ObjectId,required: true},
        quantity:{type:Number,required: true},
        productDt: {type:ObjectId,required: true},
        image:  {type:String,required: true},
        color:  String,
        size:  String,
        name:String,
        price:Number
        
    }
)
module.exports=mongoose.model('Cart',Cart,'cart')
