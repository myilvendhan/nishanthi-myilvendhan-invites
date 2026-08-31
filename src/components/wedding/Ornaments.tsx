type OrnProps = { className?: string };

export function Divider({ className = "" }: OrnProps) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={`h-6 w-56 text-accent ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M4 12h72" strokeLinecap="round" opacity="0.7" />
      <path d="M164 12h72" strokeLinecap="round" opacity="0.7" />
      <path d="M120 3c7 4 11 6 11 9s-4 5-11 9c-7-4-11-6-11-9s4-5 11-9z" />
      <path d="M100 12c4-5 8-5 9 0-1 5-5 5-9 0z" opacity="0.8" />
      <path d="M140 12c-4-5-8-5-9 0 1 5 5 5 9 0z" opacity="0.8" />
      <circle cx="88" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="152" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Sprig({ className = "", flip = false }: OrnProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 120"
      className={`text-accent ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M10 118C22 92 30 62 28 6" strokeLinecap="round" />
      <g opacity="0.85">
        <path d="M28 26c10-8 20-8 26-2-8 8-18 10-26 2z" />
        <path d="M27 46c10-8 20-8 26-2-8 8-18 10-26 2z" />
        <path d="M24 66c10-8 20-8 26-2-8 8-18 10-26 2z" />
        <path d="M20 86c9-8 19-8 25-2-8 8-17 10-25 2z" />
      </g>
      <circle cx="28" cy="8" r="4" />
      <circle cx="28" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CornerFrame({ className = "" }: OrnProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`text-accent ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M2 40C2 18 18 2 40 2" strokeLinecap="round" />
      <path d="M10 52C10 28 28 10 52 10" strokeLinecap="round" opacity="0.55" />
      <path d="M22 24c8-6 16-6 22 0-7 7-15 7-22 0z" opacity="0.9" />
      <circle cx="40" cy="40" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Motif({ className = "" }: OrnProps) {
  return (
    <svg
      viewBox="0 0 120 70"
      className={`h-16 w-32 text-accent ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M60 8c9 12 14 22 14 30 0 10-6 18-14 24-8-6-14-14-14-24 0-8 5-18 14-30z" />
      <path d="M60 26c4 6 6 11 6 16s-2 9-6 13c-4-4-6-8-6-13s2-10 6-16z" opacity="0.7" />
      <path d="M34 44c-8-6-16-6-22 2 8 8 17 7 22-2z" opacity="0.8" />
      <path d="M86 44c8-6 16-6 22 2-8 8-17 7-22-2z" opacity="0.8" />
      <path d="M28 60h64" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
