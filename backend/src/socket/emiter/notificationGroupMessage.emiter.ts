import type { IGroupMessages } from "../../types/GroupMessage.type.ts";
import { io } from "../socket.ts";
import { groupRooms, notificationFlag, usersSocketMap } from "../State/socketState.ts";


export function emiteGroupNotification(groupMembers:string[] , newMessage: IGroupMessages, roomId: string) {
    groupMembers.forEach((memberId: string) => {
        if (memberId === newMessage.senderId.toString()) return

        const isRoom = groupRooms.get(roomId)?.has(memberId)
        const isOnline = usersSocketMap[memberId]

        if (isOnline && !isRoom) {
            const flags = notificationFlag.get(memberId)

            if(!flags)return

            if(!flags?.has(roomId)){
                flags?.set(roomId, false)
                notificationFlag.set(memberId,flags)
            }
            
            // console.log('from notification flag: ', flags, 'notification :', notificationFlag);
            

            if (!flags.get(roomId)) {
                const userSocketId = usersSocketMap[memberId] 
                if(!userSocketId) return
                io.to(userSocketId).emit('groupNotification', { groupId: newMessage.groupId, newMessage })
                flags.set(roomId, true)
                notificationFlag.set(memberId, flags)
            }
        }
    });
}