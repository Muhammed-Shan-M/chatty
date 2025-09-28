import type { Request,Response,NextFunction } from "express"
import { AppError } from "../errors/appError.errors.ts"
import  Jwt  from "jsonwebtoken"
import User from "../models/user.model.ts"
import { Types } from "mongoose"



export const protectedRoute = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt

        if(!token)throw new AppError('Unauthorized: No token provided.',401)

        const decoded = Jwt.verify(token, process.env.JWT_SECRETKEY as string) as {userId:Types.ObjectId}

        if(!decoded)throw new AppError('Unauthorized: Invalid Token', 401)

        const user = await User.findById(decoded.userId).select('-password')

        if(!user)throw new AppError('User not found.', 404)
        
        req.user = user

        next()
    } catch (error) {
        next(error)
    }
}