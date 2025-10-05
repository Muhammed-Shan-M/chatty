
import type { IGroup } from "./Group";


export interface GroupStore {
    groups: IGroup[],
    isCreatingGroup: boolean

    createGroup: (formData:FormData ) => Promise<void> 
    fecthGroups: () => Promise<void>
}