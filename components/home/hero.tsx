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
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yOrbs = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="gradient-mesh relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Floating sunset orbs */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: yOrbs }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -28, 0], x: [0, 14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-24 h-96 w-96 rounded-full bg-gradient-to-br from-amber-300/50 to-bush-400/40 blur-3xl dark:from-amber-400/25 dark:to-bush-500/25"
        />
        <motion.div
          animate={reduced ? undefined : { y: [0, 24, 0], x: [0, -18, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-28 bottom-16 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tl from-bush-500/35 to-amber-200/45 blur-3xl dark:from-bush-600/30 dark:to-amber-500/15"
        />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: yContent, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-24 text-center"
      >
        {/* The client's original brand lockup, front and centre */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/logo-hero.png"
              alt="Bush to Bay — Travel and Tours"
              width={1600}
              height={617}
              priority
              className="h-auto w-72 drop-shadow-xl sm:w-96 lg:w-[460px] dark:[filter:invert(1)_hue-rotate(180deg)]"
            />
          </motion.div>
        </motion.div>

        <h1 className="mt-10 font-display font-bold tracking-tight">
          <SplitText
            as="span"
            text="Travel made"
            className="text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
            delay={0.5}
          />{" "}
          <SplitText
            as="span"
            text="personal."
            className="text-gradient text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
            delay={0.75}
          />
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          Luxury coach hire from Gauteng to anywhere in Southern Africa.
          Your journey. Our wheels. Let&rsquo;s go!
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-bush-600 px-8 py-4 font-semibold text-white shadow-lg shadow-bush-600/30 transition-colors hover:bg-bush-500 dark:bg-bush-400 dark:text-bush-950 dark:hover:bg-bush-300"
            >
              Get a Quote
              <span aria-hidden="true">→</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-8 py-4 font-semibold backdrop-blur transition-colors hover:border-bush-400"
            >
              View Our Fleet
            </Link>
          </Magnetic>
        </motion.div>

        <motion.ul
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
          aria-label="Highlights"
        >
          {CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-border bg-surface/80 px-4 py-2 text-sm font-medium text-muted backdrop-blur"
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
