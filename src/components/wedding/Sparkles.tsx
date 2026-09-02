const SPARKS = [
  { l: 8, t: 12, d: 0, s: 5 },
  { l: 22, t: 68, d: 1.4, s: 4 },
  { l: 41, t: 28, d: 2.6, s: 6 },
  { l: 57, t: 82, d: 0.8, s: 4 },
  { l: 73, t: 18, d: 3.4, s: 5 },
  { l: 88, t: 55, d: 2.0, s: 4 },
  { l: 64, t: 44, d: 4.2, s: 5 },
  { l: 15, t: 90, d: 3.0, s: 4 },
  { l: 93, t: 8, d: 1.1, s: 5 },
  { l: 4, t: 48, d: 2.2, s: 4 },
  { l: 34, t: 56, d: 0.5, s: 3 },
  { l: 49, t: 8, d: 1.9, s: 4 },
  { l: 79, t: 74, d: 2.9, s: 6 },
  { l: 27, t: 36, d: 3.8, s: 3 },
  { l: 52, t: 62, d: 1.0, s: 4 },
  { l: 96, t: 84, d: 4.6, s: 4 },
  { l: 12, t: 32, d: 5.1, s: 5 },
  { l: 69, t: 94, d: 0.3, s: 4 },
];

/** Ambient gold dust across the whole page. Purely decorative. */
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
