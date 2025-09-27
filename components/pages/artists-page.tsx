"use client"

import { useState } from "react"
import { Search, Music, Users, Play, Heart, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const indianArtists = [
  {
    id: 1,
    name: "Arijit Singh",
    genre: "Playback Singer",
    followers: "45M",
    image: "/arijit-singh-indian-singer.jpg",
    topSongs: ["Kesariya", "Tum Hi Ho", "Channa Mereya", "Ae Dil Hai Mushkil"],
    albums: 150,
    isFollowing: false,
  },
  {
    id: 2,
    name: "A.R. Rahman",
    genre: "Music Director",
    followers: "38M",
    image: "/ar-rahman-indian-composer.jpg",
    topSongs: ["Jai Ho", "Dil Se", "Vande Mataram", "Kun Faya Kun"],
    albums: 200,
    isFollowing: true,
  },
  {
    id: 3,
    name: "Shreya Ghoshal",
    genre: "Playback Singer",
    followers: "42M",
    image: "/shreya-ghoshal-indian-singer.jpg",
    topSongs: ["Deewani Mastani", "Ghar More Pardesiya", "Silsila Ye Chaahat Ka"],
    albums: 120,
    isFollowing: false,
  },
  {
    id: 4,
    name: "Sonu Nigam",
    genre: "Playback Singer",
    followers: "35M",
    image: "/sonu-nigam-indian-singer.jpg",
    topSongs: ["Kal Ho Naa Ho", "Abhi Mujh Mein Kahin", "Sandese Aate Hai"],
    albums: 180,
    isFollowing: true,
  },
  {
    id: 5,
    name: "Lata Mangeshkar",
    genre: "Legendary Singer",
    followers: "50M",
    image: "/lata-mangeshkar-indian-legend.jpg",
    topSongs: ["Lag Jaa Gale", "Ajeeb Dastan Hai Yeh", "Pyar Kiya To Darna Kya"],
    albums: 300,
    isFollowing: true,
  },
  {
    id: 6,
    name: "Kishore Kumar",
    genre: "Legendary Singer",
    followers: "48M",
    image: "/kishore-kumar-indian-legend.jpg",
    topSongs: ["Roop Tera Mastana", "Mere Sapno Ki Rani", "Zindagi Ek Safar"],
    albums: 250,
    isFollowing: false,
  },
  {
    id: 7,
    name: "Rahat Fateh Ali Khan",
    genre: "Sufi Singer",
    followers: "28M",
    image: "/rahat-fateh-ali-khan-pakistani-singer.jpg",
    topSongs: ["Jiya Dhadak Dhadak", "Teri Meri", "Zaroori Tha"],
    albums: 80,
    isFollowing: false,
  },
  {
    id: 8,
    name: "Sunidhi Chauhan",
    genre: "Playback Singer",
    followers: "32M",
    image: "/sunidhi-chauhan-indian-singer.jpg",
    topSongs: ["Beedi", "Dhoom Machale", "Kamli"],
    albums: 90,
    isFollowing: true,
  },
]

export function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArtist, setSelectedArtist] = useState<any>(null)
  const [artists, setArtists] = useState(indianArtists)

  const filteredArtists = artists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFollow = (artistId: number) => {
    setArtists(
      artists.map((artist) => (artist.id === artistId ? { ...artist, isFollowing: !artist.isFollowing } : artist)),
    )
  }

  if (selectedArtist) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => setSelectedArtist(null)} className="hover:bg-primary/10">
            ← Back to Artists
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-80 flex-shrink-0">
            <div className="backdrop-blur-glass rounded-2xl p-6 border border-border/50">
              <img
                src={selectedArtist.image || "/placeholder.svg"}
                alt={selectedArtist.name}
                className="w-full aspect-square rounded-xl mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold mb-2">{selectedArtist.name}</h1>
              <p className="text-muted-foreground mb-4">{selectedArtist.genre}</p>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{selectedArtist.followers} followers</span>
              </div>
              <div className="flex gap-2 mb-4">
                <Button
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  onClick={() => toggleFollow(selectedArtist.id)}
                >
                  {selectedArtist.isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">{selectedArtist.albums} albums</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="backdrop-blur-glass rounded-2xl border border-border/50">
              <div className="p-6 border-b border-border/50">
                <h2 className="text-xl font-semibold">Popular Songs</h2>
              </div>

              <div className="divide-y divide-border/50">
                {selectedArtist.topSongs.map((song: string, index: number) => (
                  <div key={index} className="p-4 hover:bg-primary/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center text-sm text-muted-foreground group-hover:hidden">
                        {index + 1}
                      </div>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hidden group-hover:flex">
                        <Play className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{song}</h3>
                        <p className="text-sm text-muted-foreground truncate">{selectedArtist.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
          Discover Artists
        </h1>
        <p className="text-muted-foreground">Explore talented Indian artists and their music</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 backdrop-blur-glass border-border/50 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Artists Grid */}
      {filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="backdrop-blur-glass rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover-lift"
              onClick={() => setSelectedArtist(artist)}
            >
              <div className="relative mb-4">
                <img
                  src={artist.image || "/placeholder.svg"}
                  alt={artist.name}
                  className="w-full aspect-square rounded-xl object-cover"
                />
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 bg-gradient-primary hover:opacity-90 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>

              <h3 className="font-semibold text-lg mb-1 truncate">{artist.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{artist.genre}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {artist.followers}
                </div>
                <Badge variant="outline" className="text-xs">
                  {artist.albums} albums
                </Badge>
              </div>

              <Button
                size="sm"
                variant={artist.isFollowing ? "default" : "outline"}
                className={`w-full ${artist.isFollowing ? "bg-gradient-primary hover:opacity-90" : "border-primary/50 hover:bg-primary/10"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFollow(artist.id)
                }}
              >
                {artist.isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="backdrop-blur-glass rounded-2xl p-8 border border-border/50 max-w-md mx-auto">
            <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">No artists found</h3>
            <p className="text-muted-foreground">Try adjusting your search to discover amazing Indian artists</p>
          </div>
        </div>
      )}
    </div>
  )
}
