import type { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appError.errors.ts"
import Group from "../models/groups.model.ts"
import { uploadToCloudinary } from "../utility/cloudinaryuploader.utility.ts"


export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {groupName, description} = req.body

        const avatar = req.file
        const userId = req.user?._id
        const members = JSON.parse(req.body.members)
        const adminId = req.user?._id
        let avatarUrl = req.body.avatarUrl || ''
        
        if(!groupName || members.length === 0)throw new AppError('Group creation requires a valid group name and at least one member.', 400)
 
        if(avatar) {
            avatarUrl = await uploadToCloudinary(avatar,false)
        }

        const newGroup = new Group({
            groupName: groupName, 
            members: [...members,userId],
            admins:[adminId],
            owner: userId,
            avatar: avatarUrl || '',
            description: description || '',
        })

        newGroup.save()

        res.status(201).json(newGroup)
    } catch (error) {
        next(error)
    }
}


export const editGroupInfo = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {description} = req.body
        const avatar = req.file
        const groupId = req.params.id
        const userId = req.user?._id


        if(!description || !avatar) throw new AppError('You must provide either a description or an avatar to update group information.', 400)
        if(!userId) throw new AppError('The specified user does not exist.', 401)

        let avatarUrl 
        if(avatar){
            avatarUrl = await uploadToCloudinary(avatar, false)
        }
        

        const updatedGroupInfo = await Group.findByIdAndUpdate(groupId, 
            {$set: {
                description, 
                avatar: avatarUrl
            }}, {new: true}
        )

        res.status(200).json(updatedGroupInfo)
    } catch (error) {
        next(error)
    }
}



export const fecthGroupInfo = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const groupId = req.params.id

        if(!groupId)throw new AppError('The specified group does not exist.', 404)

        const groupInfo = await Group.findById(groupId).populate('members')

        res.status(200).json(groupInfo)

    } catch (error) {
        next(error)
    }
}


export const getuserGroup = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id

        if(!userId)throw new AppError('The specified user does not exist.', 401)

        const groups = await Group.find({members: userId}).populate('members')

        console.log(groups)

        res.status(200).json(groups)
    } catch (error) {
        next(error)
    }
}



export const putAsAdmin = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const groupId = req.params.id
        const userId = req.body.userId

        if(!userId || !groupId)throw new AppError('The specified user or group does not exist.', 401)
        
        const updatedGroup = Group.findByIdAndUpdate(groupId,
            {$push: {members: userId}},
            {new: true}
        )

        res.status(200).json(updatedGroup)
    } catch (error) {
        next(error)
    }
}


export const removeFromeAdmin = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.body.userId
        const groupId = req.params.id

        if(!userId || !groupId)throw new AppError('The specified user or group does not exist.', 401)

        const updatedGroup = await Group.findByIdAndUpdate(groupId, 
            {$pull: {admins: userId}},
            {new: true}
        )

        res.status(200).json(updatedGroup)

    } catch (error) {
        next(error)
    }
}


export const addMember = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.body.userId
        const groupId = req.params.id

        if(!userId || !groupId)throw new AppError('The specified user or group does not exist.', 401)

        const updatedGroup = await Group.findByIdAndUpdate(groupId, 
            {$push: {members: userId}},
            {new: true}
        )

        res.status(200).json(updatedGroup)

    } catch (error) {
        next(error)
    }
}


export const removeMember = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = req.body.userId
        const groupId = req.params.id

        if(!userId || !groupId)throw new AppError('The specified user or group does not exist.', 401)

        const updatedGroup = await Group.findByIdAndUpdate(groupId, 
            {$pull: {members: userId}},
            {new: true}
        )

        res.status(200).json(updatedGroup)

    } catch (error) {
        next(error)
    }
}