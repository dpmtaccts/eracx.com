import { useEffect, useRef } from "react";
import TopNav from "../components/TopNav";

// Screenshot mappings from /data/landing/
const SCREENSHOTS = {
  hero: "/data/landing/bento.png",
  funnel: "/data/landing/audience.png",
  silent: "/data/landing/silentwatcher.png",
  signals: "/data/landing/contentsignals.png",
  voice1: "/data/landing/voicebuilder.png",
  voice2: "/data/landing/voicebuilder2.png",
};

function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("li-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useScrollFadeIn();
  return (
    <div
      ref={ref}
      className={`li-fade ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        {/* Left text */}
        <div>
          <FadeSection delay={0.2}>
            <p
              className="mb-5 text-xs font-semibold uppercase"
              style={{
                color: "#B8512D",
                letterSpacing: "0.14em",
              }}
            >
              ERACX LinkedIn Intelligence
            </p>
          </FadeSection>

          <FadeSection delay={0.4}>
            <h1
              className="mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(42px, 6vw, 64px)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.06,
                color: "#1D1D1B",
              }}
            >
              Your LinkedIn is a revenue system. Is it running?
            </h1>
          </FadeSection>

          <FadeSection delay={0.6}>
            <p
              className="mb-8"
              style={{
                fontSize: 17,
                fontWeight: 400,
                color: "#777",
                lineHeight: 1.75,
                maxWidth: 480,
              }}
            >
              Built on two decades of LinkedIn strategy for enterprise brands,
              sourced from over 50 independent studies covering 8 million posts,
              and updated for the algorithmic reality of AI-penalized content.
              We score your presence across 7 dimensions, map your comment
              intelligence, quantify your silent buyers, and deliver the three
              moves that will change your numbers.
            </p>
          </FadeSection>

          <FadeSection delay={0.8}>
            <div className="flex items-center gap-4">
              <a
                href="#pricing"
                style={{
                  background: "#B8512D",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "14px 28px",
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                Get your audit &rarr;
              </a>
              <span style={{ fontSize: 14, color: "#aaa" }}>
                $999 one-time
              </span>
            </div>
          </FadeSection>
        </div>

        {/* Right visual - mini audit card */}
        <FadeSection delay={0.5} className="relative">
          <div
            style={{
              background: "#F7F5F2",
              padding: 32,
              boxShadow: "0 24px 64px rgba(0,0,0,0.06)",
            }}
          >
            <p
              className="mb-3 text-xs font-semibold uppercase"
              style={{ color: "#B8512D", letterSpacing: "0.14em" }}
            >
              ERACX LinkedIn Audit
            </p>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1D1D1B",
                letterSpacing: "-0.02em",
                marginBottom: 4,
              }}
            >
              182 Days of LinkedIn Activity
            </h3>
            <p style={{ fontSize: 13, color: "#999", marginBottom: 20 }}>
              19 posts &middot; 144 comments &middot; 66 unique voices
            </p>

            {/* Stats row */}
            <div className="mb-5 grid grid-cols-4 gap-3">
              {[
                ["19", "POSTS"],
                ["144", "COMMENTS"],
                ["26", "WEEKS"],
                ["66", "VOICES"],
              ].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#1D1D1B",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#aaa",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Grade blocks */}
            <div className="grid grid-cols-7 gap-2">
              {[
                ["C", "AUTH", false],
                ["D", "TRUST", true],
                ["D", "DIST", true],
                ["C", "REL", false],
                ["D", "MIX", true],
                ["B", "BIZ", "green"],
                ["C", "DARK", false],
              ].map(([grade, label, isDorGreen]) => (
                <div
                  key={label as string}
                  className="text-center"
                  style={{
                    background: "#fff",
                    padding: "8px 0",
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color:
                        isDorGreen === "green"
                          ? "#2A6B5A"
                          : isDorGreen
                            ? "#B8512D"
                            : "#1D1D1B",
                    }}
                  >
                    {grade as string}
                  </div>
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 600,
                      color: "#aaa",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {label as string}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating silent buyers card */}
          <div
            style={{
              position: "absolute",
              bottom: -24,
              right: -24,
              background: "#fff",
              padding: "16px 20px",
              boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
              minWidth: 160,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#aaa",
                letterSpacing: "0.1em",
                marginBottom: 6,
                textTransform: "uppercase",
              }}
            >
              Silent Buyers
            </div>
            <div style={{ fontSize: 14, color: "#1D1D1B", fontWeight: 600 }}>
              42 visible
            </div>
            <div style={{ fontSize: 14, color: "#B8512D", fontWeight: 600 }}>
              ~1,740 silent
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── Evidence Section ──────────────────────────────────────────
function QuoteCard({
  text,
  name,
  title,
  initials,
  result,
}: {
  text: string;
  name: string;
  title: string;
  initials: string;
  result: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#F0F0EE",
          lineHeight: 0.6,
          marginBottom: 16,
        }}
      >
        &ldquo;
      </div>
      <p
        style={{
          fontSize: 15,
          fontWeight: 400,
          color: "#555",
          lineHeight: 1.75,
          marginBottom: 20,
        }}
      >
        {text}
      </p>
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 44,
            height: 44,
            background: "#F7F5F2",
            color: "#B8512D",
            fontWeight: 700,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1B" }}>
            {name}
          </div>
          <div style={{ fontSize: 12, color: "#999", fontWeight: 400 }}>
            {title}
          </div>
        </div>
      </div>
      <div
        className="mt-3 inline-block"
        style={{
          padding: "5px 12px",
          fontSize: 11,
          fontWeight: 600,
          color: "#B8512D",
          background: "rgba(184,81,45,0.05)",
          letterSpacing: "0.04em",
        }}
      >
        {result}
      </div>
    </div>
  );
}

function EvidenceSection() {
  const blocks = [
    {
      eyebrow: "20+ YEARS OF LINKEDIN STRATEGY",
      number: "272",
      label: "days in the average B2B buyer journey",
      body: "Most LinkedIn strategies are built for a platform that no longer exists. The buyer journey is longer, the algorithm is more opaque, and the signals that drive distribution have fundamentally changed. This audit is built by operators who have been building LinkedIn programs for enterprise brands since before the algorithm had a feed.",
      quote: {
        text: "I have been posting on LinkedIn for two years. This audit showed me that six of my posts had substantive comments I never replied to, including one from a decision-maker at a company I have been trying to get in front of for months.",
        name: "Lara Vandenberg",
        title: "Founder, Assemble",
        initials: "LV",
        result: "Brand Health: 53 \u2192 71 in 90 days",
      },
    },
    {
      eyebrow: "50+ INDEPENDENT STUDIES \u00B7 8M+ POSTS ANALYZED",
      number: "15x",
      label: "algorithmic weight of a threaded reply vs. a reaction",
      body: "The scoring framework behind this audit is not built on opinions or best practices. It is sourced from over 50 independent studies of LinkedIn algorithm performance, including van der Blom's analysis of 1.8 million posts, Dreamdata's study of 66 million B2B sessions, and research from Buffer, Socialinsider, AuthoredUp, Metricool, and Trust Insights. Every dimension, every benchmark, every threshold is grounded in published data.",
      quote: {
        text: "I did not know that threaded comments carried 15x the algorithmic weight of a reaction. My team was spending 30 minutes a day liking posts when they should have been writing 3 substantive comments.",
        name: "Michael Reeder",
        title: "Executive Creative Director, ADT",
        initials: "MR",
        result: "Distribution: 38 \u2192 62 in 60 days",
      },
    },
    {
      eyebrow: "THE AI PENALTY IS REAL",
      number: "30%",
      label: "reach reduction when LinkedIn detects AI-generated content",
      body: "LinkedIn's algorithm now actively penalizes content it identifies as AI-generated, with a 30% reduction in reach and a 55% drop in engagement. Most ghostwriting services and AI content tools produce posts that trigger these penalties without the client ever knowing. The audit identifies whether your content is being suppressed, and the engine produces drafts that are structurally designed to avoid detection.",
      quote: {
        text: "We were posting three times a week and getting nowhere. The audit revealed that 80% of our content was top-of-funnel. We had no middle. No reason for anyone to trust us enough to reach out.",
        name: "Eddie Ibarra",
        title: "Founder, Cawa & Blue Hour Media",
        initials: "EI",
        result: "4 qualified inbound leads in first quarter",
      },
    },
  ];

  return (
    <section
      style={{
        background: "#FAFAF8",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
      className="px-6 py-20 md:px-10 md:py-[100px]"
    >
      <div className="mx-auto max-w-5xl">
        {blocks.map((block, i) => (
          <FadeSection key={block.number} delay={i * 0.1}>
            <div
              className="grid grid-cols-1 gap-12 md:grid-cols-[55fr_45fr] md:gap-16"
              style={{
                padding: "56px 0",
                borderTop: i > 0 ? "1px solid #F0F0EE" : "none",
              }}
            >
              {/* Left: research insight */}
              <div>
                <p
                  className="mb-4"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#B8512D",
                  }}
                >
                  {block.eyebrow}
                </p>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 64,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "#1D1D1B",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {block.number}
                </div>
                <div
                  className="mb-5"
                  style={{ fontSize: 16, fontWeight: 400, color: "#777" }}
                >
                  {block.label}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#999",
                    lineHeight: 1.7,
                    maxWidth: 420,
                  }}
                >
                  {block.body}
                </p>
              </div>

              {/* Right: client quote */}
              <div className="flex items-start">
                <QuoteCard {...block.quote} />
              </div>
            </div>
          </FadeSection>
        ))}

        {/* Source attribution */}
        <FadeSection delay={0.3}>
          <p
            className="mx-auto pt-10 text-center"
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: "#aaa",
              maxWidth: 800,
              lineHeight: 1.7,
              borderTop: "1px solid #F0F0EE",
            }}
          >
            Research sources: van der Blom (1.8M posts), Socialinsider (1.3M
            posts), AuthoredUp (621K posts), Metricool (577K posts), Dreamdata
            (66M sessions), Buffer (2M+ posts), Trust Insights Q1 2026, and 40+
            additional studies on content performance, engagement signals, and
            algorithm mechanics.
          </p>
        </FadeSection>
      </div>
    </section>
  );
}

// ── Seven Dimensions ──────────────────────────────────────────
function SevenDimensions() {
  const dims = [
    ["01", "Authority", "Does LinkedIn recognize your expertise?"],
    ["02", "Trust", "Do the right people find you credible?"],
    ["03", "Distribution", "Is the algorithm working for you?"],
    ["04", "Relationship", "Are you deepening the right network?"],
    ["05", "Funnel Mix", "Does your content move people to action?"],
    ["06", "Business Impact", "Can you trace revenue to LinkedIn?"],
  ];

  return (
    <section
      className="px-6 py-20 md:px-10 md:py-28"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-5xl">
        <FadeSection>
          <p
            className="mb-4 text-xs font-semibold uppercase"
            style={{ color: "#B8512D", letterSpacing: "0.14em" }}
          >
            The Framework
          </p>
        </FadeSection>
        <FadeSection delay={0.1}>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(32px, 4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#1D1D1B",
            }}
          >
            Seven dimensions scored against 1.8 million posts.
          </h2>
        </FadeSection>
        <FadeSection delay={0.15}>
          <p
            className="mb-12"
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "#888",
              maxWidth: 560,
            }}
          >
            Every dimension is grounded in published research and calibrated
            against real client programs. The benchmarks reflect what actually
            drives distribution, not what worked two years ago.
          </p>
        </FadeSection>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: "1px solid #F0F0EE",
          }}
          className="li-dim-grid"
        >
          {dims.map(([num, name, question], i) => (
            <FadeSection key={num} delay={i * 0.05}>
              <div
                className="li-dim-cell"
                style={{
                  padding: 36,
                  borderRight:
                    (i + 1) % 3 !== 0 ? "1px solid #F0F0EE" : "none",
                  borderBottom: i < 3 ? "1px solid #F0F0EE" : "none",
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#FAFAF8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div
                  className="li-ghost-num"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 56,
                    fontWeight: 700,
                    color: "#F0F0EE",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 8,
                    transition: "color 0.2s",
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#1D1D1B",
                    marginBottom: 4,
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: 13, fontWeight: 400, color: "#999" }}>
                  {question}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Dark Social - spans full width */}
        <FadeSection delay={0.35}>
          <div
            className="li-dim-cell"
            style={{
              padding: 36,
              border: "1px solid #F0F0EE",
              borderTop: "none",
              display: "flex",
              gap: 24,
              alignItems: "flex-start",
              transition: "background 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#FAFAF8")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              className="li-ghost-num"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 72,
                fontWeight: 700,
                color: "#F0F0EE",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                flexShrink: 0,
                transition: "color 0.2s",
              }}
            >
              07
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#1D1D1B",
                  marginBottom: 4,
                }}
              >
                Dark Social
              </div>
              <div style={{ fontSize: 13, fontWeight: 400, color: "#999" }}>
                Is your content built for invisible sharing? Screenshots,
                forwards, buying committee conversations you will never see.
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Responsive override for mobile */}
        <style>{`
          @media (max-width: 767px) {
            .li-dim-grid {
              grid-template-columns: 1fr !important;
            }
            .li-dim-grid > div > div {
              border-right: none !important;
              border-bottom: 1px solid #F0F0EE !important;
            }
          }
          .li-dim-cell:hover .li-ghost-num {
            color: #E0DDD8 !important;
          }
        `}</style>
      </div>
    </section>
  );
}

// ── Report Preview + Quotes ───────────────────────────────────
function ReportPreview() {
  const screenshots = [
    { src: SCREENSHOTS.hero, caption: "Brand health score" },
    { src: SCREENSHOTS.funnel, caption: "Funnel analysis" },
    { src: SCREENSHOTS.silent, caption: "Silent buyer analysis" },
    { src: SCREENSHOTS.signals, caption: "Signal hierarchy" },
  ];

  const voiceScreenshots = [
    { src: SCREENSHOTS.voice1, caption: "Voice discovery" },
    { src: SCREENSHOTS.voice2, caption: "Voice calibration" },
  ];

  return (
    <section
      style={{
        background: "#FAFAF8",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
      className="px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <FadeSection>
          <p
            className="mb-4 text-xs font-semibold uppercase"
            style={{ color: "#B8512D", letterSpacing: "0.14em" }}
          >
            The Report
          </p>
        </FadeSection>
        <FadeSection delay={0.1}>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(32px, 4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#1D1D1B",
            }}
          >
            What the audit delivers.
          </h2>
        </FadeSection>
        <FadeSection delay={0.15}>
          <p
            className="mb-12"
            style={{
              fontSize: 16,
              color: "#888",
              maxWidth: 600,
            }}
          >
            A password-protected interactive report built from your data and
            from the practitioner experience of operators who have built
            LinkedIn programs for enterprise brands.
          </p>
        </FadeSection>

        {/* Screenshot cards - 4 col */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {screenshots.map((s, i) => (
            <FadeSection key={s.caption} delay={i * 0.08}>
              <div
                className="li-screenshot-card"
                style={{
                  background: "#fff",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 40px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: "#F7F5F2",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={s.src}
                    alt={s.caption}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#666",
                  }}
                >
                  {s.caption}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Voice discovery screenshots */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-2">
          {voiceScreenshots.map((s, i) => (
            <FadeSection key={s.caption} delay={i * 0.08}>
              <div
                style={{
                  background: "#fff",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 40px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: "#F7F5F2",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={s.src}
                    alt={s.caption}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#666",
                  }}
                >
                  {s.caption}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── The Engine ─────────────────────────────────────────────────
function EngineSection() {
  const steps = [
    [
      "1",
      "Voice discovery.",
      "15 binary choices that map your writing instincts into a structured voice profile.",
    ],
    [
      "2",
      "Content calendar.",
      "8 posts per month, mapped to funnel targets, drafted in your voice.",
    ],
    [
      "3",
      "Engagement system.",
      "Reply drafts, ICP flagging, proactive outreach to profiles that matter.",
    ],
    [
      "4",
      "Performance tracking.",
      "Your audit scores become the baseline. Watch them move.",
    ],
  ];

  const tiers = [
    {
      name: "Publish",
      desc: "8 voice-matched posts, funnel management, monthly snapshot",
      price: "$1,800",
      popular: false,
    },
    {
      name: "Publish + Engage",
      desc: "Everything in Publish plus comment monitoring and proactive engagement",
      price: "$2,500",
      popular: true,
    },
    {
      name: "Full Engine",
      desc: "Content-as-halo distribution, CRM bridge, quarterly re-audit",
      price: "$3,500",
      popular: false,
    },
  ];

  return (
    <section
      className="px-6 py-20 md:px-10 md:py-28"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      <div className="mx-auto grid max-w-[1200px] items-start gap-16 md:grid-cols-2 md:gap-[72px]">
        {/* Left */}
        <div>
          <FadeSection>
            <p
              className="mb-4 text-xs font-semibold uppercase"
              style={{ color: "#B8512D", letterSpacing: "0.14em" }}
            >
              The Engine
            </p>
          </FadeSection>
          <FadeSection delay={0.1}>
            <h2
              className="mb-4"
              style={{
                fontSize: "clamp(32px, 4vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#1D1D1B",
              }}
            >
              The audit is the diagnosis. The engine is the treatment.
            </h2>
          </FadeSection>
          <FadeSection delay={0.15}>
            <p
              className="mb-10"
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: "#888",
                maxWidth: 460,
              }}
            >
              Keep the insights and run with them. Or plug into the content
              engine and let us build the system. Every program is built from
              your audit data, your voice profile, and the algorithm research
              that powers the scoring framework.
            </p>
          </FadeSection>

          <div className="flex flex-col gap-4">
            {steps.map(([num, title, desc], i) => (
              <FadeSection key={num} delay={0.2 + i * 0.05}>
                <div
                  className="li-step-card flex items-start gap-4"
                  style={{
                    padding: 16,
                    border: "1px solid #F0F0EE",
                    transition: "border-color 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#B8512D")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#F0F0EE")
                  }
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      background: "#1D1D1B",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 400, color: "#666" }}>
                    <span style={{ fontWeight: 600, color: "#1D1D1B" }}>
                      {title}
                    </span>{" "}
                    {desc}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>

        {/* Right - pricing */}
        <div>
          <FadeSection>
            <p
              className="mb-6"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#aaa",
              }}
            >
              Pricing
            </p>
          </FadeSection>
          <div className="flex flex-col gap-3">
            {tiers.map((tier, i) => (
              <FadeSection key={tier.name} delay={0.1 + i * 0.08}>
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: "20px 24px",
                    border: tier.popular
                      ? "2px solid #B8512D"
                      : "1px solid #F0F0EE",
                    transition: "border-color 0.2s, transform 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    if (!tier.popular)
                      e.currentTarget.style.borderColor = "#B8512D";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    if (!tier.popular)
                      e.currentTarget.style.borderColor = "#F0F0EE";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#1D1D1B",
                      }}
                    >
                      {tier.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: "#999",
                        marginTop: 2,
                      }}
                    >
                      {tier.desc}
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 whitespace-nowrap pl-4">
                    <span
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: "#1D1D1B",
                      }}
                    >
                      {tier.price}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 400, color: "#aaa" }}>
                      /mo
                    </span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing CTA (dark section) ────────────────────────────────
function PricingCTA() {
  const items = [
    "Interactive, password-protected report",
    "7-dimension scoring against research benchmarks",
    "Comment intelligence analysis",
    "Silent buyer quantification",
    "Three prioritized recommendations",
    "90-day phased action plan",
  ];

  return (
    <section
      id="pricing"
      style={{
        background: "#1D1D1B",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
      className="px-6 py-20 md:px-10 md:py-[100px]"
    >
      <div className="mx-auto grid max-w-[1000px] items-start gap-16 md:grid-cols-2 md:gap-[72px]">
        {/* Left */}
        <div>
          <FadeSection>
            <h2
              className="mb-6"
              style={{
                fontSize: "clamp(34px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#F5F0EB",
              }}
            >
              Start with the audit. Everything else follows.
            </h2>
          </FadeSection>
          <FadeSection delay={0.1}>
            <div
              className="mb-1"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 60,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#F5F0EB",
              }}
            >
              $999
            </div>
            <div
              style={{ fontSize: 16, fontWeight: 400, color: "#666" }}
              className="mb-1"
            >
              One-time
            </div>
            <div
              style={{ fontSize: 13, fontWeight: 400, color: "#666" }}
              className="mb-8"
            >
              Credited toward your first month of any engine tier.
            </div>
          </FadeSection>
          <FadeSection delay={0.15}>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#888" }}>
              No subscription. No commitment. You get the report, the
              recommendations, and the baseline. What you do with them is
              yours.
            </p>
          </FadeSection>
        </div>

        {/* Right - card */}
        <FadeSection delay={0.2}>
          <div
            style={{
              background: "#2A2622",
              border: "1px solid #3A3632",
              padding: 40,
            }}
          >
            <p
              className="mb-6"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#B8512D",
              }}
            >
              What is included
            </p>
            <div className="mb-8">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    padding: "9px 0",
                    borderBottom:
                      i < items.length - 1 ? "1px solid #3A3632" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      background: "#B8512D",
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  <span
                    style={{ fontSize: 14, fontWeight: 400, color: "#C4BEB6" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#pricing"
              style={{
                display: "block",
                width: "100%",
                padding: 18,
                background: "#B8512D",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                marginBottom: 16,
              }}
            >
              Get your audit &rarr;
            </a>
            <p
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "#666",
                textAlign: "center",
              }}
            >
              Questions? justin@eracx.com
            </p>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function LinkedInFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid #F0F0EE",
        padding: 32,
        fontFamily: "'Instrument Sans', sans-serif",
      }}
      className="px-6 text-center"
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#aaa",
          marginBottom: 4,
        }}
      >
        ERACX LinkedIn Audit
      </div>
      <div style={{ fontSize: 11, fontWeight: 400, color: "#aaa" }}>
        A product of ERA -- Department of Loyalty LLC
      </div>
    </footer>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function LinkedIn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#FFFFFF",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      <TopNav />
      <HeroSection />
      <EvidenceSection />
      <SevenDimensions />
      <ReportPreview />
      <EngineSection />
      <PricingCTA />
      <LinkedInFooter />

      {/* Global animation styles for this page */}
      <style>{`
        .li-fade {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .li-fade.li-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
