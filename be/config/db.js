import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
export const connectDB = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully")
  }
  catch(error){
    console.error("database connection failed", error);
    process.exit(1); // Exit the process with failure
  }
}