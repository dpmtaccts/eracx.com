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
    <section className="bg-[#111111]">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 pt-[120px] md:px-10 md:pt-[180px]">
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

      {/* Signal pills */}
      <div className="mt-16 md:mt-12">
        <SignalDotField />
      </div>

      {/* Connector: vertical line + label */}
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: 60 }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            backgroundColor: "rgba(245,240,232,0.15)",
          }}
        />
        <p
          className="mt-4 uppercase"
          style={{
            fontSize: 9,
            letterSpacing: "0.12em",
            color: "#C4522A",
          }}
        >
          Signals in Action
        </p>
      </div>

      {/* Example blocks */}
      <div className="mx-auto max-w-7xl px-6 pb-[120px] pt-16 md:px-10 md:pb-[180px] md:pt-20">
        <motion.h3
          className="mb-16 text-2xl font-bold leading-[1.2] text-[#F5F0E8] md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Here are some loops running right now.
        </motion.h3>

        <div className="grid gap-8 sm:grid-cols-2">
          {triggers.map((t, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
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
