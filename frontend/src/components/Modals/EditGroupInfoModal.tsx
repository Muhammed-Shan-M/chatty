"use client"

import { useMemo, useRef, useState, type FormEvent } from "react"
import { Camera, Save, X } from "lucide-react"
import { useGroupStore } from "@/store/group"
import { toast } from "react-toastify"

type EditGroupModalProps = {
    open: boolean
    onClose: () => void
}

export function EditGroupModal({ open, onClose }: EditGroupModalProps) {


    const { groupInfo,editGroupInfo } = useGroupStore()

    const fileInputRef = useRef<HTMLInputElement | null>(null)


    const [name, setName] = useState(groupInfo?.groupName)
    const [description, setDescription] = useState(groupInfo?.description)
    const [file, setFile] = useState<File | null>(null)

    const previewUrl = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file)
        }
        return groupInfo?.avatar
    }, [file, groupInfo?.avatar])


    const saveGroupInfo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name === groupInfo?.groupName && description === groupInfo?.description && !file) {
            toast.info("No changes detected. Please update group details before saving.");
            return;
        }

        if(!name ){
            toast.error("Group name is required.");
            return
        }

        const formdata = new FormData()
        formdata.append('groupName',name)
        formdata.append('description',description || '')
        
        if(file){
            const avatar = fileInputRef.current?.files?.[0] || ''
            formdata.append('avatar', avatar)
        }

        onClose()
        await editGroupInfo(formdata)

    }





    if (!open) return null

    return (
        <div className="modal modal-open z-50">
            {/* overlay to close on outside click */}
            <div className="modal-backdrop" onClick={onClose} />
            <div className="modal-box w-11/12 max-w-md md:max-w-xl lg:max-w-2xl p-4 md:p-6 rounded-2xl bg-base-100 text-base-content shadow-xl max-h-[85vh] overflow-y-auto">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg md:text-xl font-semibold text-base-content">Edit group</h3>
                    <button aria-label="Close" onClick={onClose} className="btn btn-ghost btn-sm">
                        <X className="size-4" />
                    </button>
                </div>

                <div className="divider my-3 md:my-4"></div>

                {/* content */}
                <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6">
                    {/* avatar + edit photo */}
                    <div className="flex flex-col items-center">
                        <div className="avatar">
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full ring ring-base-300 ring-offset-2 ring-offset-base-100 overflow-hidden">
                                {/* use a placeholder if no avatar */}
                                <img
                                    src={
                                        previewUrl ||
                                        "/placeholder.svg?height=112&width=112&query=group%20avatar%20placeholder" ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg"
                                    }
                                    alt="Group avatar"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline btn-sm mt-3 gap-2"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="size-4" />
                            <span className="hidden sm:inline">Edit photo</span>
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const f = e.target.files?.[0] || null
                                setFile(f)
                            }}
                        />
                    </div>

                    {/* form fields */}
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={saveGroupInfo}
                    >
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Group name</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Enter group name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered min-h-28 w-full"
                                placeholder="Write a short description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>

                        {/* footer buttons */}
                        <div className="mt-2 flex items-center justify-end gap-2">
                            <button type="button" onClick={onClose} className="btn btn-ghost">
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary gap-2">
                                <Save className="size-4" />
                                <span className="hidden sm:inline">Save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditGroupModal
