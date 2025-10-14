import { Server, Socket } from "socket.io";
import { createRoomId } from "../utility/createRoomId.utility.ts";
import { groupRooms, notificationFlag } from "../State/socketState.ts";

export const groupHandler = (io:Server, socket: Socket) => {
    socket.on('join-group', (groupId, userId) => {
        const roomId = createRoomId(groupId)
        if(!groupRooms.has(roomId)){
            groupRooms.set(roomId, new Set())
        }

        groupRooms.get(roomId)?.add(userId)

        socket.join(roomId)

        if(!notificationFlag.has(userId)){
            notificationFlag.set(userId, new Map())
        }

        notificationFlag.get(userId)?.set(roomId, false)

        console.log(`${userId} joined group ${roomId}`)
    })


    socket.on('leaveGroup', (groupId,userId) => {
        const roomId = createRoomId(groupId)

        groupRooms.get(roomId)?.delete(userId)
        socket.leave(roomId)

        console.log(`${userId} leave group ${roomId}`)
    })
}