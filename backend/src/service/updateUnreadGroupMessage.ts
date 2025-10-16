import type { Types } from "mongoose";
import UnreadCount from "../models/groupUnreadMessageCount.ts";
import { emiteUnreadGroupMessage } from "../socket/emiter/emiteUnreadGroupMessage.ts";
import mongoose from "mongoose";
import { usersSocketMap } from "../socket/State/socketState.ts";
import type { PopulateSenderIdGM } from "../types/PopulateuserIdGroupMessage.ts";


export async function updateUnreadGroupMessage(groupId: Types.ObjectId, memberId: string, message: PopulateSenderIdGM) {
    try {
        const userId = new mongoose.Types.ObjectId(memberId)

        const unreadCount = await UnreadCount.findOneAndUpdate(
            { userId, groupId },
            {
                $inc: { unreadCount: 1 },
                $set: { lastReadMessageId: message._id }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        ).populate('lastReadMessageId')

        const userSocketId = usersSocketMap[memberId]

        if(unreadCount && userSocketId){
            emiteUnreadGroupMessage(unreadCount, userSocketId)
        }
    } catch (error) {

    }
}