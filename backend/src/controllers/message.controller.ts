import type { NextFunction, Request, Response } from "express"
import User from "../models/user.model.ts"
import Message from "../models/message.model.ts"
import { AppError } from "../errors/appError.errors.ts"
import { uploadToCloudinary } from "../utility/cloudinaryuploader.utility.ts"
import { io } from "../socket/socket.ts"
import { buildPreview } from "../utility/buidePreview.ts"
import mongoose from "mongoose"
import { findChatId } from "../utility/findChatId.ts"
import { getReciverSocketId } from "../socket/utility/getReciverSocketId.utility.ts"



export const fetchAllUserForSideBar = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.user?._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

        const usersWithChatId = filteredUsers.map((item) => ({ ...item.toObject(), chatId: findChatId(loggedInUserId?.toString()!, item._id.toString()!) }))

        res.status(200).json(usersWithChatId)

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userToChatId } = req.params
        const userId = req.user?._id

        const messages = await Message.find({
            $or: [
                { senderId: userToChatId, reciverId: userId },
                { senderId: userId, reciverId: userToChatId }
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body
        const image = req.file

        const reciverId = req.params.id
        const senderId = req.user?._id

        if (!text && !image) throw new AppError("Please provide a message text or an image.", 400)

        let imageUrl = ''
        if (image) {
            imageUrl = await uploadToCloudinary(image, false)
        }

        const preview = buildPreview({ text, image: imageUrl })
        const chatId = findChatId(senderId?.toString()!, reciverId?.toString()!)

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl,
            chatId,
            preview,
        })

        await newMessage.save()


        const reciverSocketId = getReciverSocketId(reciverId!)

        if (reciverSocketId) {
            io.to(reciverSocketId).emit('newMessages', newMessage)
            io.to(reciverSocketId).emit('notifyUser', {
                messageId: newMessage._id,
                senderId: newMessage.senderId,
                timeStamp: newMessage.createdAt,
                senderUserName: req.user?.userName,
                preview: newMessage.preview
            })
        }

        res.status(201).json(newMessage)
    } catch (error) {
        next(error)
    }
}


export const sendVoiceMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] }

        const voice = files.voice
        const image = files.image


        if(!voice && !image)throw new AppError('No audio file uploaded. Please provide an audio file.', 400)

        const reciverId = req.params.id
        const senderId = req.user?._id

        let audioUrl
        let imageUrl

        if (voice && voice?.[0]) {
            audioUrl = await uploadToCloudinary(voice?.[0], true)
        } 

        if(image && image?.[0]) {
            imageUrl = await uploadToCloudinary(image?.[0], false) 
        }

        const preview = buildPreview({ audio: audioUrl, image: imageUrl })
        const chatId = findChatId(senderId?.toString()!, reciverId?.toString()!)

        const newMessage = new Message({
            senderId,
            reciverId,
            audio: audioUrl,
            image: imageUrl,
            chatId,
            preview
        })

        await newMessage.save()

        const reciverSocketId = getReciverSocketId(reciverId!)
        if (reciverSocketId) {
            io.to(reciverSocketId).emit('newMessages', newMessage)
            io.to(reciverSocketId).emit('notifyUser', {
                messageId: newMessage._id,
                senderId: newMessage.senderId,
                timeStamp: newMessage.createdAt,
                senderUserName: req.user?.userName,
                preview: newMessage.preview
            })
        }


        res.status(201).json(newMessage)
    } catch (error) {
        next(error)
    }
}



export const getUnreadMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id)

        const converstaions = await Message.aggregate([
            { $match: {  reciverId: userId , isRead: false } },
            {
                $group: {
                    _id: '$chatId',
                    lastMessage: { $last: '$preview' },
                    lastCreatedAt: { $last: '$createdAt' },
                    unreadCount: {$sum: 1}
                }
            }
        ])

        res.status(200).json(converstaions)
    } catch (error) {
        next(error)
    }
}


export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, selectedUserId} = req.body

        if (!userId || !selectedUserId) throw new AppError('Required user identifiers are missing.', 400)

        const chatId = findChatId(userId?.toString(), selectedUserId?.toString())

        await Message.updateMany({ chatId }, { $set: { isRead: true } })
        
        res.status(200).json({ success: true })
    } catch (error) {
        next(error)
    }
}


// Todo : send realtime message for add members , remove members , edit group info, make admin 