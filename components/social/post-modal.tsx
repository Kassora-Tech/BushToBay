"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SocialImage } from "@/components/social/social-image";
import { Caption } from "@/components/social/caption";
import { PlatformChip } from "@/components/social/platform";
import { PostStats, TextTile } from "@/components/social/post-card";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  PlayIcon,
} from "@/components/icons";
import {
  PLATFORM_LABEL,
  TYPE_LABEL,
  formatPostDate,
  postAlt,
  type SocialPost,
} from "@/lib/social";

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

const ROUND_BUTTON =
  "grid h-10 w-10 place-items-center rounded-full bg-bush-950/65 text-white backdrop-blur transition-colors hover:bg-bush-950/90 focus-visible:rounded-full focus-visible:outline-white";

type Slide = { type: "image" | "video"; mediaUrl: string | null; thumbnailUrl: string | null };

function PostMedia({ post }: { post: SocialPost }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const label = PLATFORM_LABEL[post.platform];
  const alt = postAlt(post);

  const slides: Slide[] =
    post.type === "carousel" && post.carouselItems.length > 0
      ? post.carouselItems
      : [
          {
            type: post.type === "video" ? "video" : "image",
            mediaUrl: post.mediaUrl,
            thumbnailUrl: post.thumbnailUrl,
          },
        ];
  const slide = slides[Math.min(slideIndex, slides.length - 1)];
  const many = slides.length > 1;
  const go = (delta: number) =>
    setSlideIndex((current) => (current + delta + slides.length) % slides.length);

  return (
    <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-bush-950 lg:aspect-auto lg:h-full">
      {slide.type === "video" && slide.mediaUrl ? (
        <video
          key={slide.mediaUrl}
          src={slide.mediaUrl}
          poster={slide.thumbnailUrl ?? undefined}
          controls
          playsInline
          preload="metadata"
          aria-label={alt}
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <>
          <SocialImage
            key={slide.thumbnailUrl ?? slide.mediaUrl ?? "empty"}
            src={slide.type === "video" ? slide.thumbnailUrl : slide.mediaUrl ?? slide.thumbnailUrl}
            alt={many ? `${alt} (${slideIndex + 1} of ${slides.length})` : alt}
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-contain"
            fallback={<TextTile post={post} large />}
          />
          {/* A video Meta won't let us play inline — send people to the source */}
          {slide.type === "video" && (
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-bush-950/75 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-bush-950 focus-visible:rounded-full focus-visible:outline-white"
            >
              <PlayIcon width={16} height={16} />
              Watch on {label}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </>
      )}

      {post.type === "link" && post.linkTitle && post.thumbnailUrl && (
        <a
          href={post.linkUrl ?? post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bush-950/95 to-transparent px-6 pb-5 pt-12 font-semibold text-sand-100 hover:underline focus-visible:outline-white"
        >
          <span className="line-clamp-2">{post.linkTitle} →</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}

      {many && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${ROUND_BUTTON}`}
          >
            <ChevronLeftIcon width={20} height={20} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${ROUND_BUTTON}`}
          >
            <ChevronRightIcon width={20} height={20} />
          </button>
          <ul className="absolute inset-x-0 bottom-3 flex justify-center gap-1">
            {slides.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setSlideIndex(i)}
                  aria-label={`Go to image ${i + 1} of ${slides.length}`}
                  aria-current={i === slideIndex ? "true" : undefined}
                  className="grid h-6 w-6 place-items-center focus-visible:rounded-full focus-visible:outline-white"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${
                      i === slideIndex ? "w-5 bg-white" : "w-2 bg-white/55"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function PostModal({
  posts,
  index,
  onNavigate,
  onClose,
}: {
  posts: SocialPost[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const post = posts[index];
  const label = PLATFORM_LABEL[post.platform];
  const date = formatPostDate(post.timestamp);
  const hasPrev = index > 0;
  const hasNext = index < posts.length - 1;

  // Lock page scroll and hand focus back to the trigger on close.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const { documentElement: html, body } = document;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
      trigger?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      // Arrow keys belong to the video scrubber while it has focus.
      const onVideo = event.target instanceof HTMLVideoElement;
      if (event.key === "ArrowLeft" && hasPrev && !onVideo) {
        event.preventDefault();
        onNavigate(index - 1);
      } else if (event.key === "ArrowRight" && hasNext && !onVideo) {
        event.preventDefault();
        onNavigate(index + 1);
      } else if (event.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (!dialog.contains(active)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, hasPrev, hasNext, onNavigate, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
      data-lenis-prevent
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-bush-950/80 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-modal-title"
        className="relative flex max-h-full w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-bush-950/40"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className={`absolute right-4 top-4 z-10 ${ROUND_BUTTON} lg:bg-transparent lg:text-foreground lg:backdrop-blur-none lg:hover:bg-border/60 lg:focus-visible:outline-bush-600`}
        >
          <CloseIcon width={20} height={20} />
        </button>

        {/* Scrolls as one column on small screens; the close button stays put */}
        <div className="flex w-full flex-col overflow-y-auto overscroll-contain lg:grid lg:h-[min(84vh,680px)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:overflow-hidden">
        <PostMedia key={post.id} post={post} />

        <div className="flex min-h-0 flex-col p-6 sm:p-8">
          <div className="flex items-center gap-3 pr-10">
            <PlatformChip platform={post.platform} className="h-10 w-10" />
            <div className="min-w-0">
              <h2 id="post-modal-title" className="font-display text-lg font-bold tracking-tight">
                {TYPE_LABEL[post.type]} on {label}
              </h2>
              {date && (
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                  <CalendarIcon width={14} height={14} />
                  <time dateTime={post.timestamp}>{date}</time>
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 min-h-0 flex-1 lg:overflow-y-auto lg:pr-2">
            {post.caption ? (
              <Caption
                text={post.caption}
                className="whitespace-pre-line break-words text-sm leading-relaxed"
              />
            ) : (
              <p className="text-sm text-muted">This post has no caption.</p>
            )}
          </div>

          <PostStats post={post} className="mt-6" />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-bush-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-bush-900/20 transition-transform hover:scale-[1.03] focus-visible:rounded-full"
            >
              View on {label} <span aria-hidden="true">→</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate(index - 1)}
                disabled={!hasPrev}
                aria-label="Previous post"
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-bush-50 focus-visible:rounded-full disabled:opacity-35 disabled:hover:bg-transparent dark:hover:bg-bush-900/50"
              >
                <ChevronLeftIcon width={18} height={18} />
              </button>
              <span className="min-w-[3.5rem] text-center text-sm font-medium text-muted" aria-live="polite">
                {index + 1} / {posts.length}
              </span>
              <button
                type="button"
                onClick={() => onNavigate(index + 1)}
                disabled={!hasNext}
                aria-label="Next post"
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-bush-50 focus-visible:rounded-full disabled:opacity-35 disabled:hover:bg-transparent dark:hover:bg-bush-900/50"
              >
                <ChevronRightIcon width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
