import { Server } from "socket.io";
import http from 'http'
import express from 'express'


const app = express()
const server = http.createServer(app)

const FRONTEND_URL = process.env.FRONTEND_URL as string
console.log('url',FRONTEND_URL )

const io = new Server(server, {
    cors:{
        origin: [FRONTEND_URL]
    }
})


export function getReciverSocketId(reciverId: string) {
    return usersSocketMap[reciverId]
}

const usersSocketMap:Record<string,string> = {}



io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    const userId = socket.handshake.query.userId as string
    if(userId) usersSocketMap[userId] = socket.id

    io.emit('getOnlineUsers',Object.keys(usersSocketMap))

    socket.on('disconnect', () => {
        console.log('a user disconnected : ', socket.id)
        delete usersSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(usersSocketMap))
    })
})


export {io, server, app}