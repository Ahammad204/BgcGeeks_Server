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
        console.log("MongoDB connection failed:", error.message);
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. Attempting to reconnect...");
    connectDB().catch((err) => console.log("Reconnect failed:", err.message));
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error:", err.message);
});

export default connectDB;
