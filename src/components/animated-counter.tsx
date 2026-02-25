"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  detail: string;
  index?: number;
}

function parseNumeric(val: string): { prefix: string; number: number; suffix: string } {
  const match = val.match(/^([^0-9]*)([\d,.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: val };
  return {
    prefix: match[1],
    number: parseFloat(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

function formatNumber(n: number, hasCommas: boolean): string {
  if (hasCommas) return n.toLocaleString();
  return n % 1 === 0 ? n.toString() : n.toFixed(1);
}

export default function AnimatedCounter({ value, label, detail, index = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState("0");

  const parsed = parseNumeric(value);
  const hasCommas = value.includes(",");

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();
    const target = parsed.number;

    function tick() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayValue(formatNumber(current, hasCommas));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, parsed.number, hasCommas]);

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
    >
      <p className="text-3xl md:text-4xl font-bold font-mono bg-gradient-to-r from-glow-rose via-glow-purple to-glow-cyan bg-clip-text text-transparent tabular-nums">
        {parsed.prefix}{displayValue}{parsed.suffix}
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </motion.div>
  );
}
