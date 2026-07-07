"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FLEET } from "@/lib/fleet";
import { SplitText } from "@/components/split-text";
import { Reveal } from "@/components/reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHOWCASE = [FLEET[0], FLEET[3], FLEET[5], FLEET[7], FLEET[8]];

export function FleetShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const getDistance = () => track.scrollWidth - section.offsetWidth;
        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="fleet-showcase-heading"
      className="relative overflow-hidden py-24 md:min-h-screen md:py-0"
    >
      <div className="mx-auto max-w-6xl px-5 md:pt-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
            The fleet
          </p>
        </Reveal>
        <SplitText
          as="h2"
          text="From 7 seats to 60. Pick your ride."
          className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
        />
        <span id="fleet-showcase-heading" className="sr-only">Fleet showcase</span>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex flex-col gap-6 px-5 md:flex-row md:gap-8 md:pl-[max(1.25rem,calc((100vw-72rem)/2))] md:pr-24"
      >
        {SHOWCASE.map((vehicle, i) => (
          <article
            key={vehicle.slug}
            className="group relative w-full shrink-0 overflow-hidden rounded-3xl border border-border bg-surface shadow-sm md:w-[520px]"
          >
            <div className="relative h-64 overflow-hidden md:h-72">
              <Image
                src={vehicle.image}
                alt={`${vehicle.name} — ${vehicle.seats} seater`}
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={i === 0}
              />
              <span className="absolute left-4 top-4 rounded-full bg-bush-900/85 px-4 py-1.5 font-display text-sm font-bold text-sand-100 backdrop-blur">
                {vehicle.seats} Seats
              </span>
            </div>
            <div className="p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bush-600 dark:text-bush-400">
                {vehicle.tagline}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {vehicle.name}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {vehicle.description}
              </p>
            </div>
          </article>
        ))}

        {/* End card */}
        <div className="flex w-full shrink-0 items-center justify-center rounded-3xl border border-dashed border-bush-400/50 bg-bush-50/50 p-10 dark:bg-bush-900/20 md:w-[420px]">
          <div className="text-center">
            <p className="font-display text-3xl font-bold">
              +4 more <span className="text-gradient">vehicles</span>
            </p>
            <p className="mt-3 text-muted">Every size of group, covered.</p>
            <Link
              href="/fleet"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-bush-700 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-bush-600 dark:bg-bush-500 dark:text-bush-950 dark:hover:bg-bush-400"
            >
              Explore the full fleet <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
