import mongoose from 'mongoose'
const MONGO_URI = process.env.MONGO_URI!
export async function connectdb(){
    if (!MONGO_URI){
        console.log("Key not available")
        return
    }

    if (mongoose.connection.readyState >=1 ){
        console.log("already connected")
        return
    }

    await mongoose.connect(MONGO_URI)
    console.log("Connected")
}