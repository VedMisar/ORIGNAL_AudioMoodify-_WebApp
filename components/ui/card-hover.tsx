"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface CardHoverProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function CardHover({ children, className, onClick }: CardHoverProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300",
        "hover:scale-105 hover:shadow-2xl cursor-pointer",
        "backdrop-blur-glass border border-border/50",
        "hover:border-primary/50",
        className,
      )}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
