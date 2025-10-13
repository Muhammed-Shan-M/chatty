import type { IMessage } from "../../types/message.type.ts";
import { io } from "../socket.ts";

export function emiteNotification(reciverSocketId: string, newMessage: IMessage, senderUserName: string) {
    io.to(reciverSocketId).emit('notifyUser', {
        messageId: newMessage._id,
        senderId: newMessage.senderId,
        timeStamp: newMessage.createdAt,
        senderUserName,
        preview: newMessage.preview
    })
}