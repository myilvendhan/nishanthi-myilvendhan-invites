import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import trackAsset from "@/assets/wedding-track.mp3.asset.json";

/**
 * Plays the couple's chosen wedding track via a single Audio element,
 * toggled by the floating button. Loops softly in the background.
 */
export function MusicToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(trackAsset.url);
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      void audio.play().catch(() => setOn(false));
    } else {
      audio.pause();
    }
  }, [on]);

  return (
    <button
      type="button"
      aria-label={on ? "Turn music off" : "Turn music on"}
      onClick={() => setOn((prev) => !prev)}
      className="fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 bg-background/80 text-accent shadow-[var(--shadow-soft)] backdrop-blur-md transition-transform active:scale-95"
    >
      {on ? <Volume2 className="h-5 w-5 animate-glow" /> : <VolumeX className="h-5 w-5" />}
      <Music className="absolute -top-1 -right-1 h-3 w-3 opacity-60" />
    </button>
  );
}
