
import { ChatHeader } from './ChatHeader'
import { MessageInput } from '../GroupChat/MessageInput'
import { useAuthStore } from '../../store/useAuthStore'
import { formateTime } from '../../utility/formateTime'
import { AudioPlayer } from '../Helpingcomponents/AudioPlayerProps'
import { useGroupStore } from '../../store/group'
import { getStartMessage } from '../../utility/getWelcomeMessage'
import { GroupInfoPage } from './GroupInfo'
import { useGroupChatStore } from '@/store/groupChatStore'
import { use, useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import type { GroupChatStore } from '@/types/GroupChatStore'


export const ChatContainer = () => {

    const { authUser } = useAuthStore()
    const { messages, getMessages, joinToGroup , leaveGroup} = useGroupChatStore(
        useShallow((state:GroupChatStore) => ({
            messages:state.groupMessages,
            getMessages: state.getMessages,
            joinToGroup: state.joinToGroup,
            leaveGroup: state.leaveGroup
        }))
    )
    const { showGroupInfo, selectedGroup } = useGroupStore()

    useEffect(() => {
        if(!selectedGroup)return

        getMessages(selectedGroup._id)

        joinToGroup(selectedGroup?._id)

        return () => leaveGroup(selectedGroup?._id)

    }, [getMessages, selectedGroup, joinToGroup, leaveGroup])

    

    if (showGroupInfo) {
        return (
            <div className=" w-full bg-background p-1 overflow-auto">
                <GroupInfoPage />
            </div>
        )
    }

    
    
    const welcomeText = getStartMessage(selectedGroup!, authUser?._id!)

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex flex-col items-center justify-center text-center bg-base-200 rounded-lg p-4 my-3">
                    <h2 className="text-lg font-semibold mb-1">Welcome to {selectedGroup?.groupName}</h2>
                    <p className="text-sm text-base-content/70">{welcomeText}</p>
                </div>
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId._id === authUser?._id ? "chat-end" : "chat-start"}`}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message?.senderId._id === authUser?._id
                                            ? authUser.profile || "/avatar.png"
                                            : message.senderId.profile || "/avatar.png" // Todo: populated data here
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            {message.senderId.userName}
                            <time className="text-xs opacity-50 ml-1">
                                {formateTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.attachments && message.attachments.length > 0 && (
                                <>
                                    {message.attachments.map((file, index) => (
                                        file.fileType === 'image' ? (
                                            <img
                                                key={index}
                                                src={file.url}
                                                alt="Attachment"
                                                className="sm:max-w-[200px] rounded-md mb-2"
                                            />
                                        ) : file.fileType === 'voice' ? (
                                            <AudioPlayer key={index} src={file.url} />
                                        ) : null  
                                    ))}
                                </>
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    )
}
