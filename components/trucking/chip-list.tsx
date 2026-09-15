"use client";

import { motion } from "framer-motion";
import { MapPinIcon, GlobeIcon, BoxIcon } from "@/components/icons";

const ICONS = {
  pin: MapPinIcon,
  globe: GlobeIcon,
  box: BoxIcon,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export function ChipList({
  items,
  icon,
  ariaLabel,
}: {
  items: string[];
  icon: keyof typeof ICONS;
  ariaLabel: string;
}) {
  const Icon = ICONS[icon];
  return (
    <motion.ul
      className="mt-8 flex flex-wrap gap-2.5"
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={container}
    >
      {items.map((label) => (
        <motion.li
          key={label}
          variants={item}
          className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
        >
          <Icon className="h-4 w-4 shrink-0 text-bush-600 dark:text-bush-400" />
          {label}
        </motion.li>
      ))}
    </motion.ul>
  );
}
