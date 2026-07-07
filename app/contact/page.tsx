import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { SplitText } from "@/components/split-text";
import { Reveal } from "@/components/reveal";
import { CONTACT } from "@/lib/fleet";
import { PhoneIcon, MailIcon, MapPinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get an obligation-free quote for luxury coach hire from Gauteng to anywhere in Southern Africa. Call +27 83 898 2914 or email sales@bushtobay.co.za.",
};

const CHANNELS = [
  {
    label: "Call us",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    detail: CONTACT.phone2,
    icon: PhoneIcon,
  },
  {
    label: "Email us",
    value: CONTACT.email,
    href: CONTACT.emailHref,
    detail: "Best for detailed travel programs",
    icon: MailIcon,
  },
  {
    label: "Find us",
    value: "Gauteng, South Africa",
    href: undefined,
    detail: "Serving all of Southern Africa",
    icon: MapPinIcon,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="gradient-mesh relative overflow-hidden px-5 pb-16 pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bay-400">
              Contact us
            </p>
          </Reveal>
          <SplitText
            as="h1"
            text="Let's plan your journey."
            className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              We&rsquo;re happy to hear from you. For accurate quotations, share the
              details of your travel program and we&rsquo;ll come back to you fast.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-28" aria-label="Contact details and quote form">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            {CHANNELS.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 0.12}>
                <div className="rounded-3xl border border-border bg-surface p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-bush-600 to-bay-600 text-white shadow-md shadow-bush-900/15">
                    <channel.icon />
                  </span>
                  <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {channel.label}
                  </h2>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="mt-1.5 block font-display text-xl font-bold tracking-tight transition-colors hover:text-bush-600 dark:hover:text-bay-300"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 font-display text-xl font-bold tracking-tight">
                      {channel.value}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-muted">{channel.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-surface p-7 sm:p-10">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Request a quote
              </h2>
              <p className="mb-8 mt-2 text-sm text-muted">
                Obligation-free. We usually respond within one business day.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
