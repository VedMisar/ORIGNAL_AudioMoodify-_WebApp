"use client"

import { useState, useMemo } from "react"
import { Search, Mic, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SongCard } from "@/components/song-card"
import { PlaylistCard } from "@/components/playlist-card"
import { Badge } from "@/components/ui/badge"

const allSongs = [
  {
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    coverUrl: "/neon-synthwave-album-cover.jpg",
    duration: "4:12",
    genre: "synthwave",
  },
  {
    title: "Digital Horizon",
    artist: "Cyber Pulse",
    coverUrl: "/digital-futuristic-album-cover.jpg",
    duration: "3:45",
    genre: "electronic",
  },
  {
    title: "Electric Nights",
    artist: "Future Bass",
    coverUrl: "/electric-night-album-cover.jpg",
    duration: "5:23",
    genre: "bass",
  },
  {
    title: "Quantum Beats",
    artist: "Tech House",
    coverUrl: "/quantum-beats-album-cover.jpg",
    duration: "3:58",
    genre: "house",
  },
  {
    title: "Cosmic Flow",
    artist: "Ambient Space",
    coverUrl: "/cosmic-space-album-cover.jpg",
    duration: "6:15",
    genre: "ambient",
  },
  {
    title: "Cyber City",
    artist: "Synthwave Collective",
    coverUrl: "/neon-synthwave-album-cover.jpg",
    duration: "4:32",
    genre: "synthwave",
  },
  {
    title: "Neural Network",
    artist: "Cyber Pulse",
    coverUrl: "/digital-futuristic-album-cover.jpg",
    duration: "3:21",
    genre: "electronic",
  },
  {
    title: "Voltage Drop",
    artist: "Future Bass",
    coverUrl: "/electric-night-album-cover.jpg",
    duration: "4:45",
    genre: "bass",
  },
]

const allPlaylists = [
  {
    title: "Futuristic Vibes",
    description: "The best electronic and synthwave tracks",
    coverUrl: "/futuristic-vibes-playlist.jpg",
    songCount: 42,
  },
  {
    title: "Neon Nights",
    description: "Perfect soundtrack for late night coding",
    coverUrl: "/neon-nights-playlist.jpg",
    songCount: 28,
  },
  {
    title: "Digital Dreams",
    description: "Ambient and chill electronic music",
    coverUrl: "/digital-dreams-playlist.jpg",
    songCount: 35,
  },
  {
    title: "Cyber Punk",
    description: "High-energy cyberpunk aesthetics",
    coverUrl: "/cyberpunk-music-playlist.jpg",
    songCount: 51,
  },
]

const genres = ["all", "synthwave", "electronic", "bass", "house", "ambient"]

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [searchType, setSearchType] = useState<"all" | "songs" | "playlists">("all")

  const filteredSongs = useMemo(() => {
    return allSongs.filter((song) => {
      const matchesQuery =
        searchQuery === "" ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = selectedGenre === "all" || song.genre === selectedGenre
      return matchesQuery && matchesGenre
    })
  }, [searchQuery, selectedGenre])

  const filteredPlaylists = useMemo(() => {
    return allPlaylists.filter((playlist) => {
      return (
        searchQuery === "" ||
        playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }, [searchQuery])

  const clearSearch = () => {
    setSearchQuery("")
    setSelectedGenre("all")
    setSearchType("all")
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Discover Music
        </h1>
        <p className="text-muted-foreground">Find your next favorite song or playlist</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for songs, artists, or playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-20 h-14 text-lg backdrop-blur-glass border-border/50 focus:border-primary/50"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            {searchQuery && (
              <Button size="icon" variant="ghost" onClick={clearSearch} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex gap-2">
          {["all", "songs", "playlists"].map((type) => (
            <Button
              key={type}
              variant={searchType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchType(type as typeof searchType)}
              className={searchType === type ? "bg-gradient-primary" : "border-primary/50 hover:bg-primary/10"}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {genres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-300 ${
                selectedGenre === genre
                  ? "bg-gradient-primary text-primary-foreground"
                  : "border-primary/50 hover:bg-primary/10"
              }`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && <div className="text-center text-muted-foreground">Showing results for "{searchQuery}"</div>}

      {/* Songs Results */}
      {(searchType === "all" || searchType === "songs") && filteredSongs.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Songs</h2>
          <div className="grid gap-4">
            {filteredSongs.map((song, index) => (
              <SongCard
                key={index}
                title={song.title}
                artist={song.artist}
                coverUrl={song.coverUrl}
                duration={song.duration}
              />
            ))}
          </div>
        </section>
      )}

      {/* Playlists Results */}
      {(searchType === "all" || searchType === "playlists") && filteredPlaylists.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlaylists.map((playlist, index) => (
              <PlaylistCard
                key={index}
                title={playlist.title}
                description={playlist.description}
                coverUrl={playlist.coverUrl}
                songCount={playlist.songCount}
                onPlay={() => console.log(`Playing ${playlist.title}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {searchQuery && filteredSongs.length === 0 && filteredPlaylists.length === 0 && (
        <div className="text-center py-12">
          <div className="backdrop-blur-glass rounded-2xl p-8 border border-border/50 max-w-md mx-auto">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">No results found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button
              onClick={clearSearch}
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 bg-transparent"
            >
              Clear Search
            </Button>
          </div>
        </div>
      )}

      {/* Popular Searches */}
      {!searchQuery && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {["synthwave", "cyberpunk", "ambient", "electronic", "future bass"].map((term) => (
              <Badge
                key={term}
                variant="outline"
                className="cursor-pointer border-primary/50 hover:bg-primary/10 transition-colors duration-300"
                onClick={() => setSearchQuery(term)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
