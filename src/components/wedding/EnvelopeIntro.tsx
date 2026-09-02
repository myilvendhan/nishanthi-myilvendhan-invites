import { useEffect, useState } from "react";

/**
 * Cinematic opening animation: envelope -> wax seal cracks -> flap opens ->
 * golden light -> invitation rises. Pure CSS, ~6s total.
 */
export function EnvelopeIntro() {
  const [phase, setPhase] = useState<"intro" | "fading" | "done">("intro");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("done");
      return;
    }
    document.body.style.overflow = "hidden";
    const t1 = window.setTimeout(() => setPhase("fading"), 5600);
    const t2 = window.setTimeout(() => setPhase("done"), 6600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-root fixed inset-0 z-[100] overflow-hidden ${
        phase === "fading" ? "intro-root--out" : ""
      }`}
    >
      <div className="intro-dust" />
      <div className="intro-burst" />

      <div className="intro-stage">
        {/* invitation card rising from inside */}
        <div className="intro-card" />

        <div className="intro-envelope">
          <div className="intro-body" />
          <div className="intro-pocket" />

          {/* flap */}
          <div className="intro-flap">
            <svg viewBox="0 0 300 150" className="h-full w-full">
              <defs>
                <linearGradient id="introFlap" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#12362a" />
                  <stop offset="55%" stopColor="#1c4a38" />
                  <stop offset="100%" stopColor="#0d2a20" />
                </linearGradient>
              </defs>
              <path d="M0 0 H300 L150 148 Z" fill="url(#introFlap)" />
              <path
                d="M0 0 H300 L150 148 Z"
                fill="none"
                stroke="#c8a24a"
                strokeWidth="1.4"
                opacity="0.75"
              />
              <path d="M14 6 H286 L150 138 Z" fill="none" stroke="#c8a24a" strokeWidth="0.6" opacity="0.4" />
            </svg>
          </div>

          {/* wax seal */}
          <div className="intro-seal">
            <svg viewBox="0 0 100 100" className="intro-seal-face h-full w-full">
              <defs>
                <radialGradient id="introWax" cx="38%" cy="32%">
                  <stop offset="0%" stopColor="#f2d99a" />
                  <stop offset="55%" stopColor="#caa14c" />
                  <stop offset="100%" stopColor="#8d6a22" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="46" fill="url(#introWax)" />
              <circle cx="50" cy="50" r="39" fill="none" stroke="#6f5117" strokeWidth="1.2" opacity="0.6" />
              <text
                x="50"
                y="60"
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="30"
                fill="#5c4212"
                opacity="0.85"
              >
                M&amp;N
              </text>
            </svg>
          </div>

          <div className="intro-light" />
        </div>
      </div>
    </div>
  );
}
