const SPARKS = [
  { l: 8, t: 12, d: 0, s: 6 },
  { l: 22, t: 68, d: 1.4, s: 4 },
  { l: 41, t: 28, d: 2.6, s: 7 },
  { l: 57, t: 82, d: 0.8, s: 4 },
  { l: 73, t: 18, d: 3.4, s: 6 },
  { l: 88, t: 55, d: 2.0, s: 4 },
  { l: 64, t: 44, d: 4.2, s: 6 },
  { l: 15, t: 90, d: 3.0, s: 4 },
  { l: 93, t: 8, d: 1.1, s: 6 },
  { l: 33, t: 52, d: 0.5, s: 5 },
  { l: 49, t: 66, d: 2.2, s: 5 },
  { l: 80, t: 74, d: 1.8, s: 5 },
  { l: 12, t: 40, d: 2.8, s: 5 },
  { l: 68, t: 30, d: 0.3, s: 5 },
  { l: 45, t: 8, d: 3.7, s: 4 },
  { l: 28, t: 82, d: 4.5, s: 4 },
];

/** Subtle ambient gold dust across the whole page. Purely decorative. */
export function Sparkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[40] overflow-hidden">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="sparkle-dot"
          style={{
            left: `${s.l}%`,
            top: `${s.t}%`,
            width: s.s,
            height: s.s,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}
    </div>
  );
}
