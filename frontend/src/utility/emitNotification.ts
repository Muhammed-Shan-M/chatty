import { toast } from "react-toastify";
import MessageNotification from "../components/Notifications/messageNotification";
import type { Notification } from "../types/Notification";
import type { User } from "../types/user";


export function emitNotification(notification: Notification, selectedUser: User | null) {

    if(selectedUser && notification.senderId === selectedUser?._id)return 

    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`New message from ${notification.senderUserName || 'One User'}`, {
            body: notification.preview || "📎 Media message",
            icon: "/chat-icon.png"
        });
    }

    toast(
        MessageNotification(notification),
        {
            position: "top-center", // top center
            autoClose: 4000,
            pauseOnHover: true,
        }
    );
}