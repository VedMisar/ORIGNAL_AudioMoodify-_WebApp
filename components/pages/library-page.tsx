"use client"

import { useState } from "react"
import { Heart, Clock, Download, Shuffle, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SongCard } from "@/components/song-card"
import { PlaylistCard } from "@/components/playlist-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const likedSongs = [
  {
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    coverUrl: "/neon-synthwave-album-cover.jpg",
    duration: "4:12",
    isLiked: true,
  },
  {
    title: "Electric Nights",
    artist: "Future Bass",
    coverUrl: "/electric-night-album-cover.jpg",
    duration: "5:23",
    isLiked: true,
  },
  {
    title: "Cosmic Flow",
    artist: "Ambient Space",
    coverUrl: "/cosmic-space-album-cover.jpg",
    duration: "6:15",
    isLiked: true,
  },
]

const recentlyPlayed = [
  {
    title: "Digital Horizon",
    artist: "Cyber Pulse",
    coverUrl: "/digital-futuristic-album-cover.jpg",
    duration: "3:45",
  },
  { title: "Quantum Beats", artist: "Tech House", coverUrl: "/quantum-beats-album-cover.jpg", duration: "3:58" },
  {
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    coverUrl: "/neon-synthwave-album-cover.jpg",
    duration: "4:12",
  },
  { title: "Electric Nights", artist: "Future Bass", coverUrl: "/electric-night-album-cover.jpg", duration: "5:23" },
]

const myPlaylists = [
  {
    title: "My Favorites",
    description: "Your most loved tracks",
    coverUrl: "/futuristic-vibes-playlist.jpg",
    songCount: 23,
  },
  {
    title: "Workout Mix",
    description: "High-energy tracks for exercise",
    coverUrl: "/neon-nights-playlist.jpg",
    songCount: 18,
  },
  {
    title: "Chill Vibes",
    description: "Relaxing ambient music",
    coverUrl: "/digital-dreams-playlist.jpg",
    songCount: 31,
  },
]

const downloadedSongs = [
  {
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    coverUrl: "/neon-synthwave-album-cover.jpg",
    duration: "4:12",
  },
  {
    title: "Digital Horizon",
    artist: "Cyber Pulse",
    coverUrl: "/digital-futuristic-album-cover.jpg",
    duration: "3:45",
  },
]

export function LibraryPage() {
  const [activeTab, setActiveTab] = useState("recent")

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Your Library
        </h1>
        <p className="text-muted-foreground">Your personal music collection</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="bg-gradient-primary hover:opacity-90">
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle All
        </Button>
        <Button variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
          <Play className="h-4 w-4 mr-2" />
          Play Recent
        </Button>
        <Button variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Download Queue
        </Button>
      </div>

      {/* Library Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 backdrop-blur-glass">
          <TabsTrigger value="recent" className="data-[state=active]:bg-gradient-primary">
            <Clock className="h-4 w-4 mr-2" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="liked" className="data-[state=active]:bg-gradient-primary">
            <Heart className="h-4 w-4 mr-2" />
            Liked
          </TabsTrigger>
          <TabsTrigger value="playlists" className="data-[state=active]:bg-gradient-primary">
            Playlists
          </TabsTrigger>
          <TabsTrigger value="downloads" className="data-[state=active]:bg-gradient-primary">
            <Download className="h-4 w-4 mr-2" />
            Downloads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recently Played</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
              Clear History
            </Button>
          </div>
          <div className="grid gap-4">
            {recentlyPlayed.map((song, index) => (
              <SongCard
                key={index}
                title={song.title}
                artist={song.artist}
                coverUrl={song.coverUrl}
                duration={song.duration}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Liked Songs</h2>
            <div className="text-sm text-muted-foreground">{likedSongs.length} songs</div>
          </div>
          <div className="grid gap-4">
            {likedSongs.map((song, index) => (
              <SongCard
                key={index}
                title={song.title}
                artist={song.artist}
                coverUrl={song.coverUrl}
                duration={song.duration}
                isLiked={song.isLiked}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="playlists" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">My Playlists</h2>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
              Create Playlist
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPlaylists.map((playlist, index) => (
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
        </TabsContent>

        <TabsContent value="downloads" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Downloaded Music</h2>
            <div className="text-sm text-muted-foreground">{downloadedSongs.length} songs offline</div>
          </div>
          {downloadedSongs.length > 0 ? (
            <div className="grid gap-4">
              {downloadedSongs.map((song, index) => (
                <SongCard
                  key={index}
                  title={song.title}
                  artist={song.artist}
                  coverUrl={song.coverUrl}
                  duration={song.duration}
                />
              ))}
            </div>
          ) : (
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold mb-2 text-foreground">No downloads yet</h3>
              <p className="text-muted-foreground mb-4">Download songs to listen offline</p>
              <Button className="bg-gradient-primary hover:opacity-90">Browse Music</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
