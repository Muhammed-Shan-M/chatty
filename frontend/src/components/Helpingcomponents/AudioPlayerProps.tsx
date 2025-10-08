"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"

interface AudioPlayerProps {
    src: string
    className?: string
}

export function AudioPlayer({ src, className = "" }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)
        const handleEnded = () => setIsPlaying(false)

        audio.addEventListener("timeupdate", updateTime)
        audio.addEventListener("loadedmetadata", updateDuration)
        audio.addEventListener("ended", handleEnded)

        return () => {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", updateDuration)
            audio.removeEventListener("ended", handleEnded)
        }
    }, [])


    const togglePlayPause = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current
        if (!audio || !duration) return

        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = x / rect.width
        const newTime = percentage * duration

        audio.currentTime = newTime
        setCurrentTime(newTime)
    }

    const formatTime = (time: number) => {
        if (isNaN(time)) return "00:00"
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    return (
        <div
            className={`inline-flex items-center gap-2 bg-primary text-primary-content rounded-full px-3 py-2 ${className}`}
            style={{
                width: "clamp(40px, 30vw, 250px)", 
            }}
        >
            <button
                onClick={togglePlayPause}
                className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-content text-primary hover:opacity-80 transition-opacity"
                aria-label={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? (
                    <Pause className="w-3 h-3 fill-current" />
                ) : (
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                )}
            </button>

            {/* Seek bar */}
            <div
                onClick={handleSeek}
                className="flex-1 h-1 bg-primary-content/30 rounded-full cursor-pointer relative group"
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
            >
                {/* Progress fill */}
                <div
                    className="absolute top-0 left-0 h-full bg-primary-content rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                />

                {/* Pointer knob aligned with the end of progress */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-content rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${progress}%`, marginLeft: "-6px" }}
                />
            </div>

            <span className="flex-shrink-0 text-xs font-medium tabular-nums">
                {formatTime(isPlaying ? currentTime : duration)}
            </span>

            <audio ref={audioRef} src={src} preload="metadata" />
        </div>
    );

}
