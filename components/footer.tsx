import Link from "next/link";
import Image from "next/image";
import { CONTACT, SOCIAL } from "@/lib/fleet";
import { InstagramIcon, FacebookIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      {/* The client's original brand strip, recoloured to the orange theme */}
      <div className="bg-white dark:[filter:invert(1)_hue-rotate(180deg)]">
        <Image
          src="/images/silhouette-strip.png"
          alt=""
          width={2000}
          height={296}
          className="h-auto w-full"
        />
      </div>

      <div className="relative overflow-hidden bg-bush-950 text-sand-100">
        <div aria-hidden="true" className="gradient-mesh absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Image
                src="/images/logo-full.png"
                alt="Bush to Bay — Travel and Tours"
                width={851}
                height={328}
                className="h-16 w-auto [filter:invert(1)_hue-rotate(180deg)]"
              />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-200/80">
                Travel made personal. Luxury coach hire from Gauteng to anywhere
                in Southern Africa. Your journey. Our wheels. Let&rsquo;s go!
              </p>
              <ul className="mt-6 flex gap-3" aria-label="Follow us">
                <li>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Bush to Bay on Instagram (opens in a new tab)"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-sand-200/80 transition-colors hover:border-bush-300 hover:text-white focus-visible:rounded-full"
                  >
                    <InstagramIcon width={18} height={18} />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Bush to Bay on Facebook (opens in a new tab)"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-sand-200/80 transition-colors hover:border-bush-300 hover:text-white focus-visible:rounded-full"
                  >
                    <FacebookIcon width={18} height={18} />
                  </a>
                </li>
              </ul>
            </div>

            <nav aria-label="Footer navigation">
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-bush-300">
                Explore
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/" className="text-sand-200/80 transition-colors hover:text-white">Home</Link></li>
                <li><Link href="/fleet" className="text-sand-200/80 transition-colors hover:text-white">Our Fleet</Link></li>
                <li><Link href="/trucking" className="text-sand-200/80 transition-colors hover:text-white">Trucking &amp; Freight</Link></li>
                <li><Link href="/social" className="text-sand-200/80 transition-colors hover:text-white">Social</Link></li>
                <li><Link href="/contact" className="text-sand-200/80 transition-colors hover:text-white">Contact Us</Link></li>
                <li><Link href="/contact" className="text-sand-200/80 transition-colors hover:text-white">Get a Quote</Link></li>
              </ul>
            </nav>

            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-bush-300">
                Contact
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href={CONTACT.phoneHref} className="text-sand-200/80 transition-colors hover:text-white">
                    {CONTACT.phone}
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
                className="font-semibold text-bush-300 transition-colors hover:text-bush-200"
              >
                Kassora Tech
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
