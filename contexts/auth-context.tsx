"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  username: string
  displayName: string
  email: string
  bio?: string
  location?: string
  joinedDate: string
  avatar?: string
  stats: {
    songsPlayed: number
    hoursListened: number
    playlistsCreated: number
    songsLiked: number
  }
  topGenres: string[]
  recentActivity: Array<{
    title: string
    artist: string
    coverUrl: string
    duration: string
    playedAt: string
  }>
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, username: string, displayName: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("audiomoodify_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data for demo
    const mockUser: User = {
      id: "1",
      username: "musiclover2025",
      displayName: "Music Lover",
      email,
      bio: "Passionate about Indian music and discovering new artists.",
      location: "Mumbai, Maharashtra",
      joinedDate: "January 2024",
      stats: {
        songsPlayed: 1247,
        hoursListened: 89,
        playlistsCreated: 12,
        songsLiked: 156,
      },
      topGenres: ["Bollywood", "Classical", "Folk", "Indie", "Devotional"],
      recentActivity: [
        {
          title: "Tum Hi Ho",
          artist: "Arijit Singh",
          coverUrl: "/neon-synthwave-album-cover.jpg",
          duration: "4:12",
          playedAt: "2 hours ago",
        },
        {
          title: "Kal Ho Naa Ho",
          artist: "Sonu Nigam",
          coverUrl: "/digital-futuristic-album-cover.jpg",
          duration: "3:45",
          playedAt: "5 hours ago",
        },
      ],
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("audiomoodify_user", JSON.stringify(mockUser))
    return true
  }

  const signup = async (email: string, password: string, username: string, displayName: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      username,
      displayName,
      email,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      stats: {
        songsPlayed: 0,
        hoursListened: 0,
        playlistsCreated: 0,
        songsLiked: 0,
      },
      topGenres: [],
      recentActivity: [],
    }

    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("audiomoodify_user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("audiomoodify_user")
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("audiomoodify_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
