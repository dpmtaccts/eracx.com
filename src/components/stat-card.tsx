"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  value: string;
  label: string;
  detail: string;
  index?: number;
}

export default function StatCard({ value, label, detail, index = 0 }: StatCardProps) {
  return (
    <motion.div
      className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-glow-rose via-glow-purple to-glow-cyan bg-clip-text text-transparent">
        {value}
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </motion.div>
  );
}
