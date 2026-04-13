import { motion } from "framer-motion";

/* Mini LinkedIn Audit preview */
function LinkedInAuditPreview() {
  const dimensions = [
    { label: "Authority", score: 72, color: "#1FA7A2" },
    { label: "Consistency", score: 45, color: "#C8A96E" },
    { label: "Engagement", score: 83, color: "#1FA7A2" },
    { label: "Targeting", score: 38, color: "#B85C4A" },
    { label: "Conversion", score: 61, color: "#C8A96E" },
    { label: "Visibility", score: 55, color: "#C8A96E" },
    { label: "Network", score: 79, color: "#1FA7A2" },
  ];

  return (
    <div
      className="flex h-[220px] flex-col items-center justify-center gap-3 rounded-t-lg bg-[#F5F0E8] px-6 py-5"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {dimensions.map((dim) => (
          <div
            key={dim.label}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5"
            style={{ borderColor: `${dim.color}44` }}
          >
            <span
              className="text-[11px] font-bold"
              style={{ color: dim.color }}
            >
              {dim.score}
            </span>
            <span className="text-[10px] font-medium text-[#6B6560]">
              {dim.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-full bg-[#111111] px-4 py-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#F5F0E8]/60">
          Silent buyers detected:
        </span>
        <span className="text-sm font-black text-[#B85C4A]">47</span>
      </div>
    </div>
  );
}

/* Mini GTM Simulation preview */
function SimulationPreview() {
  const bars = [
    { label: "Seq A", value: 72, type: "win" },
    { label: "Seq B", value: 45, type: "loss" },
    { label: "Seq C", value: 88, type: "top" },
    { label: "Seq D", value: 61, type: "win" },
    { label: "Seq E", value: 33, type: "loss" },
    { label: "Seq F", value: 79, type: "win" },
    { label: "Seq G", value: 91, type: "top" },
  ];

  return (
    <div className="flex h-[220px] items-end justify-center gap-3 rounded-t-lg bg-[#F5F0E8] px-6 pb-6 pt-5">
      {bars.map((bar) => (
        <div key={bar.label} className="flex flex-col items-center gap-1">
          <div
            className="w-8 rounded-t-sm"
            style={{
              height: `${bar.value * 1.6}px`,
              backgroundColor:
                bar.type === "top"
                  ? "#B85C4A"
                  : bar.type === "win"
                  ? "#1FA7A2"
                  : "#D7DADD",
            }}
          />
          <span className="text-[9px] font-medium text-[#6B6560]">
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const products = [
  {
    tag: "LINKEDIN INTELLIGENCE",
    tagColor: "#1FA7A2",
    title: "Your LinkedIn is a revenue system. Is it running?",
    description:
      "7-dimension scoring across 182+ days of activity. Comment intelligence mapping. Silent buyer quantification. Three moves that change your numbers.",
    price: "$999, one-time",
    Preview: LinkedInAuditPreview,
  },
  {
    tag: "AI SIMULATION",
    tagColor: "#B85C4A",
    title: "We test what performs before a single email sends.",
    description:
      "Thousands of AI agents run your sequences, messaging, and timing against simulated buyer behavior. Performance data, not opinions. Using AI to perform, not to create vanity metrics.",
    price: "Included in every engagement",
    Preview: SimulationPreview,
  },
];

export default function ProductsSection() {
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
          GTM Intelligence
        </motion.p>

        <motion.h2
          className="max-w-5xl text-3xl font-semibold leading-[1.1] text-[#111111] md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Tools you can use before you buy anything.
        </motion.h2>

        <motion.p
          className="mt-6 max-w-3xl text-base leading-[1.7] text-[#3C3C3C] md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Intelligence products built on the same signal infrastructure we run
          for clients.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:gap-12">
          {products.map((product, i) => (
            <motion.div
              key={product.tag}
              className="overflow-hidden rounded-lg border border-[#111111]/10 bg-white"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Accent bar */}
              <div
                className="h-[3px]"
                style={{ backgroundColor: product.tagColor }}
              />

              {/* Preview area */}
              <product.Preview />

              {/* Content */}
              <div className="border-t border-[#111111]/10 px-8 py-8">
                <p
                  className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: product.tagColor }}
                >
                  {product.tag}
                </p>

                <h3 className="text-xl font-semibold leading-[1.2] text-[#111111] md:text-2xl">
                  {product.title}
                </h3>

                <p className="mt-4 text-sm leading-[1.7] text-[#3C3C3C]">
                  {product.description}
                </p>

                <p className="mt-5 text-sm font-bold text-[#111111]">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
