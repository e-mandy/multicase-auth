import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../../domain/exceptions/AppError.ts";
import { ZodError } from "zod";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.status).json({
            message: err.message
        })
    }

    if(err instanceof ZodError){
        return res.status(400).json({
            message: err.message,
            errors: err.issues
        })
    }

    console.log("SERVER ERROR: ", err.message);
    return res.status(500).json({
        message: "Internal server error"
    })
}