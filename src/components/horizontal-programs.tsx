"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { LOOP_PROGRAMS } from "@/lib/content";

const programs = [
  { key: "connection" as const, color: "#38BDF8", borderClass: "border-glow-cyan/30", textClass: "text-glow-cyan" },
  { key: "trust" as const, color: "#8B5CF6", borderClass: "border-glow-purple/30", textClass: "text-glow-purple" },
  { key: "loyalty" as const, color: "#EC4899", borderClass: "border-glow-rose/30", textClass: "text-glow-rose" },
];

export default function HorizontalPrograms() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal translate: 3 panels, show one at a time
  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);
  const smoothX = useSpring(xTranslate, { stiffness: 50, damping: 20 });

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothProgress = useSpring(progressWidth, { stiffness: 80, damping: 25 });

  // Per-panel reveals
  const panel1Opacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);
  const panel2Opacity = useTransform(scrollYProgress, [0.25, 0.4], [0.3, 1]);
  const panel3Opacity = useTransform(scrollYProgress, [0.55, 0.7], [0.3, 1]);
  const smoothP1 = useSpring(panel1Opacity, { stiffness: 80, damping: 20 });
  const smoothP2 = useSpring(panel2Opacity, { stiffness: 80, damping: 20 });
  const smoothP3 = useSpring(panel3Opacity, { stiffness: 80, damping: 20 });
  const panelOpacities = [smoothP1, smoothP2, smoothP3];

  return (
    <section ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-24 pb-8 px-6 text-center shrink-0">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            The Loop Framework
          </h2>
          <p className="mt-3 text-muted max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Each loop&apos;s output becomes the next loop&apos;s input — relationships compound
            when the system never stops cycling.
          </p>

          {/* Progress bar */}
          <div className="mt-6 mx-auto max-w-xs h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: smoothProgress,
                background: "linear-gradient(90deg, #38BDF8, #8B5CF6, #EC4899)",
              }}
            />
          </div>

          {/* Step indicators */}
          <div className="mt-3 flex justify-center gap-8">
            {programs.map((p, i) => {
              const data = LOOP_PROGRAMS[p.key];
              return (
                <span key={p.key} className={`text-xs ${p.textClass} font-semibold`}>
                  {i + 1}. {data.name}
                </span>
              );
            })}
          </div>
        </div>

        {/* Horizontal scroll panels */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex h-full"
            style={{ x: smoothX, width: "300%" }}
          >
            {programs.map((p, i) => {
              const data = LOOP_PROGRAMS[p.key];
              return (
                <motion.div
                  key={p.key}
                  className="w-screen h-full px-6 md:px-12 flex items-center"
                  style={{ opacity: panelOpacities[i] }}
                >
                  <div className="mx-auto max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left: Info */}
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${p.textClass} mb-2`}>
                        {data.name}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {data.tagline}
                      </h3>
                      <p className="mt-4 text-muted leading-relaxed">
                        {data.description}
                      </p>
                      <div className="mt-6">
                        <span className="text-2xl font-bold text-foreground">{data.price}</span>
                      </div>
                      <div className="mt-6 flex gap-4">
                        <Link
                          href={`/services/${p.key}`}
                          className="px-6 py-2.5 rounded-full bg-primary text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                        >
                          Learn More
                        </Link>
                        <Link
                          href="/contact"
                          className="px-6 py-2.5 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors"
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>

                    {/* Right: Key plays + what's included */}
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        What&apos;s included
                      </p>
                      {data.included.slice(0, 4).map((item, j) => (
                        <div
                          key={j}
                          className={`p-4 rounded-xl border ${p.borderClass} bg-card/50`}
                        >
                          <p className="text-sm text-foreground leading-relaxed">{item}</p>
                        </div>
                      ))}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {data.tech.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 rounded-full border border-border text-xs text-muted"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
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
