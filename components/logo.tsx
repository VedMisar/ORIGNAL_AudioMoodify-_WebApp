"use client"

import { Music } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-gradient-primary p-2 rounded-lg">
          <Music className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
      <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent" color="hsla(184, 82%, 51%, 1)" font-famely= "Audiowide">AudioMoodify</span>
    </div>
  )
}
