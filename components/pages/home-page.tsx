"use client"

import { useState } from "react"
import { SongCard } from "@/components/song-card"
import { PlaylistCard } from "@/components/playlist-card"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/page-transition"
import { StaggeredList } from "@/components/ui/staggered-list"
import { useMusic } from "@/contexts/music-context"
import { TrendingUp, Zap, Clock } from "lucide-react"

const popularSongs = [
  {
    id: "kesariya",
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    coverUrl: "/neon-synthwave-album-cover.jpg",
    duration: 268,
    audioUrl: "/audio/kesariya.mp3",
  },
  {
    id: "raataan-lambiyan",
    title: "Raataan Lambiyan",
    artist: "Tanishk Bagchi, Jubin Nautiyal",
    album: "Shershaah",
    coverUrl: "/digital-futuristic-album-cover.jpg",
    duration: 195,
    audioUrl: "/audio/raataan-lambiyan.mp3",
  },
  {
    id: "mann-meri-jaan",
    title: "Mann Meri Jaan",
    artist: "King",
    album: "Champagne Talk",
    coverUrl: "/electric-night-album-cover.jpg",
    duration: 163,
    audioUrl: "/audio/mann-meri-jaan.mp3",
  },
  {
    id: "apna-bana-le",
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    album: "Bhediya",
    coverUrl: "/quantum-beats-album-cover.jpg",
    duration: 232,
    audioUrl: "/audio/apna-bana-le.mp3",
  },
  {
    id: "tum-hi-aana",
    title: "Tum Hi Aana",
    artist: "Jubin Nautiyal",
    album: "Marjaavaan",
    coverUrl: "/cosmic-space-album-cover.jpg",
    duration: 241,
    audioUrl: "/audio/tum-hi-aana.mp3",
  },
]

const featuredPlaylists = [
  {
    title: "World of Marathi Melodies",
    description: "Beautiful collection of classic and contemporary Marathi songs",
    coverUrl: "/futuristic-vibes-playlist.jpg",
    songCount: 42,
  },
  {
    title: "Suron Ki Duniya",
    description: "A diverse world of melodies from across India",
    coverUrl: "/neon-nights-playlist.jpg",
    songCount: 28,
  },
  {
    title: "A Musical Journey Through English Hits",
    description: "Popular English songs spanning decades of great music",
    coverUrl: "/digital-dreams-playlist.jpg",
    songCount: 35,
  },
  {
    title: "Saptam of Tunes",
    description: "Seven notes, infinite possibilities - a curated musical experience",
    coverUrl: "/cyberpunk-music-playlist.jpg",
    songCount: 51,
  },
]

interface HomePageProps {
  onStartListening: () => void
  onExplorePlaylists: () => void
  onDiscoverArtists: () => void
}

export function HomePage({ onStartListening, onExplorePlaylists, onDiscoverArtists }: HomePageProps) {
  const { playSong } = useMusic()

  const [query, setQuery] = useState("")
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handlePlaySong = (song: (typeof popularSongs)[0]) => {
    playSong(song, popularSongs)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return

    setLoading(true)
    try {
      const res = await fetch(`/api/search-songs?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setVideos(data.items || []) // Ensure you get 'items' array
    } catch (err) {
      console.error("Error fetching videos:", err)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 space-y-12">

        {/* Hero Section */}
        <section className="text-center py-12 animate-fade-in">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient animate-scale-in">
              Welcome to AudioMoodify
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
              Experience music like never before with our futuristic streaming platform
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-all duration-300 hover-lift"
                onClick={onStartListening}
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Listening
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 transition-all duration-300 hover-lift bg-transparent"
                onClick={onExplorePlaylists}
              >
                Explore Playlists
              </Button>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="animate-slide-in-left">
          <h2 className="text-2xl font-bold text-foreground mb-4">Search Songs</h2>
          <form onSubmit={handleSearch} className="mb-6 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a song..."
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Search
            </button>
          </form>

          {loading && <p>Loading...</p>}

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((video: any) => (
                <SongCard
                  key={video.id.videoId}
                  title={video.snippet.title}
                  coverUrl={video.snippet.thumbnails.medium.url}
                  artist={video.snippet.channelTitle}
                  {...({ onPlay: () => console.log(`Playing ${video.snippet.title}`) } as any)}
                />
              ))}
            </div>
          ) : (
            !loading && <p className="text-gray-400">No songs found. Try another search!</p>
          )}
        </section>

        {/* Popular Songs */}
        <section className="animate-slide-in-left">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-primary animate-pulse-slow" />
            <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
          </div>
          <StaggeredList className="space-y-4">
            {popularSongs.map((song, index) => (
              <SongCard
                key={song.id}
                {...({
                  title: song.title,
                  artist: song.artist,
                  coverUrl: song.coverUrl,
                  duration: formatDuration(song.duration),
                  onLike: () => console.log(`Liked ${song.title}`),
                  onPlay: () => handlePlaySong(song), // Play song from popular list
                  className: "hover-lift",
                } as any)}
              />
            ))}
          </StaggeredList>
        </section>

        {/* Featured Playlists */}
        <section className="animate-slide-in-right">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-primary animate-pulse-slow" />
            <h2 className="text-2xl font-bold text-foreground">Featured Playlists</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaylists.map((playlist, index) => (
              <div key={index} className="animate-scale-in hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <PlaylistCard
                  title={playlist.title}
                  description={playlist.description}
                  coverUrl={playlist.coverUrl}
                  songCount={playlist.songCount}
                  onPlay={() => console.log(`Playing ${playlist.title}`)}
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  )
}
