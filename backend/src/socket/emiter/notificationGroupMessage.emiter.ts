import { updateUnreadGroupMessage } from "../../service/updateUnreadGroupMessage.ts";
import type { PopulateSenderIdGM } from "../../types/PopulateuserIdGroupMessage.ts";
import { io } from "../socket.ts";
import { groupRooms, notificationFlag, usersSocketMap } from "../State/socketState.ts";

type GroupMembers = {
    id: string,
    userName: string
} 


export function emiteGroupNotification(groupMembers:string[] , newMessage: PopulateSenderIdGM, roomId: string, groupName: string) {
    groupMembers.forEach((memberId) => {
        if (memberId === newMessage.senderId._id.toString()) return

        const isRoom = groupRooms.get(roomId)?.has(memberId)   
        const isOnline = usersSocketMap[memberId]

        if (isOnline && !isRoom) {
            const flags = notificationFlag.get(memberId)
            const userSocketId = usersSocketMap[memberId]

            if(!flags || !userSocketId)return

            if(!flags?.has(roomId)){
                flags?.set(roomId, false)
                notificationFlag.set(memberId,flags)
            }

            if (!flags.get(roomId)) {
                io.to(userSocketId).emit('groupNotification', { groupId: newMessage.groupId, preview: newMessage.preview, groupName: groupName, senderUserName: newMessage.senderId.userName})
                flags.set(roomId, true)
                notificationFlag.set(memberId, flags)
            }
        }

        updateUnreadGroupMessage(newMessage.groupId, memberId, newMessage)
    });
    console.log('onlineUsers : ', usersSocketMap)
    console.log('notificationflag : ', notificationFlag)
    console.log('rooms : ', groupRooms)
}  