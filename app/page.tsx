import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/home/services";
import { FleetShowcase } from "@/components/home/fleet-showcase";
import { Stats } from "@/components/home/stats";
import { WhyUs } from "@/components/home/why-us";
import { CTA } from "@/components/home/cta";

const MARQUEE_ITEMS = [
  "Church Groups",
  "School Trips",
  "Tour Groups",
  "Corporate Events",
  "Organised Parties",
  "Airport Transfers",
  "Cross-Border Travel",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <Services />
      <FleetShowcase />
      <Stats />
      <WhyUs />
      <CTA />
    </>
  );
}
