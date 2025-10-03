import { useChatStore } from '../store/chatStore'


import { NoChatSelected } from '../components/NoChatSelected'
import { ChatContainer } from '../components/ChatContainer'
import { Sidebar } from '../components/Sidebar'
import { useState } from 'react'
import { ChatLoadingSkeleton } from '../components/Skeleton/chatLoadingSkeleton'
import { useAuthStore } from '../store/useAuthStore'

export const Home = () => {
  const { selectedUser } = useChatStore()
  const {showUserInfo} = useAuthStore()


  // TODO: need more improve on the design when the side bar open 
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

          
            {showUserInfo && <ChatLoadingSkeleton />}

            {!showUserInfo && (!selectedUser ? <NoChatSelected /> : <ChatContainer />)}
          </div>
        </div>
      </div>
    </div>
  )
}
