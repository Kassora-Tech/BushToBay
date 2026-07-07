import type { Metadata } from "next";
import { FleetGrid } from "@/components/fleet/fleet-grid";
import { SplitText } from "@/components/split-text";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { CTA } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Nine vehicles, from a 7-seater Hyundai H1 to a 60-seater coach. Air conditioning, reclining seats, PA systems and charging ports — every group size covered.",
};

export default function FleetPage() {
  return (
    <>
      <section className="gradient-mesh relative overflow-hidden px-5 pb-16 pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bay-400">
              Our fleet
            </p>
          </Reveal>
          <SplitText
            as="h1"
            text="Nine vehicles. Zero compromises."
            className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Every vehicle is air-conditioned, seat-belted and driven by a
              professional. From executive shuttles to 60-seat coaches — pick the
              size, we&rsquo;ll handle the journey.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={[
          "Air Conditioning",
          "Reclining Seats",
          "PA Systems",
          "Charging Ports",
          "Seat Belts Throughout",
          "Professional Drivers",
        ]}
      />

      <section className="mx-auto max-w-6xl px-5 py-20" aria-label="Fleet vehicles">
        <FleetGrid />
      </section>

      <CTA />
    </>
  );
}
