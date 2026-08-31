import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "welcome", label: "Welcome" },
  { id: "date", label: "Save the Date" },
  { id: "venue", label: "Venue" },
  { id: "thankyou", label: "Thank You" },
];

export function SectionNav() {
  const [active, setActive] = useState("welcome");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { threshold: 0.55 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 sm:flex"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.label}
          className={`h-1.5 rounded-full bg-accent transition-all ${
            active === s.id ? "h-5 w-1.5 opacity-100" : "w-1.5 opacity-40"
          }`}
        />
      ))}
    </nav>
  );
}
