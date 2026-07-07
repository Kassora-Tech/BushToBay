"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";

const CHIPS = ["9 vehicles", "7–60 seats", "Professional drivers"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-bush-950">
      {/* Cinematic photo layer with slow parallax + settle-in zoom */}
      <motion.div
        style={reduced ? undefined : { y: yImage }}
        aria-hidden="true"
        className="absolute inset-0"
      >
        <motion.div
          initial={reduced ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-bus.jpeg"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[70%_center] [filter:saturate(1.08)_contrast(1.05)]"
          />
        </motion.div>
        {/* Legibility gradients + cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-bush-950/90 via-bush-950/40 to-bush-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bush-950/95 via-bush-950/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bush-950/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_25%,transparent_55%,rgb(51_17_7/0.5)_100%)]" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: yContent, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-40"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-sand-100 backdrop-blur-md"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-bush-400" />
          Luxury coach hire · Gauteng
        </motion.p>

        <h1 className="mt-7 max-w-4xl font-display font-bold tracking-tight text-white">
          <SplitText
            as="span"
            text="Your journey. Our wheels."
            className="block text-5xl leading-[1.02] sm:text-7xl lg:text-8xl"
            delay={0.25}
          />
          <SplitText
            as="span"
            text="Travel made personal."
            className="block bg-gradient-to-r from-sand-200 via-amber-300 to-bush-400 bg-clip-text text-5xl leading-[1.08] text-transparent sm:text-7xl lg:text-8xl"
            delay={0.6}
          />
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-sand-100/85"
        >
          Safe, luxurious group travel from Gauteng to anywhere in Southern
          Africa — church groups, school trips, tours and corporate events.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-bush-500 px-8 py-4 font-semibold text-white shadow-xl shadow-black/30 transition-colors hover:bg-bush-400"
            >
              Get a Quote
              <span aria-hidden="true">→</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition-colors hover:border-white/60 hover:bg-white/10"
            >
              View Our Fleet
            </Link>
          </Magnetic>
        </motion.div>

        <motion.ul
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="mt-14 flex flex-wrap gap-3"
          aria-label="Highlights"
        >
          {CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-sand-100/90 backdrop-blur-md"
            >
              {chip}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 z-10 hidden md:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <motion.div
            animate={reduced ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </section>
  );
}
