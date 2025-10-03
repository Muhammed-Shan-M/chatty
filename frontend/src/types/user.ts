import type { FormData } from "./formData"

export interface User extends FormData{
    _id:string
    createdAt: string,
    updatedAt: string,
    profile: string
    chatId: string
}