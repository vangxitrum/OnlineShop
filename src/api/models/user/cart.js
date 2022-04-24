const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Cart = new Schema(
    {
        _id:ObjectId,
        productID:{type:ObjectId,required: true},
        customerID:{type:ObjectId,required: true},
        quatity:{type:Number,required: true}
        
    }
)
module.exports=mongoose.model('Cart',Cart,'cart')
