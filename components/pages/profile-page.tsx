"use client"

import { useState } from "react"
import { Edit, Save, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SongCard } from "@/components/song-card"
import { useAuth } from "@/contexts/auth-context"

export function ProfilePage() {
  const { user, isAuthenticated, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    username: user?.username || "",
    displayName: user?.displayName || "",
    bio: user?.bio || "",
    location: user?.location || "",
  })

  const handleSave = () => {
    if (user) {
      updateProfile({
        ...user,
        username: editedProfile.username,
        displayName: editedProfile.displayName,
        bio: editedProfile.bio,
        location: editedProfile.location,
      })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile({
      username: user?.username || "",
      displayName: user?.displayName || "",
      bio: user?.bio || "",
      location: user?.location || "",
    })
    setIsEditing(false)
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="backdrop-blur-glass rounded-2xl p-8 border border-border/50 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Profile Not Available</h1>
          <p className="text-muted-foreground mb-6">
            Please create an account or sign in to view your profile and listening history.
          </p>
          <Button className="bg-gradient-primary hover:opacity-90">Sign Up to Get Started</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <div className="backdrop-blur-glass rounded-2xl p-8 border border-border/50">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative group">
            <Avatar className="w-32 h-32 border-4 border-primary/50">
              <AvatarImage src={user.avatar || "/placeholder.svg?height=128&width=128"} alt={user.displayName} />
              <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                {user.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90"
              onClick={() => console.log("Change avatar")}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  value={editedProfile.displayName}
                  onChange={(e) => setEditedProfile({ ...editedProfile, displayName: e.target.value })}
                  className="text-xl font-bold backdrop-blur-glass border-border/50"
                  placeholder="Display Name"
                />
                <Input
                  value={editedProfile.username}
                  onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                  className="backdrop-blur-glass border-border/50"
                  placeholder="Username"
                />
                <Textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  className="backdrop-blur-glass border-border/50"
                  placeholder="Bio"
                  rows={3}
                />
                <Input
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                  className="backdrop-blur-glass border-border/50"
                  placeholder="Location"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" className="bg-gradient-primary hover:opacity-90">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    size="sm"
                    variant="outline"
                    className="border-border/50 bg-transparent"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">{user.displayName}</h1>
                <p className="text-lg text-muted-foreground">@{user.username}</p>
                <p className="text-foreground max-w-2xl">{user.bio || "No bio available"}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>{user.location || "Location not set"}</span>
                  <span>•</span>
                  <span>Joined {user.joinedDate}</span>
                </div>
                <Button
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  variant="outline"
                  className="mt-4 border-primary/50 hover:bg-primary/10"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{user.stats.songsPlayed.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Songs Played</div>
        </div>
        <div className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{user.stats.hoursListened}</div>
          <div className="text-sm text-muted-foreground">Hours Listened</div>
        </div>
        <div className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{user.stats.playlistsCreated}</div>
          <div className="text-sm text-muted-foreground">Playlists Created</div>
        </div>
        <div className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary mb-2">{user.stats.songsLiked}</div>
          <div className="text-sm text-muted-foreground">Songs Liked</div>
        </div>
      </div>

      {/* Top Genres */}
      <div className="backdrop-blur-glass rounded-2xl p-6 border border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Top Genres</h2>
        <div className="flex flex-wrap gap-2">
          {user.topGenres.length > 0 ? (
            user.topGenres.map((genre, index) => (
              <Badge
                key={genre}
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                #{index + 1} {genre}
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground">Start listening to music to see your top genres!</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="backdrop-blur-glass rounded-2xl p-6 border border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Recent Activity</h2>
        <div className="space-y-4">
          {user.recentActivity.length > 0 ? (
            user.recentActivity.map((song, index) => (
              <div key={index} className="flex items-center justify-between">
                <SongCard
                  title={song.title}
                  artist={song.artist}
                  coverUrl={song.coverUrl}
                  duration={song.duration}
                  className="flex-1"
                />
                <div className="text-sm text-muted-foreground ml-4">{song.playedAt}</div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No recent activity. Start listening to music to see your history!</p>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="backdrop-blur-glass rounded-2xl p-6 border border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {((user as any).achievements || []).map((achievement: any, index: number) => {
            const Icon = achievement.icon
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
