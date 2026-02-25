"use client";

import { motion } from "framer-motion";
import GradientMesh from "./gradient-mesh";

const tiers = [
  { pct: "3%", label: "Buying Now", widthPct: 25, color: "#EC4899", delay: 0 },
  { pct: "7%", label: "Open to it", widthPct: 40, color: "#8B5CF6", delay: 0.15 },
  { pct: "30%", label: "Not thinking about it", widthPct: 60, color: "#38BDF8", delay: 0.3 },
  { pct: "60%", label: "Not interested", widthPct: 100, color: "#858284", delay: 0.45 },
];

export default function PyramidSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <GradientMesh />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              The 97% Opportunity
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Transaction tactics ignore the majority of the market hidden below the
              surface. Only 3% of your market is buying right now. 84% of deals are won
              by the first vendor contacted, and 95% of business clients are not
              in-market at any given time.
            </p>
            <p className="mt-4 text-sm italic text-muted">
              &ldquo;You cannot &lsquo;sell&rsquo; the 97%. You must use education-based
              marketing to build relationships before intent exists.&rdquo;
            </p>
          </motion.div>

          {/* Animated pyramid */}
          <div className="space-y-3">
            {tiers.map((tier) => (
              <motion.div
                key={tier.pct}
                className="mx-auto"
                style={{ width: `${tier.widthPct}%` }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: tier.delay,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <motion.div
                  className="rounded-lg px-4 py-3 text-center relative overflow-hidden"
                  style={{
                    backgroundColor: `${tier.color}20`,
                    border: `1px solid ${tier.color}30`,
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* Animated shine */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${tier.color}15 50%, transparent 100%)`,
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: tier.delay * 4,
                      repeatDelay: 5,
                    }}
                  />
                  <span className="relative text-sm font-bold text-foreground">{tier.pct}</span>
                  <span className="relative text-xs text-foreground/80 ml-2">{tier.label}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="p-6 rounded-xl border border-border bg-card/50 opacity-60"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 0.6, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Transactional Model
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li>Focus: Active Buyers (3%)</li>
              <li>Approach: &ldquo;Spray and Pray&rdquo;</li>
              <li>Outcome: High Churn, Low NRR</li>
              <li className="font-semibold text-foreground">$1,980 per acquisition (outbound)</li>
            </ul>
          </motion.div>
          <motion.div
            className="p-6 rounded-xl border border-glow-rose/30 bg-gradient-to-b from-glow-rose/10 to-transparent"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-glow-rose mb-3">
              Relationship-First Model
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li>Focus: Full Pyramid (100%)</li>
              <li>Approach: Systematic Trust Building</li>
              <li>Outcome: Compounding Growth</li>
              <li className="font-semibold text-foreground">$150 per acquisition (referral-based)</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
