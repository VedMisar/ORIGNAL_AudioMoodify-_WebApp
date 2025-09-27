"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Song {
  id: string
  title: string
  artist: string
  album?: string
  duration: number
  coverUrl?: string
  audioUrl?: string
}

interface MusicContextType {
  currentSong: Song | null
  isPlaying: boolean
  playlist: Song[]
  currentIndex: number
  setCurrentSong: (song: Song) => void
  setIsPlaying: (playing: boolean) => void
  setPlaylist: (songs: Song[]) => void
  playNext: () => void
  playPrevious: () => void
  playSong: (song: Song, playlist?: Song[]) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const playNext = () => {
    if (playlist.length > 0) {
      const nextIndex = (currentIndex + 1) % playlist.length
      setCurrentIndex(nextIndex)
      setCurrentSong(playlist[nextIndex])
    }
  }

  const playPrevious = () => {
    if (playlist.length > 0) {
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
      setCurrentIndex(prevIndex)
      setCurrentSong(playlist[prevIndex])
    }
  }

  const playSong = (song: Song, newPlaylist?: Song[]) => {
    setCurrentSong(song)
    setIsPlaying(true)

    if (newPlaylist) {
      setPlaylist(newPlaylist)
      const index = newPlaylist.findIndex((s) => s.id === song.id)
      setCurrentIndex(index >= 0 ? index : 0)
    } else if (playlist.length === 0) {
      setPlaylist([song])
      setCurrentIndex(0)
    }
  }

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playlist,
        currentIndex,
        setCurrentSong,
        setIsPlaying,
        setPlaylist,
        playNext,
        playPrevious,
        playSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
