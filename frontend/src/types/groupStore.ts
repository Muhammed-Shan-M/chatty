
import type { GroupWithoutPopulate, IGroup } from "./Group";



export interface GroupStore {
    groups: GroupWithoutPopulate[],
    isCreatingGroup: boolean

    groupInfo: IGroup | null
    isGroupInfoLoading : boolean

    showGroupInfo: boolean

    isGroupChat: boolean,
    selectedGroup: GroupWithoutPopulate | null,

    createGroup: (formData:FormData ) => Promise<void> 
    fecthGroups: () => Promise<void>
    setSelectedGroup: (group: GroupWithoutPopulate | null) => Promise<void>
    fetchGroupInfo: (groupId: string) => Promise<void>
    setShowGroupInfo: (val: boolean) => void
    editGroupInfo:(data: FormData) => Promise<void>
}