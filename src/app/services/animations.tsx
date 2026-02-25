"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LOOP_PROGRAMS } from "@/lib/content";
import ServiceCard from "@/components/service-card";
import ScrollReveal, { StaggerReveal, StaggerItem, ScrollLine } from "@/components/scroll-reveal";

export default function ServicesAnimations() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 50, damping: 20 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 60, damping: 20 });

  // Table row animation
  const tableRef = useRef<HTMLElement>(null);
  const { scrollYProgress: tableScroll } = useScroll({
    target: tableRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div
          className="relative mx-auto max-w-4xl px-6 text-center"
          style={{ y: smoothHeroY, opacity: smoothHeroOpacity }}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Programs
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          >
            Three Loop Programs That Replace Ad-Hoc Growth Teams
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Modular loop systems that replace ad-hoc internal teams with compounding
            infrastructure. Each program stands alone but compounds when combined.
          </motion.p>
        </motion.div>
      </section>

      {/* Loop Cards — staggered entrance */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
            <StaggerItem>
              <ServiceCard
                name={LOOP_PROGRAMS.connection.name}
                tagline={LOOP_PROGRAMS.connection.tagline}
                description={LOOP_PROGRAMS.connection.description}
                price={LOOP_PROGRAMS.connection.price}
                href="/services/connection"
                color="glow-cyan"
                index={0}
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                name={LOOP_PROGRAMS.trust.name}
                tagline={LOOP_PROGRAMS.trust.tagline}
                description={LOOP_PROGRAMS.trust.description}
                price={LOOP_PROGRAMS.trust.price}
                href="/services/trust"
                color="glow-purple"
                index={1}
              />
            </StaggerItem>
            <StaggerItem>
              <ServiceCard
                name={LOOP_PROGRAMS.loyalty.name}
                tagline={LOOP_PROGRAMS.loyalty.tagline}
                description={LOOP_PROGRAMS.loyalty.description}
                price={LOOP_PROGRAMS.loyalty.price}
                href="/services/loyalty"
                color="glow-rose"
                index={2}
              />
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>

      <ScrollLine className="mx-auto max-w-4xl" />

      {/* Comparison Table — rows reveal on scroll */}
      <section ref={tableRef} className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-10 tracking-tight">
              Program Comparison
            </h2>
          </ScrollReveal>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 pr-4 text-muted font-medium">Program</th>
                  <th className="text-left py-4 pr-4 text-muted font-medium">Core Focus</th>
                  <th className="text-left py-4 pr-4 text-muted font-medium">Era Cost</th>
                  <th className="text-left py-4 text-muted font-medium">Client Savings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Connection Loops", href: "/services/connection", color: "text-glow-cyan", focus: "Intent Signal, Outbound, Qualification", cost: "$9k/mo", savings: "$12k/mo" },
                  { name: "Trust Loops", href: "/services/trust", color: "text-glow-purple", focus: "Gifting, Content, Events", cost: "$9k/mo", savings: "$8k/mo" },
                  { name: "Loyalty Loops", href: "/services/loyalty", color: "text-glow-rose", focus: "Onboarding, Renewals, Expansion", cost: "$9k/mo", savings: "$8k/mo" },
                ].map((row, i) => (
                  <motion.tr
                    key={row.name}
                    className="border-b border-border"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <td className="py-4 pr-4 font-semibold text-foreground">
                      <Link href={row.href} className={`${row.color} hover:underline`}>{row.name}</Link>
                    </td>
                    <td className="py-4 pr-4 text-muted">{row.focus}</td>
                    <td className="py-4 pr-4 text-foreground">{row.cost}</td>
                    <td className="py-4 text-foreground">{row.savings}</td>
                  </motion.tr>
                ))}
                <motion.tr
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <td className="py-4 pr-4 font-extrabold text-foreground">Total</td>
                  <td className="py-4 pr-4 text-muted">Full Revenue System</td>
                  <td className="py-4 pr-4 font-extrabold text-foreground">$27k/mo</td>
                  <td className="py-4 font-extrabold text-foreground">$28k/mo</td>
                </motion.tr>
              </tbody>
            </table>
          </div>
          <ScrollReveal delay={0.4}>
            <p className="mt-6 text-center text-sm text-muted">
              2x margin on delivered value. Scalable infrastructure. Predictable revenue.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ScrollLine className="mx-auto max-w-3xl" />

      {/* Compounding Advantage — animated steps */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              The Compounding Advantage
            </h2>
            <p className="mt-4 text-lg text-muted italic">
              &ldquo;For every 1% increase in revenue retention, company valuation increases
              by 12% after five years.&rdquo;
            </p>
          </ScrollReveal>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { step: "1", name: "Connection", color: "text-glow-cyan", desc: "Signal + Content Loops" },
              { step: "2", name: "Trust", color: "text-glow-purple", desc: "Buying Process + Stakeholder Loops" },
              { step: "3", name: "Loyalty", color: "text-glow-rose", desc: "Value Realization + Advocacy Loops" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.25, 0.1, 0, 1] }}
              >
                <div className="text-center">
                  <p className={`text-3xl font-extrabold ${item.color}`}>{item.step}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{item.name}</p>
                  <p className="text-xs text-muted mt-1">{item.desc}</p>
                </div>
                {i < 2 && (
                  <motion.span
                    className="hidden md:inline text-2xl text-muted"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                  >
                    &rarr;
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <p className="mt-10 text-sm text-muted">
              Each loop&apos;s output becomes the next loop&apos;s input. This is how relationships compound.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
