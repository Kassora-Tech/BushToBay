export type InstagramPost = {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  permalink: string;
  timestamp: string;
};

type InstagramMediaItem = {
  id?: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  timestamp?: string;
};

type InstagramMediaResponse = {
  data?: InstagramMediaItem[];
  error?: { message?: string; type?: string; code?: number };
};

export const INSTAGRAM_API_VERSION = "v21.0";

/**
 * Fetches recent Instagram posts for the configured business account.
 * Returns an empty array when the env vars are missing or the API call
 * fails, so the /blog page can render a graceful empty state.
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const businessId = process.env.INSTAGRAM_BUSINESS_ID?.trim();
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

  if (!businessId || !accessToken) {
    return [];
  }

  const url = `https://graph.facebook.com/${INSTAGRAM_API_VERSION}/${businessId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${encodeURIComponent(accessToken)}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const json = (await res.json()) as InstagramMediaResponse;

    if (json.error || !Array.isArray(json.data)) {
      return [];
    }

    return json.data
      .filter(
        (item) =>
          typeof item.id === "string" &&
          typeof item.media_url === "string" &&
          typeof item.permalink === "string"
      )
      .map((item) => ({
        id: item.id as string,
        caption: item.caption ?? "",
        mediaType: (item.media_type as InstagramPost["mediaType"]) ?? "IMAGE",
        mediaUrl: item.media_url as string,
        permalink: item.permalink as string,
        timestamp: item.timestamp ?? "",
      }));
  } catch {
    return [];
  }
}
