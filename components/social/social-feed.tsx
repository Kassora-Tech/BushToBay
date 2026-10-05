"use client";

import { useCallback, useMemo, useState, type KeyboardEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { PostCard } from "@/components/social/post-card";
import { PostModal } from "@/components/social/post-modal";
import { PostSkeleton } from "@/components/social/post-skeleton";
import { PLATFORM_ACCENT, PLATFORM_ICON } from "@/components/social/platform";
import {
  PLATFORMS,
  PLATFORM_LABEL,
  type FeedPage,
  type Platform,
  type SocialPost,
} from "@/lib/social";

type Tab = "all" | Platform;
type Feeds = Record<Platform, FeedPage>;

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
];

function parseTab(value: string | null): Tab {
  return value === "instagram" || value === "facebook" ? value : "all";
}

function PlatformNotice({
  platform,
  failed,
  url,
}: {
  platform: Platform;
  failed: boolean;
  url: string;
}) {
  const Icon = PLATFORM_ICON[platform];
  const label = PLATFORM_LABEL[platform];
  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-gradient-to-br from-bush-500/10 to-sand-400/15 bg-surface px-7 py-10 text-center sm:flex-row sm:text-left">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white ${PLATFORM_ACCENT[platform]}`}>
        <Icon />
      </span>
      <div className="flex-1">
        <h3 className="font-display text-xl font-bold tracking-tight">
          {failed
            ? `We can’t show our ${label} posts right now`
            : `No ${label} posts to show just yet`}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {failed ? "They’re all still there, though — " : "In the meantime, "}
          follow us on {label} to see our latest trips.
        </p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-bush-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-bush-900/20 transition-transform hover:scale-[1.03] focus-visible:rounded-full"
      >
        Follow on {label} <span aria-hidden="true">→</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

export function SocialFeed({
  initial,
  urls,
}: {
  initial: Feeds;
  urls: Record<Platform, string>;
}) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = parseTab(searchParams.get("tab"));

  const [feeds, setFeeds] = useState<Feeds>(initial);
  const [loading, setLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const all = useMemo(
    () =>
      [...feeds.instagram.posts, ...feeds.facebook.posts].sort((a, b) =>
        b.timestamp.localeCompare(a.timestamp)
      ),
    [feeds]
  );
  const visible: SocialPost[] = tab === "all" ? all : feeds[tab].posts;
  const counts: Record<Tab, number> = {
    all: all.length,
    instagram: feeds.instagram.posts.length,
    facebook: feeds.facebook.posts.length,
  };

  const inTab = tab === "all" ? PLATFORMS : [tab];
  const pending = inTab.filter((platform) => feeds[platform].nextCursor);
  const empty = inTab.filter((platform) => feeds[platform].posts.length === 0);

  const selectTab = (next: Tab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("tab");
    else params.set("tab", next);
    const query = params.toString();
    // Updates the address bar (and useSearchParams) without a server round-trip.
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
    setLoadFailed(false);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const current = TABS.findIndex((item) => item.id === tab);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    else return;
    event.preventDefault();
    selectTab(TABS[next].id);
    document.getElementById(`social-tab-${TABS[next].id}`)?.focus();
  };

  const loadMore = async () => {
    setLoading(true);
    setLoadFailed(false);
    const results = await Promise.allSettled(
      pending.map(async (platform) => {
        const cursor = feeds[platform].nextCursor ?? "";
        const res = await fetch(
          `/api/social?platform=${platform}&after=${encodeURIComponent(cursor)}`
        );
        if (!res.ok) throw new Error(`Load more failed with HTTP ${res.status}`);
        return { platform, page: (await res.json()) as FeedPage };
      })
    );

    setFeeds((current) => {
      const next = { ...current };
      for (const result of results) {
        if (result.status !== "fulfilled") continue;
        const { platform, page } = result.value;
        const seen = new Set(current[platform].posts.map((post) => post.id));
        next[platform] = {
          ok: true,
          nextCursor: page.nextCursor,
          posts: [...current[platform].posts, ...page.posts.filter((post) => !seen.has(post.id))],
        };
      }
      return next;
    });
    setLoadFailed(results.some((result) => result.status === "rejected"));
    setLoading(false);
  };

  const previewIndex = previewId ? visible.findIndex((post) => post.id === previewId) : -1;
  const closePreview = useCallback(() => setPreviewId(null), []);
  const navigatePreview = useCallback(
    (index: number) => setPreviewId(visible[index]?.id ?? null),
    [visible]
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter posts by platform"
        className="flex w-full max-w-md rounded-full border border-border bg-surface p-1.5"
      >
        {TABS.map((item) => {
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`social-tab-${item.id}`}
              aria-selected={active}
              aria-controls="social-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => selectTab(item.id)}
              onKeyDown={onTabKeyDown}
              className={`relative flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 py-2.5 text-sm font-semibold transition-colors focus-visible:rounded-full sm:gap-2 sm:px-4 ${
                active ? "text-white dark:text-bush-950" : "text-muted hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="social-tab-pill"
                  className="absolute inset-0 rounded-full bg-bush-600 dark:bg-bush-400"
                  transition={
                    reduced ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 30 }
                  }
                />
              )}
              <span className="relative">{item.label}</span>
              <span
                className={`relative rounded-full px-1.5 py-0.5 text-xs font-bold tabular-nums sm:px-2 ${
                  active
                    ? "bg-white/20 dark:bg-bush-950/15"
                    : "bg-bush-100 text-bush-700 dark:bg-bush-900/60 dark:text-bush-300"
                }`}
              >
                {counts[item.id]}
                <span className="sr-only"> posts</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="social-panel"
        role="tabpanel"
        aria-labelledby={`social-tab-${tab}`}
        aria-busy={loading}
        className="mt-10"
      >
        {(visible.length > 0 || loading) && (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, i) => (
              <motion.li
                key={post.id}
                initial={reduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <PostCard post={post} onPreview={() => setPreviewId(post.id)} />
              </motion.li>
            ))}
            {loading &&
              Array.from({ length: 3 }, (_, i) => (
                <li key={`skeleton-${i}`}>
                  <PostSkeleton />
                </li>
              ))}
          </ul>
        )}

        {empty.length > 0 && (
          <div className={`space-y-5 ${visible.length > 0 ? "mt-8" : ""}`}>
            {empty.map((platform) => (
              <PlatformNotice
                key={platform}
                platform={platform}
                failed={!feeds[platform].ok}
                url={urls[platform]}
              />
            ))}
          </div>
        )}

        {(pending.length > 0 || loadFailed) && (
          <div className="mt-12 flex flex-col items-center gap-4">
            {loadFailed && (
              <p role="alert" className="text-sm text-muted">
                We couldn&rsquo;t load more posts just now. Please try again.
              </p>
            )}
            {pending.length > 0 && (
              <button
                type="button"
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center gap-2.5 rounded-full border border-bush-600/40 px-8 py-3.5 font-semibold text-bush-700 transition-colors hover:bg-bush-700 hover:text-white focus-visible:rounded-full disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-bush-700 dark:border-bush-500/40 dark:text-bush-300 dark:hover:bg-bush-500 dark:hover:text-bush-950 dark:disabled:hover:text-bush-300"
              >
                {loading && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                )}
                {loading ? "Loading posts…" : "Load more posts"}
              </button>
            )}
          </div>
        )}
      </div>

      {previewIndex >= 0 && (
        <PostModal
          posts={visible}
          index={previewIndex}
          onNavigate={navigatePreview}
          onClose={closePreview}
        />
      )}
    </div>
  );
}
