import { Suspense } from "react";
import type { Metadata } from "next";
import { SplitText } from "@/components/split-text";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/home/cta";
import { ProfileCard } from "@/components/social/profile-card";
import { SocialFeed } from "@/components/social/social-feed";
import { FeedSkeleton } from "@/components/social/post-skeleton";
import { getSocialData } from "@/lib/meta";

const DESCRIPTION =
  "Follow Bush to Bay Travel and Tours on Instagram and Facebook — the latest trips, coaches on the road and happy groups from across Southern Africa.";

export const metadata: Metadata = {
  title: "Social",
  description: DESCRIPTION,
  alternates: { canonical: "/social" },
  openGraph: {
    title: "Follow Our Journeys | Bush to Bay Travel and Tours",
    description: DESCRIPTION,
    url: "/social",
    type: "website",
    locale: "en_ZA",
  },
};

// Rebuild with fresh Instagram and Facebook posts at most once an hour (ISR)
export const revalidate = 3600;

export default async function SocialPage() {
  const { instagram, facebook } = await getSocialData();

  return (
    <>
      <section className="gradient-mesh relative overflow-hidden px-5 pb-16 pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
              Social
            </p>
          </Reveal>
          <SplitText
            as="h1"
            text="Follow our journeys."
            className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Fresh from the road — the trips, the coaches and the people who
              make every kilometre worth it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16" aria-labelledby="profiles-heading">
        <h2 id="profiles-heading" className="sr-only">
          Our social profiles
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <ProfileCard profile={instagram.profile} />
          </Reveal>
          <Reveal className="h-full" delay={0.12}>
            <ProfileCard profile={facebook.profile} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-28 pt-20" aria-labelledby="feed-heading">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
            Latest posts
          </p>
        </Reveal>
        <SplitText
          as="h2"
          text="Fresh from the road."
          className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
        />
        <span id="feed-heading" className="sr-only">
          Latest Instagram and Facebook posts
        </span>

        <div className="mt-10">
          {/* The feed reads ?tab= from the URL, which needs a Suspense boundary on a static page */}
          <Suspense fallback={<FeedSkeleton />}>
            <SocialFeed
              initial={{ instagram: instagram.feed, facebook: facebook.feed }}
              urls={{ instagram: instagram.profile.url, facebook: facebook.profile.url }}
            />
          </Suspense>
        </div>
      </section>

      <CTA heading="Ready to travel with us?" />
    </>
  );
}
