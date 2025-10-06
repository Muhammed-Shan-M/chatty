import type { IGroup } from "../types/Group";

export function getStartMessage(selectedGroup: IGroup, userId: string) {
    let role 
    if(selectedGroup.owner === userId)role = 'owner'
    else if(selectedGroup.admins.includes(userId))role = 'admin'
    else role = 'member'

    return getWelcomeMessage(role, selectedGroup.groupName)
}








function getWelcomeMessage(role: string, groupName: string) {
  switch (role) {
    case "owner":
      return `You created "${groupName}". Add members and explore the cool features!`;
    case "admin":
      return `Welcome to "${groupName}". You were added as an admin — manage members and keep the group active.`;
    default:
      return `Welcome to "${groupName}"! You were added by an admin. Enjoy chatting!`;
  }
}