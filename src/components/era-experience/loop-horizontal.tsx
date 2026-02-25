"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Radio, ShieldCheck, Infinity as InfinityIcon } from "lucide-react";
import Link from "next/link";

const panels = [
  {
    key: "connection",
    name: "Connection Loops",
    subtitle: "Acquisition",
    icon: Radio,
    color: "#38BDF8",
    bg: "from-[#38BDF810] to-transparent",
    description: "Signal-based targeting that creates self-reinforcing connection cycles.",
    stat: "287%",
    statLabel: "Higher response rate",
    href: "/services/connection",
  },
  {
    key: "trust",
    name: "Trust Loops",
    subtitle: "Decision",
    icon: ShieldCheck,
    color: "#8B5CF6",
    bg: "from-[#8B5CF610] to-transparent",
    description: "Reciprocal trust cycles that deepen with each interaction.",
    stat: "6x",
    statLabel: "Win rate improvement",
    href: "/services/trust",
  },
  {
    key: "loyalty",
    name: "Loyalty Loops",
    subtitle: "Expansion",
    icon: InfinityIcon,
    color: "#EC4899",
    bg: "from-[#EC489910] to-transparent",
    description: "Each success realized generates advocacy that feeds acquisition.",
    stat: "118%",
    statLabel: "Net revenue retention",
    href: "/services/loyalty",
  },
];

// Signal → Target animation component
function SignalAnimation({ progress }: { progress: number }) {
  const rings = 5;
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[280px] mx-auto">
      {/* Concentric radar rings */}
      {Array.from({ length: rings }).map((_, i) => {
        const r = 20 + i * 18;
        const opacity = Math.max(0, progress - i * 0.15) * 0.3;
        return (
          <circle key={i} cx="100" cy="100" r={r} fill="none" stroke="#38BDF8" strokeWidth="0.5" opacity={opacity} />
        );
      })}
      {/* Pulsing signal dot */}
      <circle cx="100" cy="100" r={4 + progress * 4} fill="#38BDF8" opacity={0.3 + progress * 0.4} />
      <circle cx="100" cy="100" r="3" fill="#38BDF8" />
      {/* Target dots that appear */}
      {[
        { x: 145, y: 70, delay: 0.3 },
        { x: 60, y: 130, delay: 0.5 },
        { x: 155, y: 140, delay: 0.7 },
      ].map((dot, i) => {
        const dotProgress = Math.max(0, Math.min(1, (progress - dot.delay) * 3));
        return (
          <g key={i}>
            <circle cx={dot.x} cy={dot.y} r={3 * dotProgress} fill="#38BDF8" opacity={dotProgress * 0.8} />
            {/* Connection line */}
            <line
              x1="100" y1="100"
              x2={100 + (dot.x - 100) * dotProgress}
              y2={100 + (dot.y - 100) * dotProgress}
              stroke="#38BDF8" strokeWidth="0.5" opacity={dotProgress * 0.3}
              strokeDasharray="3 3"
            />
          </g>
        );
      })}
    </svg>
  );
}

// Lock → Unlock animation
function TrustAnimation({ progress }: { progress: number }) {
  const unlockRotation = Math.min(progress * 1.5, 1) * -30;
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[280px] mx-auto">
      {/* Concentric trust circles */}
      {[1, 2, 3].map((i) => {
        const r = 25 * i;
        const ringProgress = Math.max(0, Math.min(1, (progress - (i - 1) * 0.2) * 2));
        return (
          <g key={i}>
            <circle
              cx="100" cy="100" r={r}
              fill="none" stroke="#8B5CF6"
              strokeWidth={ringProgress > 0 ? 1 : 0.5}
              opacity={0.1 + ringProgress * 0.3}
              strokeDasharray={`${ringProgress * Math.PI * 2 * r} ${Math.PI * 2 * r}`}
            />
          </g>
        );
      })}
      {/* Lock body */}
      <rect x="82" y="95" width="36" height="28" rx="4" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity={0.8} />
      {/* Lock shackle — rotates to unlock */}
      <path
        d={`M 90 95 L 90 82 A 10 10 0 0 1 110 82 L 110 95`}
        fill="none" stroke="#8B5CF6" strokeWidth="1.5"
        opacity={0.8}
        transform={`rotate(${unlockRotation}, 110, 95)`}
      />
      {/* Keyhole */}
      <circle cx="100" cy="107" r="3" fill="#8B5CF6" opacity={0.6 + progress * 0.4} />
      {/* Glow when unlocked */}
      {progress > 0.6 && (
        <circle cx="100" cy="105" r={20 + (progress - 0.6) * 80} fill="#8B5CF6" opacity={(progress - 0.6) * 0.08} />
      )}
    </svg>
  );
}

// Infinity loop speeding up
function LoyaltyAnimation({ progress }: { progress: number }) {
  const speed = 0.5 + progress * 2;
  // Infinity path
  const d = "M 60 100 C 60 70, 100 70, 100 100 C 100 130, 140 130, 140 100 C 140 70, 100 70, 100 100 C 100 130, 60 130, 60 100";
  const dashLength = 600;
  const visibleLength = 100 + progress * 200;

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[280px] mx-auto">
      {/* Ghost path */}
      <path d={d} fill="none" stroke="#EC4899" strokeWidth="0.5" opacity="0.1" />
      {/* Animated path */}
      <motion.path
        d={d}
        fill="none"
        stroke="#EC4899"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${visibleLength} ${dashLength - visibleLength}`}
        animate={{ strokeDashoffset: [0, -dashLength] }}
        transition={{ duration: 4 / speed, repeat: Infinity, ease: "linear" }}
        opacity={0.6 + progress * 0.4}
      />
      {/* Glow path */}
      <motion.path
        d={d}
        fill="none"
        stroke="#EC4899"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`40 ${dashLength - 40}`}
        animate={{ strokeDashoffset: [0, -dashLength] }}
        transition={{ duration: 4 / speed, repeat: Infinity, ease: "linear" }}
        opacity={progress * 0.15}
      />
      {/* Center pulse */}
      <circle cx="100" cy="100" r={3 + progress * 3} fill="#EC4899" opacity={0.3 + progress * 0.5} />
    </svg>
  );
}

export default function LoopHorizontal() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);
  const smoothX = useSpring(xTranslate, { stiffness: 50, damping: 20 });

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothProgress = useSpring(progressWidth, { stiffness: 80, damping: 25 });

  // Per-panel animation progress (0 to 1 for each panel)
  const panel1Progress = useTransform(scrollYProgress, [0, 0.33], [0, 1]);
  const panel2Progress = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);
  const panel3Progress = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  // Background color shift
  const bgHue = useTransform(scrollYProgress, [0, 0.5, 1], [200, 270, 330]);
  const smoothBgHue = useSpring(bgHue, { stiffness: 30, damping: 20 });

  // Panel opacities
  const p1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.28, 0.35], [0.3, 1, 1, 0.3]);
  const p2Opacity = useTransform(scrollYProgress, [0.3, 0.38, 0.62, 0.68], [0.3, 1, 1, 0.3]);
  const p3Opacity = useTransform(scrollYProgress, [0.62, 0.7, 0.95, 1], [0.3, 1, 1, 1]);
  const smoothP1 = useSpring(p1Opacity, { stiffness: 80, damping: 20 });
  const smoothP2 = useSpring(p2Opacity, { stiffness: 80, damping: 20 });
  const smoothP3 = useSpring(p3Opacity, { stiffness: 80, damping: 20 });
  const panelOpacities = [smoothP1, smoothP2, smoothP3];

  const animations = [SignalAnimation, TrustAnimation, LoyaltyAnimation];
  const panelProgresses = [panel1Progress, panel2Progress, panel3Progress];

  if (isMobile) {
    // Mobile: vertical stack
    return (
      <section className="py-20">
        <div className="text-center mb-12 px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">The Framework</p>
          <h2 className="text-3xl font-black text-foreground tracking-tight">Three Loops</h2>
        </div>
        <div className="space-y-8 px-6">
          {panels.map((panel) => {
            const Icon = panel.icon;
            return (
              <motion.div
                key={panel.key}
                className="p-8 rounded-2xl border border-border bg-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Icon size={28} style={{ color: panel.color }} strokeWidth={1.5} />
                <h3 className="mt-4 text-xl font-bold text-foreground">{panel.name}</h3>
                <p className="mt-2 text-sm text-muted">{panel.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-black font-mono" style={{ color: panel.color }}>{panel.stat}</span>
                  <span className="ml-2 text-xs text-muted">{panel.statLabel}</span>
                </div>
                <Link href={panel.href} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                  Learn more &rarr;
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-20 pb-6 px-6 text-center shrink-0 relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">
            The Framework
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-foreground tracking-tight">
            Connection &rarr; Trust &rarr; Loyalty
          </h2>

          {/* Progress bar */}
          <div className="mt-6 mx-auto max-w-sm h-[2px] bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: smoothProgress,
                background: "linear-gradient(90deg, #38BDF8, #8B5CF6, #EC4899)",
              }}
            />
          </div>
        </div>

        {/* Background hue shift */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, hsla(${smoothBgHue.get?.() ?? 200}, 80%, 50%, 0.03), transparent 70%)`,
          }}
        />

        {/* Horizontal panels */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex h-full"
            style={{ x: smoothX, width: "300%" }}
          >
            {panels.map((panel, i) => {
              const Icon = panel.icon;
              const Animation = animations[i];

              return (
                <motion.div
                  key={panel.key}
                  className="w-screen h-full px-8 md:px-16 flex items-center"
                  style={{ opacity: panelOpacities[i] }}
                >
                  <div className="mx-auto max-w-5xl w-full grid grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${panel.color}15` }}>
                          <Icon size={20} style={{ color: panel.color }} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                          {panel.subtitle}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                        {panel.name}
                      </h3>
                      <p className="mt-4 text-muted leading-relaxed">
                        {panel.description}
                      </p>
                      <div className="mt-8 flex items-baseline gap-3">
                        <span
                          className="text-5xl md:text-6xl font-black font-mono"
                          style={{ color: panel.color }}
                        >
                          {panel.stat}
                        </span>
                        <span className="text-sm text-muted">{panel.statLabel}</span>
                      </div>
                      <div className="mt-8">
                        <Link
                          href={panel.href}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-semibold hover:bg-card transition-colors"
                          style={{ borderColor: `${panel.color}40`, color: panel.color }}
                        >
                          Explore Program &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Right: Animation */}
                    <div className="flex items-center justify-center">
                      <PanelAnimation
                        Animation={Animation}
                        progressValue={panelProgresses[i]}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Wrapper to read MotionValue for animation
function PanelAnimation({
  Animation,
  progressValue,
}: {
  Animation: React.ComponentType<{ progress: number }>;
  progressValue: MotionValue<number>;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = progressValue.on("change", (v: number) => {
      setProgress(v);
    });
    return unsubscribe;
  }, [progressValue]);

  return <Animation progress={progress} />;
}
