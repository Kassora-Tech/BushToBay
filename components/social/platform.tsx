import { InstagramIcon, FacebookIcon } from "@/components/icons";
import { PLATFORM_LABEL, type Platform } from "@/lib/social";

// The only off-palette colours on the site: each network's own accent.
export const PLATFORM_ACCENT: Record<Platform, string> = {
  instagram: "bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600",
  facebook: "bg-[#1877F2]",
};

export const PLATFORM_ICON = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

export function PlatformChip({
  platform,
  className = "",
}: {
  platform: Platform;
  className?: string;
}) {
  const Icon = PLATFORM_ICON[platform];
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-white shadow-md shadow-bush-950/20 ${PLATFORM_ACCENT[platform]} ${className}`}
    >
      <Icon width={16} height={16} />
      <span className="sr-only">{PLATFORM_LABEL[platform]}</span>
    </span>
  );
}
