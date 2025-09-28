import type { Request } from "express";
import cloudinary from "../lib/cloudinary.ts";




export async function uploadToCloudinary(req: Request): Promise<string> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'chat-app/profile-image' },
            (error, result) => {
                if (error || !result)  reject(error)
                else resolve(result.secure_url)
            }
        )


        if (req.file && req.file.buffer) {
            stream.end(req.file.buffer)
        }
    })


}