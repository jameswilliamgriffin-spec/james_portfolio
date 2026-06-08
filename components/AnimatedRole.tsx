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
    <div className="flex min-h-7 items-center gap-7 text-center text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-electric sm:min-h-8 sm:text-sm">
      <span className="h-2 w-2 rounded-full bg-electric shadow-[0_0_22px_rgba(36,55,255,0.45)]" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
      <span className="h-2 w-2 rounded-full bg-electric shadow-[0_0_22px_rgba(36,55,255,0.45)]" />
    </div>
  );
}
