const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_LINK
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
 async function connectDB() {
    try {
        await mongoose.connect(url,connectionParams)
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error)
    }
}
module.exports={connectDB}
