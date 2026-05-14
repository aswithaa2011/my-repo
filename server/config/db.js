import mongoose from "mongoose";


const connectDb=async()=>{


    try {
        console.log("Attempting to connect to MongoDB...");
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:");
        console.error(error.message);
        // Don't exit process, allow server to stay up for debugging
    }
}

export default connectDb;