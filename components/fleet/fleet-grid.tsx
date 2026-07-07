"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FLEET } from "@/lib/fleet";
import { TiltCard } from "@/components/tilt-card";

export function FleetGrid() {
  const reduced = useReducedMotion();

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {FLEET.map((vehicle, i) => (
        <motion.div
          key={vehicle.slug}
          initial={reduced ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <TiltCard className="h-full" max={5}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow duration-300 hover:shadow-2xl hover:shadow-bush-900/10">
              <div className="relative h-60 overflow-hidden">
                <motion.div
                  initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: [0.77, 0, 0.175, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.name} — ${vehicle.seats} seater`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                <span className="absolute left-4 top-4 z-10 rounded-full bg-bush-900/85 px-4 py-1.5 font-display text-sm font-bold text-sand-100 backdrop-blur">
                  {vehicle.seats} Seats
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bush-600 dark:text-bay-400">
                  {vehicle.tagline}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                  {vehicle.name}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {vehicle.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${vehicle.name} features`}>
                  {vehicle.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Best for
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {vehicle.bestFor.join(" · ")}
                  </p>
                  <Link
                    href={`/contact?vehicle=${vehicle.slug}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-bush-600/40 px-5 py-3 text-sm font-semibold text-bush-700 transition-colors hover:bg-bush-700 hover:text-white dark:border-bay-500/40 dark:text-bay-300 dark:hover:bg-bay-500 dark:hover:text-bay-950"
                  >
                    Book the {vehicle.seats}-seater <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
