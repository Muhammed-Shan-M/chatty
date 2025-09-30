import cloudinary from "../lib/cloudinary.ts";




export async function uploadToCloudinary(file: Express.Multer.File, isAudio: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: isAudio ? 'chat-app/audio-files' : 'chat-app/profile-image',
                resource_type: isAudio ? 'auto' : 'image',
            },
            (error, result) => {
                if (error || !result) reject(error)
                else resolve(result.secure_url)
            }
        )


        if (file && file.buffer) {
            stream.end(file.buffer)
        }
    })
}