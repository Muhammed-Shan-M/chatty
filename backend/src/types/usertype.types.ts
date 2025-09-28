import type { Types, Document } from "mongoose";


export interface User {
    fullName: string,
    userName: string,
    email: string,
    password: string
    profile: string
}

export interface IUser extends User, Document {
    _id: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}