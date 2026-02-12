// mongodb+srv://Mohanraj:UNIQUE25@ecom.1sgopex.mongodb.net/

import mongoose from 'mongoose';

const connectDB = async () => {
    try{
      const connect = await mongoose.connect('mongodb+srv://Mohanraj:UNIQUE25@ecom.1sgopex.mongodb.net/ecom')
     
      console.log("MongoDB connected successfully");
    }catch(error){
       console.log(`Error: ${error.message}`);
       process.exit(1);
    }
}

export default connectDB;