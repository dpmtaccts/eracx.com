"use client";

import { motion } from "framer-motion";

interface GlowBackgroundProps {
  variant?: "hero" | "section";
}

export default function GlowBackground({ variant = "section" }: GlowBackgroundProps) {
  const isHero = variant === "hero";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Rose glow */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--glow-rose), transparent 70%)",
          width: isHero ? "600px" : "400px",
          height: isHero ? "600px" : "400px",
          left: isHero ? "-10%" : "-5%",
          top: isHero ? "10%" : "20%",
          opacity: 0.15,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Purple glow */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--glow-purple), transparent 70%)",
          width: isHero ? "500px" : "350px",
          height: isHero ? "500px" : "350px",
          right: isHero ? "10%" : "5%",
          top: isHero ? "20%" : "10%",
          opacity: 0.12,
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Cyan glow */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--glow-cyan), transparent 70%)",
          width: isHero ? "450px" : "300px",
          height: isHero ? "450px" : "300px",
          left: isHero ? "40%" : "50%",
          bottom: isHero ? "0%" : "10%",
          opacity: 0.1,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}
