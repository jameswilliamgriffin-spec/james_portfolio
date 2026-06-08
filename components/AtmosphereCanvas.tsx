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
    radius: 0.22,
    color: "rgba(36, 55, 255, 0.24)",
    phase: 0.2,
    drift: 0.0019,
  },
  {
    x: 0.58,
    y: 0.4,
    baseX: 0.58,
    baseY: 0.4,
    radius: 0.25,
    color: "rgba(188, 167, 255, 0.28)",
    phase: 1.9,
    drift: 0.0014,
  },
  {
    x: 0.62,
    y: 0.66,
    baseX: 0.62,
    baseY: 0.66,
    radius: 0.23,
    color: "rgba(255, 190, 148, 0.24)",
    phase: 3.1,
    drift: 0.0011,
  },
];

export function AtmosphereCanvas() {
  const fluidCanvas = useRef<HTMLCanvasElement>(null);
  const grainCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fluid = fluidCanvas.current;
    const grain = grainCanvas.current;
    if (!fluid || !grain) return;

    const fluidContext = fluid.getContext("2d");
    const grainContext = grain.getContext("2d");
    if (!fluidContext || !grainContext) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let easedPointerX = 0.5;
    let easedPointerY = 0.5;

    const renderGrain = () => {
      const density = Math.min(window.devicePixelRatio || 1, 2);
      const grainWidth = Math.ceil(width * density * 0.5);
      const grainHeight = Math.ceil(height * density * 0.5);

      grain.width = grainWidth;
      grain.height = grainHeight;
      grain.style.width = `${width}px`;
      grain.style.height = `${height}px`;

      const image = grainContext.createImageData(grainWidth, grainHeight);
      const data = image.data;

      for (let index = 0; index < data.length; index += 4) {
        const value = 118 + Math.random() * 40;
        data[index] = value;
        data[index + 1] = value;
        data[index + 2] = value;
        data[index + 3] = Math.random() * 34;
      }

      grainContext.putImageData(image, 0, 0);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const density = Math.min(window.devicePixelRatio || 1, 1.5);

      fluid.width = Math.ceil(width * density);
      fluid.height = Math.ceil(height * density);
      fluid.style.width = `${width}px`;
      fluid.style.height = `${height}px`;
      fluidContext.setTransform(density, 0, 0, density, 0, 0);

      renderGrain();
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
      fluidContext.filter = "blur(46px)";

      blobs.forEach((blob, index) => {
        const cursorPull = 0.08 + index * 0.018;
        const slowWave = time * blob.drift + blob.phase;
        const targetX =
          blob.baseX +
          Math.sin(slowWave) * 0.035 +
          (easedPointerX - 0.5) * cursorPull;
        const targetY =
          blob.baseY +
          Math.cos(slowWave * 0.86) * 0.04 +
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
        gradient.addColorStop(0.48, blob.color.replace("0.2", "0.12"));
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        fluidContext.fillStyle = gradient;
        fluidContext.beginPath();
        fluidContext.arc(blob.x * width, blob.y * height, radius, 0, Math.PI * 2);
        fluidContext.fill();
      });

      fluidContext.filter = "none";
      fluidContext.globalCompositeOperation = "source-over";

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    animationFrame = window.requestAnimationFrame(draw);

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
        className="absolute inset-0 h-full w-full opacity-[0.32] mix-blend-screen dark:opacity-[0.36]"
      />
      <canvas
        ref={grainCanvas}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.09] mix-blend-overlay dark:opacity-[0.075]"
      />
    </div>
  );
}
