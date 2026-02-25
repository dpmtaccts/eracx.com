"use client";

import { motion } from "framer-motion";

export default function OrbitRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {/* Outer ring — Connection (cyan) */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          borderColor: "rgba(56, 189, 248, 0.12)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* Orbiting dot */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-glow-cyan shadow-[0_0_20px_rgba(56,189,248,0.6)]"
          style={{ top: "-6px", left: "50%", marginLeft: "-6px" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Trail arc */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="cyan-trail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.3)" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="50" cy="50" r="49"
            fill="none"
            stroke="url(#cyan-trail)"
            strokeWidth="0.5"
            strokeDasharray="30 270"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -308] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      {/* Middle ring — Trust (purple) */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: "min(500px, 65vw)",
          height: "min(500px, 65vw)",
          borderColor: "rgba(139, 92, 246, 0.12)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-glow-purple shadow-[0_0_16px_rgba(139,92,246,0.6)]"
          style={{ top: "-5px", left: "50%", marginLeft: "-5px" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="purple-trail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.3)" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="50" cy="50" r="49"
            fill="none"
            stroke="url(#purple-trail)"
            strokeWidth="0.5"
            strokeDasharray="25 283"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, 308] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      {/* Inner ring — Loyalty (rose) */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: "min(300px, 40vw)",
          height: "min(300px, 40vw)",
          borderColor: "rgba(236, 72, 153, 0.12)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-glow-rose shadow-[0_0_12px_rgba(236,72,153,0.6)]"
          style={{ top: "-4px", left: "50%", marginLeft: "-4px" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="rose-trail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.3)" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="50" cy="50" r="49"
            fill="none"
            stroke="url(#rose-trail)"
            strokeWidth="0.6"
            strokeDasharray="20 288"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, -308] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      {/* Center pulse */}
      <motion.div
        className="absolute w-4 h-4 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.8), rgba(139,92,246,0.4), transparent)",
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.8, 0.3, 0.8],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
