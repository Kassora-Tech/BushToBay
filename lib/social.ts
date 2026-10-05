// Shared social-feed types and helpers. Safe to import from client components —
// anything that touches the Meta API lives in lib/meta.ts (server-only).

export type Platform = "instagram" | "facebook";
export type PostType = "image" | "video" | "carousel" | "text" | "link";

export type CarouselItem = {
  type: "image" | "video";
  mediaUrl: string | null;
  thumbnailUrl: string | null;
};

export type SocialPost = {
  id: string;
  platform: Platform;
  type: PostType;
  caption: string;
  /** Full-size media: the image itself, or the playable file for videos. */
  mediaUrl: string | null;
  /** Still image used on the card (video poster, first carousel slide…). */
  thumbnailUrl: string | null;
  carouselItems: CarouselItem[];
  permalink: string;
  /** ISO 8601 */
  timestamp: string;
  likes?: number;
  comments?: number;
  /** Facebook shared links */
  linkUrl?: string;
  linkTitle?: string;
};

export type SocialProfile = {
  platform: Platform;
  name: string;
  handle: string | null;
  avatarUrl: string | null;
  followers: number | null;
  postCount: number | null;
  bio: string | null;
  url: string;
};

export type FeedPage = {
  posts: SocialPost[];
  nextCursor: string | null;
  /** false when the API call failed (as opposed to returning no posts) */
  ok: boolean;
};

export const PLATFORMS: Platform[] = ["instagram", "facebook"];

export const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
};

export const TYPE_LABEL: Record<PostType, string> = {
  image: "Photo",
  video: "Video",
  carousel: "Carousel",
  text: "Post",
  link: "Link",
};

export function truncate(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

export function postAlt(post: SocialPost) {
  return post.caption
    ? truncate(post.caption, 120)
    : `Bush to Bay Travel and Tours on ${PLATFORM_LABEL[post.platform]}`;
}

// Fixed locale and timezone so server and client render the same string.
const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Johannesburg",
});

export function formatPostDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : DATE_FORMAT.format(date);
}

const COUNT_FORMAT = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCount(value: number) {
  return COUNT_FORMAT.format(value);
}

// Mirrors images.remotePatterns in next.config.mjs. Anything else is rendered
// unoptimised rather than letting next/image throw on an unlisted host.
export function isOptimisableImage(url: string) {
  try {
    const { protocol, hostname } = new URL(url);
    return (
      protocol === "https:" &&
      /(^|\.)(cdninstagram\.com|fbcdn\.net|fbsbx\.com)$/.test(hostname)
    );
  } catch {
    return false;
  }
}
