import { useGroupStore } from '../../store/group';
import { useAuthStore } from '../../store/useAuthStore';
import type { IGroup } from '../../types/Group';

interface GroupListItemProps {
    group: IGroup;
    // selectedGroup?: IGroup | null;
    // add other props like chatData if needed
}


export const GroupList = ({ group }: GroupListItemProps) => {

    const { setShowUserInfo, showUserInfo } = useAuthStore()
    const {selectedGroup, setSelectedGroup} = useGroupStore()

    return (
        <button
            key={group._id}
            onClick={() => {
                setSelectedGroup(group)
                setShowUserInfo(false)
            }}
            className={`
        w-full p-3 flex items-center gap-3 relative transition-colors
        ${selectedGroup?._id === group._id ? "bg-base-300 ring-1 ring-base-300" : "hover:bg-base-300"}
    `}
        >

            <div className={`relative flex-shrink-0 ${showUserInfo ? "" : "mx-auto"}`}>
                <img
                    src={group.avatar || "/avatar.png"}
                    alt={group.groupName}
                    className="size-12 object-cover rounded-full"
                />
            </div>



                <div className="text-left min-w-0 flex-1">
                    <div className="font-medium truncate">{group.groupName}</div>
                    <div className="text-sm text-zinc-400 flex justify-between items-center">
                        {/* Last message preview */}
                    </div>
                </div>

        </button>
    )
}
