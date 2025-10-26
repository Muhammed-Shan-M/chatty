import React, { useCallback } from 'react'
import { useChatStore } from '../store/chatStore'
import { NoChatSelected } from '../components/chatParts/NoChatSelected'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { ChatLoadingSkeleton } from '../components/Skeleton/chatLoadingSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import CreateGroupModal from '../components/Modals/createGroupModal'
import { useState } from 'react'
import { ChatContainer as PrivetChatContainer } from '../components/chatParts/ChatContainer'
import { ChatContainer as GroupChatContainer } from '../components/GroupChat/ChatContainer'
import { useGroupStore } from '../store/group'
import { useShallow } from 'zustand/shallow'
import type { GroupStore } from '@/types/groupStore'

export const Home = React.memo(() => {

  const selectedUser = useChatStore(state => state.selectedUser)
  const showUserInfo = useAuthStore(state => state.showUserInfo)
  const {selectedGroup, isGroupChat} = useGroupStore(
    useShallow((state: GroupStore) => ({
      selectedGroup: state.selectedGroup,
      isGroupChat: state.isGroupChat
    }))
  )
  

  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false)

  const handleOpenCreateGroupModal = useCallback(() => {
    setIsCreateGroupModalOpen(true)
  },[])

  // TODO: need more improve on the design when the side bar open 
  return (
    <>
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar cbForModal={handleOpenCreateGroupModal} />


              {showUserInfo && <ChatLoadingSkeleton />}

              {!showUserInfo ? (
                isGroupChat
                  ? selectedGroup
                    ? <GroupChatContainer />
                    : <NoChatSelected />
                  : selectedUser
                    ? <PrivetChatContainer />
                    : <NoChatSelected />
              ) : null}

              {/* {!showUserInfo && (!selectedUser ? <NoChatSelected /> : <PrivetChatContainer />)} */}
            </div>
          </div>
        </div>
      </div>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
      />
    </>
  )
})
