"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  type Variants,
} from "framer-motion";
import { AnimatedRole } from "@/components/AnimatedRole";
import { AtmosphereCanvas } from "@/components/AtmosphereCanvas";
import { ComingSoonPill } from "@/components/ComingSoonPill";
import { GradientBackground } from "@/components/GradientBackground";
import { ThemeToggle } from "@/components/ThemeToggle";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(2px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 28, mass: 0.7 });
  const copyX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const spotlightBackground = useMotionTemplate`radial-gradient(620px circle at ${spotlightX}% ${spotlightY}%, rgba(255, 255, 255, 0.24), rgba(120, 160, 255, 0.08) 34%, transparent 68%)`;

  return (
    <main
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
        spotlightX.set(((event.clientX - rect.left) / rect.width) * 100);
        spotlightY.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
        spotlightX.set(50);
        spotlightY.set(50);
      }}
      className="relative isolate min-h-svh overflow-hidden px-5 py-5 text-ink transition-colors duration-700 dark:text-bone sm:px-8 sm:py-8 lg:px-12"
    >
      <GradientBackground />
      <AtmosphereCanvas />
      <motion.div
        aria-hidden="true"
        style={{ background: spotlightBackground }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-soft-light transition-opacity duration-700 sm:opacity-55 dark:sm:opacity-35"
      />
      <ThemeToggle />

      <section className="relative z-30 mx-auto grid min-h-[calc(100svh-2.5rem)] w-full max-w-[1720px] grid-cols-1 items-center gap-12 pt-20 sm:min-h-[calc(100svh-4rem)] sm:pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pt-0 xl:grid-cols-[1.08fr_0.92fr] xl:gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="relative z-20 flex min-h-[36vh] flex-col justify-start sm:min-h-[46vh] sm:justify-center lg:min-h-[78vh]"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="hero-name font-display text-[clamp(8.25rem,38vw,13.75rem)] font-black uppercase text-ink transition-colors duration-700 dark:text-bone sm:text-[clamp(7.5rem,20.5vw,24rem)] lg:text-[clamp(6.75rem,16vw,13rem)] xl:text-[clamp(7.5rem,20.5vw,24rem)]">
              <span className="hero-name-line">James</span>
              <span className="hero-name-line">
                <span className="inline-flex whitespace-nowrap">
                  Griffin.
                  <span
                    aria-hidden="true"
                    className="ml-[0.018em] inline-block h-[0.73em] w-[0.032em] animate-blink translate-y-[0.055em] bg-ink align-baseline transition-colors duration-700 dark:bg-bone"
                  />
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 pl-1 sm:mt-6"
          >
            <AnimatedRole />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ x: copyX }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.14, delayChildren: 0.28 }}
          className="relative z-40 flex flex-col items-start pb-8 lg:pb-0"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[660px] text-balance text-[clamp(2.25rem,3.75vw,3.35rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-ink transition-colors duration-700 dark:text-bone lg:max-w-[720px] lg:text-[clamp(2.05rem,3.05vw,2.7rem)] lg:leading-[1.16] xl:max-w-[660px] xl:text-[clamp(2.25rem,3.75vw,3.35rem)] xl:leading-[1.08]"
          >
            A designer, educator and digital product builder exploring the space
            between{" "}
            <span className="text-highlight">people</span>,{" "}
            <span className="text-highlight">technology</span> and{" "}
            <span className="text-highlight">interaction</span>.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-[590px] text-pretty text-[1.18rem] font-medium leading-[1.68] tracking-[-0.012em] text-ink/74 transition-colors duration-700 dark:text-bone/70 sm:text-xl lg:max-w-[640px] xl:max-w-[590px]"
          >
            I create thoughtful digital experiences that make learning, design
            and everyday tools feel clearer, more useful and more engaging.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <ComingSoonPill />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
