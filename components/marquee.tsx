"use client";

export function Marquee({
  items,
  reverse = false,
  tone = "dark",
}: {
  items: string[];
  reverse?: boolean;
  tone?: "dark" | "light";
}) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y py-4 ${
        tone === "dark"
          ? "border-border bg-bush-800 dark:bg-bush-950"
          : "border-border bg-sand-100 dark:bg-bush-900/40"
      }`}
      aria-hidden="true"
    >
      <div
        className={`flex w-max animate-marquee gap-0 motion-reduce:animate-none ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-8 pr-8 font-display text-sm font-medium uppercase tracking-[0.25em] ${
              tone === "dark" ? "text-sand-100/90" : "text-bush-800 dark:text-sand-100/80"
            }`}
          >
            {item}
            <span className={tone === "dark" ? "text-bush-400" : "text-bush-500"}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
