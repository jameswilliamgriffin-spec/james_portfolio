export function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-mist">
      <div className="absolute inset-[-22%] animate-gradient-drift bg-[radial-gradient(circle_at_18%_24%,rgba(130,204,212,0.34),transparent_31%),radial-gradient(circle_at_76%_16%,rgba(244,209,170,0.44),transparent_28%),radial-gradient(circle_at_50%_82%,rgba(163,173,218,0.32),transparent_34%),linear-gradient(135deg,#fbf8f2_0%,#e9f1f0_45%,#f5efe7_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.58),rgba(255,255,255,0.18)_42%,rgba(255,255,255,0.5))]" />
      <div className="grain-texture absolute inset-0 opacity-[0.18] mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f7f4ef]/82 to-transparent" />
    </div>
  );
}
