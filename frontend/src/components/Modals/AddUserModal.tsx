// 'use client'
import { useGroupStore } from "@/store/group"
import type { User } from "@/types/user"
import { fetchUsers } from "@/utility/fetchusers"
import { LoaderCircle, Search, X } from "lucide-react"
import React, { useEffect, useState } from "react"


type AddMembersModalProps = {
    open: boolean
    onClose: () => void
    onConfirm?: (selectedIds: string[]) => void
}

export function AddMembersModal({ open, onClose, }: AddMembersModalProps) {

    const { selectedGroup , addMembers} = useGroupStore()

    const [query, setQuery] = useState("")
    const [selected, setSelected] = useState<Set<string>>(new Set([]))
    const [users, setusers] = useState<User[]>([])
    const [isUsersLoading, setIsUsresLoading] = useState(false)

    useEffect(() => {
        setIsUsresLoading(true)
        const handler = async () => {
            const usersData = await fetchUsers(selectedGroup?._id || '')
            setusers(usersData)
            setIsUsresLoading(false)
        }
        handler()
    }, [])

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return users
        return users.filter((u) => {
            const inName = u.fullName.toLowerCase().includes(q)
            const inUser = (u.userName ?? "").toLowerCase().includes(q)
            return inName || inUser
        })
    }, [users, query])


    function toggleUser(id: string) {
        setSelected((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    function removeUser(id: string) {
        setSelected((prev) => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
    }

    async function handleConfirm() {
        onClose()
        await addMembers([...selected])
    }


    return (
        <div
            className={["modal", open ? "modal-open" : ""].join(" ")}
            aria-hidden={!open}
            role="dialog"
            aria-modal="true"
        >
            {/* backdrop */}
            <div className="modal-backdrop" onClick={onClose} />

            {/* modal-box with responsive sizing and internal scroll for the list */}
            <div
                className={[
                    "modal-box bg-base-100 text-base-content",
                    "w-[min(100vw-1.5rem,44rem)]", // clamp width
                    "max-h-[85vh] sm:max-h-[75vh] p-0", // clamp height for scrolling
                    "overflow-hidden flex flex-col",
                ].join(" ")}
            >
                {/* Header */}
                <div className="px-5 pt-5 pb-3">
                    <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">Add Members</h3>
                        <button aria-label="Close" className="btn btn-ghost btn-sm" onClick={onClose}>
                            <X/>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mt-3">
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <Search />
                            <input
                                aria-label="Search users"
                                type="text"
                                className="grow"
                                placeholder="Search users..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* Selected chips */}
                    <div className="mt-3">
                        <div className="text-sm opacity-80 mb-2">Selected Members ({selected.size})</div>
                        {selected.size > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {Array.from(selected).map((id) => {
                                    const u = users.find((x) => x._id === id)
                                    if (!u) return null
                                    return (
                                        <span key={id} className="badge badge-lg gap-1 bg-primary/20 text-primary border-primary/30">
                                            {u.userName}
                                            <button
                                                aria-label={`Remove ${u.fullName}`}
                                                className="btn btn-ghost btn-xs px-1 min-h-0 h-5"
                                                onClick={() => removeUser(id)}
                                            >
                                                <X size={16}/>
                                            </button>
                                        </span>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="text-sm opacity-60">No members selected yet.</div>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="divider my-0" />

                {/* List */}
                <div className="px-2 pb-2 overflow-y-auto h-[350px]">
                    <div className="bg-base-200/40 rounded-box divide-y divide-base-300">
                        
                        {filtered.length > 0 ? (
                            filtered.map((u) => {
                                const isSelected = selected.has(u._id)

                                return (
                                    <div
                                        key={u._id}
                                        className=
                                            "flex items-center gap-3 px-3 py-3 bg-base-100"
                                    >
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={u.profile || "./avatar.png"} alt={`${u.fullName} avatar`} />
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="font-medium truncate">{u.userName}</div>
                                            {u.userName && <div className="text-sm opacity-70 truncate">{u.fullName}</div>}
                                        </div>

                                        <div>
                                            {!isSelected ? (
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => toggleUser(u._id)}
                                                >
                                                    Add
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-outline btn-error btn-sm"
                                                    onClick={() => toggleUser(u._id)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            isUsersLoading ? <div className="h-[240px] flex items-center justify-center"><LoaderCircle className="animate-spin"/></div> :
                            <div className="h-[240px] flex items-center justify-center px-3 py-6 text-center opacity-70">No users found.</div>
                        )}
                    </div>
                </div>


                {/* Footer */}
                <div className="modal-action px-5 pb-5 pt-3">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" disabled={selected.size === 0} onClick={handleConfirm}>
                        Add To Group
                    </button>
                </div>
            </div>
        </div>
    )
}
