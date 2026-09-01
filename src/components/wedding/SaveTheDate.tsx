import { useCallback, useEffect, useRef, useState } from "react";
import { Divider, Sprig } from "./Ornaments";
import { useReveal } from "./useReveal";

// 15 September 2026, 00:00 India Standard Time (UTC+5:30)
const TARGET = Date.UTC(2026, 8, 14, 18, 30, 0);

const HEART_PATH =
  "M52 92 C 8 62, 0 30, 20 15 C 36 3, 50 12, 52 24 C 54 12, 68 3, 84 15 C 104 30, 96 62, 52 92 Z";

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

function HeartScratch({
  value,
  label,
  onRevealed,
  revealed,
}: {
  value: string;
  label: string;
  revealed: boolean;
  onRevealed: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const cleared = useRef(false);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#e03131");
    grad.addColorStop(0.4, "#ff5a5a");
    grad.addColorStop(0.7, "#c01d1d");
    grad.addColorStop(1, "#f26b6b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1;
    for (let x = -rect.height; x < rect.width; x += 9) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + rect.height, rect.height);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "600 8px Karla, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH", rect.width / 2, rect.height / 2 + 3);
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
    if (clear / (data.length / 40) > 0.4) {
      cleared.current = true;
      canvas.style.transition = "opacity 600ms ease";
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
    ctx.arc(clientX - rect.left, clientY - rect.top, 18, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-[96px] w-[104px]"
        style={{ clipPath: `path("${HEART_PATH}")` }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <span
            className={`mt-[-6px] font-display text-2xl leading-none text-primary ${revealed ? "animate-glow" : ""}`}
          >
            {value}
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-pointer touch-none"
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
      </div>
      <span className="mt-2 font-body text-[0.5rem] tracking-royal text-muted-foreground">
        {label}
      </span>
    </div>
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
  const [parts, setParts] = useState({ day: false, month: false, year: false });
  const countdown = useCountdown();
  const ref = useReveal<HTMLElement>(0.2);
  const allRevealed = parts.day && parts.month && parts.year;

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

        <div className="relative mt-9 flex items-start justify-center gap-3">
          <HeartScratch
            value="15"
            label="DAY"
            revealed={parts.day}
            onRevealed={() => setParts((p) => ({ ...p, day: true }))}
          />
          <HeartScratch
            value="SEP"
            label="MONTH"
            revealed={parts.month}
            onRevealed={() => setParts((p) => ({ ...p, month: true }))}
          />
          <HeartScratch
            value="2026"
            label="YEAR"
            revealed={parts.year}
            onRevealed={() => setParts((p) => ({ ...p, year: true }))}
          />
          {allRevealed && <Sparkles />}
        </div>

        <p className="mt-5 font-body text-[0.6rem] tracking-[0.2em] text-muted-foreground">
          {allRevealed ? "✦ SAVED WITH LOVE ✦" : "SCRATCH EACH HEART TO REVEAL THE DATE"}
        </p>

        {allRevealed && (
          <p className="animate-glow mt-4 font-display text-[1.9rem] leading-none text-primary">
            15 September 2026
          </p>
        )}

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
