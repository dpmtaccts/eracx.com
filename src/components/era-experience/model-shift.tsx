"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

interface ShiftParticle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

const PARTICLE_COUNT = 40;

function generateChaosParticles(width: number, height: number): ShiftParticle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    targetX: Math.random() * width,
    targetY: Math.random() * height,
  }));
}

function generateOrderParticles(width: number, height: number): ShiftParticle[] {
  const cx = width / 2;
  const cy = height / 2;
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    // Arrange in a loop/orbit pattern
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
    const radius = 60 + (i % 3) * 30;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    return { id: i, x, y, targetX: x, targetY: y };
  });
}

export default function ModelShift() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sliderX, setSliderX] = useState(50); // 0–100, 50 = middle
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const smoothOpacity = useSpring(sectionOpacity, { stiffness: 80, damping: 20 });

  useEffect(() => {
    function updateDimensions() {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const chaosParticles = generateChaosParticles(dimensions.width, dimensions.height);
  const orderParticles = generateOrderParticles(dimensions.width, dimensions.height);

  // Interpolate between chaos and order based on slider
  const ratio = sliderX / 100; // 0 = full chaos, 1 = full order

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderX(x);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (isDragging) handleMove(e.clientX);
    }
    function onTouchMove(e: TouchEvent) {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    }
    function onUp() { setIsDragging(false); }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handleMove]);

  return (
    <motion.section
      ref={sectionRef}
      className="py-32 px-6"
      style={{ opacity: smoothOpacity }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
            The Shift
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            From Transactional to Relational
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Drag the slider to see the difference.
          </p>
        </div>

        {/* Interactive comparison */}
        <div
          ref={sliderRef}
          className="relative w-full aspect-[16/9] max-h-[500px] rounded-2xl border border-border overflow-hidden bg-card cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Left side — Chaos (Transactional) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background to-card">
              {/* Chaos particles */}
              <AnimatePresence>
                {chaosParticles.map((p) => {
                  const chaosAmount = 1 - ratio;
                  return (
                    <motion.div
                      key={`chaos-${p.id}`}
                      className="absolute w-2 h-2 rounded-full bg-destructive/60"
                      animate={{
                        x: [p.x, p.targetX, p.x + (Math.random() - 0.5) * 100, p.x],
                        y: [p.y, p.targetY, p.y + (Math.random() - 0.5) * 100, p.y],
                        opacity: [0.3, 0.6 * chaosAmount, 0.2, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </AnimatePresence>

              {/* Chaos label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl md:text-6xl font-black text-destructive/20 tracking-tighter">
                  CHAOS
                </p>
                <p className="text-sm text-muted mt-2">$1,980 per acquisition</p>
                <p className="text-xs text-muted">High Churn &middot; Low NRR</p>
              </div>
            </div>
          </div>

          {/* Right side — Order (Relationship) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderX}%)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-card to-background">
              {/* Order particles — move in unified orbits */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Orbit paths */}
                {[60, 90, 120].map((r, i) => (
                  <circle
                    key={`orbit-${i}`}
                    cx="50%"
                    cy="50%"
                    r={r}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="0.5"
                    opacity={0.1 + ratio * 0.15}
                  />
                ))}
              </svg>

              <AnimatePresence>
                {orderParticles.map((p, i) => {
                  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
                  const orbitR = 60 + (i % 3) * 30;
                  return (
                    <motion.div
                      key={`order-${p.id}`}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        backgroundColor: i % 3 === 0 ? "#38BDF8" : i % 3 === 1 ? "#8B5CF6" : "#EC4899",
                      }}
                      animate={{
                        x: [
                          Math.cos(angle) * orbitR,
                          Math.cos(angle + Math.PI / 2) * orbitR,
                          Math.cos(angle + Math.PI) * orbitR,
                          Math.cos(angle + Math.PI * 1.5) * orbitR,
                          Math.cos(angle + Math.PI * 2) * orbitR,
                        ],
                        y: [
                          Math.sin(angle) * orbitR,
                          Math.sin(angle + Math.PI / 2) * orbitR,
                          Math.sin(angle + Math.PI) * orbitR,
                          Math.sin(angle + Math.PI * 1.5) * orbitR,
                          Math.sin(angle + Math.PI * 2) * orbitR,
                        ],
                        opacity: [0.4, 0.7 * ratio, 0.5, 0.7 * ratio, 0.4],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                })}
              </AnimatePresence>

              {/* Order label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl md:text-6xl font-black text-primary/20 tracking-tighter">
                  SYSTEM
                </p>
                <p className="text-sm text-muted mt-2">$150 per acquisition</p>
                <p className="text-xs text-muted">Compounding Growth</p>
              </div>
            </div>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 z-10"
            style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
          >
            {/* Vertical line */}
            <div className="w-[2px] h-full bg-foreground/40" />
            {/* Handle grip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground/90 flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8H1M15 8H12M4 8L6 6M4 8L6 10M12 8L10 6M12 8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-background" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom labels */}
        <div className="mt-8 grid grid-cols-2 gap-8 text-center">
          <div>
            <p className="text-sm font-semibold text-destructive/70">Transactional Model</p>
            <p className="text-xs text-muted mt-1">&ldquo;Spray and Pray&rdquo; &middot; Active buyers only (3%)</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Relationship-First Model</p>
            <p className="text-xs text-muted mt-1">Systematic Trust Building &middot; Full pyramid (100%)</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
