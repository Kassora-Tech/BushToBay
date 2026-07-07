import Link from "next/link";
import Image from "next/image";
import { CONTACT } from "@/lib/fleet";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bush-950 text-sand-100">
      <div aria-hidden="true" className="gradient-mesh absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="" width={52} height={52} className="h-13 w-13 rounded-full object-contain" />
              <span className="font-display text-2xl font-bold">Bush to Bay</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand-200/80">
              Luxury coach hire from Gauteng to anywhere in Southern Africa. Your
              journey. Our wheels. Let&rsquo;s go!
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-bay-300">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/" className="text-sand-200/80 transition-colors hover:text-white">Home</Link></li>
              <li><Link href="/fleet" className="text-sand-200/80 transition-colors hover:text-white">Our Fleet</Link></li>
              <li><Link href="/contact" className="text-sand-200/80 transition-colors hover:text-white">Contact Us</Link></li>
              <li><Link href="/contact" className="text-sand-200/80 transition-colors hover:text-white">Get a Quote</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-bay-300">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={CONTACT.phoneHref} className="text-sand-200/80 transition-colors hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.phone2Href} className="text-sand-200/80 transition-colors hover:text-white">
                  {CONTACT.phone2}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="text-sand-200/80 transition-colors hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-sand-200/60">{CONTACT.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-sand-200/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Bush to Bay Travel and Tours. All rights reserved.</p>
          <p>
            Crafted by{" "}
            <a
              href="https://github.com/Kassora-Tech"
              className="font-semibold text-bay-300 transition-colors hover:text-bay-200"
            >
              Kassora Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
