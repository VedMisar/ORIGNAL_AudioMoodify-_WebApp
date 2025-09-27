"use client"

import React from "react"
import { Heart } from "lucide-react"

interface SongCardProps {
  title: string
  artist: string
  coverUrl: string
  duration?: string
  onLike?: () => void
  onPlay?: () => void
  className?: string
}

export const SongCard: React.FC<SongCardProps> = ({
  title,
  artist,
  coverUrl,
  duration,
  onLike,
  onPlay,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col bg-background rounded-lg overflow-hidden shadow-md cursor-pointer ${className}`}
      onClick={onPlay}   // trigger onPlay when card is clicked
    >
      <img src={coverUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{artist}</p>
        {duration && <p className="text-xs text-muted-foreground">{duration}</p>}
        <button
          className="mt-2 self-start text-red-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation()  // prevent triggering onPlay when liking
            onLike?.()
          }}
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
