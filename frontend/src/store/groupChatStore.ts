import {create} from 'zustand'
import type { GroupChatStore } from '@/types/GroupChatStore'
import { axiosInstance } from '@/lib/axios'
import { useGroupStore } from './group'
import { errorHandler } from '@/utility/errorHandler'


export const useGroupChatStore = create<GroupChatStore>((set,get) => ({
    groupMessages: [],
    isGroupMessageLoading: false,

    isSendMessageLoading: false,


    getMessages: async () => {
        set({isGroupMessageLoading: true})
        try {
            const {selectedGroup} = useGroupStore.getState()
            const res = await axiosInstance.get(`/group-message/${selectedGroup?._id}/getMessages`)

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
    }
}))