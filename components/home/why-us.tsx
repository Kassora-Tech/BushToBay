"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SplitText } from "@/components/split-text";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

const POINTS = [
  {
    title: "Safety first, always",
    body: "Roadworthy vehicles, seat belts throughout and professional, vetted drivers on every trip.",
  },
  {
    title: "Comfort that travels far",
    body: "Air conditioning, reclining seats, PA systems and charging ports across the fleet.",
  },
  {
    title: "Fair, flexible pricing",
    body: "Affordable options for every budget — from community day trips to premium cross-border touring.",
  },
  {
    title: "Anywhere in Southern Africa",
    body: "Based in Gauteng, but no destination is off the map. Bush, coast, or anywhere in between.",
  },
];

export function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      aria-labelledby="why-us-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:py-32"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bay-400">
              Why Bush to Bay
            </p>
          </Reveal>
          <SplitText
            as="h2"
            text="Built for the long road."
            className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
          />
          <span id="why-us-heading" className="sr-only">Why choose us</span>

          <StaggerGroup className="mt-10 space-y-7" stagger={0.14}>
            {POINTS.map((point, i) => (
              <StaggerItem key={point.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-bush-500 to-bay-600 font-display text-sm font-bold text-white"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{point.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Parallax image with clip-path reveal */}
        <motion.div style={reduced ? undefined : { y: yImage }} className="relative">
          <motion.div
            initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <Image
              src="/images/hero-bus.jpeg"
              alt="A Bush to Bay luxury coach ready for departure"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-bush-950/50 via-transparent to-transparent"
            />
          </motion.div>
          <Reveal delay={0.4}>
            <figure className="absolute -bottom-8 -left-4 max-w-[260px] rounded-2xl border border-border bg-surface p-5 shadow-xl sm:-left-8">
              <blockquote className="text-sm italic leading-relaxed text-muted">
                &ldquo;Whether you&rsquo;re headed to the bush, the coast, or anywhere in
                between — we&rsquo;ll get you there.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs font-bold uppercase tracking-widest text-bush-600 dark:text-bay-400">
                — The Bush to Bay promise
              </figcaption>
            </figure>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
