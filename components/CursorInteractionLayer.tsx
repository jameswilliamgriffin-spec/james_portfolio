"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

export function CursorInteractionLayer() {
  const [enabled, setEnabled] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlightX = useSpring(pointerX, { stiffness: 55, damping: 28, mass: 0.9 });
  const spotlightY = useSpring(pointerY, { stiffness: 55, damping: 28, mass: 0.9 });
  const trailX = useSpring(pointerX, { stiffness: 36, damping: 24, mass: 1.25 });
  const trailY = useSpring(pointerY, { stiffness: 36, damping: 24, mass: 1.25 });
  const spotlight = useMotionTemplate`radial-gradient(680px circle at ${spotlightX}px ${spotlightY}px, rgba(36,55,255,0.18), rgba(188,167,255,0.12) 28%, rgba(255,190,148,0.08) 46%, transparent 72%)`;

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(query.matches);

    updateEnabled();
    query.addEventListener("change", updateEnabled);

    const handlePointerMove = (event: PointerEvent) => {
      if (!query.matches) return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      query.removeEventListener("change", updateEnabled);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[15] hidden overflow-hidden lg:block">
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-65 mix-blend-soft-light blur-[14px] dark:opacity-45"
      />
      <motion.div
        aria-hidden="true"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(36,55,255,0.16)_0%,rgba(188,167,255,0.1)_34%,rgba(255,190,148,0.07)_52%,transparent_74%)] opacity-70 blur-2xl mix-blend-screen dark:opacity-48"
      />
    </div>
  );
}
