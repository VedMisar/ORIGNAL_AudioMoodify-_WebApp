"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Floating orbs with enhanced animations */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float opacity-60" />
      <div
        className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float opacity-50"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      />
      <div
        className="absolute top-1/2 left-3/4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float opacity-40"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      />
      <div
        className="absolute top-1/6 right-1/3 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float opacity-30"
        style={{ animationDelay: "3s", animationDuration: "6s" }}
      />

      {/* Enhanced grid pattern with animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,theme(colors.primary)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse-slow" />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse-slow" />
    </div>
  )
}
