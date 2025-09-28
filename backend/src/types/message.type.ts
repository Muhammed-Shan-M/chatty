import type { Types, Document } from "mongoose";

export interface Message {
    senderId: Types.ObjectId
    reciverId: Types.ObjectId
    text?: string,
    image?:string
} 


export interface IMessage extends Message,Document{
    _id: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}