import { AppError } from "./appError.errors.ts"
import type { Response } from "express"

export function sendError(error: unknown, res:Response) {

     if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message })
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
}