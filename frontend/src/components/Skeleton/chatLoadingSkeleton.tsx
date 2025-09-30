import { MessageSkeleton } from "./MessageSkeleton"

export const ChatLoadingSkeleton = () => {
  return (
<div className="flex-1 flex flex-col h-full min-w-0">
  {/* Header Loading Skeleton */}
  <div className="border-b border-base-300 p-4">
    <div className="flex items-center gap-3">
      <div className="skeleton w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-3 w-16" />
      </div>
    </div>
  </div>

  {/* Messages Loading Skeleton */}
  <MessageSkeleton />

  {/* Input Loading Skeleton */}
  <div className="border-t border-base-300 p-4">
    <div className="flex items-center gap-2">
      <div className="skeleton h-10 flex-1 rounded-md" />
      <div className="skeleton h-10 w-10 rounded-md" />
    </div>
  </div>
</div>

  )
}
