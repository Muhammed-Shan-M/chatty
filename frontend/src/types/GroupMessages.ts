import type { User } from "./user"

export interface GroupMessagesAttachment {
    url: string,
    fileType: 'image'|'voice'
} 

export interface GroupMessage {
    groupId: string
    senderId:User
    text: string
    attachments: GroupMessagesAttachment[],
    type: string
}

export interface IGroupMessages extends GroupMessage {
    _id: string,
    createdAt: string,
    updatedAt: string
}


