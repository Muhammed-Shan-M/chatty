import type { Server } from "socket.io"
import { disconnect } from "./handlers/connection.handlers.ts"
import { usersSocketMap } from "./State/socketState.ts"
import { groupHandler } from "./handlers/group.handler.ts"

export const registerSocketEvent = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id)

        const userId = socket.handshake.query.userId as string
        if (userId) usersSocketMap[userId] = socket.id

        io.emit('getOnlineUsers', Object.keys(usersSocketMap))


        disconnect(io,socket)
        groupHandler(io, socket)
    })
} 