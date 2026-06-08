"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "UI DESIGNER",
  "EDUCATOR",
  "AI ENTHUSIAST",
  "PRODUCT DESIGNER",
  "DIGITAL PRODUCT BUILDER",
];

export function AnimatedRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-7 items-center justify-center text-center text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-ink/70 sm:min-h-8 sm:text-sm">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-4 w-px animate-blink bg-ink/60 sm:h-5"
      />
    </div>
  );
}
