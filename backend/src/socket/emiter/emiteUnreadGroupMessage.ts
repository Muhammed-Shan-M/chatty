import type { UnreadCount } from "../../types/UnreadCount.ts";
import { io } from "../socket.ts";


export function emiteUnreadGroupMessage(unreadMessage: UnreadCount, userSocketId: string) {
    io.to(userSocketId).emit('Group:updateUnreadMessage', unreadMessage)
}