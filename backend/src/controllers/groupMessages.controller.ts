import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError.errors.ts";
import { uploadToCloudinary } from "../utility/cloudinaryuploader.utility.ts";


export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {text} = req.body
        const file = req.file
        const groupId = req.params.groupId
        const senderId = req.user?._id

        if(!groupId || !senderId)throw new AppError("Invalid request. Both groupId and senderId must be provided.",400)

        if(!text || !file) throw new AppError("Please provide a message text or an image.", 400)

        let imageUrl
        if(file){
            imageUrl = await uploadToCloudinary(file,false)
        }




    } catch (error) {
        next(error)
    }
} 