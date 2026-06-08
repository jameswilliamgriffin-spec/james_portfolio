"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export function ComingSoonPill() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const magneticX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.45 });
  const magneticY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.45 });

  return (
    <motion.div
      onMouseMove={(event) => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * 6);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{
        boxShadow:
          "0 22px 70px rgba(36, 55, 255, 0.26), 0 0 30px rgba(188, 167, 255, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      }}
      style={{ x: magneticX, y: magneticY }}
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
