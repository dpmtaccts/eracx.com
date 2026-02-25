"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function TiltCard({ children, className = "", glowColor = "rgba(56,189,248,0.15)" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -10);
    setRotateY((x - 0.5) * 10);
    setGlowX(x * 100);
    setGlowY(y * 100);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse-following glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
