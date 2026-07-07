import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/home/services";
import { HowItWorks } from "@/components/home/how-it-works";
import { FleetShowcase } from "@/components/home/fleet-showcase";
import { Stats } from "@/components/home/stats";
import { WhyUs } from "@/components/home/why-us";
import { Testimonials } from "@/components/home/testimonials";
import { CTA } from "@/components/home/cta";

const SERVICES_TICKER = [
  "Church Groups",
  "School Trips",
  "Tour Groups",
  "Corporate Events",
  "Organised Parties",
  "Airport Transfers",
  "Cross-Border Travel",
];

const DESTINATIONS_TICKER = [
  "Durban",
  "Cape Town",
  "Kruger National Park",
  "Sun City",
  "Drakensberg",
  "Garden Route",
  "Mozambique",
  "Zimbabwe",
  "Eswatini",
  "Lesotho",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={SERVICES_TICKER} />
      <Services />
      <HowItWorks />
      <FleetShowcase />
      <Stats />
      <WhyUs />
      <Testimonials />
      <Marquee items={DESTINATIONS_TICKER} reverse tone="light" />
      <CTA />
    </>
  );
}
