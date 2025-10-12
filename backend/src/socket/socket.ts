import { Server } from "socket.io";
import http from 'http'
import express from 'express'
import { registerSocketEvent } from "./socketEvent.ts";


const app = express()
const server = http.createServer(app)

const FRONTEND_URL = process.env.FRONTEND_URL as string

const io = initSocket()

function initSocket() {
    const io = new Server(server, {
        cors: {
            origin: [FRONTEND_URL]
        }
    })

    registerSocketEvent(io)
    console.log('socket connected')

    return io
}


export { io, server, app }