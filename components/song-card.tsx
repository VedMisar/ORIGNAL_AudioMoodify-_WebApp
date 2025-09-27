"use client"

import { Play, Heart, MoreHorizontal, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHover } from "@/components/ui/card-hover"
import { useMusic } from "@/contexts/music-context"
import { cn } from "@/lib/utils"

interface SongCardProps {
  title: string
  artist: string
  coverUrl: string
  duration?: string
  isLiked?: boolean
  onLike?: () => void
  className?: string
  songData?: {
    id: string
    album?: string
    audioUrl?: string
  }
}

export function SongCard({
  title,
  artist,
  coverUrl,
  duration = "3:45",
  isLiked = false,
  onLike,
  className,
  songData,
}: SongCardProps) {
  const { currentSong, isPlaying, playSong, setIsPlaying } = useMusic()
  const isCurrentSong = currentSong?.title === title && currentSong?.artist === artist
  const showPauseIcon = isCurrentSong && isPlaying

  const handlePlay = () => {
    console.log("[v0] Song card clicked:", title, "by", artist)

    if (isCurrentSong) {
      // If this is the current song, toggle play/pause
      setIsPlaying(!isPlaying)
    } else {
      // If this is a new song, play it
      const song = {
        id: songData?.id || `${title}-${artist}`.toLowerCase().replace(/\s+/g, "-"),
        title,
        artist,
        album: songData?.album,
        duration: Number.parseInt(duration.split(":")[0]) * 60 + Number.parseInt(duration.split(":")[1]),
        coverUrl,
        audioUrl: songData?.audioUrl,
      }

      console.log("[v0] Playing new song:", song)
      playSong(song)
    }
  }

  return (
    <CardHover className={cn("p-4 transition-all duration-300", className)}>
      <div className="flex items-center gap-4">
        {/* Cover Art */}
        <div className="relative flex-shrink-0 group/cover">
          <div
            className={cn(
              "w-16 h-16 rounded-lg overflow-hidden bg-gradient-secondary transition-transform duration-300 group-hover/cover:scale-105",
              isCurrentSong && "ring-2 ring-primary ring-offset-2 ring-offset-background",
            )}
          >
            <img src={coverUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          </div>
          {/* Play/Pause button overlay */}
          <Button
            size="icon"
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg hover:bg-black/60 backdrop-blur-sm"
          >
            {showPauseIcon ? (
              <Pause className="h-6 w-6 text-white fill-white transform group-hover/cover:scale-110 transition-transform duration-300" />
            ) : (
              <Play className="h-6 w-6 text-white fill-white transform group-hover/cover:scale-110 transition-transform duration-300" />
            )}
          </Button>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-semibold truncate group-hover:text-primary transition-colors duration-300",
              isCurrentSong ? "text-primary" : "text-foreground",
            )}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground truncate group-hover:text-muted-foreground/80 transition-colors duration-300">
            {artist}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{duration}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="icon"
            variant="ghost"
            onClick={onLike}
            className={cn(
              "h-8 w-8 transition-all duration-300 hover:scale-110",
              isLiked && "text-red-500 hover:text-red-400",
            )}
          >
            <Heart className={cn("h-4 w-4 transition-all duration-300", isLiked && "fill-current scale-110")} />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 transition-all duration-300 hover:scale-110">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHover>
  )
}
