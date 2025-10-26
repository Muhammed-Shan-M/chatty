import { Socket } from "socket.io-client";
import type { SetState } from "./types/setState";
import type { AuthStateType } from "@/types/userAuthStoreType";

export const getOnlineUsers = (socket:Socket, set:SetState<AuthStateType> ) => {
  const handleGetOnlineUsers = (userIds: string[]) => {
    set({onlineUsers: userIds})
  };


  console.count('from getOnline users')
  

  socket.on('getOnlineUsers', handleGetOnlineUsers);

  return () => {
    socket.off('getOnlineUsers', handleGetOnlineUsers);
  };
};


///Organizing SOAP handlers from chatGpt