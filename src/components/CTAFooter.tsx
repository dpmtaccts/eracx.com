import { useState } from "react";
import { motion } from "framer-motion";
import { usePostHog } from "@posthog/react";

export default function CTAFooter() {
  const posthog = usePostHog();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        posthog?.identify(data.email, { email: data.email, name: data.name, company: data.company });
        posthog?.capture("contact_form_submitted", {
          name: data.name,
          company: data.company,
          email: data.email,
          has_message: !!data.message,
        });
      } else {
        setStatus("error");
        posthog?.capture("contact_form_submission_failed", { status_code: res.status });
      }
    } catch (err) {
      setStatus("error");
      posthog?.captureException(err instanceof Error ? err : new Error(String(err)));
      posthog?.capture("contact_form_submission_failed", { error: String(err) });
    }
  }

  return (
    <footer id="contact" className="bg-white">
      <div className="px-6 py-[120px] md:px-10 md:py-[180px]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          {/* Left column: CTA copy */}
          <div>
            <motion.h2
              className="text-3xl font-black leading-[1.05] text-[#1A1A1A] md:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              The pipeline doesn't build itself.
            </motion.h2>

            <motion.p
              className="mt-8 text-lg leading-[1.7] text-[#1A1A1A]/50 md:text-2xl md:leading-[1.5]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Era builds the system that does.
            </motion.p>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="#contact"
                className="text-base text-[#1A1A1A] underline underline-offset-4 transition-colors hover:text-[#1A1A1A]/70"
              >
                Start a conversation
              </a>
              <span className="mx-4 text-[#1A1A1A]/15">|</span>
              <span className="text-base text-[#1A1A1A]/30">hello@eracx.com</span>
            </motion.div>
          </div>

          {/* Right column: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {status === "success" ? (
              <p className="pt-8 text-lg text-[#1A1A1A]">
                Got it. We'll be in touch.
              </p>
            ) : status === "error" ? (
              <div className="pt-8">
                <p className="text-lg text-[#1A1A1A]">
                  Something went wrong. Email us at{" "}
                  <a href="mailto:hello@eracx.com" className="underline underline-offset-4">
                    hello@eracx.com
                  </a>
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-[#1A1A1A]/50 underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="border-b border-[#1A1A1A]/30 bg-transparent pb-3 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 outline-none"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  required
                  className="border-b border-[#1A1A1A]/30 bg-transparent pb-3 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Work email"
                  required
                  className="border-b border-[#1A1A1A]/30 bg-transparent pb-3 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 outline-none"
                />
                <input
                  type="text"
                  name="message"
                  placeholder="What are you trying to solve?"
                  className="border-b border-[#1A1A1A]/30 bg-transparent pb-3 text-base text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 self-start rounded-[4px] bg-[#C4522A] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a8431f] disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <div className="px-6 pb-4 text-center md:px-10">
        <a
          href="/our-story"
          className="text-[13px] text-[#1A1A1A]/40 transition-colors hover:text-[#1A1A1A]/60"
        >
          Learn why we built this
        </a>
      </div>

      <div className="mx-6 h-px bg-[#1A1A1A]/8 md:mx-10" />

      {/* Footer nav row */}
      <div className="px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-y-4">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              { label: "WHY ERA", href: "#why-era" },
              { label: "THE SYSTEM", href: "#the-system" },
              { label: "GTM DESIGN", href: "/gtm-design" },
              { label: "HOW IT WORKS", href: "#how-it-works" },
              { label: "GTM TOOLS", href: "#gtm-tools" },
              { label: "OUR STORY", href: "/our-story" },
              { label: "CONTACT", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.12em] text-[#1A1A1A]/30 transition-colors hover:text-[#1A1A1A]/60"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="mailto:hello@eracx.com"
            className="text-[11px] font-medium tracking-[0.08em] text-[#1A1A1A]/30 transition-colors hover:text-[#1A1A1A]/60"
          >
            hello@eracx.com
          </a>
        </div>
      </div>

      {/* Oversized cropped Era logo — top ~35% visible, rest clipped */}
      <div
        aria-hidden
        style={{
          overflow: "hidden",
          height: "clamp(120px, 14vw, 220px)",
          marginTop: "clamp(60px, 8vw, 120px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pointerEvents: "none",
        }}
      >
        <img
          src="/assets/era_final_nosymbol.png"
          alt=""
          style={{
            width: "clamp(700px, 75vw, 1200px)",
            height: "auto",
            flexShrink: 0,
            filter: "brightness(0) opacity(0.08)",
            opacity: 1,
          }}
        />
      </div>
    </footer>
  );
}
