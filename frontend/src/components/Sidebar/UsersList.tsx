import type { UnreadMessages } from '../../types/unreadMessages'
import type { User } from '../../types/user'
import { useAuthStore } from '../../store/useAuthStore'
import { useChatStore } from '../../store/chatStore'
import type { AuthStateType } from '../../types/userAuthStoreType'
import { useShallow } from 'zustand/shallow'
import type { ChatStore } from '../../types/chatStore'
import { useGroupStore } from '../../store/group'
import type { GroupStore } from '../../types/groupStore'

type PropsType = {
    chatData: UnreadMessages,
    user: User,
}


export const UsersList = ({ chatData, user }: PropsType) => {


    const { onlineUsers, showUserInfo, setShowUserInfo } = useAuthStore(
        useShallow((state: AuthStateType) => ({
            onlineUsers: state.onlineUsers,
            showUserInfo: state.showUserInfo,
            setShowUserInfo: state.setShowUserInfo
        }))
    )

    const { setSelectedGroup } = useGroupStore(
        useShallow((state: GroupStore) => ({
            setSelectedGroup: state.setSelectedGroup
        }))
    )

    const { selectedUser, setSelectedUser } = useChatStore(
        useShallow((state: ChatStore) => ({
            selectedUser: state.selectedUser,
            setSelectedUser: state.setSelectedUser,
        }))
    );


    // Todo : fix in large screen the unread message count seen on the porfile

    return (

        <button
            key={user._id}
            onClick={() => {
                setSelectedUser(user);
                setShowUserInfo(false);
                setSelectedGroup(null)
            }}
            className={`
                                w-full p-3 flex items-center gap-3 relative transition-colors
                                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                                ${chatData
                    ? "bg-secondary/30 hover:bg-secondary/50 ring-1 ring-base-300"
                    : "hover:bg-base-300"}
                            `}
        >
            <div className={`relative flex-shrink-0 ${showUserInfo ? "mx-0" : "mx-auto"} lg:mx-0`}>
                <img
                    src={user.profile || "/avatar.png"}
                    alt={user.fullName}
                    className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}

                {chatData && !showUserInfo && chatData.unreadCount > 0 && (
                    <span className="absolute top-0 right-0 min-w-[18px] h-4 text-[10px] font-semibold flex items-center justify-center bg-red-500 text-white rounded-full">
                        {chatData.unreadCount}
                    </span>
                )}

            </div>

            <div className={`${showUserInfo ? "block" : "hidden"} lg:block text-left min-w-0 flex-1`}>
                <div className="font-medium truncate">{user.userName}</div>
                <div className="text-sm text-zinc-400 flex justify-between items-center">
                    {chatData ? (
                        <>
                            <div className="truncate">{chatData.lastMessage}</div>
                            {chatData.unreadCount > 0 && (
                                <span className="ml-2 min-w-[20px] h-5 text-xs font-semibold flex items-center justify-center bg-red-500 text-white rounded-full">
                                    {chatData.unreadCount}
                                </span>
                            )}
                        </>
                    ) : (
                        <div>{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
                    )}
                </div>
            </div>
        </button>

    )
}
