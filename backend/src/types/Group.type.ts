import type { Types, Document } from "mongoose"

export interface Group {
    groupName: string
    members: Types.ObjectId[]
    admins: Types.ObjectId[]
    owner: Types.ObjectId
    avatar?: string
    description?: string
}


export interface IGroup extends Group,Document {
    _id:Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}