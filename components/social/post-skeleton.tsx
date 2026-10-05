// Placeholder with the same footprint as PostCard, so nothing shifts when posts arrive.
export function PostSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full animate-pulse flex-col overflow-hidden rounded-3xl border border-border bg-surface"
    >
      <div className="aspect-square bg-border/60" />
      <div className="flex flex-1 flex-col p-6">
        <div className="h-3 w-32 rounded-full bg-border/70" />
        <div className="mt-4 space-y-2.5">
          <div className="h-3 rounded-full bg-border/70" />
          <div className="h-3 rounded-full bg-border/70" />
          <div className="h-3 w-2/3 rounded-full bg-border/70" />
        </div>
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="h-10 w-28 rounded-full bg-border/70" />
          <div className="h-3 w-24 rounded-full bg-border/70" />
        </div>
      </div>
    </div>
  );
}

export function FeedSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div>
      <div className="h-[52px] w-full max-w-md animate-pulse rounded-full border border-border bg-surface" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
