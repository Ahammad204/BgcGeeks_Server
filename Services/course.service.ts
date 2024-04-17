import { NextFunction, Request, Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";

//Create Course
export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const Course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      Course,
    });
  }
);

//Get All Courses
export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    courses,
  });
};
