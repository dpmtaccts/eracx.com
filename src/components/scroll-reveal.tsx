"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  distance?: number;
  once?: boolean;
}

/**
 * Scroll-linked reveal with spring physics.
 * Fades in and optionally slides from a direction as it enters the viewport.
 */
export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  distance = 40,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: direction === "up" ? distance : 0,
        x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered children reveal — each child animates in sequence.
 */
export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 30,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: direction === "up" ? distance : 0,
          x: direction === "left" ? -distance : direction === "right" ? distance : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax section — content moves at a different rate than scroll.
 */
export function ParallaxSection({
  children,
  className = "",
  speed = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

/**
 * Animated horizontal line that draws on scroll.
 */
export function ScrollLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothWidth = useSpring(width, { stiffness: 50, damping: 25 });

  return (
    <div ref={ref} className={`h-px bg-border overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-glow-cyan via-glow-purple to-glow-rose"
        style={{ width: smoothWidth }}
      />
    </div>
  );
}
