import {create} from 'zustand'
import type { GroupStore } from '../types/groupStore'
import { errorHandler } from '../utility/errorHandler'
import { axiosInstance } from '../lib/axios'


export const useGroupStore = create<GroupStore>((set,get) => ({
    groups: [],
    isCreatingGroup: false,

    groupInfo: null,
    isGroupInfoLoading: false,

    showGroupInfo: false,
    
    isGroupChat: false,
    selectedGroup: null,


    createGroup:async (formData) => {
        set({isCreatingGroup: true})
        try {
            const res = await axiosInstance.post('/group/create-group',formData)

            set({groups: [...get().groups, res.data]})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isCreatingGroup: false})
        }
    },


    fecthGroups: async () => {
        try {
            const res = await axiosInstance.get('/group/get-users-group')
            set({groups: res.data})
        } catch (error) {
            errorHandler(error)
        }
    },

    setSelectedGroup: async (group) => {
        set({isGroupChat: group ? true : false, selectedGroup: group})
        get().setShowGroupInfo(false)
    },

    setShowGroupInfo: (val) => {
        set({showGroupInfo: val})
        if(!val)set({groupInfo: null})
    } ,

    fetchGroupInfo: async (groupId) => {
        set({isGroupInfoLoading: true})
        try {
            const res = await axiosInstance.get(`/group/get-group-info/${groupId}`)
            set({groupInfo: res.data})
            get().setShowGroupInfo(true)
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isGroupInfoLoading: false})
        }
    }
}))