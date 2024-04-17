import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/orderModel";

// Create New Order

export const newOrder = CatchAsyncError(
  async (data: any,  res: Response) => {
    const order = await OrderModel.create(data);
    res.status(200).json({ success: true, message: "Order created successfully", order });
  }
);
