"use client";

import { SocialImage } from "@/components/social/social-image";
import { Caption } from "@/components/social/caption";
import { PlatformChip, PLATFORM_ICON } from "@/components/social/platform";
import {
  CalendarIcon,
  CommentIcon,
  EyeIcon,
  HeartIcon,
  LayersIcon,
  PlayIcon,
} from "@/components/icons";
import {
  PLATFORM_LABEL,
  TYPE_LABEL,
  formatCount,
  formatPostDate,
  postAlt,
  type SocialPost,
} from "@/lib/social";

// Shown when a post has no picture (or its image URL has expired).
export function TextTile({ post, large = false }: { post: SocialPost; large?: boolean }) {
  const Icon = PLATFORM_ICON[post.platform];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-4 bg-surface bg-gradient-to-br from-bush-500/15 via-surface to-sand-400/25 p-7 sm:p-8">
      <Icon className="shrink-0 text-bush-600 dark:text-bush-400" width={28} height={28} />
      <p
        className={`font-display font-semibold leading-snug tracking-tight ${
          large ? "line-clamp-[10] text-2xl" : "line-clamp-6 text-xl"
        }`}
      >
        {post.caption || `See this post on ${PLATFORM_LABEL[post.platform]}`}
      </p>
    </div>
  );
}

export function PostStats({ post, className = "" }: { post: SocialPost; className?: string }) {
  const hasLikes = typeof post.likes === "number";
  const hasComments = typeof post.comments === "number";
  if (!hasLikes && !hasComments) return null;
  return (
    <ul className={`flex items-center gap-5 text-sm font-medium text-muted ${className}`}>
      {hasLikes && (
        <li className="flex items-center gap-1.5">
          <HeartIcon width={16} height={16} />
          {formatCount(post.likes!)}
          <span className="sr-only">likes</span>
        </li>
      )}
      {hasComments && (
        <li className="flex items-center gap-1.5">
          <CommentIcon width={16} height={16} />
          {formatCount(post.comments!)}
          <span className="sr-only">comments</span>
        </li>
      )}
    </ul>
  );
}

export function PostCard({
  post,
  priority = false,
  onPreview,
}: {
  post: SocialPost;
  priority?: boolean;
  onPreview: () => void;
}) {
  const label = PLATFORM_LABEL[post.platform];
  const alt = postAlt(post);
  const date = formatPostDate(post.timestamp);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-bush-900/10">
      {/* Mouse shortcut only — keyboard and screen-reader users get the Preview button below */}
      <div className="relative aspect-square cursor-pointer overflow-hidden bg-background" onClick={onPreview}>
        <SocialImage
          src={post.thumbnailUrl}
          alt={alt}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 370px"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fallback={<TextTile post={post} />}
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-bush-900/85 px-3.5 py-1.5 font-display text-xs font-bold text-sand-100 backdrop-blur">
          {post.type === "carousel" && <LayersIcon width={13} height={13} />}
          {post.type === "video" && <PlayIcon width={11} height={11} />}
          {TYPE_LABEL[post.type]}
        </span>
        <PlatformChip platform={post.platform} className="absolute right-4 top-4" />

        {post.type === "video" && (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bush-950/60 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110"
          >
            <PlayIcon width={26} height={26} className="translate-x-0.5" />
          </span>
        )}
        {post.type === "carousel" && post.carouselItems.length > 1 && (
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-bush-950/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <LayersIcon width={14} height={14} />
            {post.carouselItems.length}
            <span className="sr-only">images</span>
          </span>
        )}
        {post.type === "link" && post.linkTitle && post.thumbnailUrl && (
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bush-950/90 to-transparent px-5 pb-4 pt-10 text-sm font-semibold text-sand-100">
            <span className="line-clamp-2">{post.linkTitle}</span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {date && (
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            <CalendarIcon width={15} height={15} />
            <time dateTime={post.timestamp}>{date}</time>
          </p>
        )}
        {/* Picture-less posts already show their text in the tile above */}
        {post.caption && post.thumbnailUrl && (
          <Caption text={post.caption} className="mt-3 line-clamp-3 text-sm leading-relaxed" />
        )}
        <PostStats post={post} className="mt-4" />

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6">
          <button
            type="button"
            onClick={onPreview}
            aria-label={`Preview post from ${date || label}: ${alt}`}
            className="inline-flex items-center gap-2 rounded-full border border-bush-600/40 px-5 py-2.5 text-sm font-semibold text-bush-700 transition-colors hover:bg-bush-700 hover:text-white focus-visible:rounded-full dark:border-bush-500/40 dark:text-bush-300 dark:hover:bg-bush-500 dark:hover:text-bush-950"
          >
            <EyeIcon width={16} height={16} />
            Preview
          </button>
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-bush-700 transition-colors hover:text-bush-500 dark:text-bush-300 dark:hover:text-bush-200"
          >
            View on {label} <span aria-hidden="true">→</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
