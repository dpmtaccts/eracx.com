import { motion } from "framer-motion";
import SignalDotField from "./SignalDotField";

const triggers = [
  {
    loopTag: "CONNECTION LOOP",
    loopColor: "#C8A96E",
    label: "60 days, no contact.",
    detail: "CRM flags it. Check-in sequence fires. Response updates the record. Next play routes automatically.",
  },
  {
    loopTag: "TRUST LOOP",
    loopColor: "#2BBFAA",
    label: "Deal stalls for 30 days.",
    detail: "Re-engagement activates. New context added to the account. The loop continues.",
  },
  {
    loopTag: "CONNECTION LOOP",
    loopColor: "#C8A96E",
    label: "Contact changes jobs.",
    detail: "Clay detects it within 24 hours. Congrats sequence fires. Relationship preserved.",
  },
  {
    loopTag: "LOYALTY LOOP",
    loopColor: "#D4367A",
    label: "Customer hits 90 days post-close.",
    detail: "Expansion conversation initiates. That conversation informs the renewal.",
  },
];

export default function MechanismSection() {
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
          How It Works
        </motion.p>

        <motion.h2
          className="max-w-4xl text-3xl font-semibold leading-[1.1] text-[#F5F0E8] md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Every signal becomes a move. Every move feeds the loop.
        </motion.h2>
      </div>

      {/* Full-width signal dot field */}
      <div className="mt-16 md:mt-12 md:pb-[48px]">
        <SignalDotField />
      </div>

      {/* Separator */}
      <div className="mx-auto max-w-7xl">
        <div className="pt-20" />
        <div className="h-px w-full bg-[#F5F0E8]/12" />
        <div className="pt-[60px]" />

        {/* Live examples header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#C4522A]">
            Live Examples
          </p>
          <h3 className="text-2xl font-bold leading-[1.2] text-[#F5F0E8]">
            Here are some loops running right now.
          </h3>
        </motion.div>

        {/* Four example blocks */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:mt-20">
          {triggers.map((t, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Left border + dot */}
              <div className="flex flex-col items-center pt-[22px]">
                <div
                  className="h-8 w-px"
                  style={{ backgroundColor: t.loopColor }}
                />
              </div>

              <div className="flex-1">
                <p
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: t.loopColor }}
                >
                  {t.loopTag}
                </p>
                <div className="mt-2 flex items-center gap-2.5">
                  <span
                    className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: t.loopColor }}
                  />
                  <p className="text-[16px] font-semibold text-[#F5F0E8]">
                    {t.label}
                  </p>
                </div>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#F5F0E8]/65">
                  {t.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
