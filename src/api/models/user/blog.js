const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Blog = new Schema(
    {
        _id:ObjectId,
        date:{type:Date, required:true},
        tags:{type:Array,required: true},
        content:{type:String, required:true},
        author:{type:Object, required:true},
        type:{type:String, required:true},
        image:{type:String, required:true},
        title:{type:String, required:true},
    }
)
module.exports=mongoose.model('Blog',Blog,'blog')
