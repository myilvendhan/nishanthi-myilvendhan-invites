import { Divider, Motif, Sprig } from "./Ornaments";
import { useReveal } from "./useReveal";

export function EndCard() {
  const ref = useReveal<HTMLElement>(0.25);

  return (
    <section
      id="thankyou"
      ref={ref}
      className="paper relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-8 text-center"
    >
      <Sprig className="absolute -left-2 top-10 h-32 w-20 opacity-25" />
      <Sprig className="absolute -right-2 bottom-10 h-32 w-20 opacity-25" flip />

      <div className="reveal-on-scroll">
        <h2 className="font-display text-5xl text-gold-gradient">Thank You</h2>
        <Divider className="mx-auto mt-5" />
        <p className="mx-auto mt-6 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
          We look forward to celebrating this beautiful occasion with you.
        </p>
        <p className="mx-auto mt-6 max-w-xs whitespace-pre-line font-body text-sm leading-loose text-muted-foreground italic">
          {"Two hearts met, two dreams came true,\n\nA beautiful journey, just me and you.\n\nWith smiles that sparkle and hearts that glow,\n\nWe found a love we’ll always know.\n\nHand in hand, through joy and rain,\n\nTogether forever, through every gain.\n\nToday we celebrate the love we share,\n\nA lifetime of moments, memories, and care.\n\nOne promise, two hearts, forever as one—\n\nOur sweetest love story has just begun. 💍❤️\n\nWith love, laughter, and dreams in sight,\n\nWe begin our forever ✨"}
        </p>
        <p className="mt-10 font-body text-[0.6rem] tracking-royal text-accent">WITH LOVE,</p>
        <p className="mt-3 font-display text-3xl text-primary">Myilvendhan &amp; Nishanthi</p>
        <Motif className="mx-auto mt-6 opacity-70" />
      </div>
    </section>
  );
}
