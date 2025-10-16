import mongoose from "mongoose";
import { Schema } from "mongoose";
import type { IGroupMessages } from "../types/GroupMessage.type.ts";


const groupMessageSchema = new mongoose.Schema<IGroupMessages>(
    {
        groupId:{type: Schema.ObjectId,ref: 'Group', require: true },
        senderId: {type: Schema.ObjectId,ref: 'User', require: true },
        text:{type: String},
        attachments: [
            {
                url: {type: String,require: true},
                fileType: {type: String,enum:['image','voice'] ,require: true}
            }
        ],
        type: {type: String, enum: ['text', 'image', 'voice', 'mixed']},
        preview: {type: String, required: true}
    },{timestamps: true}
)


const GroupMessages = mongoose.model('GroupMessage', groupMessageSchema)
export default GroupMessages