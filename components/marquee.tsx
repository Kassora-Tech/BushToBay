"use client";

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-border bg-bush-800 py-4 dark:bg-bush-950"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-0 motion-reduce:animate-none">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-display text-sm font-medium uppercase tracking-[0.25em] text-sand-100/90"
          >
            {item}
            <span className="text-bay-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
