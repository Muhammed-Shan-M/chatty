import type { User } from "./user";

export interface Group {
    groupName: string,
    members: User[],
    admins: string[],
    owner: string,
    avatar: string,
    description: string,
}


export interface IGroup extends Group{
    _id: string,
    createdAt: string,
    updatedAt: string
}

export interface GroupWithoutPopulate extends Omit<IGroup, "senderId">  {
    senderId: string
}