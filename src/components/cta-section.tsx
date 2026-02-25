"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlowBackground from "./glow-background";

interface CTASectionProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  heading = "Build your relationship infrastructure",
  description = "Start with a 30-day pilot. Assessment call, program recommendation, and validated results before full commitment.",
  buttonText = "Get Started",
  buttonHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <GlowBackground />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {heading}
        </motion.h2>
        <motion.p
          className="mt-4 text-muted leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href={buttonHref}
            className="mt-8 inline-block px-8 py-3 rounded-full bg-primary text-background font-semibold hover:opacity-90 transition-opacity"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
