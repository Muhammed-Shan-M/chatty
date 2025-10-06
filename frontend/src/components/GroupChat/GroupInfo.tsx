"use client"
import { Pencil, Shield, Crown, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/useAuthStore"
import { useGroupStore } from "@/store/group"

export function GroupInfoPage() {

    const { authUser } = useAuthStore()

    const { groupInfo } = useGroupStore()



    const onMakeAdmin = (memberId: string) => { }
    const onEditGroup = () => { }

    const isAdmin = (() => {
        const adminSet = new Set(groupInfo?.admins);
        return (userId: string) => adminSet.has(userId);
    })();


    const currentUserIsAdmin = isAdmin(authUser?._id!)

    // Sort members: current user first, then others
    const sortedMembers = [...groupInfo?.members!].sort((a, b) => {
        if (a._id === authUser?._id!) return -1
        if (b._id === authUser?._id!) return 1
        return 0
    })

    // const getInitials = (name: string) => {
    //     return name
    //         .split(" ")
    //         .map((n) => n[0])
    //         .join("")
    //         .toUpperCase()
    //         .slice(0, 2)
    // }

    return (
        <div className="flex flex-col gap-6">
            {/* Group Info Section */}
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                    {/* Group Avatar */}
                    <Avatar className="w-full h-auto aspect-square rounded-none sm:w-32 sm:h-32 sm:rounded-full sm:shrink-0">
                        <AvatarImage src={groupInfo?.avatar || "/placeholder.svg"} alt={groupInfo?.groupName} />
                        {/* <AvatarFallback className="text-2xl md:text-3xl">{getInitials(groupInfo?.groupName!)}</AvatarFallback> */}
                    </Avatar>

                    {/* Group Details and Edit Button Container */}
                    <div className="flex items-start justify-between gap-4 flex-1 min-w-0">
                        {/* Group Details */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-2 break-words">
                                {groupInfo?.groupName}
                            </h1>
                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed break-words">
                                {groupInfo?.description}
                            </p>
                        </div>

                        {/* Edit Button - Only visible to admins */}
                        {currentUserIsAdmin && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={onEditGroup} className="shrink-0 hover:bg-accent">
                                            <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit group info</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                </div>
            </div>

            {/* Members Section */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="p-3 xs:p-4 border-b border-border">
                    <h2 className="text-base xs:text-lg font-semibold text-foreground">Members ({groupInfo?.members.length})</h2>
                </div>

                {/* Members List with Scrollbar */}
                <div className="max-h-[400px] overflow-y-auto">
                    <div className="divide-y divide-border">
                        {sortedMembers.map((member) => {
                            const isMemberAdmin = isAdmin(member._id)
                            const isOwner = groupInfo?.owner === member._id
                            const isCurrentUser = member._id === authUser?._id

                            return (
                                <div
                                    key={member._id}
                                    className="flex items-center justify-between gap-4 p-3 xs:p-4 hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {/* Member Avatar */}
                                        <Avatar className="h-9 w-9 xs:h-10 xs:w-10 shrink-0">
                                            <AvatarImage src={member.profile || "/placeholder.svg"} alt={member.fullName} />
                                            {/* <AvatarFallback>{getInitials(member.fullName)}</AvatarFallback> */}
                                        </Avatar>

                                        {/* Member Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-medium text-foreground truncate text-sm xs:text-base">
                                                    {isCurrentUser ? "You" : member.fullName}
                                                </span>

                                                {/* Owner Badge */}
                                                {isOwner && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="gap-1 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs xs:text-sm"
                                                    >
                                                        <Crown className="h-3 w-3" />
                                                        Owner
                                                    </Badge>
                                                )}

                                                {/* Admin Badge */}
                                                {isMemberAdmin && !isOwner && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="gap-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30 text-xs xs:text-sm"
                                                    >
                                                        <Shield className="h-3 w-3" />
                                                        Admin
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Make Admin Button - Only visible to admins and not for current user */}
                                    {currentUserIsAdmin && !isCurrentUser && !isMemberAdmin && (
                                        <div className="flex-shrink-0 ml-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => onMakeAdmin(member._id)}
                                                            className="hover:bg-accent"
                                                        >
                                                            <UserPlus className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Make admin</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
