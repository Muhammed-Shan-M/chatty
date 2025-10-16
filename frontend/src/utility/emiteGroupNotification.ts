import MessageNotification from "@/components/Notifications/messageNotification";
import { toast } from "react-toastify";


export function emitGroupNotification(preview:string, groupName: string, userName: string) {
    if ("Notification" in window && Notification.permission === "granted") {
            new Notification(`New message from ${groupName|| 'One Group'}`, {
                body: userName? `${userName} : ${preview}` : preview || "📎 Media message",
                icon: "/chat-icon.png"
            });
        }
    
        toast(
            MessageNotification(groupName,preview,userName),
            {
                position: "top-center", 
                autoClose: 4000,
                pauseOnHover: true,
            }
        );
}