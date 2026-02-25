"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // TODO: Replace with your Formspree form ID from https://formspree.io
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="p-8 rounded-2xl border border-border bg-card text-center">
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="text-xl font-bold text-foreground">Message Sent</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-border bg-card space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="Your company"
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-1.5">
          I&apos;m interested in
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          <option value="general">General inquiry</option>
          <option value="connection">Connection Loops</option>
          <option value="trust">Trust Loops</option>
          <option value="loyalty">Loyalty Loops</option>
          <option value="all">All three programs</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
          placeholder="Tell us about your current growth challenges..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again or email us directly at justin@eracx.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-3 rounded-full bg-primary text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
