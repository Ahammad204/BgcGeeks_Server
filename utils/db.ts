import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000,
            heartbeatFrequencyMS: 10000,
        });
        console.log(`Database Connected With ${mongoose.connection.host}`);
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
};

// Handle connection events for Render free tier (sleep/wake)
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Attempting to reconnect...");
    connectDB();
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error:", err.message);
});

export default connectDB;
