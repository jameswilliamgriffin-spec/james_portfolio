"use client";

import { useEffect, useRef } from "react";

type BlobState = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  phase: number;
  drift: number;
};

const blobs: BlobState[] = [
  {
    x: 0.32,
    y: 0.34,
    baseX: 0.32,
    baseY: 0.34,
    radius: 0.24,
    color: "rgba(36, 55, 255, 0.34)",
    phase: 0.2,
    drift: 0.0038,
  },
  {
    x: 0.58,
    y: 0.4,
    baseX: 0.58,
    baseY: 0.4,
    radius: 0.27,
    color: "rgba(188, 167, 255, 0.36)",
    phase: 1.9,
    drift: 0.0031,
  },
  {
    x: 0.62,
    y: 0.66,
    baseX: 0.62,
    baseY: 0.66,
    radius: 0.25,
    color: "rgba(255, 190, 148, 0.34)",
    phase: 3.1,
    drift: 0.0026,
  },
];

export function AtmosphereCanvas() {
  const fluidCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fluid = fluidCanvas.current;
    if (!fluid) return;

    const fluidContext = fluid.getContext("2d");
    if (!fluidContext) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let easedPointerX = 0.5;
    let easedPointerY = 0.5;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const density = Math.min(window.devicePixelRatio || 1, 1.25);

      fluid.width = Math.ceil(width * density);
      fluid.height = Math.ceil(height * density);
      fluid.style.width = `${width}px`;
      fluid.style.height = `${height}px`;
      fluidContext.setTransform(density, 0, 0, density, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / Math.max(width, 1);
      pointerY = event.clientY / Math.max(height, 1);
    };

    const draw = (time: number) => {
      easedPointerX += (pointerX - easedPointerX) * 0.018;
      easedPointerY += (pointerY - easedPointerY) * 0.018;

      fluidContext.clearRect(0, 0, width, height);
      fluidContext.globalCompositeOperation = "lighter";
      fluidContext.filter = "blur(44px)";

      blobs.forEach((blob, index) => {
        const cursorPull = 0.095 + index * 0.018;
        const slowWave = time * blob.drift + blob.phase;
        const targetX =
          blob.baseX +
          Math.sin(slowWave) * 0.055 +
          (easedPointerX - 0.5) * cursorPull;
        const targetY =
          blob.baseY +
          Math.cos(slowWave * 0.86) * 0.06 +
          (easedPointerY - 0.5) * cursorPull;

        blob.x += (targetX - blob.x) * 0.026;
        blob.y += (targetY - blob.y) * 0.026;

        const radius =
          Math.min(width, height) *
          (blob.radius + Math.sin(slowWave * 0.72) * 0.018);
        const gradient = fluidContext.createRadialGradient(
          blob.x * width,
          blob.y * height,
          0,
          blob.x * width,
          blob.y * height,
          radius,
        );

        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.52, blob.color.replace(/0\.\d+\)$/, "0.14)"));
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        fluidContext.fillStyle = gradient;
        fluidContext.beginPath();
        fluidContext.arc(blob.x * width, blob.y * height, radius, 0, Math.PI * 2);
        fluidContext.fill();
      });

      fluidContext.filter = "none";
      fluidContext.globalCompositeOperation = "source-over";

      if (!reduceMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    draw(0);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      animationFrame = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <canvas
        ref={fluidCanvas}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.34] mix-blend-multiply dark:opacity-[0.3] dark:mix-blend-screen"
      />
    </div>
  );
}
