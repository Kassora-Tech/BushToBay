"use client";

import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";

const STATS = [
  { value: 9, suffix: "", label: "Vehicles in our fleet" },
  { value: 60, suffix: "", label: "Seats on our biggest coach" },
  { value: 100, suffix: "%", label: "Professional, vetted drivers" },
  { value: 1000, suffix: "s", label: "Of kilometres, safely driven" },
];

export function Stats() {
  return (
    <section
      aria-label="Bush to Bay by the numbers"
      className="relative overflow-hidden bg-bush-900 py-20 text-sand-50 dark:bg-bush-950"
    >
      <div aria-hidden="true" className="gradient-mesh absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} className="text-center">
            <p className="font-display text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
              <span className="bg-gradient-to-br from-sand-100 to-bay-300 bg-clip-text">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
            </p>
            <p className="mt-3 text-sm font-medium text-sand-200/75">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
