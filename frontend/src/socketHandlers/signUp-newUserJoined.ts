import { Socket } from "socket.io-client";
import type { SetState } from "./types/setState";
import type { ChatStore } from "@/types/chatStore";
import type { User } from "@/types/user";

export const newUserJoins = (socket: Socket, set: SetState<ChatStore>) => {
  const hadleNewUserJoind = (userData: User) => {
    set((state) => ({
      users: [...state.users, userData],
    }));
  };

  socket.on('signUP:newUserJoined', hadleNewUserJoind);

  return () => {
    socket.off('signUP:newUserJoined', hadleNewUserJoind);
  };
};