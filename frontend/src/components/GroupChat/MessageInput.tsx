import { useEffect, useRef, useState } from "react";
import { Image, LoaderCircle, Mic, Send, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { useGroupChatStore } from "@/store/groupChatStore";


export const MessageInput = () => {

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isSendMessageLoading } = useGroupChatStore();
    const {sendMessage} = useGroupChatStore()



    //new things
    const shouldSend = useRef(false)
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const [audioLevel, setAudioLevel] = useState(0)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file?.type.startsWith("image/")) {
            toast.error('Only image files are allowed. Please select a valid image.')
            return
        }

        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
    }


    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isRecording && mediaRecorderRef.current) {
            shouldSend.current = true
            stopRecording()
            return
        }

        if (!text && !imagePreview) return

        try {
            const formaData = new FormData()
            const file = fileInputRef.current?.files?.[0] || ""

            formaData.append('image', file)
            formaData.append('text', text)
            await sendMessage(formaData) // Todo: give the funtion from groupmessages

            setText("");
            removeImage()
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    }



    // new things....

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

            // Setup MediaRecorder
            mediaRecorderRef.current = new MediaRecorder(stream)
            const audioChunks: Blob[] = []

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunks.push(event.data)
            }

            mediaRecorderRef.current.onstop = async () => {

                if(!shouldSend.current){
                    mediaRecorderRef.current = null
                    stream.getTracks().forEach((track) => track.stop())
                    return
                }

                
                try {
                    const audioBlob = new Blob(audioChunks, { type: "audio/webm" })

                    const formData = new FormData()
                    formData.append("voice", audioBlob, `voice_${Date.now()}.webm`)

                    if(fileInputRef.current?.files && fileInputRef.current.files.length > 0){
                        const file = fileInputRef.current?.files?.[0] || ""
                        formData.append('image',file)
                    }

                    await sendMessage(formData) // Todo: give the funtion from groupmessages

                    if(fileInputRef.current)removeImage()
                } catch (error) {
                    console.log(error)
                }

                mediaRecorderRef.current = null
                stream.getTracks().forEach((track) => track.stop())
            }

            // Setup audio visualization
            audioContextRef.current = new AudioContext()
            analyserRef.current = audioContextRef.current.createAnalyser()
            const source = audioContextRef.current.createMediaStreamSource(stream)
            source.connect(analyserRef.current)
            analyserRef.current.fftSize = 256

            mediaRecorderRef.current.start()
            setIsRecording(true)
            setRecordingTime(0)

            // Start timer
            timerIntervalRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1)
            }, 1000)

            // Start visualization
            visualizeAudio()
        } catch (error) {
            console.error("Error accessing microphone:", error)
        }
    }

    const visualizeAudio = () => {
        if (!analyserRef.current) return

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)

        const updateLevel = () => {
            if (!analyserRef.current) return

            analyserRef.current.getByteFrequencyData(dataArray)
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length
            setAudioLevel(average / 150) 

            animationFrameRef.current = requestAnimationFrame(updateLevel)
        }

        updateLevel()
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)

            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
            }

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }

            if (audioContextRef.current) {
                audioContextRef.current.close()
            }

            setAudioLevel(0)

        }
    }

    const deleteRecording = () => {
        shouldSend.current = false
        stopRecording()
        setRecordingTime(0)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    useEffect(() => {
        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
            if (audioContextRef.current) audioContextRef.current.close()
        }
    }, [])




    return (

        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <div className="flex-1 relative flex items-center gap-2 input input-bordered rounded-lg input-sm sm:input-md px-3">
                        {!isRecording ? (
                            <>
                                <input
                                    type="text"
                                    className="flex-1 bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0"
                                    placeholder="Type a message..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="text-zinc-400 hover:text-zinc-300 transition-colors"
                                    onClick={startRecording}
                                >
                                    <Mic size={20} />
                                </button>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center gap-3">
                                <div className="flex items-center gap-2 flex-1">
                                    {/* Voice visualizer bars */}
                                    <div className="flex items-center gap-0.5 h-8">
                                        {[...Array(20)].map((_, i) => {
                                            const height = Math.max(
                                                4,
                                                Math.min(32, audioLevel * 32 * (1 + Math.sin(i * 0.5 + Date.now() / 200))),
                                            )
                                            return (
                                                <div
                                                    key={i}
                                                    className="w-1 bg-emerald-500 rounded-full transition-all duration-100"
                                                    style={{
                                                        height: `${height}px`,
                                                    }}
                                                />
                                            )
                                        })}
                                    </div>

                                    {/* Timer */}
                                    <span className="text-sm font-mono text-zinc-400 ml-auto">{formatTime(recordingTime)}</span>
                                </div>

                                {/* Delete button */}
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                    onClick={deleteRecording}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

                    <button
                        type="button"
                        className={`btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={(!text.trim() && !imagePreview && !isRecording) || isSendMessageLoading}
                >
                    {isSendMessageLoading ? <LoaderCircle size={22} className="animate-spin" /> : <Send size={22} />}
                </button>
            </form>
        </div>
    )
}
