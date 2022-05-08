const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcryptjs');
const timespan = require('jsonwebtoken/lib/timespan');
const User = new Schema(
    {
        _ID:{
            type: ObjectId
        }
        ,
        name:{
           type: String,
           default: null
        },
        birthday:{
            type:Date,
            default: null
        },
        gender:{
            type:Boolean,
            default: null
        },
        email:{
            type:String,
            unique: true,
        },
        username:{
            type:String,
        },
        password:{
            type:String,
            required: true,
        },
        address:{
            type:String,
            default: null
        },

    }
)

User.pre('save',async function(next){
    
    try
    {
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(this.password,salt)
        this.password = passwordHashed
        next()
    } catch(error)
    {
        next(error)
    }
})


User.methods.isValidPassword = async function(newPassword){
    try{
        return await bcrypt.compare(newPassword,this.password)
    }
    catch(error){
        throw new Error(error)
    }
}
module.exports=mongoose.model('user',User,'user')
