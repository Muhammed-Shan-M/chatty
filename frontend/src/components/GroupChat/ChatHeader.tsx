


import { useGroupStore } from '../../store/group'
import { Info, LoaderCircle, X } from 'lucide-react'



export const ChatHeader = () => {
    const { selectedGroup, setSelectedGroup, fetchGroupInfo, isGroupInfoLoading } = useGroupStore()


    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedGroup?.avatar || "/avatar.png"} alt={selectedGroup?.groupName} />
                        </div>
                    </div>


                    <div>
                        <h3 className="font-medium">{selectedGroup?.groupName}</h3>
                        <p className="text-xs text-base-content/70">
                            {`${selectedGroup?.members.length} Members`}
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-2 md:gap-5'>
                    <button className='p-2 rounded-md hover:bg-base-200 transition-colors' onClick={() => fetchGroupInfo(selectedGroup?._id!)}>
                        {isGroupInfoLoading ? <LoaderCircle className='animate-spin' /> : <Info />}
                    </button>
                    <button onClick={() => setSelectedGroup(null)}>
                        <X />
                    </button>
                </div>
            </div>
        </div>
    )
}
