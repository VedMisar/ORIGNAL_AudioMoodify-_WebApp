"use client"

import { Home, Search, Library, ListMusic, User, Info, LogIn, UserPlus, LogOut, Music } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

type Page = "home" | "search" | "library" | "playlists" | "profile" | "about" | "login" | "signup" | "artists"

interface NavbarProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

const navItems = [
  { id: "home" as Page, label: "Home", icon: Home },
  { id: "search" as Page, label: "Search", icon: Search },
  { id: "library" as Page, label: "Library", icon: Library },
  { id: "playlists" as Page, label: "Playlists", icon: ListMusic },
  { id: "artists" as Page, label: "Artists", icon: Music },
  { id: "profile" as Page, label: "Profile", icon: User },
  { id: "about" as Page, label: "About", icon: Info },
]

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    onPageChange("home")
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-glass border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-6 flex-1">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 flex-wrap">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id

                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(item.id)}
                    className={cn(
                      "relative px-3 py-2 rounded-lg transition-all duration-300 group",
                      "hover:bg-primary/10 hover:text-primary",
                      isActive && "text-primary bg-primary/10",
                    )}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-lg animate-glow" />
                    )}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Auth and Theme Controls - Always Visible */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline truncate max-w-24">
                  {user?.displayName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange("login")}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Login</span>
                </Button>
                <Button
                  size="sm"
                  onClick={() => onPageChange("signup")}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Sign Up</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden mt-3 border-t border-border/30 pt-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className={cn(
                    "relative flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-300",
                    "hover:bg-primary/10 hover:text-primary",
                    isActive && "text-primary bg-primary/10",
                  )}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  <span className="text-xs whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-lg animate-glow" />
                  )}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
