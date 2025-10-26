import {create} from 'zustand'
import type { GroupChatStore } from '@/types/GroupChatStore'
import { axiosInstance } from '@/lib/axios'
import { useGroupStore } from './group'
import { errorHandler } from '@/utility/errorHandler'
import { useAuthStore } from './useAuthStore'


export const useGroupChatStore = create<GroupChatStore>((set,get) => ({
    groupMessages: [],
    isGroupMessageLoading: false,

    isSendMessageLoading: false,

    unreadMessages:[],

    getMessages: async (groupId) => {
        set({isGroupMessageLoading: true})
        try {

            const res = await axiosInstance.get(`/group-message/${groupId}/getMessages`)

            set({groupMessages: res.data})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isGroupMessageLoading: false})
        }
    },

    sendMessage: async (formData) => {
        set({isSendMessageLoading: true})
        try {
            const {selectedGroup} = useGroupStore.getState()

            const res = await axiosInstance.post(`/group-message/${selectedGroup?._id}/sendMessage`,formData)

            set({groupMessages: [...get().groupMessages, res.data]})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isSendMessageLoading: false})
        }
    },

    joinToGroup: (groupId) => {
        const {socket, authUser} = useAuthStore.getState()
        const {selectedGroup} = useGroupStore.getState()

        socket?.emit('join-group', groupId, authUser?._id)        

        socket?.on('newGroupMessage',({newMessage, groupId}) => {
            if(newMessage.senderId._id !== authUser?._id && groupId ===  selectedGroup?._id){
                set({groupMessages: [...get().groupMessages,newMessage]})
            }
        })
    },

    leaveGroup: (groupId) => {
        const {socket, authUser} = useAuthStore.getState()

        socket?.emit('leaveGroup', groupId, authUser?._id)
        socket?.off('newGroupMessage')
    },

    fetchUnreadMessages: async (userId) => {
        try {
            const res = await axiosInstance.get(`/group-message/${userId}/get-unread-messages`)

            set({unreadMessages: res.data})
        } catch (error) {
            errorHandler(error)
        }
    },

    markAsReadUnreadMessages: async (groupId:string) => {
        try {
            const userId = useAuthStore.getState().authUser?._id
            const rollBack = [...get().unreadMessages]

            set((state) => ({
                unreadMessages: state.unreadMessages.some(item => item.groupId === groupId)
                    ? state.unreadMessages.filter(item => item.groupId !== groupId)
                    : state.unreadMessages
            }));

            const res = await axiosInstance.patch(`/group-message/${groupId}/markAsRead-ureadMessages`,{userId})

            if(!res.data.success){
                set({unreadMessages:rollBack})
            }
            
        } catch (error) {
            errorHandler(error)
        }
    },

    setUnreadMessages: (unreadMessages) => {
        set({unreadMessages: [...get().unreadMessages, unreadMessages]})
    }
}))