import "server-only";
import { SOCIAL } from "@/lib/fleet";
import type {
  CarouselItem,
  FeedPage,
  Platform,
  PostType,
  SocialPost,
  SocialProfile,
} from "@/lib/social";

const GRAPH_VERSION = "v26.0";
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;
const REVALIDATE_SECONDS = 3600;
const ERROR_REVALIDATE_SECONDS = 60;
const PAGE_SIZE = 12;

const IG_PROFILE_FIELDS = "username,name,profile_picture_url,followers_count,media_count,biography";
const IG_MEDIA_FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count,children{media_type,media_url,thumbnail_url}";
const FB_PROFILE_FIELDS = "name,about,followers_count,fan_count,picture.type(large){url},link";
const FB_POST_FIELDS =
  "id,message,created_time,permalink_url,full_picture,attachments{media_type,type,media,url,title,subattachments{media,type}},reactions.summary(true).limit(0),comments.summary(true).limit(0)";

// ---- Graph API response shapes (only the fields we request) ----

type Paged<T> = {
  data?: T[];
  paging?: { cursors?: { after?: string }; next?: string };
};

type IgProfile = {
  username?: string;
  name?: string;
  profile_picture_url?: string;
  followers_count?: number;
  media_count?: number;
  biography?: string;
};

type IgChild = {
  media_type: "IMAGE" | "VIDEO";
  media_url?: string;
  thumbnail_url?: string;
};

type IgMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  children?: { data?: IgChild[] };
};

type FbProfile = {
  name?: string;
  about?: string;
  followers_count?: number;
  fan_count?: number;
  picture?: { data?: { url?: string } };
  link?: string;
};

type FbMedia = { image?: { src?: string }; source?: string };

type FbAttachment = {
  media_type?: string;
  type?: string;
  media?: FbMedia;
  url?: string;
  title?: string;
  subattachments?: { data?: { media?: FbMedia; type?: string }[] };
};

type FbPost = {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  full_picture?: string;
  attachments?: { data?: FbAttachment[] };
  reactions?: { summary?: { total_count?: number } };
  comments?: { summary?: { total_count?: number } };
};

// ---- Fetching ----

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

async function request<T>(url: URL, token: string, revalidate: number): Promise<T> {
  // The token travels in a header so it never ends up in a logged URL.
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate },
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || json?.error) {
    throw new Error(json?.error?.message ?? `Graph API responded with HTTP ${res.status}`);
  }
  return json as T;
}

async function graph<T>(path: string, params: Record<string, string>): Promise<T> {
  const token = requireEnv("META_PAGE_ACCESS_TOKEN");
  const url = new URL(`${GRAPH_BASE}/${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  try {
    return await request<T>(url, token, REVALIDATE_SECONDS);
  } catch {
    // Failed responses are never stored in the data cache, but the page that
    // rendered around them would be. Next uses the lowest `revalidate` of any
    // fetch in a render as that page's ISR window, so retrying with a short
    // one gives a blip a second chance and, if it fails again, makes the
    // fallback page expire in a minute instead of an hour.
    return await request<T>(url, token, ERROR_REVALIDATE_SECONDS);
  }
}

function logFailure(label: string, reason: unknown) {
  const message = reason instanceof Error ? reason.message : String(reason);
  console.error(`[meta] ${label} failed: ${message}`);
}

// Meta returns offsets as "+0000", which not every browser parses.
function toIso(timestamp: string) {
  const date = new Date(timestamp.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
  return Number.isNaN(date.getTime()) ? timestamp : date.toISOString();
}

function toPage<T>(json: Paged<T>, normalise: (item: T) => SocialPost | null): FeedPage {
  const posts = (json.data ?? []).flatMap((item) => {
    const post = normalise(item);
    return post ? [post] : [];
  });
  // A cursor is only useful when Meta says there is a next page.
  const nextCursor = json.paging?.next ? json.paging.cursors?.after ?? null : null;
  return { posts, nextCursor, ok: true };
}

// ---- Normalisation ----

function normaliseInstagram(item: IgMedia): SocialPost | null {
  const caption = item.caption?.trim() ?? "";
  const carouselItems: CarouselItem[] = (item.children?.data ?? []).map((child) => ({
    type: child.media_type === "VIDEO" ? "video" : "image",
    mediaUrl: child.media_url ?? null,
    thumbnailUrl:
      child.media_type === "VIDEO" ? child.thumbnail_url ?? null : child.media_url ?? null,
  }));

  let type: PostType = "image";
  let thumbnailUrl = item.media_url ?? null;
  if (item.media_type === "VIDEO") {
    type = "video";
    thumbnailUrl = item.thumbnail_url ?? null;
  } else if (item.media_type === "CAROUSEL_ALBUM") {
    type = "carousel";
    thumbnailUrl = carouselItems[0]?.thumbnailUrl ?? item.media_url ?? null;
  }

  const mediaUrl = item.media_url ?? null;
  if (!item.permalink || (!caption && !mediaUrl && !thumbnailUrl)) return null;

  return {
    id: item.id,
    platform: "instagram",
    type,
    caption,
    mediaUrl,
    thumbnailUrl,
    carouselItems,
    permalink: item.permalink,
    timestamp: toIso(item.timestamp),
    likes: item.like_count,
    comments: item.comments_count,
  };
}

function normaliseFacebook(item: FbPost): SocialPost | null {
  const caption = item.message?.trim() ?? "";
  const attachment = item.attachments?.data?.[0];
  const picture = item.full_picture ?? attachment?.media?.image?.src ?? null;

  const carouselItems: CarouselItem[] = (attachment?.subattachments?.data ?? []).flatMap(
    (sub) => {
      const image = sub.media?.image?.src ?? null;
      const source = sub.media?.source ?? null;
      if (!image && !source) return [];
      const isVideo = Boolean(source) || (sub.type ?? "").includes("video");
      return [
        {
          type: isVideo ? ("video" as const) : ("image" as const),
          mediaUrl: isVideo ? source : image,
          thumbnailUrl: image,
        },
      ];
    }
  );

  const kind = `${attachment?.media_type ?? ""} ${attachment?.type ?? ""}`;
  let type: PostType;
  if (carouselItems.length > 1) type = "carousel";
  else if (kind.includes("video")) type = "video";
  else if (kind.includes("link") || kind.includes("share")) type = "link";
  else if (picture) type = "image";
  else type = "text";

  if (!item.permalink_url || (!caption && !picture)) return null;

  return {
    id: item.id,
    platform: "facebook",
    type,
    caption,
    // Facebook doesn't always expose a playable source; the UI then links out.
    mediaUrl: type === "video" ? attachment?.media?.source ?? null : picture,
    thumbnailUrl: picture,
    carouselItems: type === "carousel" ? carouselItems : [],
    permalink: item.permalink_url,
    timestamp: toIso(item.created_time),
    likes: item.reactions?.summary?.total_count,
    comments: item.comments?.summary?.total_count,
    linkUrl: type === "link" ? attachment?.url : undefined,
    linkTitle: type === "link" ? attachment?.title : undefined,
  };
}

// ---- Per-endpoint calls (these throw; callers decide how to degrade) ----

async function fetchInstagramProfile(): Promise<SocialProfile> {
  const data = await graph<IgProfile>(requireEnv("INSTAGRAM_USER_ID"), {
    fields: IG_PROFILE_FIELDS,
  });
  return {
    ...FALLBACK_PROFILES.instagram,
    name: data.name || FALLBACK_PROFILES.instagram.name,
    handle: data.username ? `@${data.username}` : FALLBACK_PROFILES.instagram.handle,
    avatarUrl: data.profile_picture_url ?? null,
    followers: data.followers_count ?? null,
    postCount: data.media_count ?? null,
    bio: data.biography?.trim() || null,
    url: data.username ? `https://instagram.com/${data.username}` : SOCIAL.instagram,
  };
}

async function fetchFacebookProfile(): Promise<SocialProfile> {
  const data = await graph<FbProfile>(requireEnv("FACEBOOK_PAGE_ID"), {
    fields: FB_PROFILE_FIELDS,
  });
  return {
    ...FALLBACK_PROFILES.facebook,
    name: data.name || FALLBACK_PROFILES.facebook.name,
    avatarUrl: data.picture?.data?.url ?? null,
    followers: data.followers_count ?? data.fan_count ?? null,
    bio: data.about?.trim() || null,
    url: data.link || SOCIAL.facebook,
  };
}

async function fetchPosts(platform: Platform, after?: string): Promise<FeedPage> {
  const paging: Record<string, string> = { limit: String(PAGE_SIZE) };
  if (after) paging.after = after;

  if (platform === "instagram") {
    const json = await graph<Paged<IgMedia>>(`${requireEnv("INSTAGRAM_USER_ID")}/media`, {
      fields: IG_MEDIA_FIELDS,
      ...paging,
    });
    return toPage(json, normaliseInstagram);
  }

  const json = await graph<Paged<FbPost>>(`${requireEnv("FACEBOOK_PAGE_ID")}/posts`, {
    fields: FB_POST_FIELDS,
    ...paging,
  });
  return toPage(json, normaliseFacebook);
}

// ---- Public API: never throws, always returns typed (possibly empty) results ----

const FALLBACK_PROFILES: Record<Platform, SocialProfile> = {
  instagram: {
    platform: "instagram",
    name: "Bush to Bay Travel and Tours",
    handle: SOCIAL.instagramHandle,
    avatarUrl: null,
    followers: null,
    postCount: null,
    bio: null,
    url: SOCIAL.instagram,
  },
  facebook: {
    platform: "facebook",
    name: "Bush to Bay Travel and Tours",
    handle: null,
    avatarUrl: null,
    followers: null,
    postCount: null,
    bio: null,
    url: SOCIAL.facebook,
  },
};

const EMPTY_PAGE: FeedPage = { posts: [], nextCursor: null, ok: false };

export type SocialData = Record<Platform, { profile: SocialProfile; feed: FeedPage }>;

export async function getSocialData(): Promise<SocialData> {
  const [igProfile, igFeed, fbProfile, fbFeed] = await Promise.allSettled([
    fetchInstagramProfile(),
    fetchPosts("instagram"),
    fetchFacebookProfile(),
    fetchPosts("facebook"),
  ]);

  function settle<T>(result: PromiseSettledResult<T>, label: string, fallback: T): T {
    if (result.status === "fulfilled") return result.value;
    logFailure(label, result.reason);
    return fallback;
  }

  return {
    instagram: {
      profile: settle(igProfile, "Instagram profile", FALLBACK_PROFILES.instagram),
      feed: settle(igFeed, "Instagram posts", EMPTY_PAGE),
    },
    facebook: {
      profile: settle(fbProfile, "Facebook profile", FALLBACK_PROFILES.facebook),
      feed: settle(fbFeed, "Facebook posts", EMPTY_PAGE),
    },
  };
}

export async function getPostsPage(platform: Platform, after: string): Promise<FeedPage> {
  try {
    return await fetchPosts(platform, after);
  } catch (error) {
    logFailure(`${platform === "instagram" ? "Instagram" : "Facebook"} posts (load more)`, error);
    return EMPTY_PAGE;
  }
}
