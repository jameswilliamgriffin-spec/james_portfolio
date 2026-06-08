"use client";

import { motion } from "framer-motion";
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
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[index];
    const isComplete = displayedRole === currentRole;
    const isEmpty = displayedRole.length === 0;
    const delay = isComplete && !isDeleting ? 1100 : isDeleting ? 42 : 68;

    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setIndex((current) => (current + 1) % roles.length);
        return;
      }

      setDisplayedRole((current) =>
        isDeleting
          ? currentRole.slice(0, Math.max(current.length - 1, 0))
          : currentRole.slice(0, current.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [displayedRole, index, isDeleting]);

  return (
    <div className="flex min-h-8 items-center gap-6 text-center text-[1.4rem] font-semibold uppercase tracking-[0.18em] text-electric transition-colors duration-500 dark:text-electric-soft sm:min-h-8 sm:text-[0.9rem] sm:tracking-[0.44em]">
      <motion.span
        aria-live="polite"
        animate={{ opacity: displayedRole ? 1 : 0.72 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="inline-flex min-w-[18ch] items-center justify-center whitespace-nowrap"
      >
        {displayedRole}
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[1.05em] w-px animate-blink bg-current align-middle"
        />
      </motion.span>
    </div>
  );
}
