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
    },

    fetchGroupInfo: async (groupId) => {
        set({isGroupInfoLoading: true})
        get().setShowGroupInfo(true)
        try {
            const res = await axiosInstance.get(`/group/get-group-info/${groupId}`)
            set({groupInfo: res.data})  
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isGroupInfoLoading: false})
        }
    },

    editGroupInfo: async (FormData) => {
        set({isGroupInfoLoading: true})
        try {
            const res = await axiosInstance.patch(`/group/edit-group-info/${get().selectedGroup?._id}`,FormData)
            set({groupInfo: res.data, selectedGroup: res.data})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isGroupInfoLoading: false})
        }
    },

    addMembers: async (members) => {
        set({isGroupInfoLoading: true})
        try {
            const res = await axiosInstance.patch(`/group/add-members/${get().selectedGroup?._id}`, {members})
            console.log('from backend res : ',res.data)
            set({groupInfo: res.data})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isGroupInfoLoading: false})
        }
    },

    removeMember:async (userId) => {
        set({isGroupInfoLoading: true})
        try {
            const res = await axiosInstance.patch(`/group/remove-a-member/${get().selectedGroup?._id}`,{userId})
            set({groupInfo: res.data})
        } catch (error) {
            errorHandler(error)
        }finally {
            set({isGroupInfoLoading: false})
        }
    },

    putAsAdmin: async (userId) => {
        set({isGroupInfoLoading:true})
        try {
            const res = await axiosInstance.patch(`/group/put-as-admin/${get().selectedGroup?._id}`,{userId})
            set({groupInfo:res.data})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isGroupInfoLoading: false})
        }
    },

    removeAdmin: async (userId) => {
        set({isGroupInfoLoading: true})
        try {
            const res = await axiosInstance.patch(`/group/remove-a-admin/${get().selectedGroup?._id}`,{userId})
            set({groupInfo: res.data})
        } catch (error) {
            errorHandler(error)
        } finally {
            set({isGroupInfoLoading: false})
        }
    }

 }))