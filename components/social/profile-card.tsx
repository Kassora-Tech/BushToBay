import { SocialImage } from "@/components/social/social-image";
import { PLATFORM_ACCENT, PLATFORM_ICON } from "@/components/social/platform";
import { PLATFORM_LABEL, formatCount, type SocialProfile } from "@/lib/social";

const DEFAULT_BIO: Record<SocialProfile["platform"], string> = {
  instagram: "Coaches on the road, happy groups and the views along the way.",
  facebook: "Tour announcements, fleet news and photos from recent trips.",
};

export function ProfileCard({ profile }: { profile: SocialProfile }) {
  const { platform } = profile;
  const Icon = PLATFORM_ICON[platform];
  const label = PLATFORM_LABEL[platform];
  const stats = [
    { label: "Followers", value: profile.followers },
    { label: "Posts", value: profile.postCount },
  ].filter((stat): stat is { label: string; value: number } => stat.value !== null);

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-shadow duration-300 hover:shadow-2xl hover:shadow-bush-900/10 sm:p-8">
      <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${PLATFORM_ACCENT[platform]}`} />

      <div className="flex items-center gap-4">
        <span className={`shrink-0 rounded-full p-[3px] ${PLATFORM_ACCENT[platform]}`}>
          <span className="relative block h-16 w-16 overflow-hidden rounded-full border-2 border-surface bg-surface">
            <SocialImage
              src={profile.avatarUrl}
              alt=""
              sizes="64px"
              fallback={
                <span className="grid h-full w-full place-items-center bg-bush-100 text-bush-700 dark:bg-bush-900 dark:text-bush-300">
                  <Icon width={26} height={26} />
                </span>
              }
            />
          </span>
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            <Icon width={14} height={14} />
            {label}
          </p>
          <h3 className="mt-1 break-words font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">
            {profile.name}
          </h3>
          {profile.handle && <p className="truncate text-sm text-muted">{profile.handle}</p>}
        </div>
      </div>

      {stats.length > 0 && (
        <dl className="mt-6 flex gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
                {stat.label}
              </dt>
              <dd className="font-display text-2xl font-bold tracking-tight">
                {formatCount(stat.value)}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <p className="mt-5 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-muted">
        {profile.bio ?? DEFAULT_BIO[platform]}
      </p>

      <div className="mt-auto pt-7">
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-semibold text-white shadow-lg shadow-bush-900/15 transition-transform hover:scale-[1.02] sm:w-auto ${PLATFORM_ACCENT[platform]}`}
        >
          <Icon width={20} height={20} />
          Follow on {label}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
