"use client";

import Link from "next/link";
import { SplitText } from "@/components/split-text";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { CONTACT } from "@/lib/fleet";

export function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-bush-950 py-28 text-sand-50"
    >
      <div aria-hidden="true" className="gradient-mesh absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-bush-500/20 to-bay-500/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <SplitText
          as="h2"
          text="Ready when you are. Let's go!"
          className="font-display text-4xl font-bold tracking-tight sm:text-6xl"
        />
        <span id="cta-heading" className="sr-only">Get in touch</span>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sand-200/80">
            Tell us where you&rsquo;re going and how many of you there are — we&rsquo;ll
            handle the rest. Quotes are fast, friendly and obligation-free.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-bush-500 to-bay-500 px-9 py-4 font-semibold text-white shadow-xl shadow-bay-900/40 transition-transform hover:scale-[1.03]"
              >
                Get in touch today <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-sand-100/25 px-9 py-4 font-semibold text-sand-100 backdrop-blur transition-colors hover:border-sand-100/60"
              >
                {CONTACT.phone}
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
