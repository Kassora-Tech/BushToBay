"use client";

import Image from "next/image";
import type { InstagramPost } from "@/lib/instagram";
import { StaggerGroup, StaggerItem } from "@/components/reveal";

function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function truncateCaption(caption: string): string {
  const cleaned = caption.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 220) return cleaned;
  return `${cleaned.slice(0, 220).trimEnd()}…`;
}

export function InstagramGrid({ posts }: { posts: InstagramPost[] }) {
  return (
    <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <StaggerItem key={post.id} className="h-full">
          <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow duration-300 hover:shadow-2xl hover:shadow-bush-900/10">
            <div className="relative aspect-square overflow-hidden bg-background">
              {post.mediaType === "VIDEO" ? (
                <video
                  src={post.mediaUrl}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={post.mediaUrl}
                  alt={post.caption ? truncateCaption(post.caption) : "Instagram post from Bush to Bay"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {post.mediaType === "VIDEO" && (
                <span className="absolute inset-0 grid place-items-center bg-black/20">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-bush-900 shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                    </svg>
                  </span>
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-bush-600 dark:text-bush-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </p>
                {post.timestamp && (
                  <time dateTime={post.timestamp} className="shrink-0 text-xs text-muted">
                    {formatDate(post.timestamp)}
                  </time>
                )}
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                {post.caption ? truncateCaption(post.caption) : "No caption yet."}
              </p>

              <div className="mt-auto pt-5">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-bush-600/40 px-5 py-2.5 text-sm font-semibold text-bush-700 transition-colors hover:bg-bush-700 hover:text-white dark:border-bush-500/40 dark:text-bush-300 dark:hover:bg-bush-500 dark:hover:text-bush-950"
                >
                  View post <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
