import type { IGroupMessages } from "./GroupMessages";


export interface GroupChatStore {
    groupMessages: IGroupMessages[],
    isGroupMessageLoading: boolean,

    isSendMessageLoading: boolean,

    sendMessage: (formdata: FormData) => Promise<void> 
    getMessages: () => Promise<void>
}