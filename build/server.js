"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const socketServer_1 = require("./socketServer");
const db_1 = __importDefault(require("./utils/db"));
require("dotenv").config();
const cloudinary_1 = require("cloudinary");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app_1.app);
//CloudInary config
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});
(0, socketServer_1.initSocketServer)(server);
// Create Server
server.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
    (0, db_1.default)();
});
