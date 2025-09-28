import jwt from "jsonwebtoken";
import type { Response } from "express";
import { Types } from "mongoose";


export function genarateJwt(userId: Types.ObjectId, res: Response) {
    try {

        const tocken = jwt.sign({userId}, process.env.JWT_SECRETKEY as string, {
            expiresIn: '7d'
        })


        res.cookie('jwt', tocken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== 'development'
        })

        return tocken
    } catch (error) {
        console.log(error)
    }
}