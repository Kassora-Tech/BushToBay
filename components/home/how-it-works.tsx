"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SplitText } from "@/components/split-text";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

const STEPS = [
  {
    title: "Tell us your program",
    body: "Share your route, dates, stops and passenger count — the more detail, the sharper the quote.",
  },
  {
    title: "Get your quote",
    body: "Fast, obligation-free pricing, usually within one business day. No hidden extras.",
  },
  {
    title: "We drive, you relax",
    body: "A professional driver and a spotless, air-conditioned coach — door to door, there and back.",
  },
];

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-sand-100/60 py-24 dark:bg-bush-900/20 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
            How it works
          </p>
        </Reveal>
        <SplitText
          as="h2"
          text="Three steps. One easy journey."
          className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
        />
        <span id="how-heading" className="sr-only">How it works</span>

        <div className="relative mt-16">
          {/* Connector line drawn on scroll */}
          <motion.div
            aria-hidden="true"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-[8%] right-[8%] top-7 hidden h-px origin-left bg-gradient-to-r from-bush-500 via-amber-400 to-bush-500 md:block"
          />
          <StaggerGroup className="grid gap-10 md:grid-cols-3 md:gap-8" stagger={0.18}>
            {STEPS.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative">
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-bush-600 font-display text-xl font-bold text-white shadow-lg shadow-bush-900/20">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
