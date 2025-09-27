"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HomePage } from "@/components/pages/home-page"
import { SearchPage } from "@/components/pages/search-page"
import { LibraryPage } from "@/components/pages/library-page"
import { PlaylistsPage } from "@/components/pages/playlists-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { AboutPage } from "@/components/pages/about-page"
import { LoginPage } from "@/components/pages/login-page"
import { SignupPage } from "@/components/pages/signup-page"
import { ArtistsPage } from "@/components/pages/artists-page"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/ui/animated-background"
import MusicPlayer from "@/components/music-player"
import { useAuth } from "@/contexts/auth-context"

type Page = "home" | "search" | "library" | "playlists" | "profile" | "about" | "login" | "signup" | "artists"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const { isAuthenticated } = useAuth()

  const handleStartListening = () => {
    if (isAuthenticated) {
      setCurrentPage("search")
    } else {
      setCurrentPage("signup")
    }
  }

  const handleExplorePlaylists = () => {
    setCurrentPage("playlists")
  }

  const handleDiscoverArtists = () => {
    setCurrentPage("artists")
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onStartListening={handleStartListening}
            onExplorePlaylists={handleExplorePlaylists}
            onDiscoverArtists={handleDiscoverArtists}
          />
        )
      case "search":
        return <SearchPage />
      case "library":
        return <LibraryPage />
      case "playlists":
        return <PlaylistsPage />
      case "artists":
        return <ArtistsPage />
      case "profile":
        return <ProfilePage />
      case "about":
        return <AboutPage />
      case "login":
        return <LoginPage onBack={() => setCurrentPage("home")} onSwitchToSignup={() => setCurrentPage("signup")} />
      case "signup":
        return <SignupPage onBack={() => setCurrentPage("home")} onSwitchToLogin={() => setCurrentPage("login")} />
      default:
        return (
          <HomePage
            onStartListening={handleStartListening}
            onExplorePlaylists={handleExplorePlaylists}
            onDiscoverArtists={handleDiscoverArtists}
          />
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 transition-all duration-500 ease-in-out relative z-10 pb-20 md:pb-24">
        {renderPage()}
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  )
}
