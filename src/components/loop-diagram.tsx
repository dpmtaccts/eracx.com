"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const loops = [
  {
    name: "Connection",
    subtitle: "Acquisition",
    description: "Signal & Content Loops",
    color: "#38BDF8",
    href: "/services/connection",
    angle: 270, // top
  },
  {
    name: "Trust",
    subtitle: "Decision",
    description: "Buying Process & Stakeholder Loops",
    color: "#8B5CF6",
    href: "/services/trust",
    angle: 30, // bottom-right
  },
  {
    name: "Loyalty",
    subtitle: "Expansion",
    description: "Value Realization & Advocacy Loops",
    color: "#EC4899",
    href: "/services/loyalty",
    angle: 150, // bottom-left
  },
];

export default function LoopDiagram() {
  const radius = 140;
  const centerX = 200;
  const centerY = 200;

  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: 400, height: 400 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        style={{ filter: "url(#glow-filter)" }}
      >
        <defs>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Animated gradient for the main circle */}
          <linearGradient id="loop-gradient" gradientUnits="userSpaceOnUse" x1="60" y1="60" x2="340" y2="340">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
          </linearGradient>

          {/* Arrow markers */}
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" opacity="0.6" />
          </marker>
          <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#8B5CF6" opacity="0.6" />
          </marker>
          <marker id="arrow-rose" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#EC4899" opacity="0.6" />
          </marker>
        </defs>

        {/* Main connecting circle */}
        <motion.circle
          cx={centerX} cy={centerY} r={radius}
          fill="none"
          stroke="url(#loop-gradient)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Flowing arrows between nodes */}
        {loops.map((loop, i) => {
          const nextLoop = loops[(i + 1) % 3];
          const fromAngle = (loop.angle * Math.PI) / 180;
          const toAngle = (nextLoop.angle * Math.PI) / 180;

          const fromX = centerX + Math.cos(fromAngle) * (radius - 30);
          const fromY = centerY + Math.sin(fromAngle) * (radius - 30);
          const toX = centerX + Math.cos(toAngle) * (radius - 30);
          const toY = centerY + Math.sin(toAngle) * (radius - 30);

          const midX = centerX + Math.cos((fromAngle + toAngle) / 2) * (radius * 0.5);
          const midY = centerY + Math.sin((fromAngle + toAngle) / 2) * (radius * 0.5);

          const markers = ["arrow-cyan", "arrow-purple", "arrow-rose"];

          return (
            <motion.path
              key={`arrow-${i}`}
              d={`M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`}
              fill="none"
              stroke={loop.color}
              strokeWidth="1"
              strokeOpacity="0.3"
              markerEnd={`url(#${markers[i]})`}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.3, ease: "easeOut" }}
            />
          );
        })}

        {/* Animated particles along the ring */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`particle-${i}`}
            r="2"
            fill={loops[i].color}
            opacity="0.7"
            animate={{
              cx: [
                centerX + Math.cos(((loops[i].angle - 10) * Math.PI) / 180) * radius,
                centerX + Math.cos(((loops[i].angle + 110) * Math.PI) / 180) * radius,
              ],
              cy: [
                centerY + Math.sin(((loops[i].angle - 10) * Math.PI) / 180) * radius,
                centerY + Math.sin(((loops[i].angle + 110) * Math.PI) / 180) * radius,
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.3,
            }}
          />
        ))}
      </svg>

      {/* Node labels */}
      {loops.map((loop, i) => {
        const angleRad = (loop.angle * Math.PI) / 180;
        const nodeRadius = radius + 50;
        const x = centerX + Math.cos(angleRad) * nodeRadius;
        const y = centerY + Math.sin(angleRad) * nodeRadius;

        return (
          <motion.div
            key={loop.name}
            className="absolute"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.2, type: "spring", stiffness: 200 }}
          >
            <Link href={loop.href} className="group block text-center">
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2 shadow-lg"
                style={{
                  backgroundColor: loop.color,
                  boxShadow: `0 0 20px ${loop.color}40`,
                }}
              />
              <p className="text-sm font-bold text-foreground group-hover:opacity-80 transition-opacity">
                {loop.name}
              </p>
              <p className="text-[10px] text-muted">{loop.subtitle}</p>
              <p className="text-[10px] text-muted hidden sm:block">{loop.description}</p>
            </Link>
          </motion.div>
        );
      })}

      {/* Center text */}
      <motion.div
        className="absolute"
        style={{
          left: centerX,
          top: centerY,
          transform: "translate(-50%, -50%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="text-xs font-semibold text-foreground text-center leading-tight">
          Revenue<br />System
        </p>
      </motion.div>
    </motion.div>
  );
}
