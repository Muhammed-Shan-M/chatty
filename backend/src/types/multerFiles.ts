import type { Request } from "express";

export interface MulterMessageRequst extends Request {
    files : {
        image?: Express.Multer.File[],
        voice?: Express.Multer.File[]
    }
}