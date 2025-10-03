import type { Types, Document } from "mongoose"


export interface GroupMessagesAttachment {
    url: string,
    fileType: string
} 

export interface GroupMessage {
    groupId: Types.ObjectId
    senderId:Types.ObjectId
    text: string
    attachment: GroupMessagesAttachment[],
    type: string
}

export interface IGroupMessages extends GroupMessage,Document {
    _id: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}