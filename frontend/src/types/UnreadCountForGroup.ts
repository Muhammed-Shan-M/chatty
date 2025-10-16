
export interface UnreadCountForGroup {
    userId: string
    groupId: string
    unreadCount: number
    lastReadMessageId: string
}

export interface IUnreadCountForGroup {
    _id: string,
    updatedAt: string,
    createdAt: string
}