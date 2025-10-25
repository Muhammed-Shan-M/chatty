import { Socket } from "socket.io-client";
import { useGroupStore } from "@/store/group";


export const newActiveUsers = (socket: Socket) => {
  const handleNewActiveUsers = (groupId:string, count: number) => {
     useGroupStore.getState().setActiveUsers({[groupId]: count})
  };

  socket.on('new-activeUser', handleNewActiveUsers);  

  return () => {
    socket.off('new-activeUser', handleNewActiveUsers);
  };
};