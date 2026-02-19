import { motion } from "framer-motion";
import LoopIdentityMotif from "./LoopIdentityMotif";

const loops = [
  {
    number: "01",
    name: "CONNECTION LOOP",
    color: "#C8A96E",
    motif: "connection" as const,
    description: "From unknown to pipeline. Signal-based acquisition for the 97% window.",
  },
  {
    number: "02",
    name: "TRUST LOOP",
    color: "#2BBFAA",
    motif: "trust" as const,
    description: "From pipeline to decision. Presence across the full buying committee.",
  },
  {
    number: "03",
    name: "LOYALTY LOOP",
    color: "#D4367A",
    motif: "loyalty" as const,
    description: "From customer to growth engine. Expansion, referral, and renewal infrastructure.",
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
          Three loops. Designed for where your business needs it most.
        </motion.h2>

        <motion.p
          className="mt-8 max-w-3xl text-base leading-[1.7] text-[#3C3C3C] md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Not every company has the same gap. Some need to build a pipeline from
          scratch. Some are stuck in the middle of long buying cycles with no way
          to stay present. Some have strong customer relationships they've never
          converted into expansion revenue. Era diagnoses where the relationship
          breaks down and builds the loop that fixes it, or all three, sequenced
          and integrated.
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
