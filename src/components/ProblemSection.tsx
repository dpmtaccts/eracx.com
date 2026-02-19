import { motion } from "framer-motion";

const stats = [
  { value: "<5%", label: "of cold outreach gets a response.", source: "Belkins, 2024" },
  { value: "86%", label: "of B2B deals stall before they close.", source: "Forrester, 2024" },
  { value: "84%", label: "of decisions are made before the RFP goes out.", source: "Forrester, 2024" },
  { value: "97%", label: "of your market isn't buying right now.", source: "6Sense, 2024" },
];

export default function ProblemSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 py-[120px] md:px-10 md:py-[180px]">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#C4522A]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why This Doesn't Get Fixed
        </motion.p>

        <motion.h2
          className="max-w-4xl text-3xl font-semibold leading-[1.1] text-[#111111] md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          The gap isn't a strategy problem. It's a systems problem.
        </motion.h2>

        <motion.p
          className="mt-8 max-w-3xl text-base leading-[1.7] text-[#3C3C3C] md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your business isn't growing because your team isn't working hard enough.
          They're working inside a structure built for short cycles and quick
          closes, not the 97% of your market that isn't ready to buy today. When
          that 97% eventually moves, you're not in the room. And when they do, you
          need to already be there.
        </motion.p>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 md:mt-28 md:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              className="border-t border-[#111111]/10 pt-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="text-6xl font-black text-[#111111] md:text-8xl">
                {stat.value}
              </p>
              <p className="mt-4 text-base font-medium leading-snug text-[#111111] md:text-lg">
                {stat.label}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-[#6B6560]">
                {stat.source}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-24 max-w-3xl text-base leading-[1.7] text-[#3C3C3C] md:mt-28 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Most teams know this. The ones that fix it don't hire harder, they
          build differently. They create systems that maintain presence, track
          signals, and move automatically when a buyer gets close. That's what
          Era builds.
        </motion.p>
      </div>
    </section>
  );
}
