import type { IMessage } from "./message";
import type { UnreadMessages } from "./unreadMessages";
import type { User } from "./user";

export interface ChatStore {
    messages: IMessage[],
    users: User[],
    unreadMessages:UnreadMessages[] 
    selectedUser: User | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    isSendMessageLoading: boolean
    getUsers: () => Promise<void>
    getMessages: (userId: string) => Promise<void>
    sendMessage: (messageData: FormData) => Promise<void>
    sendVoiceMessage: (file: FormData) => Promise<void>
    subscribeToMessages: () => void
    unsubscribeFromMessages: () => void
    setSelectedUser: (selecteduser: User | null) => Promise<void>
    fetchUnreadMessages: (userId: string) => Promise<void>
    setUnreadMessage: (chatId: string) => void
}