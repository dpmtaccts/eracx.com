import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end bg-[#111111] px-6 pb-32 pt-40 md:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <motion.h1
          className="font-black text-5xl leading-[0.9] text-[#F5F0E8] md:text-7xl lg:text-[7rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Relationship infrastructure for growth teams.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-3xl text-lg text-[#F5F0E8]/50 md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          The companies that win don't just sell better. They build the system that makes selling repeatable.
        </motion.p>

        <motion.div
          className="my-14 h-px w-full bg-[#F5F0E8]/10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ originX: 0 }}
        />

        <motion.a
          href="#the-system"
          className="text-sm text-[#F5F0E8]/50 underline underline-offset-4 transition-colors hover:text-[#F5F0E8]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          See the system
        </motion.a>
      </div>
    </section>
  );
}
