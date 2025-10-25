import type { Socket } from "socket.io-client";
import type { SetState } from "./types/setState";
import { getOnlineUsers } from "./getOnlineUsers";
import { updateGroupMessage } from "./group-updateUnreadMessage";
import { groupNotification } from "./groupNotification";
import { newActiveUsers } from "./newActiveUser";
import { notifyUser } from "./notifyUser";
import { newUserJoins } from "./signUp-newUserJoined";
import type { AuthStateType } from "@/types/userAuthStoreType";
import type { ChatStore } from "@/types/chatStore";

export const setupAllHandlers = (
  socket: Socket,
  sets: {
    auth: SetState<AuthStateType>;
    chat: SetState<ChatStore>
  }
) => {
  const cleanups = [
    getOnlineUsers(socket,sets.auth),
    updateGroupMessage(socket),
    groupNotification(socket),
    newActiveUsers(socket),
    notifyUser(socket),
    newUserJoins(socket, sets.chat)
  ];

  return () => cleanups.forEach((cleanup) => cleanup && cleanup());
};