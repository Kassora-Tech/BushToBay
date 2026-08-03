import type { Metadata } from "next";
import { getInstagramPosts } from "@/lib/instagram";
import { InstagramGrid } from "@/components/blog/instagram-grid";
import { InstagramEmptyState } from "@/components/blog/instagram-empty-state";
import { SplitText } from "@/components/split-text";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Blog & Latest Updates",
  description:
    "Recent trips, news and highlights from Bush to Bay Travel and Tours, fresh from our social feeds.",
};

export default async function BlogPage() {
  const posts = await getInstagramPosts();

  return (
    <>
      <section className="gradient-mesh relative overflow-hidden px-5 pb-16 pt-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bush-600 dark:text-bush-400">
              Blog &amp; updates
            </p>
          </Reveal>
          <SplitText
            as="h1"
            text="Fresh from the road."
            className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              The latest journeys, trips and news from Bush to Bay — pulled
              straight from our social feeds.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20" aria-label="Latest posts">
        {posts.length > 0 ? <InstagramGrid posts={posts} /> : <InstagramEmptyState />}
      </section>

      <CTA />
    </>
  );
}
