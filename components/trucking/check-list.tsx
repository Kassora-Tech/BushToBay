"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@/components/icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export function CheckList({ items, ariaLabel }: { items: string[]; ariaLabel: string }) {
  return (
    <motion.ul
      className="mt-8 grid gap-3 sm:grid-cols-2"
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
          className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 text-sm font-medium"
        >
          <CheckCircleIcon className="h-5 w-5 shrink-0 text-bush-600 dark:text-bush-400" />
          {label}
        </motion.li>
      ))}
    </motion.ul>
  );
}
