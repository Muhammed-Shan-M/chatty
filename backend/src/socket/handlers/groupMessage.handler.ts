import type { Server, Socket } from "socket.io";
import { createRoomId } from "../utility/createRoomId.utility.ts";
import { groupRooms, notificationFlag, usersSocketMap } from "../State/socketState.ts";


export const groupMessageHandler = (io: Server, socket:Socket ) => {
    socket.on('send-group-message', async ({groupId, message, groupMembers}) => {
        const roomId = createRoomId(groupId)
        io.to(roomId).emit('newGroupMessage', {roomId, message})

        const userId = socket.handshake.query.userId as string

        groupMembers.forEach((memberId: string) => {
            if(memberId === userId)return 

            const isRoom = groupRooms.get(roomId)?.has(memberId)
            const isOnline = usersSocketMap[memberId]

            if(isOnline && !isRoom){
                const flags = notificationFlag.get(memberId) || new Map()
                
                if(!flags.get(roomId)){
                    io.to(memberId).emit('groupNotification', {roomId, message})
                    flags.set(roomId, true)
                    notificationFlag.set(memberId, flags)
                }
            }
        });
    })
}