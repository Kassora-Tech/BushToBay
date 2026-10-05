import { NextResponse } from "next/server";
import { getPostsPage } from "@/lib/meta";
import type { Platform } from "@/lib/social";

// "Load more" for the /social feed. The browser sends only a platform and a
// paging cursor; the Meta token is added server-side in lib/meta.ts.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const after = searchParams.get("after") ?? "";

  if (platform !== "instagram" && platform !== "facebook") {
    return NextResponse.json({ error: "Unknown platform." }, { status: 400 });
  }
  if (!/^[\w\-=+/.]{1,2000}$/.test(after)) {
    return NextResponse.json({ error: "Invalid cursor." }, { status: 400 });
  }

  const page = await getPostsPage(platform satisfies Platform, after);
  if (!page.ok) {
    return NextResponse.json(page, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json(page);
}
