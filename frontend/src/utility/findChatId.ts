export function findChatId(senderId: string, reciverId: string) {
    return [senderId, reciverId].sort().join('_')
}