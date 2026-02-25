"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/content";

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-border bg-card"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Image src="/erafull.png" alt="Era" width={80} height={22} />
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Designs, installs, and operates revenue systems for B2B growth companies.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><Link href="/services/connection" className="text-sm text-muted hover:text-primary transition-colors">Connection Loops</Link></li>
              <li><Link href="/services/trust" className="text-sm text-muted hover:text-primary transition-colors">Trust Loops</Link></li>
              <li><Link href="/services/loyalty" className="text-sm text-muted hover:text-primary transition-colors">Loyalty Loops</Link></li>
              <li><Link href="/services" className="text-sm text-muted hover:text-primary transition-colors">All Services</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted hover:text-primary transition-colors">About Era</Link></li>
              <li><Link href="/contact" className="text-sm text-muted hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Get in Touch</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-4 text-sm text-muted">
              B2B SaaS &middot; Fintech &middot; Professional Services &middot; Transportation
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Era. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Revenue systems that compound.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
