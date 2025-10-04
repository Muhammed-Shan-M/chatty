


import { Users, ChevronsRight, Plus, ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/useAuthStore';
import { SidebarSkeleton } from './Skeleton/SidebarSkeleton ';
import type { User } from '../types/user';
import { useShallow } from 'zustand/react/shallow';
import type { ChatStore } from '../types/chatStore';
import type { AuthStateType } from '../types/userAuthStoreType';



export const Sidebar = () => {
    const {unreadMessages,fetchUnreadMessages,getUsers,users,selectedUser,setSelectedUser,isUsersLoading} = useChatStore(
        useShallow((state: ChatStore) => ({
            unreadMessages: state.unreadMessages,
            fetchUnreadMessages: state.fetchUnreadMessages,
            getUsers: state.getUsers,
            users: state.users,
            selectedUser: state.selectedUser,
            setSelectedUser: state.setSelectedUser,
            isUsersLoading: state.isUsersLoading,
        }))
    );

     const { onlineUsers, authUser } = useAuthStore(
        useShallow((state: AuthStateType) => ({
            onlineUsers: state.onlineUsers,
            authUser: state.authUser,
        }))
     )

     const showUserInfo = useAuthStore((state) => state.showUserInfo)
     const setShowUserInfo = useAuthStore((state) => state.setShowUserInfo);

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [sortedUsers, setSortedUsers] = useState<User[] | null>(null)
    const [showGroups, setShowGroups] = useState(true)




    const filteredUsers = useMemo(() => {
        return showOnlineOnly
            ? users.filter((user) => onlineUsers.includes(user._id))
            : users.reduce((acc, user) => {
                if (onlineUsers.includes(user._id)) {
                    acc.unshift(user);
                } else {
                    acc.push(user);
                }
                return acc;
            }, [] as User[]);
    }, [showOnlineOnly, users, onlineUsers]);



    const unreadMap = useMemo(() => {
        return Object.fromEntries(
            unreadMessages.map((msg) => [msg._id, msg])
        );
    }, [unreadMessages]);


    useEffect(() => {
        const sorted = filteredUsers.reduce((acc, user) => {
            if (unreadMap[user.chatId]) acc.unshift(user)
            else acc.push(user)

            return acc
        }, [] as User[])

        setSortedUsers(sorted)
    }, [unreadMessages, filteredUsers])


    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (authUser) {
            fetchUnreadMessages(authUser?._id)
        }
    }, [authUser, fetchUnreadMessages])


// useEffect(() => {
//     const mediaQuery = window.matchMedia('(min-width: 1024px)')

//     if (mediaQuery.matches) {
//         setShowUserInfo(false)
//     }

//     const handler = (e: MediaQueryListEvent) => {
//         if (e.matches) {
//             setShowUserInfo(false)
//         }
//     }

//     mediaQuery.addEventListener('change', handler)
//     return () => mediaQuery.removeEventListener('change', handler)
// }, [])


    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside
            className={`h-full border-r border-base-300 flex flex-col transition-all duration-200 ${showUserInfo ? "w-72" : "w-20"
                } lg:w-72`}
        >
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex gap-1">
                    <div className="flex items-center gap-2">
                        <Users className="size-6" />
                        <span className={`font-medium ${showUserInfo ? "block" : "hidden"} lg:block`}>Contacts</span>
                    </div>

                    <button
                        className="lg:hidden"
                        onClick={() => setShowUserInfo(!showUserInfo)}
                        aria-expanded={showUserInfo}
                        aria-label={showUserInfo ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        <ChevronsRight
                            className={`text-gray-600 hover:text-gray-400 transition-transform ${showUserInfo ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                <div className={`mt-3 items-center gap-2 ${showUserInfo ? "flex" : "hidden"} lg:flex`}>
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">
                        ({onlineUsers.length - 1 === -1 ? 0 : onlineUsers.length - 1} online)
                    </span>
                </div>

                <div className={`mt-3 ${showUserInfo ? "block" : "hidden"} lg:block`}>
                    <button className="btn btn-primary btn-sm w-full gap-2">
                        <Plus className="size-4" />
                        <span>Create A Group</span>
                    </button>
                </div>
            </div>

            <div className="border-b border-base-300">
                <button
                    onClick={() => setShowGroups(!showGroups)}
                    className={`w-full p-3 flex items-center justify-between hover:bg-base-200 transition-colors ${showUserInfo ? "" : "justify-center"} lg:justify-between`}
                >
                    <div className={`flex items-center gap-2 ${showUserInfo ? "block" : "hidden"} lg:block`}>
                        <span className="font-medium text-sm">Groups</span>
                        <span className="text-xs text-zinc-500">(0)</span>
                    </div>
                    <ChevronDown
                        className={`size-5 transition-transform ${showGroups ? "" : "-rotate-90"} ${showUserInfo ? "block" : "hidden"} lg:block`}
                    />
                </button>

                {/* Groups list area - collapsible */}
                {showGroups && (
                    <div className={`pb-2 ${showUserInfo ? "block" : "hidden"} lg:block`}>
                        <div className="px-3 py-4 text-center text-sm text-zinc-500">No groups yet</div>
                    </div>
                )}
            </div>

            <div className="overflow-y-auto w-full py-3">
                {sortedUsers?.map((user: any) => {
                    const chatData = unreadMap[user.chatId]
                    return (
                        <button
                            key={user._id}
                            onClick={() => {
                                setSelectedUser(user)
                                setShowUserInfo(false)
                            }}
                            className={`
                                w-full p-3 flex items-center gap-3 relative transition-colors
                                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                                ${chatData
                                    ? "bg-secondary/30 hover:bg-secondary/50 ring-1 ring-base-300"
                                    : "hover:bg-base-300"
                                }
                            `}
                        >
                            <div className={`relative ${showUserInfo ? "mx-0" : "mx-auto"} lg:mx-0`}>
                                <img
                                    src={user.profile || "/avatar.png"}
                                    alt={user.fullName}
                                    className="size-12 object-cover rounded-full"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                                )}

                                {chatData && !showUserInfo && chatData.unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 min-w-[18px] h-4 text-[10px] font-semibold flex items-center justify-center bg-red-500 text-white rounded-full lg:hidden">
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
                })}

                {filteredUsers.length === 0 && <div className="text-center text-zinc-500 py-4">No online users</div>}
            </div>
        </aside>

    )
}
