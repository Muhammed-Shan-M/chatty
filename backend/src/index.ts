import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouts from './routes/auth.route.ts'
import messageRoute from './routes/message.route.ts'
import groupRoute from './routes/group.route.ts'
import groupMessageRoute from './routes/groupMessage.route.ts'
import { connectDB } from './lib/db.ts'
import { errorHandler } from './middleware/error.middleware.ts'
import cors from 'cors'
import { app, server } from './socket/socket.ts'

dotenv.config()

app.use(express.json({limit: "10mb"}))
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))



app.use('/api/auth', authRouts)
app.use('/api/messages', messageRoute)
app.use('/api/group', groupRoute)
app.use('/api/group-message',groupMessageRoute)


app.use(errorHandler)

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`server runnig on : http://localhost:${PORT}`);
    connectDB()
})