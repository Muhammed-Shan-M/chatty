import { create } from "zustand";
import type { ChatStore } from "../types/chatStore";
import { axiosInstance } from "../lib/axios";
import { errorHandler } from "../utility/errorHandler";
import { useAuthStore } from "./useAuthStore";
import type { IMessage } from "../types/message";


export const useChatStore = create<ChatStore>((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendMessageLoading: false,


    getUsers: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get('/messages/users')
            set({users: res.data})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId: string) => {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            console.log(res.data)
            set({messages: res.data})

        } catch (error) {
            errorHandler(error)
        } finally {
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData: FormData) => {
        set({isSendMessageLoading: true})
        const {messages, selectedUser} = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`,messageData)
            console.log(res.data)
            set({messages: [...messages, res.data]})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isSendMessageLoading: false})
        }
    },

    subscribeToMessages: () => {
        const {selectedUser} = get()
        if(!selectedUser) return

        const socket = useAuthStore.getState().socket

        socket?.on('newMessages', (newMessage: IMessage) => {
            const isMessageSendFromSelectedUser = newMessage.senderId === selectedUser._id
            if(!isMessageSendFromSelectedUser)return 

            set({messages: [...get().messages, newMessage]})
            console.log('message :', get().messages)
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket?.off("newMessages")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })
}))