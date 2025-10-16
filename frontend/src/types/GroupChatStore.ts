import type { IGroupMessages } from "./GroupMessages";
import type { IUnreadCountForGroup } from "./UnreadCountForGroup";


export interface GroupChatStore {
    groupMessages: IGroupMessages[],
    isGroupMessageLoading: boolean,

    isSendMessageLoading: boolean,

    unreadMessages: IUnreadCountForGroup[]

    sendMessage: (formdata: FormData) => Promise<void> 
    getMessages: (groupId: string) => Promise<void>
    joinToGroup: (groupId: string) => void
    leaveGroup: (groupId: string) => void
    fetchUnreadMessages: (userId : string) => Promise<void>
    markAsReadUnreadMessages: (groupId: string) => Promise<void>
}