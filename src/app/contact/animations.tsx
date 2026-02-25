"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/content";
import ContactForm from "@/components/contact-form";
import ScrollReveal, { StaggerReveal, StaggerItem, ScrollLine } from "@/components/scroll-reveal";

export default function ContactAnimations() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 50, damping: 20 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 60, damping: 20 });

  return (
    <>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
        {/* Animated pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/5"
              style={{ width: `${i * 300}px`, height: `${i * 300}px` }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.03, 0.1] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
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
            Contact
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          >
            Start Building Your Revenue System
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Choose your entry point based on your current situation. We&apos;ll start with an
            assessment call and recommend the right program for you.
          </motion.p>
        </motion.div>
      </section>

      {/* Entry points + Form */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: entry point guide */}
          <div className="space-y-6">
            <ScrollReveal>
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                Which program should you start with?
              </h2>
            </ScrollReveal>

            <StaggerReveal className="space-y-6" staggerDelay={0.1}>
              <StaggerItem>
                <motion.div
                  className="p-6 rounded-xl border border-glow-cyan/30 bg-gradient-to-b from-glow-cyan/10 to-transparent"
                  whileHover={{ x: 4, borderColor: "var(--glow-cyan)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-bold text-foreground">
                    <Link href="/services/connection" className="text-glow-cyan hover:underline">
                      Start with Connection Loops
                    </Link>
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    <li>Building outbound from scratch</li>
                    <li>Relying only on inbound</li>
                    <li>Need to expand market reach</li>
                  </ul>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  className="p-6 rounded-xl border border-glow-purple/30 bg-gradient-to-b from-glow-purple/10 to-transparent"
                  whileHover={{ x: 4, borderColor: "var(--glow-purple)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-bold text-foreground">
                    <Link href="/services/trust" className="text-glow-purple hover:underline">
                      Start with Trust Loops
                    </Link>
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    <li>Generating leads but not converting</li>
                    <li>Experiencing long sales cycles</li>
                    <li>Seeing deals stall frequently</li>
                  </ul>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  className="p-6 rounded-xl border border-glow-rose/30 bg-gradient-to-b from-glow-rose/10 to-transparent"
                  whileHover={{ x: 4, borderColor: "var(--glow-rose)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-bold text-foreground">
                    <Link href="/services/loyalty" className="text-glow-rose hover:underline">
                      Start with Loyalty Loops
                    </Link>
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    <li>Process is working but not scaling</li>
                    <li>Need automation not headcount</li>
                    <li>Ready to systematize success</li>
                  </ul>
                </motion.div>
              </StaggerItem>

              <StaggerItem>
                <motion.div
                  className="p-6 rounded-xl border border-border bg-card"
                  whileHover={{ borderColor: "var(--primary)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base font-bold text-foreground mb-4">Next Steps</h3>
                  <ol className="space-y-3">
                    {[
                      "Assessment call to understand your current state and goals",
                      "Recommendation on which program fits your situation",
                      "30-day pilot to validate approach before full commitment",
                    ].map((step, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-muted">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
              </StaggerItem>
            </StaggerReveal>

            <ScrollReveal delay={0.2}>
              <div className="text-sm text-muted">
                Or email us directly at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: contact form — slides in from right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}
