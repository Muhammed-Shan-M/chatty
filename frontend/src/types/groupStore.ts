
import type { GroupWithoutPopulate, IGroup } from "./Group";



export interface GroupStore {
    groups: GroupWithoutPopulate[],
    isCreatingGroup: boolean

    groupInfo: IGroup | null
    isGroupInfoLoading : boolean

    showGroupInfo: boolean

    isGroupChat: boolean,
    selectedGroup: GroupWithoutPopulate | null,

    activeUsers: Record<string, number>

    createGroup: (formData:FormData ) => Promise<void> 
    fecthGroups: () => Promise<void>
    setSelectedGroup: (group: GroupWithoutPopulate | null) => Promise<void>
    fetchGroupInfo: (groupId: string) => Promise<void>
    setShowGroupInfo: (val: boolean) => void
    editGroupInfo:(data: FormData) => Promise<void>
    addMembers:(members:string[]) => Promise<void>
    removeMember: (userId: string) => Promise<void>
    putAsAdmin: (userId: string) => Promise<void>
    removeAdmin: (userId: string) => Promise<void>
    setActiveUsers:(activeusers:Record<string, number>) => void
}