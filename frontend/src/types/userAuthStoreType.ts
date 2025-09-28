import type { Socket } from "socket.io-client"
import type { FormData as Data} from "./formData"
import type { LoginFormData } from "./loginFormData"
import type { User } from "./user"

export interface AuthStateType {
    authUser:User | null,
    isSigninUP:boolean,
    isLoggingIng: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean,
    updatingFullName: boolean,
    onlineUsers: string[]
    socket: Socket | null
    checkAuth: () => Promise<void>
    signup: (data: Data) => Promise<void>
    logout: () => Promise<void>
    login: (data: LoginFormData) => Promise<void>
    updateProfile: (data: FormData) => Promise<void>
    updateFullName: (data: {fullName: string}) => Promise<void>
    connectSocket: () => Promise<void>
    disconnectSocket: () => Promise<void>
}