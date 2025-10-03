import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import type { AuthStateType } from '../types/userAuthStoreType'
import type { FormData } from '../types/formData'
import { toast } from 'react-toastify'
import { errorHandler } from '../utility/errorHandler'
import type { LoginFormData } from '../types/loginFormData'
import { io } from 'socket.io-client'
import { emitNotification } from '../utility/emitNotification'
import { useChatStore } from './chatStore'
import { markAsRead } from '../utility/markAsRead'

const BASE_URL = import.meta.env.VITE_API_SOCKET_URL

export const useAuthStore = create<AuthStateType>((set, get) => ({
    authUser: null,
    isSigninUP: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    updatingFullName: false,

    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/checkAuth')
            set({ authUser: res.data.user })
            get().connectSocket()
        } catch (error) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data: FormData) => {
        set({ isSigninUP: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success('Hooray! Your journey with us begins now.')
            get().connectSocket()
        } catch (error) {
            errorHandler(error)
        } finally {
            set({ isSigninUP: false })
        }
    },


    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success('You’ve logged out successfully. See you soon!')
            get().disconnectSocket()
        } catch (error) {
            errorHandler(error)
        }
    },


    login: async (data: LoginFormData) => {
        set({ isLoggingIng: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)

            set({ authUser: res.data })
            toast.success('Welcome back! Let’s pick up where you left off.')

            get().connectSocket()
        } catch (error) {
            errorHandler(error)
        } finally {
            set({ isLoggingIng: false })
        }
    },


    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile-picture', data)
            if (res) {
                set({ authUser: res.data })
                toast.success('Profile image updated! Your new picture is now visible.')
            }
        } catch (error) {
            errorHandler(error)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },


    updateFullName: async (data: { fullName: string }) => {
        set({ updatingFullName: true })
        try {
            const res = await axiosInstance.put('/auth/update-fullname', data)
            if (res) {
                set({ authUser: res.data })
                toast.success('Profile updated! Your name change is now saved."')
            }
        } catch (error) {
            errorHandler(error)
        } finally {
            set({ updatingFullName: false })
        }
    },

    connectSocket: async () => {
        const { authUser } = get()
        if (!authUser && get().socket?.connected) return

        const socket = io(BASE_URL, {
            query: {
                userId: authUser?._id
            }
        })

        socket.connect()

        set({ socket: socket })

        if ("Notification" in window) {
            if (Notification.permission === "default") {
                Notification.requestPermission().then(permission => {
                    console.log("Notification permission:", permission);
                });
            }
        }

        socket.on('getOnlineUsers', (userIds) => {
            set({ onlineUsers: userIds })
        })


        socket.on('notifyUser', async (notification) => {
            const { selectedUser, fetchUnreadMessages } = useChatStore.getState();

            if (!authUser) return;


            if (selectedUser?._id === notification.senderId) {
                try {
                    const res = await markAsRead(authUser._id, selectedUser?._id!);
                    if (res.data.success) return;
                } catch (err) {
                    errorHandler(err)
                }
            }
            else if (selectedUser?._id !== notification.senderId) {

                emitNotification(notification);
                fetchUnreadMessages(authUser._id);

            }
        });

    },

    disconnectSocket: async () => {
        if (get().socket?.connect()) get().socket?.disconnect()
    }

}))