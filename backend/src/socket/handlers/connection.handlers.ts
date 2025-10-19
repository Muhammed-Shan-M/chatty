import { Server, Socket } from "socket.io";
import { groupRooms, notificationFlag, usersSocketMap } from "../State/socketState.ts";

export const disconnect = (io: Server, socket: Socket) => {
    socket.on('disconnect', () => {
        console.log('a user disconnected : ', socket.id)

        const userId = socket.handshake.query.userId as string
        delete usersSocketMap[userId]
        notificationFlag.delete(userId)

        for(let [roomId,set] of groupRooms){
            if(set.has(userId)){
                socket.leave(roomId)
                set.delete(userId)
                const groupId = roomId.split('-')[1]
                io.emit('new-activeUser',groupId,-1)
            }
        }

        io.emit('getOnlineUsers', Object.keys(usersSocketMap))
    })
}