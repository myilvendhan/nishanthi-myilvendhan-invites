import { useCallback, useEffect, useRef, useState } from "react";
import { Divider, Sprig } from "./Ornaments";
import { useReveal } from "./useReveal";

// 15 September 2026, 00:00 India Standard Time (UTC+5:30)
const TARGET = Date.UTC(2026, 8, 14, 18, 30, 0);

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return null;
  const diff = TARGET - now;
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    done: false,
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[3.9rem] flex-col items-center rounded-sm border border-accent/35 bg-card/70 px-2 py-3">
      <span className="font-display text-3xl leading-none text-primary tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1.5 font-body text-[0.5rem] tracking-royal text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function ScratchCard({ onRevealed }: { onRevealed: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const cleared = useRef(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#c8a24a");
    grad.addColorStop(0.35, "#efd9a0");
    grad.addColorStop(0.6, "#b58a35");
    grad.addColorStop(1, "#e6cd91");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1;
    for (let x = -rect.height; x < rect.width; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + rect.height, rect.height);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(120,80,20,0.35)";
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(
        rect.width / 2,
        rect.height / 2,
        rect.width / 2 - 10 - i * 8,
        rect.height / 2 - 8 - i * 6,
        0,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(90,60,10,0.65)";
    ctx.font = "600 11px Karla, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH HERE", rect.width / 2, rect.height / 2 + 4);
  }, []);

  useEffect(() => {
    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, [paint]);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || cleared.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    for (let i = 3; i < data.length; i += 40) {
      if (data[i]! < 40) clear++;
    }
    if (clear / (data.length / 40) > 0.42) {
      cleared.current = true;
      canvas.style.transition = "opacity 700ms ease";
      canvas.style.opacity = "0";
      onRevealed();
    }
  }, [onRevealed]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-pointer touch-none rounded-sm"
      onPointerDown={(e) => {
        drawing.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        scratchAt(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (!drawing.current) return;
        scratchAt(e.clientX, e.clientY);
      }}
      onPointerUp={() => {
        drawing.current = false;
        checkProgress();
      }}
      onPointerLeave={() => {
        if (drawing.current) {
          drawing.current = false;
          checkProgress();
        }
      }}
    />
  );
}

function Sparkles() {
  const spots = [
    { left: "8%", top: "18%", d: "0s" },
    { left: "88%", top: "26%", d: "0.2s" },
    { left: "20%", top: "78%", d: "0.4s" },
    { left: "72%", top: "82%", d: "0.6s" },
    { left: "50%", top: "6%", d: "0.3s" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {spots.map((s) => (
        <span
          key={s.left + s.top}
          className="absolute text-accent"
          style={{
            left: s.left,
            top: s.top,
            animation: `sparkle-pop 1.6s ease-out ${s.d} 2`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export function SaveTheDate() {
  const [revealed, setRevealed] = useState(false);
  const countdown = useCountdown();
  const ref = useReveal<HTMLElement>(0.2);

  return (
    <section
      id="date"
      ref={ref}
      className="paper relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      <Sprig className="absolute -left-3 top-12 h-28 w-20 opacity-30" />
      <Sprig className="absolute -right-3 top-12 h-28 w-20 opacity-30" flip />

      <div className="reveal-on-scroll w-full max-w-sm">
        <h2 className="font-display text-[0.8rem] tracking-royal text-accent-foreground">
          SAVE THE DATE
        </h2>
        <Divider className="mx-auto mt-3" />

        <div className="relative mx-auto mt-8 h-36 w-full overflow-hidden rounded-sm border border-accent/50 bg-card shadow-[var(--shadow-soft)]">
          <div className="flex h-full flex-col items-center justify-center px-4">
            <p
              className={`font-display text-[2.05rem] leading-none text-primary ${revealed ? "animate-glow" : ""}`}
            >
              15 September 2026
            </p>
            <p className="mt-3 font-body text-[0.58rem] tracking-royal text-muted-foreground">
              WEDDING RECEPTION
            </p>
          </div>
          {!revealed && <ScratchCard onRevealed={() => setRevealed(true)} />}
          {revealed && <Sparkles />}
        </div>

        <p className="mt-3 font-body text-[0.6rem] tracking-[0.2em] text-muted-foreground">
          {revealed ? "✦ SAVED WITH LOVE ✦" : "SWIPE ACROSS THE GOLD TO REVEAL"}
        </p>

        <div className="mt-10">
          {countdown?.done ? (
            <p className="animate-glow font-display text-3xl text-gold-gradient">
              The Day Has Arrived ✨
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Unit value={countdown?.days ?? 0} label="DAYS" />
              <Unit value={countdown?.hours ?? 0} label="HOURS" />
              <Unit value={countdown?.minutes ?? 0} label="MINS" />
              <Unit value={countdown?.seconds ?? 0} label="SECS" />
            </div>
          )}
          <p className="mt-4 font-body text-[0.55rem] tracking-royal text-muted-foreground">
            COUNTING DOWN IN IST
          </p>
        </div>
      </div>
    </section>
  );
}
