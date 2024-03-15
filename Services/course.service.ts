import { NextFunction,Request,Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";


//Create Course
export const createCourse = CatchAsyncError(async(data:any,res:Response)=>{

    const Course = await CourseModel.create(data);
    res.status(201).json({

        success:true,
        Course

    })

})