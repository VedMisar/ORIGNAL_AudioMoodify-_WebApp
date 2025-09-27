import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context"
import { MusicProvider } from "@/contexts/music-context"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AudioMoodify - Futuristic Music Streaming",
  description: "Experience music like never before with AudioMoodify",
  generator: "Vidyam Technologies PVT LTD - vidyam.tech",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <MusicProvider>
              <Suspense fallback={null}>{children}</Suspense>
            </MusicProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
