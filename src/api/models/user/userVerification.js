const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserVerification = new Schema(
    {
        userID: String,
        uniqueString: String,
        createdAt: Date,
        expiresAt: Date,
        verified: Boolean
    }
)



module.exports=mongoose.model('UserVerification',UserVerification,'UserVerification')
