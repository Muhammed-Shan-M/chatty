import { useGroupStore } from "@/store/group";
import { useAuthStore } from "@/store/useAuthStore";
import type { IGroup } from "@/types/Group";


export function getActiveUsers(groups:IGroup[]) {
    const groupIds = groups.map(group => group._id)
    const socket = useAuthStore.getState().socket
    const setActiveUsers = useGroupStore.getState().setActiveUsers

    socket?.emit('getActiveUsers',groupIds, (activeUser:Record<string,number>) => {
        setActiveUsers(activeUser)
    })
}