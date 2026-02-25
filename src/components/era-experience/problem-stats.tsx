"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TrendingUp, Layers, Mail, BarChart3 } from "lucide-react";

const stats = [
  { value: "14,106", label: "Martech Solutions", detail: "+27.8% YoY", icon: Layers, side: "left" },
  { value: "33%", label: "Tool Utilization", detail: "Estimated active usage", icon: BarChart3, side: "right" },
  { value: "+222%", label: "CAC Explosion", detail: "Over the last 8 years", icon: TrendingUp, side: "left" },
  { value: "4.5%", label: "Email Response Rate", detail: "Down from 8.5%", icon: Mail, side: "right" },
];

// CAC explosion SVG path — exponential curve
const cacPath = "M 20 180 C 60 178, 100 175, 140 170 C 180 160, 220 140, 260 100 C 300 60, 340 30, 380 10";

export default function ProblemStats() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Center timeline draws itself
  const timelineHeight = useTransform(scrollYProgress, [0.05, 0.6], [0, 100]);
  const smoothTimeline = useSpring(timelineHeight, { stiffness: 50, damping: 25 });

  // Cards fly in at staggered scroll positions
  const card0X = useTransform(scrollYProgress, [0.1, 0.25], [-100, 0]);
  const card1X = useTransform(scrollYProgress, [0.15, 0.3], [100, 0]);
  const card2X = useTransform(scrollYProgress, [0.25, 0.4], [-100, 0]);
  const card3X = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);

  const card0Opacity = useTransform(scrollYProgress, [0.1, 0.22], [0, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.15, 0.27], [0, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.25, 0.37], [0, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);

  const cardXValues = [card0X, card1X, card2X, card3X];
  const cardOpacities = [card0Opacity, card1Opacity, card2Opacity, card3Opacity];

  const smoothCardX = cardXValues.map((v) => useSpring(v, { stiffness: 60, damping: 20 }));
  const smoothCardOpacity = cardOpacities.map((v) => useSpring(v, { stiffness: 80, damping: 20 }));

  // CAC graph draws on scroll
  const cacDrawProgress = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const smoothCacDraw = useSpring(cacDrawProgress, { stiffness: 50, damping: 20 });

  // Section title reveal
  const titleOpacity = useTransform(scrollYProgress, [0.02, 0.12], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.02, 0.12], [40, 0]);
  const smoothTitleOpacity = useSpring(titleOpacity, { stiffness: 80, damping: 20 });
  const smoothTitleY = useSpring(titleY, { stiffness: 80, damping: 20 });

  // Container width expands on scroll
  const containerScale = useTransform(scrollYProgress, [0.05, 0.3], [0.85, 1]);
  const smoothContainerScale = useSpring(containerScale, { stiffness: 60, damping: 25 });

  return (
    <section ref={sectionRef} className="relative py-32 min-h-[140vh]">
      {/* Section header */}
      <motion.div
        className="text-center mb-20 px-6"
        style={{ opacity: smoothTitleOpacity, y: smoothTitleY }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
          The Problem
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
          The Complexity Collapse
        </h2>
        <p className="mt-4 text-muted max-w-lg mx-auto">
          The transactional model of sales is mathematically unsustainable.
        </p>
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-6xl px-6"
        style={{ scale: smoothContainerScale }}
      >
        {/* Center timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-primary via-glow-purple to-glow-rose origin-top"
            style={{ scaleY: smoothTimeline, transformOrigin: "top" }}
          />
        </div>

        {/* Stats cards */}
        <div className="space-y-8 md:space-y-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isLeft = stat.side === "left";

            return (
              <motion.div
                key={stat.label}
                className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}
                style={{
                  x: smoothCardX[i],
                  opacity: smoothCardOpacity[i],
                }}
              >
                <div className={`w-full md:w-5/12 p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm relative group`}>
                  {/* Connector dot to timeline */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary ${isLeft ? "-right-[30px]" : "-left-[30px]"}`} />

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-glow-cyan via-glow-purple to-glow-rose bg-clip-text text-transparent font-mono">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{stat.label}</p>
                      <p className="text-xs text-muted">{stat.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CAC Explosion Graph — SVG draw-on-scroll */}
        <motion.div
          className="mt-20 mx-auto max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted text-center mb-4">
            Customer Acquisition Cost — 8 Year Trend
          </p>
          <div className="p-6 rounded-2xl border border-border bg-card/50">
            <svg viewBox="0 0 400 200" className="w-full">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`grid-${i}`}
                  x1="20" y1={20 + i * 40} x2="380" y2={20 + i * 40}
                  stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.5"
                />
              ))}

              {/* Glow layer */}
              <motion.path
                d={cacPath}
                fill="none"
                stroke="#EC4899"
                strokeWidth="8"
                strokeOpacity="0.15"
                strokeLinecap="round"
                style={{ pathLength: smoothCacDraw }}
              />

              {/* Main line */}
              <motion.path
                d={cacPath}
                fill="none"
                stroke="url(#cac-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: smoothCacDraw }}
              />

              {/* Fill area */}
              <motion.path
                d={`${cacPath} L 380 180 L 20 180 Z`}
                fill="url(#cac-fill)"
                style={{ pathLength: smoothCacDraw }}
                opacity="0.15"
              />

              {/* End dot */}
              <motion.circle
                cx="380" cy="10" r="4"
                fill="#EC4899"
                style={{ opacity: smoothCacDraw }}
              />
              <motion.circle
                cx="380" cy="10" r="8"
                fill="none"
                stroke="#EC4899"
                strokeWidth="1"
                style={{ opacity: smoothCacDraw }}
                opacity="0.3"
              />

              <defs>
                <linearGradient id="cac-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="cac-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Labels */}
              <text x="20" y="196" className="fill-muted text-[9px]">2017</text>
              <text x="360" y="196" className="fill-muted text-[9px]">2025</text>
              <motion.text
                x="300" y="30"
                className="fill-glow-rose text-[11px] font-bold"
                style={{ opacity: smoothCacDraw }}
              >
                +222%
              </motion.text>
            </svg>
          </div>
          <p className="mt-4 text-center text-sm text-muted italic">
            &ldquo;Volume no longer yields linear growth.&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
