"use client";

import { motion } from "framer-motion";

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Morphing blob 1 — rose */}
      <motion.div
        className="absolute blur-[100px]"
        style={{
          width: "40%",
          height: "40%",
          background: "radial-gradient(ellipse, rgba(236,72,153,0.25), transparent 70%)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          left: "-5%",
          top: "10%",
        }}
        animate={{
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "50% 50% 30% 70% / 60% 40% 60% 40%",
            "70% 30% 50% 50% / 40% 60% 40% 60%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ],
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Morphing blob 2 — purple */}
      <motion.div
        className="absolute blur-[120px]"
        style={{
          width: "35%",
          height: "45%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.2), transparent 70%)",
          borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%",
          right: "5%",
          top: "5%",
        }}
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 50% 60% 40% 50%",
            "40% 60% 60% 40% / 40% 50% 50% 60%",
            "50% 50% 40% 60% / 60% 40% 60% 40%",
            "60% 40% 30% 70% / 50% 60% 40% 50%",
          ],
          x: [0, -40, 15, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Morphing blob 3 — cyan */}
      <motion.div
        className="absolute blur-[90px]"
        style={{
          width: "30%",
          height: "35%",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.2), transparent 70%)",
          borderRadius: "40% 60% 50% 50% / 50% 40% 60% 50%",
          left: "30%",
          bottom: "5%",
        }}
        animate={{
          borderRadius: [
            "40% 60% 50% 50% / 50% 40% 60% 50%",
            "60% 40% 40% 60% / 40% 60% 40% 60%",
            "50% 50% 60% 40% / 60% 50% 50% 40%",
            "40% 60% 50% 50% / 50% 40% 60% 50%",
          ],
          x: [0, 50, -30, 0],
          y: [0, -20, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
