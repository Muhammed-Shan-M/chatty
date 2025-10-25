import { Socket } from "socket.io-client";
import { useGroupStore } from "@/store/group";
import { emitGroupNotification } from "@/utility/emiteGroupNotification";

type HndlerParms = {
  groupId: string,
  preview: string,
  groupName: string,
  senderUserName: string
}

export const groupNotification = (socket: Socket) => {
  const handleGroupNotification = ({groupId, preview,groupName,senderUserName}: HndlerParms) => {
    const { groups } = useGroupStore.getState()
    const isGroupExist = groups.find(g => g._id === groupId)
    if (!isGroupExist) return

    emitGroupNotification(preview, groupName, senderUserName)
  };

  socket.on('groupNotification', handleGroupNotification);

  return () => {
    socket.off('groupNotification', handleGroupNotification);
  };
};