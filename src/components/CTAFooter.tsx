import { useState } from "react";
import { motion } from "framer-motion";

export default function CTAFooter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="bg-[#111111]">
      <div className="px-6 py-[120px] md:px-10 md:py-[180px]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          {/* Left column: CTA copy */}
          <div>
            <motion.h2
              className="text-3xl font-black leading-[1.05] text-[#F5F0E8] md:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              The companies that win aren't outworking anyone.
            </motion.h2>

            <motion.p
              className="mt-8 text-lg leading-[1.7] text-[#F5F0E8]/50 md:text-2xl md:leading-[1.5]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              They're already in the room. Era builds the infrastructure that puts you there.
            </motion.p>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="mailto:hello@eracx.com"
                className="text-base text-[#F5F0E8] underline underline-offset-4 transition-colors hover:text-[#F5F0E8]/70"
              >
                Start a conversation
              </a>
              <span className="mx-4 text-[#F5F0E8]/15">|</span>
              <span className="text-base text-[#F5F0E8]/30">hello@eracx.com</span>
            </motion.div>
          </div>

          {/* Right column: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <p className="pt-8 text-lg text-[#F5F0E8]">
                Got it. We'll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="border-b border-[#F5F0E8]/30 bg-transparent pb-3 text-base text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 outline-none"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  required
                  className="border-b border-[#F5F0E8]/30 bg-transparent pb-3 text-base text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Work email"
                  required
                  className="border-b border-[#F5F0E8]/30 bg-transparent pb-3 text-base text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 outline-none"
                />
                <input
                  type="text"
                  name="message"
                  placeholder="What are you trying to solve?"
                  className="border-b border-[#F5F0E8]/30 bg-transparent pb-3 text-base text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 outline-none"
                />
                <button
                  type="submit"
                  className="mt-2 self-start rounded-[4px] bg-[#C4522A] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a8431f]"
                >
                  Send
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <div className="mx-6 h-px bg-[#F5F0E8]/8 md:mx-10" />

      <div className="px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <img
            src="/assets/era_final.png"
            alt="Era"
            className="h-5 w-auto"
            style={{ filter: "brightness(0) invert(1) sepia(1) saturate(0.1) brightness(0.93)" }}
          />
          <p className="text-sm text-[#F5F0E8]/30">
            hello@eracx.com
          </p>
        </div>
      </div>
    </footer>
  );
}
