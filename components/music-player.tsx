"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type Track = {
  id?: string | number;
  title?: string;
  artist?: string;
  url?: string; // direct audio URL or YouTube watch/share URL
  youtubeId?: string;
  artwork?: string;
  source?: string; // "youtube" or "direct"
};

type Props = {
  track?: Track | null;
  onNext?: () => void;
  onPrev?: () => void;
  autoPlayOnTrackChange?: boolean;
};

function extractYouTubeId(urlOrId?: string): string | null {
  if (!urlOrId) return null;
  if (!urlOrId.includes("youtube.com") && !urlOrId.includes("youtu.be") && urlOrId.length <= 20 && /^[A-Za-z0-9_-]+$/.test(urlOrId)) {
    return urlOrId;
  }
  try {
    const u = new URL(urlOrId);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/");
      const embedIdx = parts.indexOf("embed");
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    }
  } catch {}
  return null;
}

let youtubeApiLoadedPromise: Promise<void> | null = null;
function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).YT && (window as any).YT.Player) return Promise.resolve();
  if (youtubeApiLoadedPromise) return youtubeApiLoadedPromise;

  youtubeApiLoadedPromise = new Promise((resolve) => {
    (window as any).onYouTubeIframeAPIReady = () => resolve();
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);
    setTimeout(() => resolve(), 10_000);
  });

  return youtubeApiLoadedPromise;
}

export default function MusicPlayer({
  track,
  onNext,
  onPrev,
  autoPlayOnTrackChange = true,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const pollingRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isYouTubeTrack = !!(track && (track.source === "youtube" || extractYouTubeId(track.youtubeId || track.url || "") !== null));

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "metadata";
      a.crossOrigin = "anonymous";
      audioRef.current = a;
    }
    const audio = audioRef.current;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setLoading(false);
      setError(null);
    };
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onEnd = () => setIsPlaying(false);
    const onErr = () => {
      setError("Failed to load audio resource.");
      setLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onErr);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onErr);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === "function") {
      try {
        ytPlayerRef.current.setVolume(Math.round(volume * 100));
      } catch {}
    }
  }, [volume]);

  const destroyYtPlayer = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === "function") {
      ytPlayerRef.current.destroy();
    }
    ytPlayerRef.current = null;
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    setError(null);
    setLoading(false);

    if (isYouTubeTrack) {
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch {}
      }
      const ytId = extractYouTubeId(track?.youtubeId || track?.url || "");
      if (!ytId) {
        setError("Invalid YouTube id/url.");
        return;
      }
      let cancelled = false;
      setLoading(true);
      loadYouTubeIframeAPI()
        .then(() => {
          if (cancelled) return;
          if (ytPlayerRef.current) {
            try { ytPlayerRef.current.loadVideoById(ytId); } catch { destroyYtPlayer(); }
          }
          if (!ytPlayerRef.current) {
            const container = ytContainerRef.current!;
            container.innerHTML = "";
            ytPlayerRef.current = new (window as any).YT.Player(container, {
              videoId: ytId,
              playerVars: { controls: 0, modestbranding: 1, rel: 0, playsinline: 1 },
              events: {
                onReady: (e: any) => {
                  setLoading(false);
                  try { const dur = e.target.getDuration(); if (isFinite(dur)) setDuration(dur); } catch {}
                  if (autoPlayOnTrackChange) {
                    try { e.target.playVideo(); } catch {}
                  }
                  if (pollingRef.current) clearInterval(pollingRef.current);
                  pollingRef.current = window.setInterval(() => {
                    try {
                      const cur = ytPlayerRef.current.getCurrentTime();
                      const dur = ytPlayerRef.current.getDuration();
                      if (isFinite(cur)) setCurrentTime(cur);
                      if (isFinite(dur)) setDuration(dur);
                    } catch {}
                  }, 500);
                },
                onStateChange: (ev: any) => {
                  const S = (window as any).YT.PlayerState;
                  if (ev.data === S.PLAYING) { setIsPlaying(true); setError(null); }
                  else if (ev.data === S.PAUSED) { setIsPlaying(false); }
                  else if (ev.data === S.ENDED) { setIsPlaying(false); if (onNext) onNext(); }
                },
                onError: () => { setError("YouTube playback error."); setLoading(false); },
              },
            });
          }
        })
        .catch(() => { setLoading(false); setError("Failed to load YouTube player."); });
      return () => { cancelled = true; };
    } else {
      destroyYtPlayer();
      const audio = audioRef.current;
      if (!audio || !track?.url) {
        if (audio) { try { audio.pause(); audio.src = ""; } catch {} }
        setIsPlaying(false);
        setDuration(0);
        setCurrentTime(0);
        return;
      }
      setLoading(true);
      audio.src = track.url;
      audio.load();
      if (autoPlayOnTrackChange) {
        const p = audio.play();
        if (p && typeof p.then === "function") {
          p.then(() => { setIsPlaying(true); setLoading(false); })
           .catch(() => { setIsPlaying(false); setLoading(false); setError("Autoplay blocked — click Play."); });
        }
      } else {
        setIsPlaying(false);
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  const togglePlay = async () => {
    setError(null);
    if (isYouTubeTrack) {
      if (!ytPlayerRef.current) { setError("YouTube player not ready."); return; }
      try {
        const state = ytPlayerRef.current.getPlayerState();
        const S = (window as any).YT.PlayerState;
        if (state === S.PLAYING) { ytPlayerRef.current.pauseVideo(); setIsPlaying(false); }
        else { ytPlayerRef.current.playVideo(); setIsPlaying(true); }
      } catch { setError("YouTube control failed."); }
      return;
    }

    const audio = audioRef.current;
    if (!audio || !track?.url) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); return; }
    setLoading(true);
    try {
      await audio.play();
      setIsPlaying(true);
      setError(null);
    } catch {
      setError("Playback blocked — click play to start.");
      setIsPlaying(false);
    } finally { setLoading(false); }
  };

  const seek = (t: number) => {
    if (isYouTubeTrack) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === "function") {
        try { ytPlayerRef.current.seekTo(t, true); setCurrentTime(t); } catch {}
      }
      return;
    }
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(t, duration || Infinity));
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    return () => {
      destroyYtPlayer();
      if (audioRef.current) {
        try { audioRef.current.pause(); audioRef.current.src = ""; } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fmt = (s: number) => {
    if (!isFinite(s) || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const styles: Record<string, React.CSSProperties> = {
    wrap: { display: "flex", gap: 12, alignItems: "center", padding: 12, background: "#071022", color: "#e6eef8", borderRadius: 10, width: "100%" },
    art: { width: 84, height: 84, objectFit: "cover", borderRadius: 8, background: "#0b1220" },
    meta: { flex: 1, minWidth: 0 },
    title: { fontWeight: 600, fontSize: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
    artist: { color: "#9fb0d5", fontSize: 13, marginBottom: 8 },
    controls: { display: "flex", alignItems: "center", gap: 8 },
    btn: { background: "transparent", border: "none", color: "#cfe7ff", cursor: "pointer", fontSize: 18 },
    big: { width: 44, height: 44, borderRadius: 8, border: "none", background: "#0f1724", color: "#e6eef8", cursor: "pointer", fontSize: 18 },
    progress: { flex: 1 },
    time: { fontSize: 12, color: "#9fb0d5", minWidth: 56, textAlign: "right" },
    error: { color: "#ffb4b4", marginTop: 8, fontSize: 13 },
    ytContainer: { width: 0, height: 0, overflow: "hidden" },
  };

  return (
    <div style={styles.wrap} role="region" aria-label="Music player">
      <img
        src={track?.artwork || "/placeholder-artwork.png"}
        alt={track?.title ?? "Artwork"}
        style={styles.art}
        onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/placeholder-artwork.png")}
      />

      <div style={styles.meta}>
        <div style={styles.title}>{track?.title ?? "No track selected"}</div>
        <div style={styles.artist}>{track?.artist ?? (isYouTubeTrack ? "YouTube" : "Unknown artist")}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <div style={styles.controls}>
            <button aria-label="Previous" onClick={onPrev} style={styles.btn} title="Previous">⏮</button>

            <button aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlay} style={styles.big} title={isPlaying ? "Pause" : "Play"}>
              {loading ? "⏳" : isPlaying ? "⏸" : "▶️"}
            </button>

            <button aria-label="Next" onClick={onNext} style={styles.btn} title="Next">⏭</button>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              style={styles.progress}
              aria-label="Seek"
            />
            <div style={styles.time}>{fmt(currentTime)} / {fmt(duration)}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
            <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}
      </div>

      <div ref={ytContainerRef} style={styles.ytContainer} aria-hidden={true} />
    </div>
  );
}
// ...existing code...