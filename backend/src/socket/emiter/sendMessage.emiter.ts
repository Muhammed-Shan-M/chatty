import type { IMessage } from "../../types/message.type.ts";
import { io } from "../socket.ts";


export function emiteNewMessage(reciverSocketId: string, newMessage: IMessage) {
    io.to(reciverSocketId).emit('newMessages', newMessage)
}