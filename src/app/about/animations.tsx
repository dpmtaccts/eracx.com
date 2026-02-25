"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TEAM, IDEAL_PARTNER } from "@/lib/content";
import ScrollReveal, { StaggerReveal, StaggerItem, ScrollLine } from "@/components/scroll-reveal";

export default function AboutAnimations() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 50, damping: 20 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 60, damping: 20 });

  const pillars = [
    {
      pillar: "Experiences",
      subtitle: "The Loop Framework",
      desc: "Each signal detected triggers engagement that produces new signals. Relationships compound when the system never stops cycling.",
      color: "text-glow-cyan",
    },
    {
      pillar: "Technology",
      subtitle: "Data & Automation",
      desc: "Each disclosure met with care unlocks the next deeper level. We integrate point solutions into a single, cohesive revenue engine.",
      color: "text-glow-purple",
    },
    {
      pillar: "Modularity",
      subtitle: "Modern Structure",
      desc: "Our systems are designed for the modern growth team. Start with one loop, add more as you scale. No lock-in, full flexibility.",
      color: "text-glow-rose",
    },
  ];

  return (
    <>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle animated dots background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/20"
              style={{
                left: `${10 + (i * 4.3) % 80}%`,
                top: `${15 + (i * 7.1) % 70}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative mx-auto max-w-4xl px-6"
          style={{ y: smoothHeroY, opacity: smoothHeroOpacity }}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          >
            Revenue Systems Built on Relationship Infrastructure
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            B2B companies who build relationship infrastructure before, during, and after
            the purchase decision will win. Era exists to make that infrastructure accessible
            to growth-stage companies.
          </motion.p>
        </motion.div>
      </section>

      <ScrollLine className="mx-auto max-w-4xl" />

      {/* Our Approach — staggered pillar cards */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold text-foreground mb-6 tracking-tight">Our Secret Sauce</h2>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {pillars.map((item) => (
              <StaggerItem key={item.pillar}>
                <motion.div
                  className="p-6 rounded-xl border border-border bg-card h-full"
                  whileHover={{ y: -4, borderColor: "var(--primary)" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={`text-xs font-semibold uppercase tracking-wider ${item.color} mb-2`}>
                    {item.pillar}
                  </p>
                  <h3 className="text-lg font-bold text-foreground">{item.subtitle}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <ScrollLine className="mx-auto max-w-4xl" />

      {/* Founder — reveal with emphasis */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold text-foreground mb-8 tracking-tight">Leadership</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <motion.div
              className="p-8 rounded-2xl border border-border bg-card"
              whileHover={{ borderColor: "var(--primary)" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-foreground">{TEAM.founder.name}</h3>
              <p className="text-sm text-primary mt-1">{TEAM.founder.title}</p>
              <p className="mt-4 text-sm text-muted leading-relaxed italic">
                &ldquo;{TEAM.founder.bio}&rdquo;
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {TEAM.founder.experience.map((co, i) => (
                  <motion.span
                    key={co}
                    className="px-3 py-1 rounded-full border border-border bg-background text-xs text-muted"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                  >
                    {co}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          <StaggerReveal className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {TEAM.leads.map((lead) => (
              <StaggerItem key={lead.title}>
                <motion.div
                  className="p-6 rounded-xl border border-border bg-card h-full"
                  whileHover={{ y: -4, borderColor: "var(--primary)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-bold text-foreground">{lead.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{lead.background}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <ScrollLine className="mx-auto max-w-4xl" />

      {/* Ideal Partner — animated stats */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">
              Our Ideal Partner Is in the Messy Middle
            </h2>
            <p className="text-muted mb-8">
              {IDEAL_PARTNER.description}
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10" staggerDelay={0.1}>
            {[
              { label: "Size", value: IDEAL_PARTNER.size },
              { label: "Maturity", value: IDEAL_PARTNER.maturity },
              { label: "Pain Point", value: IDEAL_PARTNER.painPoint },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  className="p-5 rounded-xl border border-border bg-card text-center"
                  whileHover={{ scale: 1.03, borderColor: "var(--primary)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p className="mt-1 text-lg font-bold text-foreground">{stat.value}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <ScrollReveal>
            <h3 className="text-lg font-bold text-foreground mb-4">Focus Verticals</h3>
          </ScrollReveal>
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {IDEAL_PARTNER.verticals.map((v) => (
              <motion.span
                key={v}
                className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm text-foreground"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                }}
                whileHover={{ scale: 1.05 }}
              >
                {v}
              </motion.span>
            ))}
          </motion.div>

          <ScrollReveal>
            <h3 className="text-lg font-bold text-foreground mb-4">Total Addressable Market</h3>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-5 gap-4" staggerDelay={0.08}>
            {[
              { region: "United States", count: IDEAL_PARTNER.tam.us },
              { region: "United Kingdom", count: IDEAL_PARTNER.tam.uk },
              { region: "Canada", count: IDEAL_PARTNER.tam.ca },
              { region: "Australia", count: IDEAL_PARTNER.tam.au },
              { region: "Total", count: IDEAL_PARTNER.tam.total },
            ].map((item) => (
              <StaggerItem key={item.region}>
                <motion.div
                  className="p-4 rounded-xl border border-border bg-card text-center"
                  whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-lg font-bold text-foreground">{item.count}</p>
                  <p className="text-xs text-muted mt-1">{item.region}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
