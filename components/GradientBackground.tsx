"use client";

import { motion } from "framer-motion";

const grainTexture =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23grain)' opacity='0.38'/%3E%3C/svg%3E\")";

export function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#f6e7e9] transition-colors duration-700 dark:bg-night">
      <motion.div
        aria-hidden="true"
        animate={{
          x: ["-2%", "2.5%", "-1%", "-2%"],
          y: ["1%", "-2%", "2%", "1%"],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{ duration: 54, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[28%] -left-[24%] h-[72vw] min-h-[620px] w-[72vw] min-w-[620px] rounded-full bg-[radial-gradient(circle,rgba(36,55,255,0.42)_0%,rgba(95,137,255,0.2)_35%,rgba(95,137,255,0)_68%)] blur-[110px] mix-blend-multiply opacity-70 dark:opacity-0"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: ["1%", "-2.5%", "2%", "1%"],
          y: ["0%", "2.5%", "-1.5%", "0%"],
          scale: [1, 1.035, 1.01, 1],
        }}
        transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[26%] -right-[20%] h-[68vw] min-h-[590px] w-[72vw] min-w-[640px] rounded-full bg-[radial-gradient(circle,rgba(255,190,148,0.52)_0%,rgba(255,168,188,0.28)_38%,rgba(255,168,188,0)_70%)] blur-[120px] mix-blend-multiply opacity-72 dark:opacity-0"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: ["0%", "1.5%", "-1.2%", "0%"],
          y: ["-1%", "1.5%", "-0.5%", "-1%"],
          scale: [1, 1.025, 1.05, 1],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[4%] top-[4%] h-[58vw] min-h-[520px] w-[54vw] min-w-[480px] rounded-full bg-[radial-gradient(circle,rgba(188,167,255,0.42)_0%,rgba(216,196,255,0.2)_42%,rgba(216,196,255,0)_72%)] blur-[105px] mix-blend-multiply opacity-54 dark:opacity-0"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: ["-1%", "1.2%", "-1%"],
          y: ["1%", "-1.2%", "1%"],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[-18%] bg-[radial-gradient(circle_at_50%_45%,rgba(255,214,222,0.22),rgba(255,214,222,0)_58%)] blur-[90px] opacity-80 dark:opacity-14"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: ["-1.5%", "1%", "-0.8%", "-1.5%"],
          y: ["1%", "-1.2%", "0.6%", "1%"],
          scale: [1, 1.035, 0.985, 1],
          rotate: [0, 1.2, -0.8, 0],
        }}
        transition={{ duration: 56, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 hidden h-[1080px] w-[1080px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-80 blur-[38px] dark:block"
      >
        <motion.div
          animate={{
            x: ["-4%", "3%", "-2%", "-4%"],
            y: ["3%", "-2%", "2%", "3%"],
            scale: [1, 1.06, 0.98, 1],
          }}
          transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-16%] bg-[radial-gradient(ellipse_at_30%_35%,rgba(146,102,72,0.72)_0%,rgba(146,102,72,0.18)_28%,transparent_52%),radial-gradient(ellipse_at_66%_48%,rgba(32,67,26,0.72)_0%,rgba(32,67,26,0.18)_30%,transparent_58%),radial-gradient(ellipse_at_54%_70%,rgba(255,39,160,0.7)_0%,rgba(255,39,160,0.2)_26%,transparent_55%)] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ["3%", "-2%", "2.5%", "3%"],
            y: ["-2%", "2.4%", "-1%", "-2%"],
            scale: [1.03, 0.98, 1.04, 1.03],
          }}
          transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[4%] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(146,102,72,0),rgba(146,102,72,0.38),rgba(32,67,26,0.42),rgba(255,39,160,0.46),rgba(146,102,72,0))] opacity-70 mix-blend-screen blur-[70px]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.34),rgba(255,255,255,0.04)_48%,rgba(255,245,232,0.2))] transition-opacity duration-700 dark:opacity-0" />

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
