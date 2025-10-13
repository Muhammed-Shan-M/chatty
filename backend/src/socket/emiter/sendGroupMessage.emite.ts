
import type { IGroupMessages } from "../../types/GroupMessage.type.ts";
import { io } from "../socket.ts";


export function emiteNewGroupMessage(newMessage: IGroupMessages, roomId: string) {
    io.to(roomId).emit('newGroupMessage', { roomId, newMessage })
}