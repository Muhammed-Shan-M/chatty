"use client"
import { Shield, Crown, Plus, ShieldPlus, UserMinus, Search, ShieldMinus, EllipsisVertical } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { useGroupStore } from "@/store/group"
import { useEffect, useRef, useState } from "react"
import EditGroupModal from "../Modals/EditGroupInfoModal"
import GroupInfoSkeleton from "../Skeleton/GroupInfoSkelton"
import { AddMembersModal } from "../Modals/AddUserModal"
import { ConfirmationModal } from "../alertModals/confirmationModal"
import type { Purpose } from "@/types/Purpose"



export function GroupInfoPage() {

    const { authUser } = useAuthStore()

    const { groupInfo, setShowGroupInfo, isGroupInfoLoading, removeMember, putAsAdmin, removeAdmin } = useGroupStore()
    const [memberQuery, setMemberQuery] = useState("")
    const [isEditModalOpen, setisEditModalOpen] = useState(false)

    const [openAddPepole, setOpenAddPepole] = useState(false)

    const [isConfirmation, setIsConfirmation] = useState(false)
    const [currentuserId, setCurrentUserId] = useState('')
    const [confirmatioPurpose, setConfirmationPurpose] = useState<Purpose>('')


    const [showBioFull, setShowBioFull] = useState(false)
    const bioref = useRef<HTMLDivElement | null>(null)
    const bio = showBioFull ? groupInfo?.description : groupInfo?.description.slice(0, 200)
    useEffect(() => {
        if (bioref.current) {
            bioref.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [showBioFull])


    if (isGroupInfoLoading) {
        return <GroupInfoSkeleton />
    }


    const isAdmin = (() => {
        const adminSet = new Set(groupInfo?.admins);
        return (userId: string) => adminSet.has(userId);
    })();


    const currentUserIsAdmin = isAdmin(authUser?._id!)

    // Sort members: current user first, then others
    const sortedMembers = [...groupInfo?.members!].sort((a, b) => {
        if (a._id === authUser?._id!) return -1
        if (b._id === authUser?._id!) return 1
        return 0
    })

    const handleUserOP = (purpose: Purpose, id: string) => {
        setIsConfirmation(true)
        setCurrentUserId(id)
        setConfirmationPurpose(purpose)
    }

    const handleConfirm = async () => {
        setIsConfirmation(false)

        if (confirmatioPurpose === 'put-as-admin') {
            await putAsAdmin(currentuserId)
        } else if (confirmatioPurpose === 'remove-as-admin') {
            await removeAdmin(currentuserId)
        } else if (confirmatioPurpose === 'remove-user') {
            await removeMember(currentuserId)
        }

        setCurrentUserId('')
    }


    return (
        <div className="min-h-dvh bg-base-100 text-base-content ">

            {isEditModalOpen &&
                <EditGroupModal
                    open={isEditModalOpen}
                    onClose={() => setisEditModalOpen(false)}
                />}

            {openAddPepole &&
                <AddMembersModal open={openAddPepole} onClose={() => setOpenAddPepole(false)} />
            }

            <ConfirmationModal
                onclose={() => setIsConfirmation(false)}
                open={isConfirmation}
                handleConfirm={handleConfirm}
                purpose={confirmatioPurpose} />

            {/* Top bar */}
            <header className="navbar bg-base-100 sticky top-0 z-10 px-2">
                <div className="navbar-start">
                    <button type="button" aria-label="Back" className="btn btn-ghost btn-circle" onClick={() => setShowGroupInfo(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
                <div className="navbar-center" />
                <div className="navbar-end">
                    {currentUserIsAdmin && (
                        <button className="btn btn-ghost btn-sm" onClick={() => setisEditModalOpen(true)}>
                            Edit
                        </button>
                    )}
                </div>
            </header>

            <main className="mx-auto px-4 pb-7 w-full max-w-2xl">
                {/* Group header section */}
                <section className="mb-5 flex flex-col items-center text-center pt-4">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={groupInfo?.avatar || "/placeholder-user.jpg"} alt={groupInfo?.groupName || "Group avatar"} />
                        </div>
                    </div>
                    <h1 className="mt-3 text-xl font-semibold">{groupInfo?.groupName}</h1>
                    {groupInfo?.description ?
                        <div
                            className="mt-2 text-sm opacity-70 whitespace-pre-wrap text-left"
                        >
                            {bio}
                            <button onClick={() => setShowBioFull(!showBioFull)}
                                className="text-sm text-primary hover:underline">{showBioFull ? ' See Less' : ' ..See More'}</button>
                        </div>

                        : null}
                </section>

                {/* Settings row replacement -> Add People (admins only) */}
                {currentUserIsAdmin && (
                    <section className="mt-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="badge badge-primary badge-xs" aria-hidden />
                                <span className="text-sm font-medium">Group Actions</span>
                            </div>
                            <button
                                className="btn btn-primary btn-sm gap-2"
                                onClick={() => setOpenAddPepole(true)}
                            >
                                <Plus className="size-4" />
                                <span className="hidden sm:inline">Add people</span>
                            </button>
                        </div>
                    </section>
                )}

                {/* Members header */}
                <h2 className="mt-6 mb-2 text-sm font-semibold opacity-70">
                    People In The Room ({groupInfo?.members?.length ?? 0})
                </h2>

                <div className="mb-2">
                    <label className="input input-bordered flex items-center gap-2 w-full" htmlFor="member-search">
                        <Search className="size-4 opacity-70" aria-hidden />
                        <input
                            id="member-search"
                            type="text"
                            placeholder="Search members"
                            className="grow"
                            value={memberQuery}
                            onChange={(e) => {
                                // UI only: not filtering. Implement filtering in your app.
                                // setMemberQuery(e.target.value)
                            }}
                        />
                    </label>
                </div>

                {/* Members list with fixed height + scrollbar */}
                <section className="card bg-base-100 border border-base-300 mt-3">
                    <div className="h-80 md:h-[60vh] overflow-y-auto p-3">
                        {sortedMembers.map((m) => {
                            const isOwner = groupInfo?.owner === m._id
                            const admin = isAdmin(m._id)
                            const isCurrentUser = m._id === authUser?._id
                            return (
                                <div key={m._id} className="sm:px-3">
                                    <div className="flex px-2 rounded-lg items-center hover:bg-accent/15 gap-3 py-3 border-b border-base-300 last:border-b-0">
                                        {/* avatar */}
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={m.profile || "/avatar.png"} alt={m.fullName} />
                                            </div>
                                        </div>

                                        {/* main text + badges */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-medium truncate">{isCurrentUser ? "You" : m.userName}</span>
                                                {isOwner && (
                                                    <span className="badge badge-warning badge-outline gap-1">
                                                        <Crown className="size-3" />
                                                        <span className="text-[11px]">Owner</span>
                                                    </span>
                                                )}
                                                {!isOwner && admin && (
                                                    <span className="badge badge-info badge-outline gap-1">
                                                        <Shield className="size-3" />
                                                        <span className="text-[11px]">Admin</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>


                                        {currentUserIsAdmin && !isOwner && !isCurrentUser && (
                                            <>
                                                <button className="block sm:hidden" popoverTarget={`popover-${m._id}`} style={{ anchorName: `--anchor-${m._id}` } as React.CSSProperties}>
                                                    <EllipsisVertical />
                                                </button>

                                                <ul className="dropdown dropdown-end menu w-52 rounded-box bg-base-100 shadow-sm"
                                                    popover="auto" id={`popover-${m._id}`} style={{ positionAnchor: `--anchor-${m._id}` } as React.CSSProperties}
                                                    >
                                                    {!admin &&
                                                        <li>
                                                            <a
                                                                onClick={() => {
                                                                    document.getElementById(`popover-${m._id}`)?.hidePopover();
                                                                    handleUserOP('put-as-admin', m._id)
                                                                }}
                                                            ><ShieldPlus className="size-4" /> Make Admin</a>
                                                        </li>}
                                                    {admin &&
                                                        <li>
                                                            <a
                                                                onClick={() => {
                                                                    document.getElementById(`popover-${m._id}`)?.hidePopover();
                                                                    handleUserOP('remove-as-admin', m._id)
                                                                }}
                                                            ><ShieldMinus className="size-4" /> Remove Admin</a>
                                                        </li>}
                                                    <li>
                                                        <a
                                                            onClick={() => {
                                                                document.getElementById(`popover-${m._id}`)?.hidePopover();
                                                                handleUserOP('remove-user', m._id)
                                                            }}
                                                        ><UserMinus className="size-4" /> Remove User</a>
                                                    </li>
                                                </ul>
                                            </>
                                        )}



                                        {currentUserIsAdmin && !isOwner && !isCurrentUser && (
                                            <div className="hidden sm:flex items-center gap-1">
                                                <button
                                                    className="btn btn-ghost btn-xs text-error"
                                                    title={`Remove ${m.fullName}`}
                                                    aria-label={`Remove ${m.fullName}`}
                                                    onClick={() => handleUserOP("remove-user", m._id)}
                                                    type="button"
                                                >
                                                    <UserMinus className="size-4" />
                                                </button>

                                                {admin && (
                                                    <button
                                                        className="btn btn-ghost btn-xs text-error"
                                                        title={`Remove ${m.userName} as admin`}
                                                        aria-label={`Remove ${m.userName} as admin`}
                                                        onClick={() => handleUserOP('remove-as-admin', m._id)}
                                                        type="button"
                                                    >
                                                        <ShieldMinus className="size-4" />
                                                    </button>
                                                )}


                                                {!admin && (
                                                    <button
                                                        className="btn btn-ghost btn-xs text-warning"
                                                        title={`Make ${m.fullName} admin`}
                                                        aria-label={`Make ${m.fullName} admin`}
                                                        onClick={() => handleUserOP('put-as-admin', m._id)}
                                                        type="button"
                                                    >
                                                        <ShieldPlus className="size-4" />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>

            <div className="h-16 px-3 bg-base-100 border-base-300 flex items-center">
                <button className="btn btn-error btn-outline [@media(min-width:800px)]:w-[640px] w-full mx-auto"
                // onClick={onLeaveGroup}
                >
                    Leave Group
                </button>
            </div>
        </div>
    )
}
