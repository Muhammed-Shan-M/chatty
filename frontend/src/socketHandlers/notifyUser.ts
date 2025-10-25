import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/useAuthStore";
import type { Notification } from "@/types/Notification";
import { emitNotification } from "@/utility/emitNotification";
import { errorHandler } from "@/utility/errorHandler";
import { findChatId } from "@/utility/findChatId";
import { markAsRead } from "@/utility/markAsRead";
import { Socket } from "socket.io-client";
import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter()

export const notifyUser = (socket: Socket) => {
  const handleNotifyUsers = async (notification: Notification) => {
    const { selectedUser, fetchUnreadMessages } = useChatStore.getState();
    const {authUser, showUserInfo} = useAuthStore.getState()

    if (!authUser) return;

    if (selectedUser?._id === notification.senderId) {
      try {
        if (showUserInfo) {
          emitNotification(notification);
          fetchUnreadMessages(authUser._id);

          const selectedId = selectedUser?._id

          emitter.on('read-unreadMsg', async () => {
            console.log('from the evernt : ', selectedId, useChatStore.getState().selectedUser?._id);
            if (!showUserInfo && selectedId === useChatStore.getState().selectedUser?._id) {
              const res = await markAsRead(authUser._id, selectedUser?._id!);

              if (res.data.success) {
                const chatId = findChatId(authUser?._id!, selectedId!)
                useChatStore.getState().setUnreadMessage(chatId)
              }
            }
          })

          return
        }

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
  };

  socket.on('notifyUser', handleNotifyUsers);

  return () => {
    socket.off('notifyUser', handleNotifyUsers);
  };
};