const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema(
    {
        _id:{type:ObjectId},
        code:{type:String ,required: false},
        startday:{type:Date ,required: true},
        price:{type:Number ,required: true},
        items:{type:Array,required:true},
        address:{type:Object,required: true},
        paymethot:{type:Object,required: true},
        status:Object        
    }
)
module.exports=mongoose.model('order',Order,'order')