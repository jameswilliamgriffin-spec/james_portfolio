"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect } from "react";

const grainTexture =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23grain)' opacity='0.38'/%3E%3C/svg%3E\")";

export function GradientBackground() {
  const reduceMotion = useReducedMotion();
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(760px circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.28), rgba(120,150,255,0.1) 32%, transparent 68%)`;

  useEffect(() => {
    if (reduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      spotlightX.set((event.clientX / window.innerWidth) * 100);
      spotlightY.set((event.clientY / window.innerHeight) * 100);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, spotlightX, spotlightY]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#f6e7e9] transition-colors duration-700 dark:bg-night">
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-4%", "3%", "-1%", "-4%"],
                y: ["2%", "-4%", "3%", "2%"],
                scale: [1, 1.1, 0.98, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[30%] -left-[26%] h-[76vw] min-h-[650px] w-[76vw] min-w-[650px] rounded-full bg-[radial-gradient(circle,rgba(36,55,255,0.58)_0%,rgba(95,137,255,0.31)_34%,rgba(95,137,255,0)_70%)] blur-[105px] mix-blend-multiply opacity-82 dark:opacity-0"
      />

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["2%", "-4%", "2.5%", "2%"],
                y: ["0%", "4%", "-2.5%", "0%"],
                scale: [1, 1.08, 1.02, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[28%] -right-[22%] h-[72vw] min-h-[620px] w-[76vw] min-w-[670px] rounded-full bg-[radial-gradient(circle,rgba(255,190,148,0.62)_0%,rgba(255,168,188,0.36)_38%,rgba(255,168,188,0)_72%)] blur-[115px] mix-blend-multiply opacity-78 dark:opacity-0"
      />

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["0%", "3%", "-2.2%", "0%"],
                y: ["-2%", "2.6%", "-1%", "-2%"],
                scale: [1, 1.07, 1.12, 1],
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[0%] top-[0%] h-[62vw] min-h-[540px] w-[58vw] min-w-[500px] rounded-full bg-[radial-gradient(circle,rgba(188,167,255,0.58)_0%,rgba(216,196,255,0.28)_42%,rgba(216,196,255,0)_74%)] blur-[100px] mix-blend-multiply opacity-66 dark:opacity-0"
      />

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-1.5%", "2%", "-1.5%"],
                y: ["1.5%", "-2%", "1.5%"],
                scale: [1, 1.04, 1],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[-18%] bg-[radial-gradient(circle_at_50%_45%,rgba(255,214,222,0.32),rgba(255,214,222,0)_60%)] blur-[90px] opacity-86 dark:opacity-10"
      />

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["-2%", "1.5%", "-1%", "-2%"],
                y: ["1.5%", "-1.8%", "1%", "1.5%"],
                scale: [1, 1.06, 0.98, 1],
                rotate: [0, 1.8, -1.2, 0],
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 hidden h-[1080px] w-[1080px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-80 blur-[42px] dark:block"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ["-4%", "3%", "-2%", "-4%"],
                  y: ["3%", "-2%", "2%", "3%"],
                  scale: [1, 1.08, 0.98, 1],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-16%] bg-[radial-gradient(ellipse_at_28%_34%,rgba(36,55,255,0.54)_0%,rgba(36,55,255,0.16)_30%,transparent_56%),radial-gradient(ellipse_at_66%_48%,rgba(188,167,255,0.45)_0%,rgba(188,167,255,0.16)_32%,transparent_60%),radial-gradient(ellipse_at_54%_72%,rgba(255,190,148,0.38)_0%,rgba(255,168,188,0.18)_30%,transparent_58%)] mix-blend-screen"
        />
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ["3%", "-2%", "2.5%", "3%"],
                  y: ["-2%", "2.4%", "-1%", "-2%"],
                  scale: [1.03, 0.98, 1.04, 1.03],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[4%] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(36,55,255,0),rgba(36,55,255,0.4),rgba(188,167,255,0.42),rgba(255,168,188,0.38),rgba(255,190,148,0.28),rgba(36,55,255,0))] opacity-68 mix-blend-screen blur-[72px]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_48%,rgba(255,245,232,0.2))] transition-opacity duration-700 dark:opacity-0" />

      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="absolute inset-0 opacity-55 mix-blend-soft-light dark:opacity-34"
      />

      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -18, 7, 0], y: [0, 10, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: grainTexture,
          backgroundSize: "360px 360px",
        }}
        className="absolute inset-[-10%] opacity-[0.055] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-screen"
      />

      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 11, -9, 0], y: [0, -8, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: grainTexture,
          backgroundSize: "520px 520px",
        }}
        className="absolute inset-[-12%] opacity-[0.035] mix-blend-overlay dark:opacity-[0.045]"
      />

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f6e7e9]/58 to-transparent transition-colors duration-700 dark:from-night/64" />
    </div>
  );
}
