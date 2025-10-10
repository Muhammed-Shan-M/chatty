import { axiosInstance } from "@/lib/axios";
import { errorHandler } from "./errorHandler";
import type { User } from "@/types/user";


export async function fetchUsers(groupId: string):Promise<User[]> {
    try {
        const res = await axiosInstance.get(`/group/get-users/${groupId}`)
        return res.data
    } catch (error) {
        errorHandler(error)
        return []
    }
} 