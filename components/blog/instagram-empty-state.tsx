export function InstagramEmptyState() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-dashed border-border bg-surface px-6 py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-bush-600 text-white shadow-md shadow-bush-900/15">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">
        Posts coming soon
      </h2>
      <p className="mt-3 max-w-md leading-relaxed text-muted">
        We&rsquo;re getting our social feed ready. Check back soon for trips,
        news and behind-the-scenes moments from Bush to Bay Travel and Tours.
      </p>
    </div>
  );
}
