import type { IMessage } from "./message";
import type { User } from "./user";

export interface ChatStore {
    messages: IMessage[],
    users: User[],
    selectedUser: User | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    isSendMessageLoading: boolean
    getUsers: () => Promise<void>
    getMessages: (userId: string) => Promise<void>
    sendMessage: (messageData: FormData) => Promise<void>
    subscribeToMessages: () => void
    unsubscribeFromMessages: () => void
    setSelectedUser: (selecteduser: User | null) => void
}