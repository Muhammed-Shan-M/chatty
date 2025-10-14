import type { IGroupMessages } from "./GroupMessages";


export interface GroupChatStore {
    groupMessages: IGroupMessages[],
    isGroupMessageLoading: boolean,

    isSendMessageLoading: boolean,

    sendMessage: (formdata: FormData) => Promise<void> 
    getMessages: (groupId: string) => Promise<void>
    joinToGroup: (groupId: string) => void
    leaveGroup: (groupId: string) => void
}