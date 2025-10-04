import { useChatStore } from '../store/chatStore'
import { NoChatSelected } from '../components/NoChatSelected'
import { ChatContainer } from '../components/ChatContainer'
import { Sidebar } from '../components/Sidebar'
import { ChatLoadingSkeleton } from '../components/Skeleton/chatLoadingSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import CreateGroupModal from '../components/Modals/createGroupModal'
import { useState } from 'react'

export const Home = () => {
  const { selectedUser } = useChatStore()
  const { showUserInfo } = useAuthStore()
  const [isCreateGroupModalOpen,setIsCreateGroupModalOpen] = useState(false)

  const handleOpenCreateGroupModal = () => {
    setIsCreateGroupModalOpen(true)
  }


  // TODO: need more improve on the design when the side bar open 
  return (
    <>
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar cbForModal={handleOpenCreateGroupModal}/>


              {showUserInfo && <ChatLoadingSkeleton />}

              {!showUserInfo && (!selectedUser ? <NoChatSelected /> : <ChatContainer />)}
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
}
