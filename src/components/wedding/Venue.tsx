import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { MapPin, Navigation } from "lucide-react";
import { CornerFrame, Divider, Sprig } from "./Ornaments";
import { useReveal } from "./useReveal";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Sarasu+Mahal%2C+Aval+Poondurai%2C+Erode";

export function Venue() {
  const ref = useReveal<HTMLElement>(0.15);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    void QRCode.toCanvas(canvasRef.current, MAPS_URL, {
      width: 260,
      margin: 1,
      color: { dark: "#2c4a3b", light: "#fbf8ef" },
      errorCorrectionLevel: "M",
    });
  }, []);

  return (
    <section
      id="venue"
      ref={ref}
      className="paper relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      <CornerFrame className="absolute left-2 top-2 h-14 w-14 opacity-40" />
      <CornerFrame className="absolute right-2 top-2 h-14 w-14 -scale-x-100 opacity-40" />
      <Sprig className="absolute -left-3 bottom-16 h-28 w-20 opacity-25" />
      <Sprig className="absolute -right-3 bottom-16 h-28 w-20 opacity-25" flip />

      <div className="reveal-on-scroll w-full max-w-sm">
        <h2 className="font-display text-[0.8rem] tracking-royal text-accent-foreground">
          THE CELEBRATION
        </h2>
        <Divider className="mx-auto mt-3" />

        <p className="mt-6 font-body text-[0.6rem] tracking-royal text-muted-foreground">
          WEDDING RECEPTION
        </p>
        <p className="mt-2 font-display text-3xl text-primary">15 September 2026</p>

        <div className="mt-6">
          <p className="font-display text-2xl text-gold-gradient">Sarasu Mahal</p>
          <p className="mt-1 font-body text-sm text-muted-foreground">Aval Poondurai, Erode</p>
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-sm border border-accent bg-primary px-8 py-3 font-body text-[0.65rem] tracking-royal text-primary-foreground shadow-[var(--shadow-soft)] transition-transform active:scale-95"
        >
          <Navigation className="h-3.5 w-3.5" />
          FIND US
        </a>

        <div className="mx-auto mt-9 w-fit rounded-sm border border-accent/60 bg-card p-2 shadow-[var(--shadow-soft)]">
          <div className="relative rounded-sm border border-accent/40 p-4">
            <CornerFrame className="absolute left-0.5 top-0.5 h-6 w-6 opacity-70" />
            <CornerFrame className="absolute right-0.5 top-0.5 h-6 w-6 -scale-x-100 opacity-70" />
            <CornerFrame className="absolute bottom-0.5 left-0.5 h-6 w-6 -scale-y-100 opacity-70" />
            <CornerFrame className="absolute bottom-0.5 right-0.5 h-6 w-6 -scale-100 opacity-70" />
            <canvas ref={canvasRef} className="h-[220px] w-[220px] rounded-[2px]" />
          </div>
          <p className="py-3 font-body text-[0.55rem] tracking-royal text-muted-foreground">
            SCAN TO VIEW THE LOCATION
          </p>
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-sm border border-accent/70 px-6 py-2.5 font-body text-[0.6rem] tracking-royal text-primary transition-colors active:bg-secondary"
        >
          <MapPin className="h-3.5 w-3.5 text-accent" />
          OPEN IN GOOGLE MAPS
        </a>
      </div>
    </section>
  );
}
