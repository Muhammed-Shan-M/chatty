import type { IGroupMessages } from "./GroupMessages"

export interface UnreadCountForGroup {
    userId: string
    groupId: string
    unreadCount: number
    lastReadMessageId: IGroupMessages
}

export interface IUnreadCountForGroup extends UnreadCountForGroup {
    _id: string,
    updatedAt: string,
    createdAt: string
}