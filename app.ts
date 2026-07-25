require("dotenv").config();

import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { ErrorMiddleware } from "./middleware/error";
import UserRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import rateLimit from "express-rate-limit";

//Body Parser
app.use(express.json({ limit: "50mb" }));

//Cookie Parser
app.use(cookieParser());


app.use(
  cors({
    origin: process.env.CLIENT_URL || ['http://localhost:3000'],
    credentials: true,
  })
);

//Connection guard - ensure MongoDB is alive before processing requests
app.use(async (req: Request, res: Response, next: NextFunction) => {
    const state = mongoose.connection.readyState;
    // 0=disconnected, 2=connecting, 3=disconnecting
    if (state !== 1) {
        try {
            await mongoose.connect(process.env.DB_URL || '', {
                serverSelectionTimeoutMS: 5000,
            });
            console.log("MongoDB reconnected successfully");
        } catch (err) {
            console.log("MongoDB reconnection failed:", err);
        }
    }
    next();
});

//API Request limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

//Routes
app.use(
  "/api/v1",
  UserRouter,
  orderRouter,
  courseRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);

//Testing Api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working",
  });
});

//Unknown Route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

//middleware call
app.use(limiter);
app.use(ErrorMiddleware);
