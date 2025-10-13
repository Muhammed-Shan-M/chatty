import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError.errors.ts";
import { uploadToCloudinary } from "../utility/cloudinaryuploader.utility.ts";
import GroupMessages from "../models/groupMessages.model.ts";
import { emiteNewGroupMessage } from "../socket/emiter/sendGroupMessage.emite.ts";
import Group from "../models/groups.model.ts";
import { createRoomId } from "../socket/utility/createRoomId.utility.ts";
import { emiteGroupNotification } from "../socket/emiter/notificationGroupMessage.emiter.ts";


export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text } = req.body
        const file = req.file
        const groupId = req.params.groupId
        const senderId = req.user?._id

        if (!groupId || !senderId) throw new AppError("Invalid request. Both groupId and senderId must be provided.", 400)

        const group = await Group.findById(groupId).select('members')
        if(!group) throw new AppError('The specified group does not exist.',404)

        if (!text || !file) throw new AppError("Please provide a message text or an image.", 400)

        let imageUrl
        if (file) {
            imageUrl = await uploadToCloudinary(file, false)
        }

        const attachments = imageUrl ? [{url: imageUrl, fileType: 'image'}] : []

        const newMessage = new GroupMessages({
            groupId,
            senderId,
            text,
            attachments,
            type: attachments.length && text ? 'mixed' : attachments.length ? 'image' : 'text'
        })

        const groupMembers = group.members.map((id) => id.toString())
        const roomId = createRoomId(groupId)
        emiteNewGroupMessage(newMessage, roomId)
        emiteGroupNotification(groupMembers, newMessage, roomId)

        res.status(201).json(newMessage)

    } catch (error) {
        next(error)
    }
} 