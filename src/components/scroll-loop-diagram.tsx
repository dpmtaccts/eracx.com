"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

const loops = [
  { name: "Connection", subtitle: "Acquisition", color: "#38BDF8", href: "/services/connection" },
  { name: "Trust", subtitle: "Decision", color: "#8B5CF6", href: "/services/trust" },
  { name: "Loyalty", subtitle: "Expansion", color: "#EC4899", href: "/services/loyalty" },
];

// Triangle positions (cx=250, cy=250, r=160)
const nodes = [
  { x: 250, y: 90 },   // top
  { x: 389, y: 330 },  // bottom-right
  { x: 111, y: 330 },  // bottom-left
];

// Bezier curves between nodes (slightly curved arcs)
const paths = [
  // Connection → Trust (top → bottom-right)
  "M 250 115 C 320 180, 370 250, 375 305",
  // Trust → Loyalty (bottom-right → bottom-left)
  "M 365 345 C 320 380, 200 380, 135 345",
  // Loyalty → Connection (bottom-left → top)
  "M 125 305 C 130 250, 180 180, 235 115",
];

// Outer flowing ring
const outerRing = "M 250 50 A 200 200 0 1 1 249.99 50";

export default function ScrollLoopDiagram() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // SVG paths draw between 20-60% of scroll
  const path1Length = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const path2Length = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const path3Length = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const ringLength = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const smoothPath1 = useSpring(path1Length, { stiffness: 60, damping: 20 });
  const smoothPath2 = useSpring(path2Length, { stiffness: 60, damping: 20 });
  const smoothPath3 = useSpring(path3Length, { stiffness: 60, damping: 20 });
  const smoothRing = useSpring(ringLength, { stiffness: 40, damping: 25 });

  // Node appearances
  const node1Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const node2Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const node3Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const node1Scale = useTransform(scrollYProgress, [0.15, 0.25], [0.5, 1]);
  const node2Scale = useTransform(scrollYProgress, [0.25, 0.35], [0.5, 1]);
  const node3Scale = useTransform(scrollYProgress, [0.35, 0.45], [0.5, 1]);

  const smoothNode1Opacity = useSpring(node1Opacity, { stiffness: 100, damping: 20 });
  const smoothNode2Opacity = useSpring(node2Opacity, { stiffness: 100, damping: 20 });
  const smoothNode3Opacity = useSpring(node3Opacity, { stiffness: 100, damping: 20 });
  const smoothNode1Scale = useSpring(node1Scale, { stiffness: 100, damping: 15 });
  const smoothNode2Scale = useSpring(node2Scale, { stiffness: 100, damping: 15 });
  const smoothNode3Scale = useSpring(node3Scale, { stiffness: 100, damping: 15 });

  // Center label
  const centerOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const smoothCenterOpacity = useSpring(centerOpacity, { stiffness: 80, damping: 20 });

  const smoothPaths = [smoothPath1, smoothPath2, smoothPath3];
  const nodeOpacities = [smoothNode1Opacity, smoothNode2Opacity, smoothNode3Opacity];
  const nodeScales = [smoothNode1Scale, smoothNode2Scale, smoothNode3Scale];

  return (
    <section ref={sectionRef} className="relative py-20 min-h-[80vh]">
      <div className="mx-auto max-w-lg px-6">
        <svg viewBox="0 0 500 450" className="w-full">
          <defs>
            {/* Gradient definitions */}
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
            </linearGradient>

            {/* Glow filters per color */}
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="6" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter id="glow-purple">
              <feGaussianBlur stdDeviation="6" />
              <feComposite in="SourceGraphic" />
            </filter>
            <filter id="glow-rose">
              <feGaussianBlur stdDeviation="6" />
              <feComposite in="SourceGraphic" />
            </filter>

            {/* Arrow markers */}
            {loops.map((loop, i) => (
              <marker
                key={`marker-${i}`}
                id={`arrowhead-${i}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={loop.color} opacity="0.8" />
              </marker>
            ))}
          </defs>

          {/* Outer ring — draws on scroll */}
          <motion.path
            d={outerRing}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="1"
            strokeDasharray="6 4"
            style={{ pathLength: smoothRing }}
          />

          {/* Connection paths — draw on scroll */}
          {paths.map((d, i) => (
            <g key={`path-${i}`}>
              {/* Glow layer */}
              <motion.path
                d={d}
                fill="none"
                stroke={loops[i].color}
                strokeWidth="6"
                strokeOpacity="0.1"
                style={{ pathLength: smoothPaths[i] }}
              />
              {/* Main path */}
              <motion.path
                d={d}
                fill="none"
                stroke={loops[i].color}
                strokeWidth="2"
                strokeOpacity="0.6"
                markerEnd={`url(#arrowhead-${i})`}
                style={{ pathLength: smoothPaths[i] }}
              />
            </g>
          ))}

          {/* Node circles + labels */}
          {loops.map((loop, i) => (
            <motion.g
              key={loop.name}
              style={{
                opacity: nodeOpacities[i],
                scale: nodeScales[i],
                transformOrigin: `${nodes[i].x}px ${nodes[i].y}px`,
              }}
            >
              {/* Outer glow */}
              <circle
                cx={nodes[i].x}
                cy={nodes[i].y}
                r="35"
                fill={`${loop.color}08`}
                stroke={`${loop.color}20`}
                strokeWidth="1"
              />
              {/* Inner circle */}
              <circle
                cx={nodes[i].x}
                cy={nodes[i].y}
                r="20"
                fill={`${loop.color}15`}
                stroke={loop.color}
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              {/* Pulsing core */}
              <motion.circle
                cx={nodes[i].x}
                cy={nodes[i].y}
                r="5"
                fill={loop.color}
                animate={{
                  r: [5, 7, 5],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
              {/* Name */}
              <text
                x={nodes[i].x}
                y={nodes[i].y + 50}
                textAnchor="middle"
                className="fill-foreground text-[13px] font-bold"
              >
                {loop.name}
              </text>
              {/* Subtitle */}
              <text
                x={nodes[i].x}
                y={nodes[i].y + 66}
                textAnchor="middle"
                className="fill-muted text-[10px]"
              >
                {loop.subtitle}
              </text>
            </motion.g>
          ))}

          {/* Center label */}
          <motion.g style={{ opacity: smoothCenterOpacity }}>
            <text
              x="250"
              y="245"
              textAnchor="middle"
              className="fill-foreground text-[11px] font-semibold"
            >
              Revenue
            </text>
            <text
              x="250"
              y="260"
              textAnchor="middle"
              className="fill-foreground text-[11px] font-semibold"
            >
              System
            </text>
          </motion.g>
        </svg>
      </div>
    </section>
  );
}
