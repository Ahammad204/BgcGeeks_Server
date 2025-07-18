"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotification = exports.getNotifications = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const node_cron_1 = __importDefault(require("node-cron"));
// Get all notifications --- Only admin
exports.getNotifications = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const notifications = await notificationModel_1.default.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success: true,
            notifications,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
//Update notification status --- Only admin
exports.updateNotification = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const notification = await notificationModel_1.default.findById(req.params.id);
        if (!notification) {
            return next(new ErrorHandler_1.default("Notification not found", 404));
        }
        else {
            notification.status
                ? (notification.status = "read")
                : notification.status;
        }
        await notification.save();
        const notifications = await notificationModel_1.default.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success: true,
            notifications,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Delete notification --- Only admin
node_cron_1.default.schedule("0 0 0 * * *", async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notificationModel_1.default.deleteMany({
        status: "read",
        createdAt: { $lt: thirtyDaysAgo },
    });
    console.log("Deleted Read Notifications");
});
