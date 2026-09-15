import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SplitText } from "@/components/split-text";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { Magnetic } from "@/components/magnetic";
import { ChipList } from "@/components/trucking/chip-list";
import { CheckList } from "@/components/trucking/check-list";
import { TruckingCTA } from "@/components/trucking/trucking-cta";
import { TruckIcon } from "@/components/icons";
import { CONTACT } from "@/lib/fleet";

export const metadata: Metadata = {
  title: "Trucking and General Freight Transport",
  description:
    "Professional trucking and general freight transport across South Africa and SADC countries. Tautliner trucks for cross-country and cross-border freight transportation.",
};

const SA_CENTRES = [
  "Johannesburg",
  "Pretoria",
  "Centurion",
  "Durban",
  "Cape Town",
  "Port Elizabeth",
  "Gqeberha",
  "Bloemfontein",
  "Polokwane",
  "Nelspruit",
  "Mbombela",
  "Kimberley",
  "Rustenburg",
  "Witbank",
  "Richards Bay",
];

const SADC_COUNTRIES = [
  "Botswana",
  "Namibia",
  "Zimbabwe",
  "Zambia",
  "Mozambique",
  "Eswatini",
  "Lesotho",
  "Malawi",
  "Angola",
  "Democratic Republic of the Congo",
];

const FREIGHT_TYPES = [
  "Commercial goods",
  "Palletised cargo",
  "Manufacturing products",
  "Retail goods",
  "Wholesale products",
  "Building materials",
  "Machinery and equipment",
  "Agricultural products",
  "Industrial goods",
  "Distribution cargo",
  "General merchandise",
];

const IDEAL_FOR = [
  "Reliable general freight transport",
  "Cross-country trucking",
  "Cross-border freight transport",
  "SADC freight transportation",
  "Tautliner transport",
  "Long distance trucking",
  "Commercial goods transportation",
  "Regional distribution",
  "South Africa to SADC freight solutions",
];

export default function TruckingPage() {
  return (
    <>
      <section className="gradient-mesh relative overflow-hidden px-5 pb-16 pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
              Trucking &amp; freight transport
            </p>
          </Reveal>
          <SplitText
            as="h1"
            text="Reliable Cross-Country and SADC Freight Transport"
            className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl"
          />

          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
            <Reveal delay={0.35}>
              <p>
                At Bush To Bay, we provide reliable and professional trucking
                and general freight transport services across South Africa
                and throughout the SADC region.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <p>
                Our trucking division specializes in transporting general
                goods using Tautliner trucks, providing businesses with a
                dependable solution for moving cargo safely and efficiently
                over long distances.
              </p>
            </Reveal>
            <Reveal delay={0.55}>
              <p>
                Whether you require transportation within South Africa or
                need to move goods across Southern Africa, Bush To Bay offers
                a professional freight solution tailored to your
                requirements.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.65}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-bush-600 px-8 py-4 font-semibold text-white shadow-xl shadow-bush-900/20 transition-colors hover:bg-bush-500 dark:bg-bush-400 dark:text-bush-950 dark:hover:bg-bush-300"
                >
                  Get a Freight Quote
                  <span aria-hidden="true">→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-8 py-4 font-semibold text-foreground transition-colors hover:border-bush-500/60"
                >
                  {CONTACT.phone}
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.5} y={48}>
            <div className="relative mt-14 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border shadow-2xl shadow-bush-900/15">
              <Image
                src="/images/bush-to-bay-tautliner-trucking-south-africa.jpg"
                alt="Tautliner truck providing general freight transport across South Africa and SADC countries"
                title="Bush To Bay Tautliner Trucking and Freight Transport"
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee
        items={[
          "Tautliner Trucks",
          "Cross-Country Trucking",
          "Cross-Border Freight",
          "SADC Region",
          "Palletised Cargo",
          "Long Distance Transport",
        ]}
      />

      {/* General Goods Transport Across South Africa */}
      <section
        aria-labelledby="sa-goods-heading"
        className="mx-auto max-w-6xl px-5 py-20 sm:py-24"
      >
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
            Domestic freight
          </p>
        </Reveal>
        <SplitText
          as="h2"
          text="General Goods Transport Across South Africa"
          className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
        />
        <span id="sa-goods-heading" className="sr-only">
          General goods transport across South Africa
        </span>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            Our Tautliner trucks are ideally suited for transporting a wide
            variety of general cargo, providing secure and practical
            transportation for businesses, manufacturers, wholesalers,
            distributors and other commercial clients.
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            We transport general goods between major centres throughout South
            Africa, including:
          </p>
        </Reveal>

        <ChipList items={SA_CENTRES} icon="pin" ariaLabel="South African centres served" />

        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl leading-relaxed text-muted">
            Whether your freight needs to travel across the country or
            between regional distribution centres, Bush To Bay can assist
            with dependable long distance trucking and freight
            transportation.
          </p>
        </Reveal>
      </section>

      {/* Cross-Border Trucking Throughout the SADC Region */}
      <section
        aria-labelledby="sadc-heading"
        className="relative overflow-hidden bg-sand-100/60 py-20 dark:bg-bush-900/20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
              Cross-border freight
            </p>
          </Reveal>
          <SplitText
            as="h2"
            text="Cross-Border Trucking Throughout the SADC Region"
            className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <span id="sadc-heading" className="sr-only">
            Cross-border trucking throughout the SADC region
          </span>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">
              Bush To Bay also provides cross-border freight transport to
              SADC countries, helping businesses move general cargo
              efficiently throughout Southern Africa.
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Our regional trucking services can accommodate transportation
              requirements to and from countries including:
            </p>
          </Reveal>

          <ChipList items={SADC_COUNTRIES} icon="globe" ariaLabel="SADC countries served" />

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl leading-relaxed text-muted">
              With experience in Southern African road transportation, we
              understand the importance of reliable scheduling, clear
              communication, and careful cargo handling when goods travel
              across international borders.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tautliner Truck Transport */}
      <section
        aria-labelledby="tautliner-heading"
        className="mx-auto max-w-6xl px-5 py-20 sm:py-24"
      >
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
            Our trucks
          </p>
        </Reveal>
        <SplitText
          as="h2"
          text="Tautliner Truck Transport"
          className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
        />
        <span id="tautliner-heading" className="sr-only">
          Tautliner truck transport
        </span>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            Our Tautliner trucking services provide a flexible solution for
            transporting general freight.
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Tautliner trailers are particularly suitable for commercial cargo
            because they provide practical side and rear access while
            protecting goods from the elements during transportation.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Our services are suitable for a wide range of general freight,
            including:
          </p>
        </Reveal>

        <ChipList items={FREIGHT_TYPES} icon="box" ariaLabel="Freight types transported" />

        <Reveal delay={0.34}>
          <p className="mt-8 max-w-2xl leading-relaxed text-muted">
            If you have a regular freight requirement or a once-off
            transportation requirement, speak to Bush To Bay about a solution
            suited to your cargo and destination.
          </p>
        </Reveal>
      </section>

      {/* Long Distance Freight Transport */}
      <section
        aria-labelledby="long-distance-heading"
        className="relative overflow-hidden bg-sand-100/60 py-20 dark:bg-bush-900/20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-start gap-10 lg:grid-cols-[auto_1fr]">
            <Reveal>
              <span
                aria-hidden="true"
                className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-bush-600 text-white shadow-lg shadow-bush-900/20"
              >
                <TruckIcon />
              </span>
            </Reveal>
            <div>
              <SplitText
                as="h2"
                text="Long Distance Freight Transport"
                className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
              />
              <span id="long-distance-heading" className="sr-only">
                Long distance freight transport
              </span>
              <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
                <Reveal delay={0.15}>
                  <p>
                    Moving freight over long distances requires more than
                    simply having a truck available. Reliable transportation
                    depends on planning, communication and professional
                    service.
                  </p>
                </Reveal>
                <Reveal delay={0.22}>
                  <p>
                    Bush To Bay focuses on providing dependable long-distance
                    freight transport throughout South Africa and Southern
                    Africa.
                  </p>
                </Reveal>
                <Reveal delay={0.29}>
                  <p>
                    From local and regional deliveries to cross-country and
                    cross-border transportation, our goal is to ensure your
                    goods reach their destination safely and efficiently.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Freight Transport You Can Depend On */}
      <section
        aria-labelledby="depend-on-heading"
        className="mx-auto max-w-6xl px-5 py-20 sm:py-24"
      >
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
            Why Bush To Bay
          </p>
        </Reveal>
        <SplitText
          as="h2"
          text="Freight Transport You Can Depend On"
          className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
        />
        <span id="depend-on-heading" className="sr-only">
          Freight transport you can depend on
        </span>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            We understand that transportation is an important part of your
            business. Delays, poor communication, and unreliable transport
            can have a direct impact on your customers and operations.
          </p>
        </Reveal>
        <Reveal delay={0.28}>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            That is why Bush To Bay is committed to providing a professional
            and dependable freight transportation service.
          </p>
        </Reveal>
        <Reveal delay={0.34}>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Our trucking services are ideal for companies looking for:
          </p>
        </Reveal>

        <div className="max-w-3xl">
          <CheckList items={IDEAL_FOR} ariaLabel="Our trucking services are ideal for" />
        </div>
      </section>

      {/* Your Southern African Transport Partner */}
      <section
        aria-labelledby="partner-heading"
        className="relative overflow-hidden bg-sand-100/60 py-20 dark:bg-bush-900/20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
              Your transport partner
            </p>
          </Reveal>
          <SplitText
            as="h2"
            text="Your Southern African Transport Partner"
            className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <span id="partner-heading" className="sr-only">
            Your Southern African transport partner
          </span>

          <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
            <Reveal delay={0.2}>
              <p>
                From South Africa to the SADC region, Bush To Bay provides
                professional trucking solutions for businesses requiring
                dependable general freight transportation.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p>
                If you need to transport goods across South Africa, or
                require a reliable trucking partner for freight moving into
                Southern Africa, contact Bush To Bay today.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.36}>
            <div className="mt-10 max-w-2xl rounded-3xl border border-border bg-surface p-7 sm:p-8">
              <h3 className="font-display text-xl font-bold tracking-tight">
                Request a Freight Transport Quote
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                Tell us what you need transported, where the goods need to be
                collected, the destination, approximate load size, and your
                required delivery date.
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                Our team will assess your requirements and provide a suitable
                transportation solution.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <TruckingCTA />
    </>
  );
}
