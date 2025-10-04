"use client"

import { useState } from "react"
import { X, Search, Upload } from "lucide-react"
import { useChatStore } from "../../store/chatStore"

interface CreateGroupModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
    const [groupName, setGroupName] = useState("")
    const [description, setDescription] = useState("")
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [selectedMembers, setSelectedMembers] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    const avatarOptions = [
        "https://api.dicebear.com/7.x/shapes/svg?seed=group1",
        "https://api.dicebear.com/7.x/shapes/svg?seed=group2",
        "https://api.dicebear.com/7.x/shapes/svg?seed=group3",
    ]

    const { users } = useChatStore()

    const filteredUsers = users.filter((user) =>
        user.userName?.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleAddMember = (user: any) => {
        if (!selectedMembers.find((m) => m._id === user._id)) {
            setSelectedMembers([...selectedMembers, user])
        }
    }

    const handleRemoveMember = (userId: string) => {
        setSelectedMembers(selectedMembers.filter((m) => m._id !== userId))
    }

    const handleCreate = () => {
        // if (groupName.trim()) {
        //   onCreateGroup({
        //     name: groupName,
        //     description,
        //     avatar: selectedAvatar || avatarOptions[0],
        //     members: selectedMembers,
        //   })
        //   // Reset form
        //   setGroupName("")
        //   setDescription("")
        //   setSelectedAvatar("")
        //   setSelectedMembers([])
        //   setSearchQuery("")
        // }
    }

    if (!isOpen) return null

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-2xl bg-base-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Create A Group</h3>
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex gap-4 mb-4">
                    {/* Avatar Circle - Left Side */}
                    <div className="flex-shrink-0">
                        <label className="label">
                            <span className="label-text font-medium">Avatar</span>
                        </label>
                        <div className="relative">
                            <div className="size-24 rounded-full bg-base-200 border-2 border-base-300 overflow-hidden flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                                {selectedAvatar ? (
                                    <img
                                        src={selectedAvatar || "/placeholder.svg"}
                                        alt="Group avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Upload className="size-8 text-base-content/40" />
                                )}
                            </div>
                            {/* Avatar Options Dropdown */}
                            <div className="mt-2 flex gap-2">
                                {avatarOptions.map((avatar, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className={`size-10 rounded-full overflow-hidden border-2 hover:border-primary transition-colors ${selectedAvatar === avatar ? "border-primary ring-2 ring-primary ring-offset-2" : "border-base-300"
                                            }`}
                                    >
                                        <img
                                            src={avatar || "/placeholder.svg"}
                                            alt={`Avatar ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form Fields - Right Side */}
                    <div className="flex-1 flex flex-col">
                        {/* Group Name Input */}
                        <div className="form-control mb-3">
                            <label className="label">
                                <span className="label-text font-medium">Group Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter group name"
                                className="input input-bordered w-full rounded-lg"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </div>

                        {/* Description Textarea with fixed height and scrollbar */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
                            </label>
                            <textarea
                                placeholder="Enter group description"
                                className="textarea textarea-bordered rounded-lg h-24 w-full resize-none overflow-y-auto"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Selected Members Display */}
                {selectedMembers.length > 0 && (
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text font-medium">Selected Members ({selectedMembers.length})</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {selectedMembers.map((member) => (
                                <div key={member._id} className="badge badge-primary gap-2 p-3">
                                    <span>{member.userName}</span>
                                    <button onClick={() => handleRemoveMember(member._id)} className="hover:text-error">
                                        <X className="size-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* User List Section */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Add Members</span>
                    </label>

                    {/* Search Bar */}
                    <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/50" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="input input-bordered w-full pl-10 rounded-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Scrollable User List */}
                    <div className="border border-base-300 rounded-lg max-h-60 overflow-y-auto">
                        {filteredUsers.length === 0 ? (
                            <div className="text-center py-8 text-base-content/50">No users found</div>
                        ) : (
                            filteredUsers.map((user) => {
                                const isAdded = selectedMembers.find((m) => m._id === user._id)
                                return (
                                    <div
                                        key={user._id}
                                        className="flex items-center justify-between p-3 hover:bg-base-200 border-b border-base-300 last:border-b-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.profile || "/avatar.png"}
                                                alt={user.userName}
                                                className="size-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <div className="font-medium">{user.userName}</div>
                                                <div className="text-sm text-base-content/60">{user.fullName}</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => (isAdded ? handleRemoveMember(user._id) : handleAddMember(user))}
                                            className={`btn btn-sm ${isAdded ? "btn-error" : "btn-primary"}`}
                                        >
                                            {isAdded ? "Remove" : "Add"}
                                        </button>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="modal-action">
                    <button onClick={onClose} className="btn btn-ghost">
                        Cancel
                    </button>
                    <button onClick={handleCreate} className="btn btn-primary" disabled={!groupName.trim()}>
                        Create Group
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    )
}
