"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedRole } from "@/components/AnimatedRole";
import { ComingSoonPill } from "@/components/ComingSoonPill";
import { GradientBackground } from "@/components/GradientBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-5 py-10 sm:px-8">
      <GradientBackground />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.12 }}
          className="flex w-full flex-col items-center"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(5rem,18vw,15rem)] font-bold uppercase leading-[0.78] text-ink"
          >
            <span className="block">James</span>
            <span className="block">Griffin</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-7"
          >
            <AnimatedRole />
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-3xl text-balance text-xl font-medium leading-8 text-ink/86 sm:text-2xl sm:leading-9"
          >
            A designer, educator and digital product builder exploring the
            space between people, technology and interaction.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-balance text-base leading-7 text-ink/62 sm:text-lg sm:leading-8"
          >
            I create thoughtful digital experiences that make learning, design
            and everyday tools feel clearer, more useful and more engaging.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{
            opacity: 1,
            y: [0, -14, 0],
            scale: 1,
            rotate: [0, 1.5, 0],
          }}
          transition={{
            opacity: { duration: 0.9, delay: 0.7 },
            scale: { duration: 0.9, delay: 0.7 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
          className="pointer-events-none relative z-20 -mt-2 h-48 w-48 sm:-mt-4 sm:h-64 sm:w-64 lg:-mt-8 lg:h-80 lg:w-80"
          aria-hidden="true"
        >
          <Image
            src="/hero-object.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 192px"
            className="object-contain drop-shadow-[0_28px_48px_rgba(7,21,37,0.16)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 sm:mt-3"
        >
          <ComingSoonPill />
        </motion.div>
      </section>
    </main>
  );
}
