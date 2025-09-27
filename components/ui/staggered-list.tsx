"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface StaggeredListProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
}

export function StaggeredList({ children, className, staggerDelay = 100 }: StaggeredListProps) {
  const [visibleItems, setVisibleItems] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev < children.length) {
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, staggerDelay)

    return () => clearInterval(timer)
  }, [children.length, staggerDelay])

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-500 ease-out",
            index < visibleItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
