"use client"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 backdrop-blur-glass">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">© 2025 AudioMoodify. All rights reserved.</p>
            <p className="text-xs text-muted-foreground mt-1">Experience music like never before</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-primary opacity-50" />
            <div className="text-xs text-muted-foreground font-mono">v1.0.0</div>
            <div className="h-px w-16 bg-gradient-primary opacity-50" />
          </div>
        </div>

        {/* Animated gradient line */}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
      </div>
    </footer>
  )
}
