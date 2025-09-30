import type { NextFunction, Request, Response } from "express"
import User from "../models/user.model.ts"
import Message from "../models/message.model.ts"
import { AppError } from "../errors/appError.errors.ts"
import cloudinary from "../lib/cloudinary.ts"
import { uploadToCloudinary } from "../utility/cloudinaryuploader.utility.ts"
import { getReciverSocketId, io } from "../lib/socket.ts"
import { Socket } from "socket.io"

export const fetchAllUserForSideBar = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.user?._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

        res.status(200).json(filteredUsers)

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

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl,
            type: 'normal'
        })

        await newMessage.save()


        const reciverSocketId = getReciverSocketId(reciverId!)
        if (reciverSocketId) {
            io.to(reciverSocketId).emit('newMessages', newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        next(error)
    }
}


export const sendVoiceMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const audio = req.file
        console.log(audio)

        const reciverId = req.params.id
        const senderId = req.user?._id

        let audioUrl
        if (audio) {
            audioUrl = await uploadToCloudinary(audio, true)
        } else {
            throw new AppError('No audio file uploaded. Please provide an audio file.', 400)
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            type:'voice',
            audio:audioUrl
        })

        await newMessage.save()

        const reciverSocketId = getReciverSocketId(reciverId!)
        if (reciverSocketId) {
            io.to(reciverSocketId).emit('newMessages', newMessage)
        }
        console.log(newMessage)

        res.status(201).json(newMessage)
    } catch (error) {
        next(error)
    }
}