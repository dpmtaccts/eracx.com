"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  radius: number;
  color: string;
  opacity: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
}

const COLORS = [
  "rgba(56, 189, 248, 0.6)",   // cyan
  "rgba(139, 92, 246, 0.5)",   // purple
  "rgba(236, 72, 153, 0.5)",   // rose
  "rgba(180, 240, 255, 0.3)",  // teal
];

export default function FlowingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

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
    }

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles in orbital patterns
    const particles: Particle[] = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const orbitRadius = 80 + Math.random() * 250;
      particles.push({
        x: 0,
        y: 0,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0005 + Math.random() * 0.001,
        radius: 1 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.2 + Math.random() * 0.5,
        orbitRadius,
        orbitSpeed: (0.001 + Math.random() * 0.002) * (Math.random() > 0.5 ? 1 : -1),
        orbitOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    let time = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      time += 1;

      particlesRef.current.forEach((p) => {
        p.angle += p.orbitSpeed;

        // Slightly elliptical orbits for organic feel
        const ellipseX = 1 + 0.3 * Math.sin(p.orbitOffset);
        const ellipseY = 1 - 0.3 * Math.sin(p.orbitOffset);

        p.x = cx + Math.cos(p.angle) * p.orbitRadius * ellipseX;
        p.y = cy + Math.sin(p.angle) * p.orbitRadius * ellipseY;

        // Pulsing opacity
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.02 + p.orbitOffset);
        const alpha = p.opacity * pulse;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();

        // Soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.15})`);
        ctx.fill();
      });

      // Draw faint connecting lines between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
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
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
