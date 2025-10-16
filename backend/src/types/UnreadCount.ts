import type { Types, Document } from "mongoose"

export interface UnreadCount {
    userId: Types.ObjectId,
    groupId: Types.ObjectId,
    unreadCount: Number,
    lastReadMessageId: Types.ObjectId,
}


export interface UnreadCountSchema extends UnreadCount, Document {
    _id: Types.ObjectId
    createdAt:Date
    updatedAt:Date
}