import { motion } from "framer-motion";

const stats = [
  { value: "<5%", label: "of cold outreach gets a response.", source: "Belkins, 2024" },
  { value: "86%", label: "of B2B deals stall before they close.", source: "Forrester, 2024" },
  { value: "84%", label: "of decisions are made before the RFP goes out.", source: "Forrester, 2024" },
  { value: "97%", label: "of your market isn't buying right now.", source: "6Sense, 2024" },
];

export default function ProblemSection() {
  return (
    <section className="bg-[#F5F0E8] px-6 pt-[120px] pb-[60px] md:px-10 md:pt-[180px] md:pb-[80px]">
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

        <motion.div
          style={{
            maxWidth: 720,
            margin: "72px auto",
            padding: "48px 0",
            borderTop: "1px solid rgba(196, 82, 42, 0.2)",
            borderBottom: "1px solid rgba(196, 82, 42, 0.2)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 600,
              fontStyle: "italic",
              color: "rgba(17, 17, 17, 0.8)",
              lineHeight: 1.5,
            }}
          >
            Does your sales team run on SOPs and a prompt garden?
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(196, 82, 42, 0.7)",
              marginTop: 16,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"; }}
          >
            If not, let's talk.
          </a>
        </motion.div>

      </div>
    </section>
  );
}
