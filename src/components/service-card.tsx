"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ServiceCardProps {
  name: string;
  tagline: string;
  description: string;
  price: string;
  href: string;
  color: "glow-cyan" | "glow-purple" | "glow-rose";
  index?: number;
}

const colorMap = {
  "glow-cyan": "from-glow-cyan/20 to-transparent border-glow-cyan/30",
  "glow-purple": "from-glow-purple/20 to-transparent border-glow-purple/30",
  "glow-rose": "from-glow-rose/20 to-transparent border-glow-rose/30",
};

const accentMap = {
  "glow-cyan": "text-glow-cyan",
  "glow-purple": "text-glow-purple",
  "glow-rose": "text-glow-rose",
};

const glowColorMap = {
  "glow-cyan": "rgba(56,189,248,0.15)",
  "glow-purple": "rgba(139,92,246,0.15)",
  "glow-rose": "rgba(236,72,153,0.15)",
};

export default function ServiceCard({
  name,
  tagline,
  description,
  price,
  href,
  color,
  index = 0,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -8);
    setRotateY((x - 0.5) * 8);
    setGlowPos({ x: x * 100, y: y * 100 });
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
    setGlowPos({ x: 50, y: 50 });
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <Link href={href} className="block group">
        <motion.div
          ref={ref}
          className={`relative p-8 rounded-2xl border bg-gradient-to-b ${colorMap[color]} overflow-hidden`}
          style={{
            transformStyle: "preserve-3d",
            perspective: "800px",
          }}
          animate={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Mouse-following glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColorMap[color]}, transparent 50%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Animated border shine */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg, transparent 0%, ${glowColorMap[color].replace("0.15", "0.3")} 10%, transparent 20%)`,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-[1px] rounded-2xl bg-card/90 pointer-events-none" style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }} />

          {/* Content */}
          <div className="relative z-10">
            {/* Floating loop icon */}
            <motion.div
              className="mb-4"
              animate={isHovered ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <motion.circle
                  cx="16" cy="16" r="12"
                  stroke={glowColorMap[color].replace("0.15", "0.5")}
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                  fill="none"
                  animate={{ strokeDashoffset: [0, -36] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  cx="16" cy="16" r="6"
                  stroke={glowColorMap[color].replace("0.15", "0.8")}
                  strokeWidth="1"
                  fill="none"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  strokeDasharray="4 4"
                />
                <circle cx="16" cy="16" r="2" fill={glowColorMap[color].replace("0.15", "0.8")} />
              </svg>
            </motion.div>

            <p className={`text-xs font-semibold uppercase tracking-wider ${accentMap[color]}`}>
              {name}
            </p>
            <h3 className="mt-3 text-xl font-bold text-foreground">{tagline}</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">{description}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">{price}</span>
              <motion.span
                className={`text-sm font-medium ${accentMap[color]}`}
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Learn more &rarr;
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
