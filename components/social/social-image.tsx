"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { isOptimisableImage } from "@/lib/social";

// next/image for Meta-hosted media. Signed CDN URLs can expire and new CDN
// hosts appear from time to time, so a failed or unlisted image degrades to
// the fallback instead of a broken tile.
export function SocialImage({
  src,
  alt,
  sizes,
  className = "object-cover",
  priority = false,
  fallback,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  fallback: ReactNode;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) return <>{fallback}</>;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!isOptimisableImage(src)}
      onError={() => setFailedSrc(src)}
      className={className}
    />
  );
}
