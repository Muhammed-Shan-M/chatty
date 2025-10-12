import { Server, Socket } from "socket.io";
import { usersSocketMap } from "../State/socketState.ts";

export const disconnect = (io: Server, socket: Socket) => {
    socket.on('disconnect', () => {
        console.log('a user disconnected : ', socket.id)

        const userId = socket.handshake.query.userId as string
        delete usersSocketMap[userId]

        io.emit('getOnlineUsers', Object.keys(usersSocketMap))
    })
}