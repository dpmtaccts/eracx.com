import { motion } from "framer-motion";

const qualifiers = [
  "$15M–$100M revenue",
  "50–500 employees",
  "Outgrown founder-led sales",
  "No dedicated RevOps team",
];

export default function QualifierBlock() {
  return (
    <section className="bg-[#111111] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[#C4522A]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Who This Is For
        </motion.p>

        <div className="flex flex-wrap gap-3">
          {qualifiers.map((q, i) => (
            <motion.span
              key={q}
              className="border border-[#F5F0E8]/15 px-5 py-2.5 text-sm text-[#F5F0E8]/60"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {q}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
