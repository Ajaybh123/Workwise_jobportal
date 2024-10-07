import mongoose from "mongoose";

async function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    console.log("Database is connected succesfully");
}


export default connectDB;