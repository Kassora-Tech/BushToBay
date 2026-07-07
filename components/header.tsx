"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Magnetic } from "@/components/magnetic";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled || open
            ? "mx-3 border-border bg-background/85 shadow-lg shadow-bush-900/5 backdrop-blur-xl sm:mx-auto"
            : "mx-3 border-transparent bg-transparent sm:mx-auto"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="Bush to Bay — home">
          <Image
            src="/images/logo.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-contain"
            priority
          />
          <span className="font-display text-lg font-bold leading-tight tracking-tight">
            Bush <span className="text-gradient">to</span> Bay
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-bush-700 dark:text-bay-300" : "text-muted hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-bush-100 dark:bg-bush-900/60"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Magnetic className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-bush-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bush-600 dark:bg-bay-500 dark:text-bay-950 dark:hover:bg-bay-400"
            >
              Get a Quote
              <span aria-hidden="true">→</span>
            </Link>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-3 mt-2 rounded-2xl border border-border bg-background/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-bush-50 dark:hover:bg-bush-900/50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 block rounded-xl bg-bush-700 px-4 py-3 text-center font-semibold text-white dark:bg-bay-500 dark:text-bay-950"
            >
              Get a Quote →
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
