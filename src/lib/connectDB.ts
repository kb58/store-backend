import mongoose from "mongoose"
import { configDotenv } from "dotenv";

configDotenv();

const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb is connected")
    }catch(err){
        console.log(err);
    }
}

export default connectDB;