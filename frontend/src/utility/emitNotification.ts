import { toast } from "react-toastify";
import MessageNotification from "../components/Notifications/messageNotification";
import type { Notification } from "../types/Notification";


export function emitNotification(notification: Notification) {

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