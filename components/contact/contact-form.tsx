"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FLEET } from "@/lib/fleet";
import { CheckCircleIcon } from "@/components/icons";

function FormInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("vehicle") ?? "";
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-foreground placeholder:text-muted/70 transition-colors focus:border-bush-500 dark:focus:border-bay-400";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo build — form submissions will be wired to the booking backend
    // (Supabase) once approved.
    setSubmitted(true);
  };

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-bush-300 bg-bush-50 p-10 text-center dark:border-bush-700 dark:bg-bush-900/40"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-bush-600 to-bay-600 text-white">
              <CheckCircleIcon width={28} height={28} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold">Quote request received!</h2>
            <p className="mt-3 text-muted">
              Thank you — our team will get back to you shortly with an
              obligation-free quote for your journey.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-full border border-bush-500/50 px-6 py-2.5 text-sm font-semibold text-bush-700 dark:text-bay-300"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
                Full name <span aria-hidden="true" className="text-bush-600 dark:text-bay-400">*</span>
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" placeholder="Thabo Mokoena" className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
                Phone number
              </label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+27 82 000 0000" className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                Email address <span aria-hidden="true" className="text-bush-600 dark:text-bay-400">*</span>
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="passengers" className="mb-1.5 block text-sm font-semibold">
                Number of passengers
              </label>
              <input id="passengers" name="passengers" type="number" min={1} max={60} placeholder="24" className={inputClass} />
            </div>
            <div>
              <label htmlFor="date" className="mb-1.5 block text-sm font-semibold">
                Departure date
              </label>
              <input id="date" name="date" type="date" className={inputClass} />
            </div>
            <div>
              <label htmlFor="vehicle" className="mb-1.5 block text-sm font-semibold">
                Preferred vehicle
              </label>
              <select id="vehicle" name="vehicle" defaultValue={preselected} className={inputClass}>
                <option value="">Not sure — advise me</option>
                {FLEET.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.seats}-Seater {v.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="program" className="mb-1.5 block text-sm font-semibold">
                Your travel program <span aria-hidden="true" className="text-bush-600 dark:text-bay-400">*</span>
              </label>
              <textarea
                id="program"
                name="program"
                required
                rows={5}
                placeholder="Tell us where you're going, your route, dates and any stops along the way — detailed information helps us give you an accurate quote."
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-full bg-bush-700 px-8 py-4 font-semibold text-white shadow-lg shadow-bush-700/25 transition-colors hover:bg-bush-600 dark:bg-bay-500 dark:text-bay-950 dark:hover:bg-bay-400"
              >
                Request my quote →
              </button>
              <p className="mt-3 text-center text-xs text-muted">
                For accurate quotations, please share detailed information about
                your travel program.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={null}>
      <FormInner />
    </Suspense>
  );
}
