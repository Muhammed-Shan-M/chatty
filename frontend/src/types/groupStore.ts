
import type { IGroup } from "./Group";


export interface GroupStore {
    groups: IGroup[],
    isCreatingGroup: boolean

    isGroupChat: boolean,
    selectedGroup: IGroup | null,

    createGroup: (formData:FormData ) => Promise<void> 
    fecthGroups: () => Promise<void>
    setSelectedGroup: (group: IGroup) => Promise<void>
}