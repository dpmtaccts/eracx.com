"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import GradientMesh from "./gradient-mesh";
import OrbitRings from "./orbit-rings";

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers at different speeds
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const ringsScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const ringsOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const tagScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Smooth spring physics
  const smoothVideoY = useSpring(videoY, { stiffness: 60, damping: 20 });
  const smoothRingsScale = useSpring(ringsScale, { stiffness: 60, damping: 20 });
  const smoothRingsOpacity = useSpring(ringsOpacity, { stiffness: 60, damping: 20 });
  const smoothTextY = useSpring(textY, { stiffness: 60, damping: 20 });
  const smoothTextOpacity = useSpring(textOpacity, { stiffness: 60, damping: 20 });
  const smoothTagScale = useSpring(tagScale, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GradientMesh />

      {/* Orbit rings — parallax scale + fade */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: smoothRingsScale, opacity: smoothRingsOpacity }}
      >
        <OrbitRings />
      </motion.div>

      {/* Video — parallax slower */}
      <motion.div className="absolute inset-0" style={{ y: smoothVideoY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-10"
        >
          <source src="/loop-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Text content — parallax faster + fade */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-24"
        style={{ y: smoothTextY, opacity: smoothTextOpacity, scale: smoothTagScale }}
      >
        <motion.p
          className="text-sm font-semibold uppercase tracking-wider text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Revenue Systems
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="bg-gradient-to-r from-glow-rose via-glow-purple to-glow-cyan bg-clip-text text-transparent">
            Designs, installs, and operates
          </span>
          <br />
          <span className="text-foreground">revenue systems.</span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Modular loop programs that replace ad-hoc growth teams with compounding
          relationship infrastructure for B2B companies.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-primary text-background font-semibold hover:opacity-90 transition-opacity"
          >
            Start a 30-Day Pilot
          </Link>
          <Link
            href="/services"
            className="px-8 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-card transition-colors"
          >
            Explore Programs
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: smoothTextOpacity }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted/40 flex items-start justify-center p-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
