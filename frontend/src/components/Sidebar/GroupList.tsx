
import React from 'react';
import type { GroupWithoutPopulate } from '@/types/Group';
import { useGroupStore } from '../../store/group';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '@/store/chatStore';
import type { IUnreadCountForGroup } from '@/types/UnreadCountForGroup';
import { useShallow } from 'zustand/shallow';
import type { AuthStateType } from '@/types/userAuthStoreType';
import type { GroupStore } from '@/types/groupStore';


interface GroupListItemProps {
    group: GroupWithoutPopulate;
    chatData: IUnreadCountForGroup
}


export const GroupList = React.memo(({ group, chatData }: GroupListItemProps) => {

    const { setShowUserInfo, showUserInfo } = useAuthStore(
        useShallow((state: AuthStateType) => ({
            setShowUserInfo: state.setShowUserInfo,
            showUserInfo: state.showUserInfo
        }))
    )

    const { selectedGroup, setSelectedGroup, activeUsers } = useGroupStore(
        useShallow((state: GroupStore) => ({
            selectedGroup: state.selectedGroup,
            setSelectedGroup: state.setSelectedGroup,
            activeUsers: state.activeUsers
        }))
    )
    const setSelectedUser = useChatStore(state => state.setSelectedUser)

    return (
        <button
            key={group._id}
            onClick={() => {
                setSelectedGroup(group)
                setShowUserInfo(false)
                setSelectedUser(null)
            }}
            className={`
        w-full p-3 flex items-center gap-3 relative transition-colors
        ${selectedGroup?._id === group._id ? "bg-base-300 ring-1 ring-base-300" : "hover:bg-base-300"}
         ${chatData
                    ? "bg-secondary/30 hover:bg-secondary/50 ring-1 ring-base-300"
                    : "hover:bg-base-300"}
                            `}

        >

            <div className={`relative flex-shrink-0 ${showUserInfo ? "" : "mx-auto"}`}>
                <img
                    src={group.avatar || "/group-avatar.png"}
                    alt={group.groupName}
                    className="size-12 object-cover rounded-full"
                />

                {chatData && !showUserInfo && chatData.unreadCount > 0 && (
                    <span className="absolute top-0 right-0 min-w-[18px] h-4 text-[10px] font-semibold flex items-center justify-center bg-red-500 text-white rounded-full">
                        {chatData.unreadCount}
                    </span>
                )}
            </div>



            <div className={`${showUserInfo ? "block" : "hidden"} lg:block text-left min-w-0 flex-1`}>
                <div className="font-medium truncate">{group.groupName}</div>
                <div className="text-sm text-zinc-400 flex justify-between items-center">
                    {chatData ? (
                        <>
                            <div className="truncate">{chatData.lastReadMessageId.preview}</div>
                            {chatData.unreadCount > 0 && (
                                <span className="ml-2 min-w-[20px] h-5 text-xs font-semibold flex items-center justify-center bg-red-500 text-white rounded-full">
                                    {chatData.unreadCount}
                                </span>
                            )}
                        </>
                    ) : (
                        <div>active users {activeUsers[group._id]}</div>
                    )}
                </div>
            </div>

        </button>
    )
})
