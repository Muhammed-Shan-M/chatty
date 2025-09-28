import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, PenSquare, CircleUser, UserCheck } from 'lucide-react'
import { toast } from 'react-toastify'

export const Profile = () => {

  const { authUser, isUpdatingProfile, updateProfile, updatingFullName, updateFullName } = useAuthStore()

  const [selectedImg, setSelectedImage] = useState<string | null>(null)

  const [isEditingFullName, setIsEditingFullName] = useState(false)
  const [editedFullName, setEditedFullName] = useState(authUser?.fullName)

  const handleSaveFullName = async () => {
    await updateFullName({ fullName: editedFullName || '' })
    setIsEditingFullName(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      toast.error('No image selected. Kindly choose a profile picture')
      return false
    }

    const previewUrl = URL.createObjectURL(file)
    setSelectedImage(previewUrl)

    const formaData = new FormData()

    formaData.append('image', file)
    await updateProfile(formaData)

  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profile || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>


          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <CircleUser className="w-4 h-4" />
                Full Name
              </div>
              <div className="flex items-center gap-2">
                {isEditingFullName ? (
                  <>
                    <input
                      value={editedFullName}
                      onChange={(e: any) => setEditedFullName(e.target.value)}
                      className="px-4 py-2.5 rounded-lg border border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSaveFullName}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      {updatingFullName ? 'Updating...' : 'Save'}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
                    <button onClick={() => setIsEditingFullName(true)} className="text-zinc-500 hover:text-zinc-700">
                      <PenSquare className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                User Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.userName}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>


          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


