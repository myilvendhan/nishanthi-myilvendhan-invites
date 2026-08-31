import { useEffect, useState } from "react";
import heroImg from "@/assets/couple-hero.jpg";
import { CornerFrame, Divider } from "./Ornaments";

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(window.scrollY * 0.18));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="welcome" className="relative min-h-[100svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Myilvendhan and Nishanthi in traditional South Indian wedding attire"
        width={1024}
        height={1536}
        fetchPriority="high"
        className="absolute inset-0 h-[112%] w-full object-cover object-top"
        style={{ transform: `translate3d(0, ${-offset}px, 0)` }}
      />
      <div className="absolute inset-0 bg-veil" />

      <CornerFrame className="absolute left-3 top-3 h-16 w-16 opacity-70" />
      <CornerFrame className="absolute right-3 top-3 h-16 w-16 -scale-x-100 opacity-70" />
      <CornerFrame className="absolute bottom-3 left-3 h-16 w-16 -scale-y-100 opacity-70" />
      <CornerFrame className="absolute bottom-3 right-3 h-16 w-16 -scale-100 opacity-70" />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-end px-7 pb-24 pt-24 text-center">
        <p className="animate-soft-fade font-body text-[0.68rem] leading-relaxed tracking-royal text-ivory/85">
          WITH LOVE AND HAPPINESS,
          <br />
          WE INVITE YOU TO CELEBRATE
        </p>

        <h1
          className="animate-rise mt-6 font-display text-[2.9rem] leading-[1.05] text-gold-gradient"
          style={{ animationDelay: "0.15s" }}
        >
          Myilvendhan
          <span className="mx-2 block font-display text-2xl italic text-ivory/70">&amp;</span>
          Nishanthi
        </h1>

        <Divider className="mt-5 opacity-80" />

        <p
          className="animate-rise mt-3 font-body text-[0.72rem] tracking-royal text-ivory/90"
          style={{ animationDelay: "0.3s" }}
        >
          WEDDING RECEPTION
        </p>

        <p
          className="animate-rise mt-7 max-w-xs font-display text-lg italic leading-relaxed text-ivory/85"
          style={{ animationDelay: "0.45s" }}
        >
          “Two hearts, one beautiful journey, and a celebration surrounded by the people we love.”
        </p>

        <div className="absolute bottom-7 left-0 right-0 flex flex-col items-center gap-2">
          <span className="font-body text-[0.6rem] tracking-royal text-ivory/70">
            SCROLL TO BEGIN
          </span>
          <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-ivory/45">
            <span
              className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent"
              style={{ animation: "scroll-dot 1.9s ease-in-out infinite" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
