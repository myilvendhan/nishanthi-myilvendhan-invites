import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    if (el.classList.contains("reveal-on-scroll")) nodes.push(el);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
