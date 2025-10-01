import { Schema } from "mongoose";
import mongoose from "mongoose";
import type { IMessage } from "../types/message.type.ts";


const messageSchema = new mongoose.Schema<IMessage>(
    {
        senderId:{type: Schema.Types.ObjectId, ref: "User", required: true},
        reciverId:{type: Schema.Types.ObjectId, ref: "User", required: true},
        text: {type: String},
        image: {type: String},
        audio: {type: String},
        isRead: {type: Boolean, default:false}
    },
    {timestamps: true}
)

const Message = mongoose.model('Message', messageSchema)
export default Message