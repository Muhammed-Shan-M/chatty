import type { IGroupMessages } from "./GroupMessage.type.ts";
import type { IUser } from "./usertype.types.ts";


export interface PopulateSenderIdGM extends Omit<IGroupMessages, 'senderId'> {
    senderId: IUser
}