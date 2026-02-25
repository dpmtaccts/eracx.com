"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CLIENT_RESULTS } from "@/lib/content";

function ResultCard({ result, index }: { result: typeof CLIENT_RESULTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -6);
    setRotateY((x - 0.5) * 6);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
  }

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-xl border border-border bg-card"
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        type: "spring",
        stiffness: 100,
      }}
      animate={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.p
        className="text-3xl font-bold font-mono bg-gradient-to-r from-glow-cyan to-glow-purple bg-clip-text text-transparent"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.12, type: "spring", stiffness: 200 }}
      >
        {result.metric}
      </motion.p>
      <p className="mt-1 text-sm font-medium text-foreground">{result.detail}</p>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm font-semibold text-foreground">{result.client}</p>
        <p className="text-xs text-muted">{result.industry}</p>
        <p className="mt-2 text-xs text-muted leading-relaxed">{result.description}</p>
      </div>
    </motion.div>
  );
}

export default function ResultsGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Client Results
          </h2>
          <p className="mt-3 text-muted">
            Representative outcomes from relationship-first implementations.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLIENT_RESULTS.map((result, i) => (
            <ResultCard key={result.client} result={result} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
