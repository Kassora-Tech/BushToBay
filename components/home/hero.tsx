"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SplitText } from "@/components/split-text";
import { Magnetic } from "@/components/magnetic";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const ySceneRaw = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const yScene = reduced ? undefined : ySceneRaw;

  return (
    <section
      ref={ref}
      className="gradient-mesh relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* 3D scene layer — slower parallax than the copy */}
      <motion.div
        style={{ y: yScene }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
      >
        <HeroScene />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: yContent, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-bush-300/60 bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-bush-700 backdrop-blur dark:border-bay-700 dark:text-bay-300"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-bush-500 dark:bg-bay-400" />
          Gauteng · Southern Africa
        </motion.p>

        <SplitText
          as="h1"
          text="Luxury coach hire, from the bush to the bay."
          className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
          delay={0.2}
        />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          Your trusted partner for safe, luxurious group travel — church groups,
          school trips, tours and corporate events, to{" "}
          <em className="font-semibold not-italic text-gradient">anywhere</em> in
          Southern Africa.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-bush-700 px-8 py-4 font-semibold text-white shadow-lg shadow-bush-700/25 transition-colors hover:bg-bush-600 dark:bg-bay-500 dark:text-bay-950 dark:shadow-bay-500/20 dark:hover:bg-bay-400"
            >
              Get a Quote
              <span aria-hidden="true">→</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-8 py-4 font-semibold backdrop-blur transition-colors hover:border-bush-400 dark:hover:border-bay-500"
            >
              View Our Fleet
            </Link>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-14 text-sm font-medium uppercase tracking-[0.3em] text-muted"
        >
          Your journey. Our wheels. Let&rsquo;s go!
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted/50 p-1.5">
          <motion.div
            animate={reduced ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-muted"
          />
        </div>
      </motion.div>
    </section>
  );
}
