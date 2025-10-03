export interface UnreadMessages {
    _id: string,
    lastMessage: string,
    lastCreatedAt: string,
    unreadCount: number
    participants: string[]
}