export interface Group {
    groupName: string,
    members: string[],
    admins: string[],
    owner: string,
    avatar: string,
    description: string
}


export interface IGroup extends Group{
    _id: string,
    createdAt: string,
    updatedAt: string
}