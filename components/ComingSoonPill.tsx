"use client";

import { motion } from "framer-motion";

export function ComingSoonPill() {
  return (
    <motion.div
      whileHover={{
        boxShadow:
          "0 18px 60px rgba(36, 55, 255, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="inline-flex items-center gap-6 rounded-full border border-white/45 bg-white/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.32em] text-ink/76 shadow-[0_18px_55px_rgba(7,21,37,0.08),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/15 dark:bg-white/8 dark:text-bone/82 dark:shadow-[0_18px_55px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.14)] sm:gap-8 sm:px-8 sm:py-4"
    >
      <motion.span
        aria-hidden="true"
        animate={{
          opacity: [0.42, 1, 0.42],
          scale: [0.86, 1.08, 0.86],
          boxShadow: [
            "0 0 8px rgba(36,55,255,0.28)",
            "0 0 22px rgba(36,55,255,0.72)",
            "0 0 8px rgba(36,55,255,0.28)",
          ],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="h-2.5 w-2.5 rounded-full bg-electric transition-colors duration-500 dark:bg-electric-soft"
      />
      <span>Portfolio coming soon</span>
    </motion.div>
  );
}
