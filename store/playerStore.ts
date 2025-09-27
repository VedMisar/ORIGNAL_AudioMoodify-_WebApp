import { create } from "zustand"

interface PlayerStore {
  currentSong: any | null
  playlist: any[]
  isPlaying: boolean
  setCurrentSong: (song: any) => void
  setPlaylist: (songs: any[]) => void
  setIsPlaying: (state: boolean) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentSong: null,
  playlist: [],
  isPlaying: false,
  setCurrentSong: (song) => set({ currentSong: song }),
  setPlaylist: (songs) => set({ playlist: songs }),
  setIsPlaying: (state) => set({ isPlaying: state }),
}))
