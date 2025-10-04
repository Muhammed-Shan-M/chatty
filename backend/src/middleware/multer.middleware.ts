import multer from "multer";

const storage = multer.memoryStorage()

const upload = multer({storage})

export const uploadVoiceImage = upload.fields([
    {name: 'voice', maxCount: 1},
    {name: 'image' , maxCount: 1}
])

export default upload