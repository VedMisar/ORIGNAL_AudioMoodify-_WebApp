"use client"

import { useState } from "react"
import { Plus, Search, Music, Users, Lock, Play, Heart, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlaylistCard } from "@/components/playlist-card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"

const trendingSongs = [
  { id: 1, title: "Kesariya", artist: "Arijit Singh", album: "Brahmastra", duration: "4:28" },
  { id: 2, title: "Raataan Lambiyan", artist: "Tanishk Bagchi, Jubin Nautiyal", album: "Shershaah", duration: "3:15" },
  { id: 3, title: "Mann Meri Jaan", artist: "King", album: "Single", duration: "2:43" },
  { id: 4, title: "Apna Bana Le", artist: "Arijit Singh", album: "Bhediya", duration: "3:52" },
  { id: 5, title: "Tum Hi Aana", artist: "Jubin Nautiyal", album: "Marjaavaan", duration: "4:01" },
  { id: 6, title: "Dil Bechara", artist: "A.R. Rahman, Mohit Chauhan", album: "Dil Bechara", duration: "4:44" },
  { id: 7, title: "Ghungroo", artist: "Arijit Singh, Shilpa Rao", album: "War", duration: "5:02" },
  { id: 8, title: "Bekhayali", artist: "Sachet Tandon", album: "Kabir Singh", duration: "6:10" },
]

const initialPlaylists = [
  {
    id: 1,
    title: "World of Marathi Melodies",
    description: "Beautiful collection of classic and contemporary Marathi songs",
    coverUrl: "/futuristic-vibes-playlist.jpg",
    songCount: 0, // Set to 0 initially, will be populated when user adds songs
    isPublic: true,
    isOwned: true,
    songs: [], // Empty initially
  },
  {
    id: 2,
    title: "Suron Ki Duniya",
    description: "A diverse world of melodies from across India",
    coverUrl: "/neon-nights-playlist.jpg",
    songCount: 0,
    isPublic: false,
    isOwned: true,
    songs: [],
  },
  {
    id: 3,
    title: "A Musical Journey Through English Hits",
    description: "Popular English songs spanning decades of great music",
    coverUrl: "/digital-dreams-playlist.jpg",
    songCount: 8, // Pre-populated with trending songs
    isPublic: true,
    isOwned: false,
    songs: trendingSongs,
  },
  {
    id: 4,
    title: "Saptam of Tunes",
    description: "Seven notes, infinite possibilities - a curated musical experience",
    coverUrl: "/cyberpunk-music-playlist.jpg",
    songCount: 8,
    isPublic: true,
    isOwned: false,
    songs: trendingSongs,
  },
]

export function PlaylistsPage() {
  const { isAuthenticated } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "owned" | "public">("all")
  const [playlists, setPlaylists] = useState(initialPlaylists)
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    description: "",
    isPublic: true,
  })

  const filteredPlaylists = playlists.filter((playlist) => {
    const matchesQuery =
      searchQuery === "" ||
      playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filter === "all" || (filter === "owned" && playlist.isOwned) || (filter === "public" && playlist.isPublic)

    return matchesQuery && matchesFilter
  })

  const handleCreatePlaylist = () => {
    if (!isAuthenticated) return

    const playlist = {
      id: Date.now(),
      title: newPlaylist.title,
      description: newPlaylist.description,
      coverUrl: "/music-playlist-cover.png",
      songCount: 0,
      isPublic: newPlaylist.isPublic,
      isOwned: true,
      songs: [],
    }

    setPlaylists([...playlists, playlist])
    setNewPlaylist({ title: "", description: "", isPublic: true })
    setIsCreateDialogOpen(false)
  }

  const handlePlaylistClick = (playlist: any) => {
    setSelectedPlaylist(playlist)
  }

  if (selectedPlaylist) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => setSelectedPlaylist(null)} className="hover:bg-primary/10">
            ← Back to Playlists
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-80 flex-shrink-0">
            <div className="backdrop-blur-glass rounded-2xl p-6 border border-border/50">
              <img
                src={selectedPlaylist.coverUrl || "/placeholder.svg"}
                alt={selectedPlaylist.title}
                className="w-full aspect-square rounded-xl mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold mb-2">{selectedPlaylist.title}</h1>
              <p className="text-muted-foreground mb-4">{selectedPlaylist.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant={selectedPlaylist.isPublic ? "default" : "secondary"}>
                  {selectedPlaylist.isPublic ? "Public" : "Private"}
                </Badge>
                {selectedPlaylist.isOwned && (
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    Your Playlist
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{selectedPlaylist.songCount} songs</p>
              <Button className="w-full bg-gradient-primary hover:opacity-90 mb-2">
                <Play className="h-4 w-4 mr-2" />
                Play All
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="backdrop-blur-glass rounded-2xl border border-border/50">
              <div className="p-6 border-b border-border/50">
                <h2 className="text-xl font-semibold">Songs</h2>
              </div>

              {selectedPlaylist.songs.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {selectedPlaylist.songs.map((song: any, index: number) => (
                    <div key={song.id} className="p-4 hover:bg-primary/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-8 text-center text-sm text-muted-foreground group-hover:hidden">
                          {index + 1}
                        </div>
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hidden group-hover:flex">
                          <Play className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{song.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                        </div>
                        <div className="hidden md:block text-sm text-muted-foreground">{song.album}</div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <div className="text-sm text-muted-foreground w-12 text-right">{song.duration}</div>
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No songs yet</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedPlaylist.isOwned
                      ? "Start adding songs to build your perfect playlist"
                      : "This playlist doesn't have any songs yet"}
                  </p>
                  {selectedPlaylist.isOwned && (
                    <Button className="bg-gradient-primary hover:opacity-90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Songs
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Playlists
        </h1>
        <p className="text-muted-foreground">Curated collections of your favorite music</p>
      </div>

      {/* Create Playlist Button */}
      <div className="text-center">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-gradient-primary hover:opacity-90" disabled={!isAuthenticated}>
              <Plus className="h-5 w-5 mr-2" />
              Create New Playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Playlist Name</Label>
                <Input
                  id="title"
                  value={newPlaylist.title}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, title: e.target.value })}
                  placeholder="Enter playlist name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                  placeholder="Describe your playlist"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={newPlaylist.isPublic}
                  onCheckedChange={(checked) => setNewPlaylist({ ...newPlaylist, isPublic: checked })}
                />
                <Label htmlFor="public">Make playlist public</Label>
              </div>
              <Button
                onClick={handleCreatePlaylist}
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={!newPlaylist.title.trim()}
              >
                Create Playlist
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {!isAuthenticated && <p className="text-sm text-muted-foreground mt-2">Please log in to create playlists</p>}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 backdrop-blur-glass border-border/50 focus:border-primary/50"
          />
        </div>

        <div className="flex gap-2">
          {[
            { id: "all", label: "All", icon: Music },
            { id: "owned", label: "My Playlists", icon: Users },
            { id: "public", label: "Public", icon: Lock },
          ].map((filterOption) => {
            const Icon = filterOption.icon
            return (
              <Button
                key={filterOption.id}
                variant={filter === filterOption.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption.id as typeof filter)}
                className={filter === filterOption.id ? "bg-gradient-primary" : "border-primary/50 hover:bg-primary/10"}
              >
                <Icon className="h-4 w-4 mr-2" />
                {filterOption.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Playlists Grid */}
      {filteredPlaylists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlaylists.map((playlist, index) => (
            <div key={playlist.id} className="relative cursor-pointer" onClick={() => handlePlaylistClick(playlist)}>
              <PlaylistCard
                title={playlist.title}
                description={playlist.description}
                coverUrl={playlist.coverUrl}
                songCount={playlist.songCount}
                onPlay={() => console.log(`Playing ${playlist.title}`)}
              />

              {/* Playlist badges */}
              <div className="absolute top-2 right-2 flex gap-1">
                {playlist.isOwned && (
                  <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                    Mine
                  </Badge>
                )}
                {playlist.isPublic ? (
                  <Badge variant="outline" className="text-xs border-accent/50 text-accent">
                    Public
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs border-orange-500/50 text-orange-400">
                    Private
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="backdrop-blur-glass rounded-2xl p-8 border border-border/50 max-w-md mx-auto">
            <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">No playlists found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search" : "Create your first playlist to get started"}
            </p>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{playlists.filter((p) => p.isOwned).length}</div>
          <div className="text-sm text-muted-foreground">My Playlists</div>
        </div>
        <div className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">
            {playlists.reduce((acc, p) => acc + p.songCount, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Songs</div>
        </div>
        <div className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{playlists.filter((p) => p.isPublic).length}</div>
          <div className="text-sm text-muted-foreground">Public Playlists</div>
        </div>
      </div>
    </div>
  )
}
