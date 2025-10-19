import type { IUser } from "../../types/usertype.types.ts";
import { io } from "../socket.ts";


export function emitNewUserJoined(userData:IUser) {
    io.emit('signUP:newUserJoined',userData)
}