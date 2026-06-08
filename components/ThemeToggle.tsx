"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed right-5 top-5 z-50 inline-flex h-12 w-[108px] items-center justify-between rounded-full border border-white/45 bg-white/22 px-3 text-ink shadow-[0_14px_38px_rgba(7,21,37,0.08),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/12 dark:bg-white/8 dark:text-bone dark:shadow-[0_14px_38px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] sm:right-8 sm:top-8"
    >
      <span className="text-sm leading-none">☼</span>
      <span className="relative h-6 w-11 rounded-full bg-ink/12 p-0.5 shadow-inner transition-colors duration-500 dark:bg-white/14">
        <motion.span
          animate={{ x: isDark ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          className="block h-5 w-5 rounded-full bg-electric shadow-[0_3px_14px_rgba(36,55,255,0.42)]"
        />
      </span>
      <span className="text-sm leading-none">☾</span>
    </button>
  );
}
