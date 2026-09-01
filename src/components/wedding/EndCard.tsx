import backdropAsset from "@/assets/couple-standing.jpg.asset.json";
import { Divider, Motif, Sprig } from "./Ornaments";
import { useReveal } from "./useReveal";

const backdrop = backdropAsset.url;

export function EndCard() {
  const ref = useReveal<HTMLElement>(0.25);

  return (
    <section
      id="thankyou"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-8 py-16 text-center"
    >
      <img
        src={backdrop}
        alt="Myilvendhan and Nishanthi together in traditional attire"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "50% 22%" }}
      />
      <div className="absolute inset-0 bg-veil" />

      <Sprig className="absolute -left-2 top-10 h-32 w-20 opacity-30 text-ivory" />
      <Sprig className="absolute -right-2 bottom-10 h-32 w-20 opacity-30 text-ivory" flip />

      <div className="reveal-on-scroll relative">
        <h2 className="font-display text-[2.6rem] leading-tight text-gold-gradient">
          Desiring Your
          <br />
          Auspicious Arrival
        </h2>
        <Divider className="mx-auto mt-5" />
        <p className="mx-auto mt-6 max-w-xs font-body text-sm leading-relaxed text-ivory/85">
          We look forward to celebrating this beautiful occasion with you.
        </p>
        <p className="mx-auto mt-6 max-w-xs whitespace-pre-line font-body text-sm italic leading-loose text-ivory/80">
          {"Two hearts met, two dreams came true,\n\nA beautiful journey, just me and you.\n\nWith smiles that sparkle and hearts that glow,\n\nWe found a love we’ll always know.\n\nHand in hand, through joy and rain,\n\nTogether forever, through every gain.\n\nToday we celebrate the love we share,\n\nA lifetime of moments, memories, and care.\n\nOne promise, two hearts, forever as one—\n\nOur sweetest love story has just begun. 💍❤️\n\nWith love, laughter, and dreams in sight,\n\nWe begin our forever ✨"}
        </p>
        <p className="mt-10 font-body text-[0.6rem] tracking-royal text-accent">WITH LOVE,</p>
        <p className="mt-3 font-display text-3xl text-ivory">Myilvendhan &amp; Nishanthi</p>
        <Motif className="mx-auto mt-6 opacity-80" />
      </div>
    </section>
  );
}
