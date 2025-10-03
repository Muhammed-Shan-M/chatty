import type { AxiosResponse } from "axios";
import { axiosInstance } from "../lib/axios";

type MarkAsReadResponse = {
    success: boolean
}

export async function markAsRead(userId: string,selectedUserId: string): Promise<AxiosResponse<MarkAsReadResponse>> {
  return axiosInstance.patch<MarkAsReadResponse>('messages/mark-as-read', { userId, selectedUserId });
}