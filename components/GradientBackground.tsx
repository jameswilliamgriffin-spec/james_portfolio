export function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#f6e7e9] transition-colors duration-700 dark:bg-night">
      <div className="absolute inset-[-28%] animate-gradient-drift bg-[radial-gradient(circle_at_18%_18%,rgba(188,167,255,0.42),transparent_32%),radial-gradient(circle_at_84%_22%,rgba(255,190,148,0.46),transparent_31%),radial-gradient(circle_at_50%_86%,rgba(79,132,255,0.34),transparent_38%),radial-gradient(circle_at_12%_78%,rgba(255,210,220,0.34),transparent_34%),linear-gradient(135deg,#faecec_0%,#f7dfe5_46%,#f8eadf_100%)] transition-opacity duration-700 dark:opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.42),rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.26))] transition-opacity duration-700 dark:opacity-0" />
      <div className="absolute inset-[-22%] hidden animate-gradient-drift bg-[radial-gradient(circle_at_20%_20%,rgba(81,70,212,0.48),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(36,55,255,0.22),transparent_30%),radial-gradient(circle_at_56%_88%,rgba(255,175,128,0.13),transparent_40%),linear-gradient(135deg,#030a1d_0%,#071329_56%,#020617_100%)] dark:block" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f6e7e9]/72 to-transparent transition-colors duration-700 dark:from-night/70" />
    </div>
  );
}
