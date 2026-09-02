import { useEffect, useState } from "react";

/**
 * Interactive opening: zoomed-in envelope with wax seal + "Touch to open".
 * On touch, the flap opens WITH the seal attached (no breaking), golden light
 * pours out, the invitation card rises, then the overlay fades away.
 */
export function EnvelopeIntro() {
  const [phase, setPhase] = useState<"waiting" | "opening" | "fading" | "done">(
    "waiting",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("done");
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "opening") return;
    const t1 = window.setTimeout(() => setPhase("fading"), 3200);
    const t2 = window.setTimeout(() => setPhase("done"), 4200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  const open = phase !== "waiting";

  return (
    <div
      className={`intro-root fixed inset-0 z-[100] overflow-hidden ${
        phase === "fading" ? "intro-root--out" : ""
      } ${open ? "intro-root--open" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Touch to open the invitation"
      onClick={() => phase === "waiting" && setPhase("opening")}
      onKeyDown={(e) => {
        if (phase === "waiting" && (e.key === "Enter" || e.key === " ")) {
          setPhase("opening");
        }
      }}
    >
      <div className="intro-dust" />
      <div className="intro-burst" />

      <div className="intro-stage">
        {/* invitation card rising from inside */}
        <div className="intro-card" />

        <div className="intro-envelope">
          <div className="intro-body" />
          <div className="intro-pocket" />

          {/* flap WITH the wax seal attached — opens as one piece */}
          <div className="intro-flap">
            <svg viewBox="0 0 300 150" className="h-full w-full">
              <defs>
                <linearGradient id="introFlap" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#12362a" />
                  <stop offset="55%" stopColor="#1c4a38" />
                  <stop offset="100%" stopColor="#0d2a20" />
                </linearGradient>
                <radialGradient id="introWax" cx="38%" cy="32%">
                  <stop offset="0%" stopColor="#e8c65f" />
                  <stop offset="55%" stopColor="#b23a3a" />
                  <stop offset="100%" stopColor="#7c1f1f" />
                </radialGradient>
              </defs>
              <path d="M0 0 H300 L150 148 Z" fill="url(#introFlap)" />
              <path
                d="M0 0 H300 L150 148 Z"
                fill="none"
                stroke="#c8a24a"
                strokeWidth="1.4"
                opacity="0.75"
              />
              <path
                d="M14 6 H286 L150 138 Z"
                fill="none"
                stroke="#c8a24a"
                strokeWidth="0.6"
                opacity="0.4"
              />
            </svg>
            <div className="intro-seal">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <radialGradient id="introWaxFace" cx="38%" cy="32%">
                    <stop offset="0%" stopColor="#e0603f" />
                    <stop offset="55%" stopColor="#b23a3a" />
                    <stop offset="100%" stopColor="#6f1d1d" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="46" fill="url(#introWaxFace)" />
                <circle
                  cx="50"
                  cy="50"
                  r="39"
                  fill="none"
                  stroke="#4d1212"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
                <text
                  x="50"
                  y="60"
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize="30"
                  fill="#f2d99a"
                  opacity="0.9"
                >
                  M&amp;N
                </text>
              </svg>
            </div>
          </div>

          <div className="intro-light" />
        </div>

        {/* guide text */}
        <div className="intro-hint" aria-hidden={open}>
          <span className="intro-hint-ring" />
          <p>Touch to open</p>
        </div>
      </div>
    </div>
  );
}
