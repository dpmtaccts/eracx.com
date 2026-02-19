import { motion } from "framer-motion";
import TimelineDiagram from "./TimelineDiagram";

const phases = [
  {
    phase: "Phase 1",
    title: "Design + Install",
    period: "Months 1–2",
    body: "The signal architecture is defined, trigger logic is built, sequences are written, and first outreach goes live by week 3. You see activity before month 2 ends.",
  },
  {
    phase: "Phase 2",
    title: "First Results",
    period: "Months 3–4",
    body: "Pipeline moves. Stalled deals re-engage. The signal library is fully active. This is the minimum window. Most clients know what they have by month 4.",
  },
  {
    phase: "Phase 3",
    title: "Infrastructure Compounds",
    period: "Months 5–12+",
    body: "The relationship database deepens. Referral loops activate. Warm pipeline grows without added spend. The return in month 10 is structurally different from month 3. Compounding, not linear.",
  },
];

export default function TimelineSection() {
  return (
    <section className="bg-[#111111] px-6 py-[120px] md:px-10 md:py-[180px]">
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#C4522A]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Timeline
        </motion.p>

        <motion.h2
          className="text-3xl font-semibold leading-[1.1] text-[#F5F0E8] md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          What to Expect
        </motion.h2>

        {/* Timeline diagram */}
        <div className="mt-20 md:mt-28">
          <TimelineDiagram />
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              className="border-t border-[#F5F0E8]/10 pt-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C4522A]">
                {p.phase}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-[#F5F0E8]">
                {p.title}
              </h3>

              <p className="mt-1 text-sm text-[#F5F0E8]/40">
                {p.period}
              </p>

              <p className="mt-6 text-base leading-[1.7] text-[#F5F0E8]/60">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
