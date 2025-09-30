export interface Message {
    senderId: string
    reciverId: string
    text?: string,
    image?:string,
    audio?:string
} 


export interface IMessage extends Message{
    _id: string
    createdAt: string
    updatedAt: string
}