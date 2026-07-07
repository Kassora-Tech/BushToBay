"use client";

import { SplitText } from "@/components/split-text";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

const SERVICES = [
  {
    title: "Church Groups",
    body: "Travel together in comfort to conferences, camps and gatherings — with space for the whole congregation.",
    icon: "⛪",
    span: "md:col-span-2",
    accent: "from-bush-500/15 to-bay-500/10",
  },
  {
    title: "School Trips",
    body: "Safe, reliable transport for learners with seat belts throughout and vetted professional drivers.",
    icon: "🎓",
    span: "",
    accent: "from-bay-500/15 to-bush-500/5",
  },
  {
    title: "Tour Groups",
    body: "From Kruger to the Garden Route — long-distance touring with reclining seats and on-board comfort.",
    icon: "🧭",
    span: "",
    accent: "from-sand-400/20 to-bush-500/10",
  },
  {
    title: "Corporate Events",
    body: "Impress your team and clients. Executive shuttles and coaches for conferences, year-ends and offsites.",
    icon: "💼",
    span: "md:col-span-2",
    accent: "from-bush-500/10 to-bay-500/15",
  },
  {
    title: "Organised Parties",
    body: "Matric farewells, weddings, birthdays — arrive together, leave together, and enjoy every kilometre.",
    icon: "🎉",
    span: "md:col-span-3",
    accent: "from-bay-500/10 via-bush-500/10 to-sand-400/15",
  },
];

export function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32" aria-labelledby="services-heading">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bay-400">
          What we do
        </p>
      </Reveal>
      <SplitText
        as="h2"
        text="One fleet. Every kind of journey."
        className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
      />
      <span id="services-heading" className="sr-only">
        Our services
      </span>

      <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.12}>
        {SERVICES.map((service) => (
          <StaggerItem key={service.title} className={service.span}>
            <TiltCard className="h-full">
              <article
                className={`group relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${service.accent} bg-surface p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-bush-900/10`}
              >
                <span aria-hidden="true" className="text-4xl">
                  {service.icon}
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{service.body}</p>
                <span
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-bush-400/20 to-bay-400/20 blur-2xl transition-transform duration-500 group-hover:scale-150"
                />
              </article>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
