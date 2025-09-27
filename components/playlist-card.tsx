"use client"

import { Play, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHover } from "@/components/ui/card-hover"
import { cn } from "@/lib/utils"

interface PlaylistCardProps {
  title: string
  description: string
  coverUrl: string
  songCount: number
  onPlay?: () => void
  className?: string
}

export function PlaylistCard({ title, description, coverUrl, songCount, onPlay, className }: PlaylistCardProps) {
  return (
    <CardHover className={cn("p-6", className)}>
      <div className="text-center">
        {/* Cover Art */}
        <div className="relative mx-auto mb-4">
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-secondary mx-auto">
            <img src={coverUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          </div>
          {/* Play button overlay */}
          <Button
            size="icon"
            onClick={onPlay}
            className="absolute inset-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          >
            <Play className="h-8 w-8 text-white fill-white" />
          </Button>
        </div>

        {/* Playlist Info */}
        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Music className="h-3 w-3" />
          <span>{songCount} songs</span>
        </div>
      </div>
    </CardHover>
  )
}
