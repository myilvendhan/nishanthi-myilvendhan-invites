import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

/**
 * Soft instrumental ambience generated with the Web Audio API:
 * a gentle veena-like pentatonic arpeggio over a warm tanpura drone.
 */
const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

export function MusicToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    const master = masterRef.current;
    const ctx = ctxRef.current;
    if (master && ctx) master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
  }, []);

  const start = useCallback(() => {
    let ctx = ctxRef.current;
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new Ctor();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0.0001;
      master.connect(ctx.destination);
      masterRef.current = master;

      // tanpura-style drone
      [130.81, 196.0, 261.63].forEach((f, i) => {
        const osc = ctx!.createOscillator();
        const g = ctx!.createGain();
        osc.type = "sine";
        osc.frequency.value = f;
        g.gain.value = 0.05 - i * 0.008;
        osc.connect(g).connect(master);
        osc.start();
      });
    }
    void ctx.resume();
    const master = masterRef.current!;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 1.2);

    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const c = ctxRef.current;
      const m = masterRef.current;
      if (!c || !m) return;
      const idx = stepRef.current++;
      const note = SCALE[(idx * 3 + (idx % 5)) % SCALE.length] ?? 440;
      const t = c.currentTime;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "triangle";
      osc.frequency.value = note;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      osc.connect(g).connect(m);
      osc.start(t);
      osc.stop(t + 2.5);
    }, 900);
  }, []);

  useEffect(() => () => stop(), [stop]);

  return (
    <button
      type="button"
      aria-label={on ? "Turn music off" : "Turn music on"}
      onClick={() => {
        setOn((prev) => {
          if (prev) stop();
          else start();
          return !prev;
        });
      }}
      className="fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 bg-background/80 text-accent shadow-[var(--shadow-soft)] backdrop-blur-md transition-transform active:scale-95"
    >
      {on ? <Volume2 className="h-5 w-5 animate-glow" /> : <VolumeX className="h-5 w-5" />}
      <Music className="absolute -top-1 -right-1 h-3 w-3 opacity-60" />
    </button>
  );
}
