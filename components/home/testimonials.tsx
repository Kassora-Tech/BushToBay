"use client";

import { SplitText } from "@/components/split-text";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

// Placeholder testimonials for the demo — to be replaced with the client's
// real reviews before launch.
const TESTIMONIALS = [
  {
    quote:
      "From Joburg to Durban and back, the coach was spotless and the driver was professional from the first kilometre to the last. Our church books with no one else now.",
    name: "Pastor S. Nkosi",
    role: "Church group organiser, Soweto",
  },
  {
    quote:
      "Sixty learners, zero stress. Seat belts throughout, air conditioning, and on time both ways — exactly what a school trip needs.",
    name: "L. van der Merwe",
    role: "Teacher, Centurion",
  },
  {
    quote:
      "Our year-end function ran like clockwork. The Sprinter felt executive-class and the pricing was more than fair. We'll be back.",
    name: "T. Molefe",
    role: "Operations manager, Sandton",
  },
];

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bay-400">
          Word of mouth
        </p>
      </Reveal>
      <SplitText
        as="h2"
        text="Groups that travelled with us, again and again."
        className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
      />
      <span id="testimonials-heading" className="sr-only">Testimonials</span>

      <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.15}>
        {TESTIMONIALS.map((t) => (
          <StaggerItem key={t.name} className="h-full">
            <TiltCard className="h-full" max={5}>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-bush-900/10">
                <div>
                  <div aria-hidden="true" className="flex gap-1 text-bush-500 dark:text-bay-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9 2.9-6z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-5 leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-7">
                  <p className="font-display font-bold">{t.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{t.role}</p>
                </figcaption>
              </figure>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
