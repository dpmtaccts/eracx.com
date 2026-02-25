import { motion } from "framer-motion";
import LoopIdentityMotif from "./LoopIdentityMotif";

const loops = [
  {
    number: "01",
    name: "CONNECTION LOOP",
    color: "#C8A96E",
    motif: "connection" as const,
    description: "\"We need more pipeline but outbound isn't working.\" Era builds signal-based acquisition that finds accounts before they're looking — the Connection Loop.",
  },
  {
    number: "02",
    name: "TRUST LOOP",
    color: "#2BBFAA",
    motif: "trust" as const,
    description: "\"Our deals keep stalling and we can't figure out why.\" Era builds presence across the full buying committee so deals don't die in committee — the Trust Loop.",
  },
  {
    number: "03",
    name: "LOYALTY LOOP",
    color: "#D4367A",
    motif: "loyalty" as const,
    description: "\"We have happy customers but no expansion revenue.\" Era turns post-close relationships into referrals, renewals, and upsells — the Loyalty Loop.",
  },
];

export default function SystemOverviewSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-[120px] md:px-10 md:py-[180px]">
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#C4522A]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The System
        </motion.p>

        <motion.h2
          className="max-w-5xl text-3xl font-semibold leading-[1.1] text-[#111111] md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Three problems. Three systems built to fix them.
        </motion.h2>

        <motion.p
          className="mt-8 max-w-3xl text-base leading-[1.7] text-[#3C3C3C] md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every mid-market team hits one of three walls: not enough pipeline,
          deals that stall before the close, or customers who never expand. Era
          diagnoses which wall you're hitting, builds the system that breaks
          through it, and runs it — or builds all three, sequenced and integrated.
        </motion.p>

        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-3 md:gap-8">
          {loops.map((loop, i) => (
            <motion.div
              key={loop.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="mb-6 flex justify-center md:justify-start">
                <LoopIdentityMotif type={loop.motif} color={loop.color} />
              </div>
              <p
                className="text-8xl font-extralight leading-none md:text-9xl"
                style={{ color: loop.color, opacity: 0.25 }}
              >
                {loop.number}
              </p>
              <p
                className="mt-5 text-[11px] uppercase tracking-[0.2em]"
                style={{ color: loop.color }}
              >
                {loop.name}
              </p>
              <p className="mt-3 text-base leading-[1.7] text-[#111111]">
                {loop.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-20 text-center text-base text-[#3C3C3C] md:mt-24"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Each loop is designed independently and operates as part of one
          connected system.
        </motion.p>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a
            href="#loop-connection"
            className="inline-block rounded bg-[#C4522A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a8431f]"
          >
            See how each loop works &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
