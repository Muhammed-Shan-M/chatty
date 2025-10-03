import { create } from "zustand";
import type { ChatStore } from "../types/chatStore";
import { axiosInstance } from "../lib/axios";
import { errorHandler } from "../utility/errorHandler";
import { useAuthStore } from "./useAuthStore";
import type { IMessage } from "../types/message";
import { findChatId } from "../utility/findChatId";
import { markAsRead } from "../utility/markAsRead";


export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    users: [],
    unreadMessages: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendMessageLoading: false,


    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/messages/users')
            set({ users: res.data })
        } catch (error) {
            errorHandler(error)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            console.log(res.data)
            set({ messages: res.data })

        } catch (error) {
            errorHandler(error)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData: FormData) => {
        set({ isSendMessageLoading: true })
        const { messages, selectedUser } = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData)
            set({ messages: [...messages, res.data] })
        } catch (error) {
            errorHandler(error)
        } finally {
            set({ isSendMessageLoading: false })
        }
    },

    sendVoiceMessage: async (audio: FormData) => {
        set({ isSendMessageLoading: true })
        const { messages, selectedUser } = get()
        try {
            console.log(messages, selectedUser, audio)
            const res = await axiosInstance.post(`/messages/send-voice/${selectedUser?._id}`, audio)
            set({ messages: [...messages, res.data] })
        } catch (error) {
            errorHandler(error)
        } finally {
            set({ isSendMessageLoading: false })
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return

        const socket = useAuthStore.getState().socket

        socket?.on('newMessages', (newMessage: IMessage) => {
            const isMessageSendFromSelectedUser = newMessage.senderId === selectedUser._id
            if (!isMessageSendFromSelectedUser) return

            set({ messages: [...get().messages, newMessage] })
            console.log('message :', get().messages)
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket?.off("newMessages")
    },

    setSelectedUser: async (selectedUser) => {
        set({ selectedUser })
        const rollBack = [...get().unreadMessages]

        try {
            const userId = useAuthStore.getState().authUser?._id

            if (!selectedUser?._id || !userId) throw new Error('Required user identifiers are missing.')
            const chatId = findChatId(userId, selectedUser?._id)

            set((state) => ({
                unreadMessages: state.unreadMessages.some(item => item._id === chatId)
                    ? state.unreadMessages.filter(item => item._id !== chatId)
                    : state.unreadMessages
            }));

            const res = await markAsRead(userId,selectedUser._id)

            if (!res.data.success) {
                set({ unreadMessages: rollBack })
            }

        } catch (error) {
            set({ unreadMessages: rollBack })
        }
    },

    fetchUnreadMessages: async (userId) => {
        try {
            const res = await axiosInstance.get(`/messages/unread-messages/${userId}`)
            set({ unreadMessages: res.data })
        } catch (error) {
            errorHandler(error)
        }
    }
}))