
import type { IGroup } from "./Group";


export interface GroupStore {
    groups: IGroup[],
    isCreatingGroup: boolean

    groupInfo: IGroup | null
    isGroupInfoLoading : boolean

    showGroupInfo: boolean

    isGroupChat: boolean,
    selectedGroup: IGroup | null,

    createGroup: (formData:FormData ) => Promise<void> 
    fecthGroups: () => Promise<void>
    setSelectedGroup: (group: IGroup | null) => Promise<void>
    fetchGroupInfo: (groupId: string) => Promise<void>
    setShowGroupInfo: (val: boolean) => void
}