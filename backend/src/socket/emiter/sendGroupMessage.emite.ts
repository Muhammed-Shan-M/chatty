
import type { PopulateSenderIdGM } from "../../types/PopulateuserIdGroupMessage.ts";
import { io } from "../socket.ts";


export function emiteNewGroupMessage(newMessage: PopulateSenderIdGM, roomId: string) {
    io.to(roomId).emit('newGroupMessage', {newMessage, groupId: newMessage.groupId })
}