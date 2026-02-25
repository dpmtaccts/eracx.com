"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import FAQSection from "./faq-section";
import CTASection from "./cta-section";
import ScrollReveal, { StaggerReveal, StaggerItem, ScrollLine } from "./scroll-reveal";

interface ServiceDetailProps {
  name: string;
  tagline: string;
  description: string;
  price: string;
  included: string[];
  keyPlays: string[];
  tech: string[];
  idealFor: string;
  expectedResults: string;
  feedsInto: string;
  feedsIntoPath: string;
  color: "glow-cyan" | "glow-purple" | "glow-rose";
  faqs: { question: string; answer: string }[];
  extraSection?: React.ReactNode;
}

const accentMap = {
  "glow-cyan": "text-glow-cyan",
  "glow-purple": "text-glow-purple",
  "glow-rose": "text-glow-rose",
};

const borderMap = {
  "glow-cyan": "border-glow-cyan/30",
  "glow-purple": "border-glow-purple/30",
  "glow-rose": "border-glow-rose/30",
};

const bgMap = {
  "glow-cyan": "from-glow-cyan/10",
  "glow-purple": "from-glow-purple/10",
  "glow-rose": "from-glow-rose/10",
};

const hoverColorMap = {
  "glow-cyan": "var(--glow-cyan)",
  "glow-purple": "var(--glow-purple)",
  "glow-rose": "var(--glow-rose)",
};

export default function ServiceDetailPage({
  name,
  tagline,
  description,
  price,
  included,
  keyPlays,
  tech,
  idealFor,
  expectedResults,
  feedsInto,
  feedsIntoPath,
  color,
  faqs,
  extraSection,
}: ServiceDetailProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const smoothHeroY = useSpring(heroY, { stiffness: 50, damping: 20 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 60, damping: 20 });

  return (
    <>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated accent line */}
        <motion.div
          className="absolute left-0 top-0 w-1 h-full origin-top"
          style={{ backgroundColor: hoverColorMap[color], opacity: 0.15 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
        />

        <motion.div
          className="relative mx-auto max-w-4xl px-6"
          style={{ y: smoothHeroY, opacity: smoothHeroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/services" className="text-sm text-muted hover:text-primary transition-colors">
              &larr; All Programs
            </Link>
          </motion.div>
          <motion.p
            className={`mt-6 text-xs font-semibold uppercase tracking-[0.3em] ${accentMap[color]}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {name}
          </motion.p>
          <motion.h1
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          >
            {tagline}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {description}
          </motion.p>
          <motion.div
            className="mt-8 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <span className="text-2xl font-extrabold text-foreground">{price}</span>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-primary text-background font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <ScrollLine className="mx-auto max-w-4xl" />

      {/* What's Included — staggered cards */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-extrabold text-foreground mb-8 tracking-tight">What&apos;s Included</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {included.map((item, i) => (
              <motion.div
                key={i}
                className={`p-5 rounded-xl border ${borderMap[color]} bg-gradient-to-r ${bgMap[color]} to-transparent`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0, 1] }}
                whileHover={{ x: 4 }}
              >
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ScrollLine className="mx-auto max-w-4xl" />

      {/* Key Plays + Tech */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-6 tracking-tight">Key Plays</h2>
              <ul className="space-y-3">
                {keyPlays.map((play, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: hoverColorMap[color] }}
                    />
                    <span className="text-sm text-muted leading-relaxed">{play}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-6 tracking-tight">Technology Stack</h2>
              <motion.div
                className="flex flex-wrap gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              >
                {tech.map((tool) => (
                  <motion.span
                    key={tool}
                    className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground"
                    variants={{
                      hidden: { opacity: 0, scale: 0.85 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                    }}
                    whileHover={{ scale: 1.05, borderColor: hoverColorMap[color] }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </motion.div>
              <p className="mt-6 text-xs text-muted">
                All tools included and managed by Era. No separate licensing costs.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Extra section (committee data, retention math, etc.) */}
      {extraSection}

      <ScrollLine className="mx-auto max-w-4xl" />

      {/* Ideal For + Expected Results */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="left" delay={0}>
            <motion.div
              className="p-6 rounded-xl border border-border bg-card h-full"
              whileHover={{ borderColor: hoverColorMap[color] }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-foreground mb-3">Ideal For</h3>
              <p className="text-sm text-muted leading-relaxed">{idealFor}</p>
            </motion.div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <motion.div
              className="p-6 rounded-xl border border-border bg-card h-full"
              whileHover={{ borderColor: hoverColorMap[color] }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-foreground mb-3">Expected Results</h3>
              <p className="text-sm text-muted leading-relaxed">{expectedResults}</p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feeds Into */}
      <ScrollReveal className="py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            className="text-sm text-muted"
            whileHover={{ scale: 1.02 }}
          >
            Feeds into{" "}
            <Link href={feedsIntoPath} className={`font-semibold ${accentMap[color]} hover:underline`}>
              {feedsInto} &rarr;
            </Link>
          </motion.p>
        </div>
      </ScrollReveal>

      <FAQSection faqs={faqs} />
      <CTASection
        heading={`Start with ${name}`}
        description="Assessment call, program recommendation, and a 30-day pilot to validate results."
      />
    </>
  );
}
