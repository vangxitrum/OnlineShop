const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Photo = new Schema(
    {
        _id:ObjectId,
        path:String,
        color:String,
        productDetailID:ObjectId
        
    }
)
module.exports=mongoose.model('photo',Photo,'photo')
