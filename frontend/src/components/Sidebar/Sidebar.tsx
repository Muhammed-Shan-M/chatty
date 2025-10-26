

import React, { useCallback } from 'react';
import { Users, ChevronsRight, Plus, ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { SidebarSkeleton } from '../Skeleton/SidebarSkeleton ';
import type { User } from '../../types/user';
import { useShallow } from 'zustand/react/shallow';
import type { ChatStore } from '../../types/chatStore';
import type { AuthStateType } from '../../types/userAuthStoreType';
import { UsersList } from './UsersList';
import { useGroupStore } from '../../store/group';
import type { GroupStore } from '../../types/groupStore';
import { GroupList } from './GroupList';
import { useGroupChatStore } from '@/store/groupChatStore';
import type { GroupChatStore } from '@/types/GroupChatStore';
import type { GroupWithoutPopulate } from '@/types/Group';
import { getActiveUsers } from '@/utility/getActiveUsers';



export const Sidebar = React.memo(({ cbForModal }: { cbForModal: () => void }) => {
    // const { unreadMessages, fetchUnreadMessages, getUsers, users, isUsersLoading } = useChatStore(
    //     useShallow((state: ChatStore) => ({
    //         unreadMessages: state.unreadMessages,
    //         fetchUnreadMessages: state.fetchUnreadMessages,
    //         getUsers: state.getUsers,
    //         users: state.users,
    //         isUsersLoading: state.isUsersLoading,
    //     }))
    // );

    // const { onlineUsers, authUser, showUserInfo, setShowUserInfo } = useAuthStore(
    //     useShallow((state: AuthStateType) => ({
    //         onlineUsers: state.onlineUsers,
    //         authUser: state.authUser,
    //         showUserInfo: state.showUserInfo,
    //         setShowUserInfo: state.setShowUserInfo
    //     }))
    // )

    // const { groups, fecthGroups } = useGroupStore(
    //     useShallow((state: GroupStore) => ({
    //         groups: state.groups,
    //         fecthGroups: state.fecthGroups
    //     }))
    // )

    // const { fetchUnreadMessages: FetchGroupUnreadMessage, unreadMessages: groupUnreadMessage } = useGroupChatStore(
    //     useShallow((state: GroupChatStore) => ({
    //         fetchUnreadMessages: state.fetchUnreadMessages,
    //         unreadMessages: state.unreadMessages
    //     }))
    // )



    // const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    // const [sortedUsers, setSortedUsers] = useState<User[] | null>(null)
    // const [showGroups, setShowGroups] = useState(true)
    // const [sortedGroups, setSortedGroups] = useState<GroupWithoutPopulate[]>([])

    // console.count("Sidebar render");
    // // console.log("Sidebar render stack:");
    // // console.trace();


    // const filteredUsers = useMemo(() => {
    //     // console.log('filtered users');

    //     return showOnlineOnly
    //         ? users.filter((user) => onlineUsers.includes(user._id))
    //         : users.reduce((acc, user) => {
    //             if (onlineUsers.includes(user._id)) {
    //                 acc.unshift(user);
    //             } else {
    //                 acc.push(user);
    //             }
    //             return acc;
    //         }, [] as User[]);
    // }, [showOnlineOnly, users, onlineUsers]);


    // const unreadMap = useMemo(() => {
    //     // console.log('unreadMap users');

    //     return Object.fromEntries(
    //         unreadMessages.map((msg) => [msg._id, msg])
    //     );
    // }, [unreadMessages]);

    // const unreadGroupMap = useMemo(() => {
    //     // console.log('unreadMap groups');

    //     return Object.fromEntries(
    //         groupUnreadMessage.map((msg) => [msg.groupId, msg])
    //     )
    // }, [groupUnreadMessage])




    // useEffect(() => {
    //     const sortedUser = filteredUsers.reduce((acc, user) => {
    //         if (unreadMap[user.chatId]) acc.unshift(user)
    //         else acc.push(user)

    //         return acc
    //     }, [] as User[])

    //     const sortedGroup = groups.reduce((acc, group) => {
    //         if (unreadGroupMap[group._id]) acc.unshift(group)
    //         else acc.push(group)

    //         return acc
    //     }, [] as GroupWithoutPopulate[])

    //     // console.log('sorted useEffect');


    //     setSortedUsers(sortedUser)
    //     setSortedGroups(sortedGroup)
    // }, [unreadMessages, filteredUsers])


    // useEffect(() => {
    //     getUsers();
    //     fecthGroups()

    //     // console.log('get and feth users useeffect');

    // }, []); // getUsers, fecthGroups

    // useEffect(() => {

    //     // console.log('get Active users useeffect');

    //     getActiveUsers(groups)
    // }, [groups])

    // useEffect(() => {
    //     // console.log("unread msg both g-p useEffect");

    //     if (authUser) {
    //         fetchUnreadMessages(authUser?._id)
    //         FetchGroupUnreadMessage(authUser._id)
    //     }
    // }, [authUser])// fetchUnreadMessages, FetchGroupUnreadMessage


    // useEffect(() => {
    //     // console.log('size captures useEffect');

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



  // ✅ OPTIMIZATION 1: Split selectors to prevent unnecessary re-renders
// Only re-render when THESE specific values change
const users = useChatStore(useShallow((state: ChatStore) => state.users));
const unreadMessages = useChatStore(useShallow((state: ChatStore) => state.unreadMessages));
const isUsersLoading = useChatStore(useShallow((state: ChatStore) => state.isUsersLoading));

// Functions are stable, select them separately
const { fetchUnreadMessages, getUsers } = useChatStore(
    useShallow((state: ChatStore) => ({
        fetchUnreadMessages: state.fetchUnreadMessages,
        getUsers: state.getUsers,
    }))
);

const onlineUsers = useAuthStore(useShallow((state: AuthStateType) => state.onlineUsers));
const authUser = useAuthStore(useShallow((state: AuthStateType) => state.authUser));
const showUserInfo = useAuthStore(useShallow((state: AuthStateType) => state.showUserInfo));
const setShowUserInfo = useAuthStore(useShallow((state: AuthStateType) => state.setShowUserInfo));

const groups = useGroupStore(useShallow((state: GroupStore) => state.groups));
const fecthGroups = useGroupStore(useShallow((state: GroupStore) => state.fecthGroups));

const groupUnreadMessage = useGroupChatStore(useShallow((state: GroupChatStore) => state.unreadMessages));
const FetchGroupUnreadMessage = useGroupChatStore(useShallow((state: GroupChatStore) => state.fetchUnreadMessages));

const [showOnlineOnly, setShowOnlineOnly] = useState(false);
const [showGroups, setShowGroups] = useState(true)

console.count('rerender side bar')

// ✅ FIX 1: Memoize getActiveUsers to prevent recreation every render
const getActiveUsersStable = useCallback((groups: GroupWithoutPopulate[]) => {
    getActiveUsers(groups)
}, []) // Assuming getActiveUsers is stable

// ✅ FIX 2: Create stable reference for authUser._id
const authUserId = useMemo(() => authUser?._id, [authUser?._id]);

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

const unreadGroupMap = useMemo(() => {
    return Object.fromEntries(
        groupUnreadMessage.map((msg) => [msg.groupId, msg])
    )
}, [groupUnreadMessage])

// ✅ FIX 3: Combined sorting logic into ONE useMemo instead of useEffect
// This prevents unnecessary state updates that trigger re-renders
const { sortedUsers, sortedGroups } = useMemo(() => {
    const sortedUser = filteredUsers.reduce((acc, user) => {
        if (unreadMap[user.chatId]) acc.unshift(user)
        else acc.push(user)
        return acc
    }, [] as User[])

    const sortedGroup = groups.reduce((acc, group) => {
        if (unreadGroupMap[group._id]) acc.unshift(group)
        else acc.push(group)
        return acc
    }, [] as GroupWithoutPopulate[])

    return { sortedUsers: sortedUser, sortedGroups: sortedGroup }
}, [filteredUsers, unreadMap, groups, unreadGroupMap]);

// ✅ FIX 4: Added dependency array with stable references
useEffect(() => {
    getUsers();
    fecthGroups()
}, [getUsers, fecthGroups])

// ✅ FIX 5: Use memoized callback
useEffect(() => {
    getActiveUsersStable(groups)
}, [groups, getActiveUsersStable])

// ✅ FIX 6: Use stable authUserId reference to prevent unnecessary calls
useEffect(() => {
    if (authUserId) {
        fetchUnreadMessages(authUserId)
        FetchGroupUnreadMessage(authUserId)
    }
}, [authUserId, fetchUnreadMessages, FetchGroupUnreadMessage])

// ✅ FIX 7: This one is fine, no changes needed
useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    if (mediaQuery.matches) {
        setShowUserInfo(false)
    }

    const handler = (e: MediaQueryListEvent) => {
        if (e.matches) {
            setShowUserInfo(false)
        }
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
}, [setShowUserInfo])

    if (isUsersLoading) return <SidebarSkeleton />;

    // Todo : somany rerenders when a new user logins

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
                    <button className="btn btn-primary btn-sm w-full gap-2" onClick={() => cbForModal()}>
                        <Plus className="size-4" />
                        <span>Create A Group</span>
                    </button>
                </div>
            </div>


            <div className="border-b border-base-300">
                <button
                    onClick={() => setShowGroups(!showGroups)}
                    className={`w-full ${showUserInfo ? 'p-3' : 'p-1'} flex items-center justify-between hover:bg-base-200 transition-colors sticky top-0 z-50 bg-base-100`}
                >
                    <div className="flex items-center gap-1">
                        <span className={`font-medium ${showUserInfo ? 'text-sm' : 'text-xs'}`}>Groups</span>
                        <span className="text-xs text-zinc-500">({groups.length})</span>
                    </div>
                    <ChevronDown
                        className={`size-5 transition-transform ${showGroups ? "" : "-rotate-90"}`}
                    />
                </button>

                {showGroups && (
                    <div className="pb-2 max-h-[250px] overflow-y-auto overflow-x-hidden">
                        {sortedGroups.length > 0 ? (
                            sortedGroups.map((group) => (
                                <GroupList key={group._id} chatData={unreadGroupMap[group._id]} group={group} />
                            ))
                        ) : (
                            <div className="px-3 py-4 text-center text-sm text-zinc-500">
                                No groups yet
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="overflow-y-auto overflow-x-hidden w-full py-3 ">
                {sortedUsers?.map((user: User) => (
                    <UsersList key={user._id} chatData={unreadMap[user.chatId]} user={user} />
                ))}
                {filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>

    )
})
