import type { Notification } from "../../types/Notification";



export default function MessageNotification(notification: Notification) {

    return (
        <div className={' p-3 rounded-lg shadow-lg bg-secondary text-white'}
            style={{ minWidth: "250px", maxWidth: "90vw" }} 
        >
            <div className="font-bold text-sm md:text-base truncate">
                New message from {notification.senderUserName}
            </div>

            <div className="mt-1 text-xs md:text-sm truncate">
                {notification.preview}
            </div>
        </div>
    )
}
