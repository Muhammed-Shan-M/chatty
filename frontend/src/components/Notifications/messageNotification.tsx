



export default function MessageNotification(from: string, preview: string, userName: string = '') {

    return (
        <div className={' p-3 rounded-lg shadow-lg bg-secondary text-white'}
            style={{ minWidth: "250px", maxWidth: "90vw" }} 
        >
            <div className="font-bold text-sm md:text-base truncate">
                New message from {from}
            </div>

            <div className="mt-1 text-xs md:text-sm truncate">
                {userName ? `${userName} : ${preview}` : preview}
            </div>
        </div>
    )
}
