"use client";

import { motion } from "framer-motion";
import { COST_COMPARISON } from "@/lib/content";

export default function CostComparison() {
  return (
    <section className="py-20 border-t border-border">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            The Efficiency Advantage
          </h2>
          <p className="mt-3 text-muted">
            Infrastructure arbitrage: buying wholesale, selling retail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Internal build */}
          <motion.div
            className="p-6 rounded-xl border border-border bg-card relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Internal Build
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Headcount", value: COST_COMPARISON.internal.headcount },
                { label: "Tech Stack", value: COST_COMPARISON.internal.techStack },
                { label: "Agencies", value: COST_COMPARISON.internal.agencies },
              ].map((item, i) => (
                <motion.li
                  key={item.label}
                  className="flex justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <span className="text-muted">{item.label}</span>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </motion.li>
              ))}
              <motion.li
                className="flex justify-between pt-3 border-t border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span className="font-semibold text-foreground">Total Annual</span>
                <span className="font-bold text-foreground">{COST_COMPARISON.internal.total}</span>
              </motion.li>
            </ul>

            {/* Strikethrough line animation */}
            <motion.div
              className="absolute top-1/2 left-4 right-4 h-[2px] bg-destructive/40 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          {/* With Era */}
          <motion.div
            className="p-6 rounded-xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.2 }}
          >
            {/* Animated glow pulse behind the price */}
            <motion.div
              className="absolute top-6 right-6 w-24 h-24 rounded-full blur-[50px]"
              style={{ background: "rgba(56,189,248,0.2)" }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              With Era
            </p>
            <div className="flex flex-col justify-between h-full pb-4">
              <div>
                <motion.p
                  className="text-4xl md:text-5xl font-bold text-foreground"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  {COST_COMPARISON.era.total}
                </motion.p>
                <p className="text-sm text-muted mt-1">Total annual cost</p>
              </div>
              <div className="mt-6 space-y-2 text-sm text-muted">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-glow-cyan to-glow-purple bg-clip-text text-transparent">
                    {COST_COMPARISON.savings}
                  </span>{" "}
                  cost reduction
                </motion.p>
                <p>Zero hiring risk</p>
                <p>Immediate deployment</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Advantage pills */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Shared Capacity", desc: "Specialists work across accounts. No idle time.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Buying Power", desc: "Volume licensing on major tools (HubSpot, Clay).", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
            { title: "Zero Ramp", desc: "Day 1 deployment. No recruiting lag.", icon: "M5 3l14 9-14 9V3z" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="p-5 rounded-xl border border-border bg-card text-center group hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-3 text-primary opacity-60 group-hover:opacity-100 transition-opacity"
              >
                <path d={item.icon} />
              </svg>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-xs text-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
