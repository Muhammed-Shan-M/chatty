import type { NextFunction, Request, Response } from "express";
import Group from "../models/groups.model.ts";
import { AppError } from "../errors/appError.errors.ts";


export const isAdmin = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id
        const groupId = req.params.id 

        if(!userId || !groupId)throw new AppError('The specified user or group does not exist.', 401)

        const groupInfo = await Group.findById(groupId)

        const isAdmin = groupInfo?.admins.includes(userId)
        if(!isAdmin) throw new AppError('Only group admins are allowed to update group information.', 403)

        next()
    } catch (error) {
        next(error)
    }
}