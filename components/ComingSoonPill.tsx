"use client";

import { motion } from "framer-motion";

export function ComingSoonPill() {
  return (
    <motion.div
      whileHover={{
        boxShadow:
          "0 16px 50px rgba(78, 150, 178, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.62)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-full border border-white/45 bg-white/24 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.24em] text-ink/68 shadow-[0_12px_36px_rgba(7,21,37,0.08),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-2xl sm:px-6 sm:text-sm"
    >
      Portfolio coming soon
    </motion.div>
  );
}
