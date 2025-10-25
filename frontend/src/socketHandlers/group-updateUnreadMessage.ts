import { useGroupChatStore } from "@/store/groupChatStore";
import type { IUnreadCountForGroup } from "@/types/UnreadCountForGroup";
import { Socket } from "socket.io-client";


export const updateGroupMessage = (socket: Socket) => {
  const handleUpdateUnreadMessage = (unreadMessage: IUnreadCountForGroup) => {
   useGroupChatStore.getState().setUnreadMessages(unreadMessage)
  };

  socket.on('Group:updateUnreadMessage', handleUpdateUnreadMessage);

  return () => {
    socket.off('Group:updateUnreadMessage', handleUpdateUnreadMessage);
  };
};