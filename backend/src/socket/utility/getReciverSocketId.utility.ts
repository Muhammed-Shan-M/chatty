import { usersSocketMap } from "../State/socketState.ts";

export function getReciverSocketId(reciverId: string) {
    return usersSocketMap[reciverId]
}