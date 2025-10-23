import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError.errors.ts";
import { uploadToCloudinary } from "../utility/cloudinaryuploader.utility.ts";
import GroupMessages from "../models/groupMessages.model.ts";
import { emiteNewGroupMessage } from "../socket/emiter/sendGroupMessage.emite.ts";
import Group from "../models/groups.model.ts";
import { createRoomId } from "../socket/utility/createRoomId.utility.ts";
import { emiteGroupNotification } from "../socket/emiter/notificationGroupMessage.emiter.ts";
import mongoose from "mongoose";
import UnreadCount from "../models/groupUnreadMessageCount.ts";
import type { IUser } from "../types/usertype.types.ts";
import { groupRooms } from "../socket/State/socketState.ts";

export interface MulterMessageRequst {
    image?: Express.Multer.File[],
    voice?: Express.Multer.File[]
}


export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body
        const groupId = req.params.groupId
        const senderId = req.user?._id

        const files = req.files as MulterMessageRequst

        if (!groupId || !senderId) throw new AppError("Invalid request. Both groupId and senderId must be provided.", 400)

        if (!text && !files.voice && !files.image) throw new AppError("No content provided", 400)

        const group = await Group.findById(groupId).select('members groupName')
        if (!group) throw new AppError('The specified group does not exist.', 404)

        const isMember = group.members.includes(senderId)
        
        if (!isMember) throw new AppError('You are not a member of this group.', 403)


        const attachments: { url: string, fileType: 'image' | 'voice' }[] = []
        let preview: string = ''

        if (files && files?.image?.[0]) {
            const file = files.image[0]
            const imageUrl = await uploadToCloudinary(file, false)
            attachments.push({ url: imageUrl, fileType: 'image' })
            preview = 'Photo'
        }


        if (files && files?.voice?.[0]) {
            const file = files.voice[0]
            const voiceUrl = await uploadToCloudinary(file, true)
            attachments.push({ url: voiceUrl, fileType: 'voice' })
            preview = !preview ? 'Voice message' : 'Photo & Voice message'
        }

        if(preview && text) preview = `Photo: ${text}`
        if(!preview && text) preview = text


        const type =
            attachments.length > 1
                ? 'mixed'
                : attachments.length === 1 && text
                    ? 'mixed'
                    : attachments.length === 1
                        ? attachments[0]?.fileType
                        : 'text';


        const newMessage = await new GroupMessages({
            groupId,
            senderId,
            text,
            attachments,
            type,
            preview
        }).populate<{senderId: IUser}>('senderId')

        await newMessage.save()

        const groupMembers = group.members.map((id) => id.toString())
        const roomId = createRoomId(groupId)
        emiteNewGroupMessage(newMessage, roomId)
        emiteGroupNotification(groupMembers, newMessage, roomId, group.groupName)

        res.status(201).json(newMessage)

    } catch (error) {
        next(error)
    }
}


export const getGroupMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = new mongoose.Types.ObjectId(req.params.groupId)
        if (!groupId) throw new AppError("Invalid request.", 400)

        const messages = await GroupMessages.find({ groupId }).populate('senderId')

        res.status(200).json(messages)

    } catch (error) {
        next(error)
    }
}



export const findUnreadMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const userId = req.params.userId

        if (!userId) throw new AppError('Invalid request. UserId must be provided.', 400)

        const unreadMessage = await UnreadCount.find({ userId, unreadCount: {$gt: 0}}).populate('lastReadMessageId')

        res.status(200).json(unreadMessage)
    } catch (error) {
        next(error)
    }
}


export const markAsReadUnreadCounts = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const groupId = new mongoose.Types.ObjectId(req.params.groupId)
        const userId = new mongoose.Types.ObjectId(req.body.userId as string)        

        const unrecount = await UnreadCount.findOneAndUpdate(
            {userId, groupId},
            {$set:{unreadCount: 0, lastReadMessageId: null}},
            {upsert: true, new: true}
        )

        if(unrecount){
            res.status(200).json({success: true})
        }

    } catch (error) {
        console.log(error);
        next(error)       
    }
}

