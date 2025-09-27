"use client"

import { Music, Zap, Users, Shield, Heart, Star, Github, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Music,
    title: "Vast Music Library",
    description: "Access millions of songs across all genres with high-quality streaming",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant search, seamless playback, and zero buffering with our advanced technology",
  },
  {
    icon: Users,
    title: "Social Features",
    description: "Share playlists, discover music through friends, and connect with artists",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your listening habits are private. We never sell your data to third parties",
  },
]

const team = [
  {
    name: "Mr. Ved Misar",
    role: "Founder & CEO",
    bio: "Head Developer and Leading AudioMoodify with a passion for innovation, creating the future of interactive music discovery",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Mr. Satvik Deshmukh & Mr. Shlok Patel",
    role: "Head of Design",
    bio: "Mr. Satvik Deshmukh & Mr. Shlok Patel, Heads of Design, craft futuristic, immersive, and mood-driven UI/UX experiences that redefine how users interact with AudioMoodify.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Aniruddha Saraf",
    role: "GM",
    bio: "Aniruddha Saraf, General Manager, oversees AudioMoodify's operations and strategy, ensuring seamless execution of our vision for next-generation music streaming experiences.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Rohit Hage",
    role: "CTO",
    bio: "Rohit Hage, Chief Technology Officer, drives AudioMoodify's technological innovation, building cutting-edge systems for a seamless and futuristic music streaming experience.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

const stats = [
  { label: "Active Users", value: "2.5M+" },
  { label: "Songs Available", value: "50M+" },
  { label: "Artists", value: "3M+" },
  { label: "Countries", value: "180+" },
]

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About AudioMoodify
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're revolutionizing music streaming with cutting-edge technology, futuristic design, and a passion for
            connecting people through music.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="border-primary/50 text-primary">
              Founded 2024
            </Badge>
            <Badge variant="outline" className="border-primary/50 text-primary">
              Amravati Maharashtra
            </Badge>
            <Badge variant="outline" className="border-primary/50 text-primary">
              Vidyam Technologies
            </Badge>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="backdrop-blur-glass rounded-2xl p-8 border border-border/50">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To create the most intuitive, beautiful, and powerful music streaming platform that adapts to your mood,
            discovers your next favorite song, and connects you with a global community of music lovers. We believe
            music is the universal language that brings people together, and technology should enhance that connection,
            not complicate it.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Why Choose AudioMoodify?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="backdrop-blur-glass rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="backdrop-blur-glass rounded-xl p-6 border border-border/50 text-center hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-secondary">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-sm text-primary mb-3">{member.role}</p>
              <p className="text-xs text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="backdrop-blur-glass rounded-2xl p-8 border border-border/50">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Built with Cutting-Edge Technology</h2>
          <p className="text-muted-foreground mb-6">
            AudioMoodify is powered by advanced AI algorithms, cloud infrastructure, and modern web technologies to
            deliver the best possible music streaming experience.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "AI/ML", "Cloud Computing", "WebAudio API"].map(
              (tech) => (
                <Badge key={tech} variant="outline" className="border-primary/50 text-primary">
                  {tech}
                </Badge>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have questions, feedback, or want to collaborate? We'd love to hear from you!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            hello@audiomoodify.com
          </Button>
          <Button variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
            <Twitter className="h-4 w-4 mr-2" />
            @audiomoodify
          </Button>
          <Button variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <div className="backdrop-blur-glass rounded-2xl p-8 border border-border/50">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Experience the Future of Music?</h3>
          <p className="text-muted-foreground mb-6">Join millions of users already enjoying AudioMoodify</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90">
              <Heart className="h-5 w-5 mr-2" />
              Start Listening Free
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 bg-transparent">
              <Star className="h-5 w-5 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
