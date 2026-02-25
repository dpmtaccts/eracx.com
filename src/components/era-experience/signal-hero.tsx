"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  ring: number; // 0=inner, 1=mid, 2=outer
}

const COLORS = ["#38BDF8", "#8B5CF6", "#EC4899", "rgba(180,240,255,0.8)"];

export default function SignalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const smoothTextY = useSpring(textY, { stiffness: 50, damping: 20 });
  const smoothTextOpacity = useSpring(textOpacity, { stiffness: 60, damping: 20 });
  const smoothTextScale = useSpring(textScale, { stiffness: 60, damping: 20 });

  // Radar pulse
  const radarScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.8]);
  const radarOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0]);
  const smoothRadarScale = useSpring(radarScale, { stiffness: 40, damping: 20 });
  const smoothRadarOpacity = useSpring(radarOpacity, { stiffness: 40, damping: 20 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const cx = w / 2;
    const cy = h / 2;
    const count = isMobile ? 60 : 140;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const ring = i < count * 0.3 ? 0 : i < count * 0.65 ? 1 : 2;
      const baseRadius = ring === 0 ? 80 + Math.random() * 80 : ring === 1 ? 180 + Math.random() * 120 : 320 + Math.random() * 160;
      const angle = Math.random() * Math.PI * 2;
      const x = cx + Math.cos(angle) * baseRadius;
      const y = cy + Math.sin(angle) * baseRadius;

      particles.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.6,
        ring,
      });
    }
    particlesRef.current = particles;
  }, [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    }

    resize();
    window.addEventListener("resize", resize);

    function handleMouse(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    window.addEventListener("mousemove", handleMouse);

    let time = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);
      time += 0.005;

      // Draw subtle grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw radar rings
      for (let r = 1; r <= 3; r++) {
        const ringRadius = r * 120;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.04 + r * 0.01})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Radar sweep line
      const sweepAngle = time * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * 400, cy + Math.sin(sweepAngle) * 400);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sweep gradient trail
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 400, sweepAngle - 0.4, sweepAngle);
      ctx.closePath();
      const sweepGrad = ctx.createConicGradient(sweepAngle - 0.4, cx, cy);
      sweepGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
      sweepGrad.addColorStop(1, "rgba(56, 189, 248, 0.04)");
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        // Gravitational pull toward mouse
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pullStrength = dist < 250 ? (250 - dist) / 250 : 0;
        const pullForce = pullStrength * 0.8;

        // Spring back to base
        const springX = (p.baseX - p.x) * 0.02;
        const springY = (p.baseY - p.y) * 0.02;

        // Gentle orbital drift
        const orbitAngle = Math.atan2(p.baseY - cy, p.baseX - cx) + time * (p.ring === 0 ? 0.3 : p.ring === 1 ? 0.15 : 0.08);
        const orbitRadius = Math.sqrt((p.baseX - cx) ** 2 + (p.baseY - cy) ** 2);
        const driftX = (cx + Math.cos(orbitAngle) * orbitRadius - p.baseX) * 0.01;
        const driftY = (cy + Math.sin(orbitAngle) * orbitRadius - p.baseY) * 0.01;

        p.vx += (dist > 0 ? (dx / dist) * pullForce : 0) + springX + driftX;
        p.vy += (dist > 0 ? (dy / dist) * pullForce : 0) + springY + driftY;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        // Pulsing alpha
        const pulse = 0.7 + 0.3 * Math.sin(time * 3 + p.baseX * 0.01);
        const alpha = p.alpha * pulse;
        const color = COLORS[p.ring % COLORS.length];

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.08})`).replace(/^#/, "");
        if (color.startsWith("#")) {
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.08})`;
        } else {
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.08})`);
        }
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (color.startsWith("#")) {
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        } else {
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
        }
        ctx.fill();

        // Bright particles near cursor
        if (dist < 150) {
          const brightness = (150 - dist) / 150;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${brightness * 0.3})`;
          ctx.fill();
        }
      });

      // Connecting lines for nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - d / 80) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [initParticles]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      {/* Interactive canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Radar pulse rings (scroll-linked) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale: smoothRadarScale, opacity: smoothRadarOpacity }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{ width: `${i * 240}px`, height: `${i * 240}px` }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      {/* Left label */}
      <motion.div
        className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{ opacity: smoothTextOpacity }}
      >
        <p
          className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-white/60 [writing-mode:vertical-lr] rotate-180"
          style={{ mixBlendMode: "difference" }}
        >
          Relationship Infrastructure for growth teams
        </p>
      </motion.div>

      {/* Typography — mix-blend-mode: difference */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
        style={{ y: smoothTextY, opacity: smoothTextOpacity, scale: smoothTextScale }}
      >
        <h1
          className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter text-white text-center select-none"
          style={{ mixBlendMode: "difference" }}
        >
          ERA
          <br />
          <span className="text-[6vw] md:text-[5vw] font-light tracking-[0.2em]">
            SYSTEMS
          </span>
        </h1>
        <p
          className="mt-8 max-w-xl text-sm md:text-base text-center leading-relaxed text-white/80 px-6"
          style={{ mixBlendMode: "difference" }}
        >
          Era designs, installs, and operates the growth system for B2B companies.
          Signal-based pipeline, buying committee engagement, and expansion: built and run for you.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: smoothTextOpacity }}
      >
        <motion.div
          className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center pt-2"
          style={{ mixBlendMode: "difference" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
