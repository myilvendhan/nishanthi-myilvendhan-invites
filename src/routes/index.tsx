import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/wedding/Hero";
import { SaveTheDate } from "@/components/wedding/SaveTheDate";
import { Venue } from "@/components/wedding/Venue";
import { EndCard } from "@/components/wedding/EndCard";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { SectionNav } from "@/components/wedding/SectionNav";
import { EnvelopeIntro } from "@/components/wedding/EnvelopeIntro";
import { Sparkles } from "@/components/wedding/Sparkles";

const title = "Myilvendhan & Nishanthi — Wedding Reception Invitation";
const description =
  "Join Myilvendhan & Nishanthi for their wedding reception on 15 September 2026 at Sarasu Mahal, Aval Poondurai, Erode.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background">
      <EnvelopeIntro />
      <Sparkles />
      <SectionNav />
      <MusicToggle />
      <Hero />
      <SaveTheDate />
      <Venue />
      <EndCard />
    </main>
  );
}
