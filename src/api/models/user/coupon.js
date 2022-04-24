const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Coupon = new Schema(
    {
        _id:{type:ObjectId ,required: true},
        code:{type:String ,required: true},
        startday:{type:Date ,required: true},
        expire:{type:Date ,required: true},
        quantity:Number,
        percent:Number,
        value: Number,
    }
)
module.exports=mongoose.model('Coupon',Coupon,'coupon')