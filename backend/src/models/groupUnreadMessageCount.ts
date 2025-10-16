import { Schema } from "mongoose";
import mongoose from "mongoose";
import type { UnreadCountSchema } from "../types/UnreadCount.ts";


const unreadCountSchema = new mongoose.Schema<UnreadCountSchema>(
    {
        userId: {type: Schema.ObjectId, ref: 'User', required: true},
        groupId: {type: Schema.ObjectId, ref: 'Group', required: true},
        unreadCount: {type: Number, required: true},
        lastReadMessageId: {type: Schema.ObjectId,ref:'GroupMessage', required: true}
    },{timestamps: true}
)

const UnreadCount = mongoose.model('UnreadCount', unreadCountSchema)
export default UnreadCount
