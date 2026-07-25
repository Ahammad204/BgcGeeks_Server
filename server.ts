import { app } from "./app";
import { initSocketServer } from "./socketServer";
import connectDB from "./utils/db";
require("dotenv").config();
import {v2 as cloudinary} from "cloudinary";
import http from "http";
const server = http.createServer(app);


//CloudInary config
cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY

});

initSocketServer(server);


// Connect to DB first, then start server
const startServer = () => {
    connectDB()
        .then(() => {
            server.listen(process.env.PORT, () => {
                console.log(`Server is connected with port ${process.env.PORT}`);
            });
        })
        .catch((err) => {
            console.log("Failed to connect to DB. Retrying in 5 seconds...");
            setTimeout(startServer, 5000);
        });
};

startServer();


