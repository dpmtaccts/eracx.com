import { useState, useEffect, useRef } from "react";
import { auditData, algorithmData, funnelTiers, commentQualityData, brianReplyData } from "./data";
import type { Post } from "./data";

// ─── Person silhouette SVG ───

function PersonIcon({
  color,
  opacity = 1,
  size = 24,
}: {
  color: string;
  opacity?: number;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity }}
    >
      <circle cx="12" cy="7" r="4" fill={color} />
      <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" fill={color} />
    </svg>
  );
}

// ─── Fade-in hook ───

function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
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
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useFadeIn();
  return (
    <section
      ref={ref}
      id={id}
      className={`fade-section scroll-mt-16 ${className}`}
    >
      {children}
    </section>
  );
}

// ─── Utility helpers ───

function themeColor(theme: string): string {
  const map: Record<string, string> = {
    "Personal Story / Vulnerability": "#D4654A",
    "Brand Day / Event Promotion": "#C4A265",
    "Industry History / Nostalgia": "#7B8A6E",
    "Industry Shout-out / Appreciation": "#6B8CAE",
    "Netrush Company News": "#4A4A4A",
    "Product / Solution Pitch": "#A0522D",
    "Amazon / Marketplace Insight": "#FF9900",
    "Sports / Culture / Lifestyle": "#5B7B9A",
  };
  return map[theme] || "#4A4A4A";
}

const tierColors = {
  top: "#D4654A",
  middle: "#C4A265",
  bottom: "#4A4A4A",
};

const tierLabels = {
  top: "Top of Funnel",
  middle: "Middle of Funnel",
  bottom: "Bottom of Funnel",
};

// ─── Reusable components ───

function Divider() {
  return <div className="w-full h-px bg-gold my-16" />;
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-coral pl-6 my-8 text-2xl font-[300] text-dark leading-snug">
      {children}
    </blockquote>
  );
}

function ResearchCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-gold bg-cream p-6 my-8">
      <div className="text-xs tracking-[0.2em] font-[700] text-gold mb-3">
        RESEARCH
      </div>
      {children}
    </div>
  );
}

function DataTable({
  headers,
  rows,
  compact,
}: {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
  compact?: boolean;
}) {
  return (
    <div className="overflow-x-auto my-8">
      <table className={`w-full text-left ${compact ? "text-sm" : "text-base"}`}>
        <thead>
          <tr className="border-b-2 border-gold">
            {headers.map((h) => (
              <th
                key={h}
                className="py-3 pr-4 text-dark font-[700] text-sm whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-cream" : "bg-white"}>
              {row.map((cell, j) => (
                <td key={j} className="py-3 pr-4 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PostCard({ post, note }: { post: Post; note?: string }) {
  const [expanded, setExpanded] = useState(false);
  const tier = funnelTiers[post.post_id];

  return (
    <div className="border border-border bg-white p-5 mb-3">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-sm text-light-text">{post.date_estimated}</span>
        <span
          className="text-xs px-2 py-0.5 text-white font-semibold"
          style={{ backgroundColor: themeColor(post.primary_theme) }}
        >
          {post.primary_theme}
        </span>
        {tier && (
          <span
            className="text-xs px-2 py-0.5 border font-semibold"
            style={{ borderColor: tierColors[tier], color: tierColors[tier] }}
          >
            {tierLabels[tier]}
          </span>
        )}
      </div>
      <p
        className="text-medium text-base mb-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded
          ? post.full_text
          : post.full_text.slice(0, 120) +
          (post.full_text.length > 120 ? "..." : "")}
        {post.full_text.length > 120 && (
          <span className="text-coral text-sm ml-1">
            {expanded ? "(collapse)" : "(expand)"}
          </span>
        )}
      </p>
      <div className="flex flex-wrap gap-4 text-sm">
        <span>
          <span className="text-coral font-[700]">{post.reactions}</span> reactions
        </span>
        <span>
          <span className="text-coral font-[700]">{post.comments}</span> comments
        </span>
        <span>
          <span className="text-coral font-[700]">{post.reposts}</span> reposts
        </span>
        <span>
          <span className="text-coral font-[700]">
            {post.estimated_impressions.toLocaleString()}
          </span>{" "}
          est. impressions
        </span>
      </div>
      {note && (
        <div className="text-sm bg-cream p-3 mt-3">
          <span className="text-medium">{note}</span>
        </div>
      )}
    </div>
  );
}

// ─── Content Funnel Visualization ───

function ContentFunnel({
  onSelectTier,
  activeTier,
}: {
  onSelectTier: (tier: "top" | "middle" | "bottom" | null) => void;
  activeTier: "top" | "middle" | "bottom" | null;
}) {
  const posts = auditData.posts;

  const tiers: ("top" | "middle" | "bottom")[] = ["top", "middle", "bottom"];
  const tierData = tiers.map((t) => {
    const tierPosts = posts.filter((p) => funnelTiers[p.post_id] === t);
    const avgReactions =
      tierPosts.reduce((s, p) => s + p.reactions, 0) / (tierPosts.length || 1);
    const avgComments =
      tierPosts.reduce((s, p) => s + p.comments, 0) / (tierPosts.length || 1);
    return {
      tier: t,
      count: tierPosts.length,
      avgReactions: avgReactions.toFixed(0),
      avgComments: avgComments.toFixed(1),
    };
  });

  const widths = { top: "100%", middle: "75%", bottom: "50%" };
  const purposes = {
    top: "Awareness and Reach",
    middle: "Education and Credibility",
    bottom: "Conversion and Business",
  };

  return (
    <div className="my-8 space-y-3">
      {tierData.map(({ tier, count, avgReactions, avgComments }) => (
        <button
          key={tier}
          onClick={() => onSelectTier(activeTier === tier ? null : tier)}
          className="funnel-tier block mx-auto text-left transition-all"
          style={{ width: widths[tier] }}
        >
          <div
            className={`p-5 border-2 transition-colors ${activeTier === tier ? "border-current" : "border-transparent"
              }`}
            style={{
              backgroundColor: tierColors[tier] + "15",
              borderColor:
                activeTier === tier ? tierColors[tier] : "transparent",
              color: tierColors[tier],
            }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-xs tracking-[0.15em] font-[700] uppercase">
                  {tierLabels[tier]}
                </span>
                <span className="text-xs text-light-text ml-2">
                  {purposes[tier]}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-medium">
                <span>
                  <strong style={{ color: tierColors[tier] }}>{count}</strong>{" "}
                  posts
                </span>
                <span>
                  <strong style={{ color: tierColors[tier] }}>
                    {avgReactions}
                  </strong>{" "}
                  avg reactions
                </span>
                <span>
                  <strong style={{ color: tierColors[tier] }}>
                    {avgComments}
                  </strong>{" "}
                  avg comments
                </span>
              </div>
            </div>
            {activeTier === tier && (
              <p className="text-xs text-light-text mt-1">
                Click to collapse. Scroll down for analysis.
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Timeline ───

function PostingTimeline() {
  const posts = auditData.posts;
  const startDate = new Date("2025-10-01");
  const endDate = new Date("2026-03-30");
  const totalDays =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  const months = [
    "Oct 2025",
    "Nov 2025",
    "Dec 2025",
    "Jan 2026",
    "Feb 2026",
    "Mar 2026",
  ];
  const monthPositions = months.map((m) => {
    const [mon, yr] = m.split(" ");
    const monthIdx = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ].indexOf(mon);
    const d = new Date(parseInt(yr), monthIdx, 15);
    return (
      ((d.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / totalDays) *
      100
    );
  });

  const gapStart = new Date("2025-11-01");
  const gapEnd = new Date("2026-02-08");
  const gapStartPct =
    ((gapStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / totalDays) * 100;
  const gapEndPct =
    ((gapEnd.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / totalDays) * 100;

  return (
    <div className="my-8">
      <div className="relative h-32 bg-cream border border-border">
        <div
          className="absolute top-0 h-full bg-coral/8"
          style={{
            left: `${gapStartPct}%`,
            width: `${gapEndPct - gapStartPct}%`,
          }}
        />
        <div
          className="absolute top-2 text-xs text-coral font-semibold text-center"
          style={{
            left: `${gapStartPct}%`,
            width: `${gapEndPct - gapStartPct}%`,
          }}
        >
          12 weeks of silence
        </div>

        {months.map((m, i) => (
          <div
            key={m}
            className="absolute bottom-0 text-xs text-light-text"
            style={{
              left: `${monthPositions[i]}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="h-3 w-px bg-border mx-auto mb-1" />
            {m}
          </div>
        ))}

        {posts.map((post) => {
          const d = new Date(post.date_estimated);
          const pct =
            ((d.getTime() - startDate.getTime()) /
              (1000 * 60 * 60 * 24) /
              totalDays) *
            100;
          const size = Math.min(Math.max(post.reactions / 10, 6), 16);
          return (
            <div
              key={post.post_id}
              className="absolute rounded-full bg-coral"
              style={{
                left: `${pct}%`,
                width: `${size}px`,
                height: `${size}px`,
                transform: "translate(-50%, -50%)",
                top: "45%",
              }}
              title={`Post ${post.post_id}: ${post.reactions} reactions, ${post.date_estimated}`}
            />
          );
        })}
      </div>

      <div className="flex gap-4 mt-6 flex-wrap">
        {[
          { month: "Oct 2025", count: 1 },
          { month: "Nov 2025", count: 0 },
          { month: "Dec 2025", count: 0 },
          { month: "Jan 2026", count: 0 },
          { month: "Feb 2026", count: 6 },
          { month: "Mar 2026", count: 12 },
        ].map(({ month, count }) => (
          <div key={month} className="text-center">
            <div
              className={`text-2xl font-[700] ${count === 0 ? "text-light-text" : "text-coral"
                }`}
            >
              {count}
            </div>
            <div className="text-xs text-light-text">{month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ICP tooltip data ───

const icpNames: Record<number, { name: string; title: string }> = {
  0: { name: "Anthony Almada", title: "IP & Evidence-driven nutrition industry executive" },
  1: { name: "Ryan Sensenbrenner", title: "Sr. Director of Marketing & eCommerce" },
  2: { name: "Sarah Remy", title: "Fractional GM, CMO for CPG health brands" },
  3: { name: "Bob Myhal", title: "Chief Marketing Officer" },
  4: { name: "Angela Wong", title: "Sr. Product Manager, SRS Nutrition Express" },
};

// ─── InvisibleBuyer Component ───

function InvisibleBuyer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [visiblePhase, setVisiblePhase] = useState(0);
  // 0 = nothing, 1 = visible icons, 2 = halo, 3 = invisible icons
  const [tooltip, setTooltip] = useState<{
    name: string;
    title: string;
    x: number;
    y: number;
  } | null>(null);

  const INVISIBLE_COUNT = 88;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.unobserve(el);

          // Phase 1: visible icons (22 * 40ms = 880ms)
          setVisiblePhase(1);

          // Phase 2: trust halo (after 880ms + 300ms pause)
          setTimeout(() => setVisiblePhase(2), 1180);

          // Phase 3: invisible icons (after halo fade 200ms)
          setTimeout(() => setVisiblePhase(3), 1380);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  // Build visible icons: 5 coral ICP, 3 gold peers, 14 gray others
  const visibleIcons = [
    ...Array.from({ length: 5 }, (_, i) => ({
      color: "#D4654A",
      category: "icp" as const,
      index: i,
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      color: "#C4A265",
      category: "peer" as const,
      index: i + 5,
    })),
    ...Array.from({ length: 14 }, (_, i) => ({
      color: "#B0AEA6",
      category: "other" as const,
      index: i + 8,
    })),
  ];

  return (
    <div ref={containerRef}>
      {/* ── Post reference card ── */}
      <div className="flex items-stretch bg-white border border-border shadow-sm mb-8 overflow-hidden">
        <div className="w-1 bg-coral shrink-0" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 flex-1">
          <p className="text-sm italic text-light-text">
            1997: launched the brand Extreme Sports Nutrition. First product:
            Creatine Powder.
          </p>
          <p className="text-[13px] text-light-text shrink-0">
            44 reactions &middot; 22 comments &middot; ~1,608 est. impressions
          </p>
        </div>
      </div>

      {/* ── VISIBLE ENGAGEMENT LAYER ── */}
      <div className="mb-2">
        {/* Label row */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {/* Reaction emoji circles */}
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
            style={{ backgroundColor: "#378FE9" }}
          >
            &#128077;
          </span>
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
            style={{ backgroundColor: "#C4A265" }}
          >
            &#128079;
          </span>
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
            style={{ backgroundColor: "#D4654A" }}
          >
            &#10084;
          </span>
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
            style={{ backgroundColor: "#C4943A" }}
          >
            &#128161;
          </span>
          <span className="text-[11px] tracking-[0.2em] font-[700] text-gold uppercase ml-1">
            VISIBLE ENGAGEMENT
          </span>
          <span className="text-[13px] text-light-text">
            (22 comments on this post)
          </span>
        </div>

        {/* Person icon grid */}
        <div className="flex flex-wrap gap-1.5 mb-3 relative">
          {visibleIcons.map((icon, i) => (
            <div
              key={`v-${i}`}
              className="relative"
              style={{
                opacity: visiblePhase >= 1 ? 1 : 0,
                transition: `opacity 0.15s ease`,
                transitionDelay: visiblePhase >= 1 ? `${i * 40}ms` : "0ms",
              }}
              onMouseEnter={(e) => {
                if (icon.category === "icp" && icpNames[icon.index]) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const containerRect =
                    containerRef.current?.getBoundingClientRect();
                  if (containerRect) {
                    setTooltip({
                      name: icpNames[icon.index].name,
                      title: icpNames[icon.index].title,
                      x: rect.left - containerRect.left + 12,
                      y: rect.top - containerRect.top - 8,
                    });
                  }
                }
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              <PersonIcon color={icon.color} />
              {icon.category === "icp" && (
                <span className="sr-only">
                  {icpNames[icon.index]?.name}
                </span>
              )}
            </div>
          ))}

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute z-10 bg-dark text-white text-xs px-3 py-2 shadow-lg pointer-events-none"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(-50%, -100%)",
                whiteSpace: "nowrap",
              }}
            >
              <span className="font-[700]">{tooltip.name}</span>
              <br />
              {tooltip.title}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-light-text">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-coral" />
            ICP Match (23%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gold" />
            Industry Peer (14%)
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#B0AEA6" }}
            />
            Other (63%)
          </span>
        </div>

        {/* Description */}
        <p className="text-[16px] text-medium leading-relaxed">
          These 22 people commented on the creatine post. Their engagement
          pushed it to ~1,608 impressions. 23% are ICP matches, which is
          unusually high.
        </p>
      </div>

      {/* ── TRUST HALO DIVIDER ── */}
      <div
        className="relative my-9"
        style={{
          opacity: visiblePhase >= 2 ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <div className="h-px bg-gold" />
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream px-4 text-[11px] tracking-[0.3em] font-[700] text-gold">
          TRUST HALO
        </span>
      </div>

      {/* ── INVISIBLE AUDIENCE LAYER ── */}
      <div>
        {/* Label row */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {/* Eye icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7" stroke="#D4654A" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="2.5" fill="#D4654A" />
          </svg>
          <span className="text-[11px] tracking-[0.2em] font-[700] text-coral uppercase">
            INVISIBLE AUDIENCE
          </span>
          <span className="text-[13px] text-light-text">
            (~1,608 estimated impressions)
          </span>
        </div>

        {/* Large person icon grid */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {Array.from({ length: INVISIBLE_COUNT }).map((_, i) => (
            <div
              key={`i-${i}`}
              style={{
                opacity: visiblePhase >= 3 ? 1 : 0,
                transition: `opacity 0.1s ease`,
                transitionDelay: visiblePhase >= 3 ? `${i * 20}ms` : "0ms",
              }}
            >
              <PersonIcon color="#D4654A" opacity={0.3} />
            </div>
          ))}
        </div>

        <p className="text-sm font-[700] text-coral mb-4">
          + thousands more across Brian's 5,303 followers and extended
          network
        </p>

        {/* Description */}
        <p className="text-[16px] text-medium leading-relaxed mb-6">
          Brand CEOs, VPs of eCommerce, CPG leaders. They read, they note,
          they do not comment. LinkedIn's dwell time data: 61+ seconds of
          silent reading generates 15.6% engagement rate vs. 1.2% for quick
          scrolls. The buyers who matter most are here.
        </p>
      </div>

      {/* ── Research callout ── */}
      <div
        className="border-l-[3px] border-gold p-5 mt-2"
        style={{ backgroundColor: "#EFECE8" }}
      >
        <p className="text-[11px] tracking-[0.15em] font-[700] text-gold mb-2">
          RESEARCH
        </p>
        <p className="text-sm text-medium leading-relaxed">
          LinkedIn's 360Brew model scores alignment between post content
          and the author's professional profile. High alignment equals 40%
          higher organic impressions. Brian's supplement history posts
          align directly with his verified expertise. The algorithm is pushing
          his content toward industry professionals. We cannot measure which
          ones without access to his Creator Mode analytics.
        </p>
        <p className="text-xs text-light-text mt-2">
          LinkedIn Engineering Blog; van der Blom 2025
        </p>
      </div>
    </div>
  );
}

// ─── Navigation Component ───

const sections = [
  { id: "tldr", label: "Start Here" },
  { id: "context", label: "Context" },
  { id: "content-funnel", label: "Content Funnel" },
  { id: "signals", label: "Signals" },
  { id: "audience", label: "Audience" },
  { id: "consistency", label: "Consistency" },
  { id: "recommendations", label: "Recommendations" },
  { id: "next-steps", label: "90-Day Build" },
  { id: "appendix", label: "Appendix" },
];

function Navigation() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-5xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-3">
        <span className="text-xs tracking-[0.2em] font-[900] text-dark mr-4 shrink-0">
          NETRUSH
        </span>
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`text-sm px-3 py-1 shrink-0 transition-colors ${
              active === id
                ? "text-coral font-semibold"
                : "text-light-text hover:text-dark"
            }`}
          >
            {label}
          </a>
        ))}
        <button
          onClick={() => window.print()}
          className="ml-auto text-xs px-3 py-1 border border-border text-light-text hover:text-dark hover:border-dark transition-colors shrink-0 rounded-none"
        >
          Print Report
        </button>
      </div>
    </nav>
  );
}

// ─── PasswordGate Component ───

const PASSWORD = "moderncommerce";

function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bg-audit-auth") === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSWORD) {
      sessionStorage.setItem("bg-audit-auth", "true");
      setUnlocking(true);
      setTimeout(() => {
        setAuthenticated(true);
      }, 400);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (checking) return null;

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      <div
        className={`w-full max-w-[780px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-400 ${
          unlocking ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {/* ── Banner ── */}
        <div className="relative h-[180px] md:h-[200px]">
          <img
            src="/images/bg-audit/1719355304776.jpeg"
            alt=""
            style={{ objectFit: "cover", width: "100%", height: "100%", position: "absolute", inset: 0 }}
          />
        </div>

        {/* ── Profile photo (overlapping banner) ── */}
        <div className="relative px-6 md:px-8">
          <div className="absolute -top-16 left-6 md:left-8">
            <div className="w-[128px] h-[128px] rounded-full border-4 border-white overflow-hidden bg-cream shadow-sm">
              <img
                src="/images/bg-audit/1768091997046.jpeg"
                alt="Brian Gonsalves"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── Profile info ── */}
        <div className="px-6 md:px-8 pt-20 pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            {/* Left side: name, title, location */}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-[22px] font-[700] text-dark leading-tight">
                  Brian Gonsalves
                </h1>
                {/* Verified badge */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <circle cx="12" cy="12" r="10" fill="#0A66C2" />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-light-text text-sm">He/Him</span>
                <span className="text-xs px-1.5 py-0.5 border border-border text-light-text rounded-sm">
                  1st
                </span>
              </div>
              <p className="text-[16px] text-medium mt-1">
                Co-CEO and Co-Founder at Netrush
              </p>
              <p className="text-sm text-light-text mt-1">
                Vancouver, Washington, United States
              </p>
            </div>

            {/* Right side: company badges */}
            <div className="flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <img
                  src="/images/bg-audit/netrush_com_inc_logo.jpeg"
                  alt="Netrush"
                  style={{ width: 28, height: 28 }}
                  className="w-7 h-7 rounded-sm"
                />
                <span className="text-sm text-medium font-[600]">Netrush</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/images/bg-audit/pacific_lutheran_university_logo.jpeg"
                  alt="Pacific Lutheran University"
                  style={{ width: 28, height: 28 }}
                  className="w-7 h-7 rounded-sm"
                />
                <span className="text-sm text-medium">
                  Pacific Lutheran University
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mx-6 md:mx-8 border-t border-border my-4" />

        {/* ── Audit title + password ── */}
        <div className="px-6 md:px-8 pb-8 text-center">
          <p className="text-xs tracking-[0.15em] text-gold font-[700] mb-1">
            LINKEDIN CONTENT ASSESSMENT
          </p>
          <p className="text-[13px] text-light-text mb-6">
            Phase 1 Baseline | March 2026 | Confidential
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-[320px] mx-auto space-y-3"
          >
            <input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              className="w-full px-4 py-2.5 border border-border bg-white text-dark text-sm rounded-none focus:outline-none focus:border-gold transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-coral text-xs">Incorrect password</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2.5 bg-dark text-white font-[600] text-sm rounded-none hover:bg-medium transition-colors"
            >
              Unlock Report
            </button>
          </form>

          <p className="text-xs text-light-text mt-5">
            5,303 followers &middot; 19 posts analyzed &middot; 144 comments
            audited
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Report Component ───

function Report() {
  const data = auditData;
  const posts = data.posts;
  const [activeTier, setActiveTier] = useState<
    "top" | "middle" | "bottom" | null
  >(null);

  const topPosts = posts.filter((p) => funnelTiers[p.post_id] === "top");
  const middlePosts = posts.filter((p) => funnelTiers[p.post_id] === "middle");
  const bottomPosts = posts.filter((p) => funnelTiers[p.post_id] === "bottom");

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, lineHeight: 1.7, color: '#4A4A4A' }}>
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 md:px-8 pb-24">
        {/* ─── 1. IF YOU READ NOTHING ELSE ─── */}
        <FadeSection id="tldr" className="pt-16">
          <p className="text-[26px] font-[300] text-dark leading-snug max-w-3xl mb-16">
            If you read only this, do these three things to generate results
            through LinkedIn.
          </p>

          <div className="max-w-3xl mx-auto space-y-12">
            {/* Action 1 */}
            <div className="flex gap-6">
              <span className="text-coral text-[60px] font-[800] leading-none shrink-0 w-16">
                1
              </span>
              <div>
                <p className="text-[22px] font-[700] text-dark leading-snug mb-4">
                  Post twice a week. Every week. For 12 straight weeks.
                </p>
                <p className="text-[16px] text-medium leading-relaxed mb-3">
                  Tuesday and Thursday. Personal stories, industry history, Brand
                  Day recaps. The algorithm research across 1.8 million posts is
                  unambiguous: consistency is the single strongest signal for
                  building reach. You hit this cadence in March. The compound
                  effect starts when you sustain it for 12 consecutive weeks
                  without a gap.
                </p>
                <p className="text-[16px] text-medium leading-relaxed">
                  One constraint: never post twice in 24 hours. The algorithm
                  promotes one post per account per day. Posting more suppresses
                  both.
                </p>
              </div>
            </div>

            {/* Action 2 */}
            <div className="flex gap-6">
              <span className="text-coral text-[60px] font-[800] leading-none shrink-0 w-16">
                2
              </span>
              <div>
                <p className="text-[22px] font-[700] text-dark leading-snug mb-4">
                  Reply to every comment in 10+ words within 90 minutes.
                </p>
                <p className="text-[16px] text-medium leading-relaxed mb-3">
                  Your average reply right now is 7.4 words. That is below the
                  9-word threshold where LinkedIn starts amplifying the signal.
                  Most of your replies are two to five word acknowledgments
                  ("Appreciate you," "Built to win")
                  that the algorithm treats as equivalent to a Like.
                </p>
                <p className="text-[16px] text-medium leading-relaxed mb-3">
                  The fix takes ten seconds per reply. Instead of "Love
                  it," write "Love it, that point about [X] is
                  exactly what we are seeing with brands navigating this right
                  now." That transforms a dead signal into a 3x impression
                  trigger. And when a brand executive like Chris Glosson leaves a
                  60-word comment about protein ecosystem innovation, replying
                  with a follow-up question can spark a threaded conversation
                  that the algorithm weights at 15x.
                </p>
                <p className="text-[16px] text-medium leading-relaxed">
                  Six of your posts had substantive comments with zero replies.
                  Those are the highest-ROI missed touchpoints in this entire
                  assessment.
                </p>
              </div>
            </div>

            {/* Action 3 */}
            <div className="flex gap-6">
              <span className="text-coral text-[60px] font-[800] leading-none shrink-0 w-16">
                3
              </span>
              <div>
                <p className="text-[22px] font-[700] text-dark leading-snug mb-4">
                  Use your content as a halo. Share what is interesting with
                  those who would find it interesting.
                </p>
                <p className="text-[16px] text-medium leading-relaxed mb-3">
                  This is the move that turns LinkedIn from a broadcast channel
                  into a relationship engine.
                </p>
                <p className="text-[16px] text-medium leading-relaxed mb-3">
                  When you publish a post about creatine history, or Amazon
                  compliance shifts, or what you learned at Brand Day, that
                  content is not just for your feed. It is an asset you can share
                  directly with the people it is most relevant to.
                </p>
                <p className="text-[16px] text-medium leading-relaxed mb-3">
                  A brand leader you met at Expo West who is navigating Amazon
                  compliance? Send them your COA post with a note: "This
                  came up in a conversation I had with Amazon's team.
                  Thought of you." A supplement founder who just launched
                  on TikTok Shop? Forward your Brand Day recap: "This is
                  what the creators told us about how they choose products.
                  Figured you would find it useful."
                </p>
                <p className="text-[16px] text-medium leading-relaxed mb-3">
                  Every post becomes a reason to reach out without asking for
                  anything. The content is the value. The share is the
                  touchpoint. The relationship is what compounds.
                </p>
                <p className="text-[16px] text-medium leading-relaxed">
                  This is how you turn 104 posts per year into 200+
                  personalized touchpoints across your network. Not by writing
                  more, but by sharing what you already wrote with the specific
                  people who need to see it.
                </p>
              </div>
            </div>
          </div>

          <Divider />

          <p className="text-center text-[18px] font-[300] text-light-text leading-relaxed max-w-2xl mx-auto mt-2 mb-4">
            The rest of this report is the evidence behind these three moves,
            and a deeper set of recommendations for format, content mix, and
            audience development. But these three, executed consistently, are
            the engine.
          </p>
        </FadeSection>

        <Divider />

        {/* ─── 2. THE CONTEXT ─── */}
        <FadeSection id="context">
          <h2 className="text-3xl font-[800] text-dark mb-8 mt-4">
            You're Eight Weeks In. Here's What We Know.
          </h2>

          <p className="text-medium leading-relaxed mb-4">
            After restarting regular LinkedIn publishing in mid-February,
            you've published 18 articles (roughly 2 per week), which is exactly the cadence that drives growth.
          </p>
          <p className="text-medium leading-relaxed mb-4">
            This assessment is a baseline, not a scorecard. The sample size is
            small. Eight weeks of data tells you what's working, what the
            audience responds to, and where to place your bets. It does not tell
            you what your ceiling is.
          </p>
          <p className="text-medium leading-relaxed mb-4">
            What the research does tell us: LinkedIn's organic content engine is
            a compounding asset that typically requires 12-24 weeks to establish
            algorithmic traction, and 24-52 weeks to generate measurable pipeline
            impact.
            The average B2B buyer journey is now 272 days across 60+ touchpoints,
            with 81% occurring before a sales rep is ever contacted.
          </p>
          <p className="text-medium leading-relaxed mb-6">
            Simply put: You're in Phase 1. The most important thing right now is not
            optimization, but consistency.
          </p>

          <ResearchCallout>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-coral text-2xl font-[700]">272</div>
                <div className="text-medium">
                  days: avg B2B buyer journey (Dreamdata 2026, 66M sessions)
                </div>
              </div>
              <div>
                <div className="text-coral text-2xl font-[700]">81%</div>
                <div className="text-medium">
                  of that journey happens before sales contact
                </div>
              </div>
              <div>
                <div className="text-coral text-2xl font-[700]">12-24</div>
                <div className="text-medium">
                  weeks: typical time to algorithmic traction
                </div>
              </div>
              <div>
                <div className="text-coral text-2xl font-[700]">7.1%</div>
                <div className="text-medium">
                  of LinkedIn's billion users post regularly
                </div>
              </div>
            </div>
            <p className="text-xs text-light-text mt-4">
              Research: van der Blom Algorithm Insights 2025 (1.8M posts),
              Socialinsider 2026, Dreamdata 2026, Buffer (2M+ posts)
            </p>
          </ResearchCallout>
        </FadeSection>

        <Divider />

        {/* ─── 3. CONTENT FUNNEL ─── */}
        <FadeSection id="content-funnel">
          <h2 className="text-3xl font-[800] text-dark mb-4 mt-4">
            The Content Funnel: Where Your Posts Land
          </h2>
          <p className="text-medium leading-relaxed mb-8">
            Every post serves one of three roles in a content strategy. Click
            a tier to jump to its posts.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-8 lg:gap-10">
            {/* ── Left column: Sticky funnel ── */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              <ContentFunnel
                onSelectTier={(tier) => {
                  setActiveTier(tier);
                  if (tier) {
                    const el = document.getElementById(`funnel-${tier}`);
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                activeTier={activeTier}
              />

              {/* Current vs recommended mix */}
              <div className="mt-6 space-y-3">
                <p className="text-xs tracking-[0.1em] text-light-text font-[600]">
                  CURRENT MIX
                </p>
                <div className="flex h-5 w-full overflow-hidden">
                  <div
                    className="flex items-center justify-center text-[10px] text-white font-[600]"
                    style={{ width: "26%", backgroundColor: tierColors.top }}
                  >
                    26%
                  </div>
                  <div
                    className="flex items-center justify-center text-[10px] text-white font-[600]"
                    style={{ width: "32%", backgroundColor: tierColors.middle }}
                  >
                    32%
                  </div>
                  <div
                    className="flex items-center justify-center text-[10px] text-white font-[600]"
                    style={{ width: "42%", backgroundColor: tierColors.bottom }}
                  >
                    42%
                  </div>
                </div>

                <p className="text-xs tracking-[0.1em] text-light-text font-[600]">
                  RECOMMENDED
                </p>
                <div className="flex h-5 w-full overflow-hidden">
                  <div
                    className="flex items-center justify-center text-[10px] text-white font-[600]"
                    style={{ width: "37%", backgroundColor: tierColors.top }}
                  >
                    37%
                  </div>
                  <div
                    className="flex items-center justify-center text-[10px] text-white font-[600]"
                    style={{ width: "38%", backgroundColor: tierColors.middle }}
                  >
                    38%
                  </div>
                  <div
                    className="flex items-center justify-center text-[10px] text-white font-[600]"
                    style={{ width: "25%", backgroundColor: tierColors.bottom }}
                  >
                    25%
                  </div>
                </div>

                <p className="text-xs text-light-text mt-2">
                  More personal stories at the top. Less direct selling at the bottom.
                </p>
              </div>
            </div>

            {/* ── Right column: Scrollable post cards + analysis ── */}
            <div>
              {/* ── TOP OF FUNNEL ── */}
              <div id="funnel-top" className="scroll-mt-20 mb-10">
                <h3
                  className="text-xl font-[700] mb-2"
                  style={{ color: tierColors.top }}
                >
                  Top of Funnel: Awareness and Reach
                </h3>
                <p className="text-sm text-light-text mb-4">
                  Drive brand awareness, attract first-touch attention,
                  teach the algorithm what you talk about.
                </p>

                <div className="space-y-3 mb-6">
                  {topPosts.map((p) => (
                    <PostCard key={p.post_id} post={p} />
                  ))}
                </div>

                <div className="overflow-hidden mb-6">
                  <div className="float-right ml-6 mb-4 w-40 md:w-48 shrink-0">
                    <div className="border border-border bg-white p-1.5 shadow-sm">
                      <img
                        src="/images/bg-audit/hearing-aids.png"
                        alt="Hearing aids post - 87 reactions, 6 comments."
                        style={{ width: 300, height: 675 }}
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-xs text-light-text text-center mt-2">
                      87 reactions, 6 comments.
                    </p>
                  </div>

                  <p className="text-medium leading-relaxed mb-4">
                    Your instinct for personal storytelling is strong. The hearing
                    aids post is a textbook top-of-funnel hit: specific, human,
                    unexpected. The F1 metaphor (zero comments) shows where
                    abstraction without personal grounding falls flat. When it
                    comes from a real moment in your life, the audience engages.
                    When it is an abstract metaphor, they scroll past.
                  </p>
                </div>
              </div>

              <Divider />

              {/* ── MIDDLE OF FUNNEL ── */}
              <div id="funnel-middle" className="scroll-mt-20 mb-10 mt-8">
                <h3
                  className="text-xl font-[700] mb-2"
                  style={{ color: tierColors.middle }}
                >
                  Middle of Funnel: Education and Credibility
                </h3>
                <p className="text-sm text-light-text mb-4">
                  Convert viewers into followers and leads. Demonstrate
                  expertise. Give away actual value.
                </p>

                <div className="space-y-3 mb-6">
                  {middlePosts.map((p) => (
                    <PostCard key={p.post_id} post={p} />
                  ))}
                </div>

                <div className="overflow-hidden mb-6">
                  <div className="float-right ml-6 mb-4 w-40 md:w-48 shrink-0">
                    <div className="border border-border bg-white p-1.5 shadow-sm">
                      <img
                        src="/images/bg-audit/creatine.png"
                        alt="Creatine nostalgia post - 44 reactions, 22 comments."
                        style={{ width: 300, height: 675 }}
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-xs text-light-text text-center mt-2">
                      44 reactions, 22 comments.
                    </p>
                  </div>

                  <p className="text-medium leading-relaxed mb-4">
                    The creatine post is your MOFU masterpiece: industry history
                    told through personal experience, triggering a 13-message
                    thread with an industry legend. This is the template. The
                    Amazon compliance post (lowest engagement in the dataset)
                    shows what happens when expertise is delivered without
                    narrative. Same knowledge, completely different response.
                  </p>
                </div>

                <ResearchCallout>
                  <p className="text-sm text-medium">
                    Comments exceeding 15 words carry 2.5x more algorithmic weight
                    than short reactions. Thread depth matters: a comment thread
                    with 6 back-and-forth replies signals more value than 6
                    isolated comments. The creatine post's 12-reply Anthony
                    Almada thread likely triggered significant network expansion.
                  </p>
                </ResearchCallout>
              </div>

              <Divider />

              {/* ── BOTTOM OF FUNNEL ── */}
              <div id="funnel-bottom" className="scroll-mt-20 mb-4 mt-8">
                <h3
                  className="text-xl font-[700] mb-2"
                  style={{ color: tierColors.bottom }}
                >
                  Bottom of Funnel: Conversion and Business
                </h3>
                <p className="text-sm text-light-text mb-4">
                  Drive evaluation. Expect lower views, higher intent.
                </p>

                <div className="space-y-3 mb-6">
                  {bottomPosts.map((p) => (
                    <PostCard key={p.post_id} post={p} />
                  ))}
                </div>

                <div className="overflow-hidden mb-6">
                  <div className="float-right ml-6 mb-4 w-40 md:w-48 shrink-0">
                    <div className="border border-border bg-white p-1.5 shadow-sm">
                      <img
                        src="/images/bg-audit/brand-day.png"
                        alt="Brand Day at TikTok LA - 84 reactions, 7 comments."
                        style={{ width: 300, height: 675 }}
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-xs text-light-text text-center mt-2">
                      84 reactions, 7 comments.
                    </p>
                  </div>

                  <p className="text-medium leading-relaxed mb-4">
                    Brand Day content breaks the "bottom of funnel gets
                    less engagement" rule because it feels like an exclusive
                    room, not a sales pitch. The NYC Brand Day recap is your
                    highest-engagement post overall. Direct product pitches (Batch
                    Pro: 21 reactions, 1 comment) follow the expected pattern:
                    narrow audience, low engagement, but potentially high intent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        <Divider />

        {/* ─── 4. ENGAGEMENT SIGNAL MAP ─── */}
        <FadeSection id="signals">
          <h2 className="text-3xl font-[800] text-dark mb-8 mt-4">
            What the Algorithm Actually Rewards
          </h2>

          <DataTable
            headers={["Signal", "Algorithm Weight", "Your Performance"]}
            rows={[
              [
                "Threaded comment discussions",
                algorithmData.engagementWeights.threadedComment,
                "Creatine post: 12-reply thread (strongest signal in the dataset)",
              ],
              [
                "Standalone comments 15+ words",
                algorithmData.engagementWeights.standaloneComment15Plus,
                "Brand Day recaps generate these consistently (attendees leave substantive comments)",
              ],
              [
                "Saves / Bookmarks",
                algorithmData.engagementWeights.saveBookmark,
                "Not visible in public data. Likely highest on values post (post 12) and creatine history.",
              ],
              [
                "Dwell time 61+ seconds",
                algorithmData.engagementWeights.dwellTime61Plus,
                "Longer narrative posts (hearing aids, creatine) likely hold attention. Short metaphor posts (F1) likely get scrolled past.",
              ],
              [
                "Reactions",
                algorithmData.engagementWeights.reaction,
                "You average ~53 reactions per post. Range: 13 to 174.",
              ],
              [
                "Quick scroll past",
                algorithmData.engagementWeights.quickScrollPast,
                "Posts with 0 comments (F1, hiring) suggest low dwell time and possible negative signals.",
              ],
            ]}
            compact
          />

          <p className="text-medium leading-relaxed mb-4">
            Your best content naturally triggers the highest-value signals.
            Personal stories create dwell time. Industry history generates
            threaded discussions. Brand Day recaps generate substantive comments
            from tagged attendees. The algorithm is already rewarding what you
            do best. The opportunity is doing more of it, more consistently.
          </p>

          <Divider />

          <h3 className="text-xl font-[700] text-dark mb-4">
            Comment Quality by Theme
          </h3>

          <p className="text-medium leading-relaxed mb-4">
            Not all comments are equal. The algorithm weights comments over 15
            words at 2.5x and threaded discussions at up to 15x a reaction.
            Here is how your themes rank by the quality of comments they
            generate:
          </p>

          <DataTable
            headers={["Theme", "Avg Word Count", "% Over 9 Words", "% Over 15 Words"]}
            rows={commentQualityData.byTheme.map((t) => [
              t.theme,
              t.avgWc.toFixed(1),
              t.pctOver9 + "%",
              t.pctOver15 + "%",
            ])}
            compact
          />

          <p className="text-medium leading-relaxed mb-4">
            Industry History / Nostalgia and Amazon / Marketplace Insight
            generate the most substantive comments. Product / Solution Pitch
            generates long comments from the few people who engage (high quality,
            low quantity). Personal Story / Vulnerability generates high volume
            but shorter comments. The insight: different themes serve different
            algorithmic functions. Personal stories drive reach through reactions
            and dwell time. Industry content drives authority through comment
            depth and thread activity.
          </p>

          <Divider />

          <h3 className="text-xl font-[700] text-dark mb-4">
            The Reply Gap
          </h3>

          <p className="text-medium leading-relaxed mb-4">
            Your biggest missed opportunity is not what you post. It is what
            happens after you post. The data:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-cream p-4 border border-border">
              <div className="text-coral text-2xl font-[700]">{brianReplyData.avgReplyWordCount}</div>
              <div className="text-sm text-medium">avg reply word count</div>
              <div className="text-xs text-light-text mt-1">Target: 9+ words (3x boost)</div>
            </div>
            <div className="bg-cream p-4 border border-border">
              <div className="text-coral text-2xl font-[700]">{brianReplyData.repliesOver9Words.pct}%</div>
              <div className="text-sm text-medium">of replies over 9 words</div>
              <div className="text-xs text-light-text mt-1">Target: 100%</div>
            </div>
            <div className="bg-cream p-4 border border-border">
              <div className="text-coral text-2xl font-[700]">{brianReplyData.postsWithReplies.pct}%</div>
              <div className="text-sm text-medium">of posts with any reply</div>
              <div className="text-xs text-light-text mt-1">Target: 100%</div>
            </div>
            <div className="bg-cream p-4 border border-border">
              <div className="text-coral text-2xl font-[700]">{brianReplyData.missedOpportunities.length}</div>
              <div className="text-sm text-medium">missed ICP-quality comments</div>
              <div className="text-xs text-light-text mt-1">Unreplied substantive comments</div>
            </div>
          </div>

          <p className="text-medium leading-relaxed mb-4">
            You replied on {brianReplyData.postsWithReplies.count} of{" "}
            {brianReplyData.postsWithReplies.total} posts that received comments.
            When you did reply, your average word count was 7.4 words. The research
            says replies over 9 words boost the parent post's impressions by 3x.
            Only 37.5% of your replies clear that threshold.
          </p>
          <p className="text-medium leading-relaxed mb-4">
            The most critical gap: you left 0 replies on the hearing aids post
            (6 comments, including one from an Amazon Sr. Partnership Manager),
            the Amazon Supply Chain post (5 comments, including heartfelt notes
            from the Cal Poly students you praised), and the Protein Day post (10
            comments, including a 60-word analysis from a protein value chain
            executive).
          </p>

          <PullQuote>
            Every unanswered comment is a signal the algorithm reads as
            disengagement. Every reply you write, especially within 90
            minutes, extends the post's reach window and tells the algorithm the
            conversation is still alive. This is the single highest-leverage
            behavior change available.
          </PullQuote>

          <h4 className="text-lg font-[700] text-dark mb-3">
            Unreplied Comments Worth Revisiting
          </h4>

          <p className="text-sm text-light-text mb-3">ICP matches</p>
          <div className="space-y-2 mb-4">
            {brianReplyData.missedOpportunities
              .filter((m) =>
                ["Kat Bryce", "Chris Glosson", "Ali Davey", "Viktor K.", "Russ Dieringer"].includes(m.commenter)
              )
              .map((m, i) => (
                <div key={i} className="flex items-start gap-3 text-sm border-l-2 border-coral/30 pl-3">
                  <div>
                    <span className="font-[700] text-dark">{m.commenter}</span>
                    <span className="text-light-text"> &middot; {m.headline}</span>
                    <div className="text-xs text-light-text mt-0.5">
                      {m.words} words on "{m.post}" &middot; No reply
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <p className="text-sm text-light-text mb-3">Other substantive comments</p>
          <div className="space-y-2 mb-6">
            {brianReplyData.missedOpportunities
              .filter((m) =>
                !["Kat Bryce", "Chris Glosson", "Ali Davey", "Viktor K.", "Russ Dieringer"].includes(m.commenter)
              )
              .map((m, i) => (
                <div key={i} className="flex items-start gap-3 text-sm border-l-2 border-gold/30 pl-3">
                  <div>
                    <span className="font-[700] text-dark">{m.commenter}</span>
                    <span className="text-light-text"> &middot; {m.headline}</span>
                    <div className="text-xs text-light-text mt-0.5">
                      {m.words} words on "{m.post}" &middot; No reply
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </FadeSection>

        <Divider />

        {/* ─── 5. WHO'S IN THE ROOM ─── */}
        <FadeSection id="audience" className="print-break-before">
          <h2 className="text-3xl font-[800] text-dark mb-8 mt-4">
            The Buyers Are Already Here
          </h2>

          <h3 className="text-xl font-[700] text-dark mb-4">
            Commenter Quality Analysis
          </h3>

          <DataTable
            headers={["Category", "Commenters", "Notes"]}
            rows={[
              [
                "ICP Match: brand executive, CPG leader, practitioner",
                "5",
                "Anthony Almada (nutrition industry legend), Ryan Sensenbrenner (Sr. Dir Marketing/eComm), Sarah Remy (Fractional CMO for CPG health brands), Bob Myhal (CMO), Angela Wong (Sr. Product Mgr, SRS Nutrition)",
              ],
              [
                "ICP Match: event attendee / buyer",
                "1",
                "Todd Hutsko (Consumer Healthcare Executive/Board Member, Brand Day attendee)",
              ],
              [
                "Amazon Employee",
                "1",
                "Lisa Abel (Sr Partnership Dev Mgr, Amazon MCF)",
              ],
              [
                "Industry Peer",
                "3",
                "Amazon/ecom consultants and services providers",
              ],
              ["Other", "3", "Personal connections, students"],
            ]}
          />

          <p className="text-medium leading-relaxed mb-4">
            38% of identified commenters are ICP matches. For a 5,303-follower
            account in its first 8 weeks of consistent publishing, this is a
            remarkably high-quality engagement profile.
          </p>
          <p className="text-medium leading-relaxed mb-6">
            Most LinkedIn accounts at this follower count see their comments
            dominated by peers, coaches, and service providers. Your audience
            skews toward actual brand executives and industry operators. This
            matters because of how the algorithm works: when ICP-matching
            professionals engage with a post, LinkedIn's interest graph pushes
            that content to similar professionals in adjacent networks.
          </p>

          <Divider />

          <h3 className="text-xl font-[700] text-dark mb-4">
            The Silent Buyer Hypothesis
          </h3>

          <InvisibleBuyer />
        </FadeSection>

        <Divider />

        {/* ─── 6. CONSISTENCY ─── */}
        <FadeSection id="consistency" className="print-break-before">
          <h2 className="text-3xl font-[800] text-dark mb-8 mt-4">
            The Only Thing That Matters Right Now
          </h2>

          <PostingTimeline />

          <p className="text-medium leading-relaxed mb-4">
            LinkedIn's algorithm rewards consistency above almost everything
            else. Moving from 1 to 2-5 posts per week delivers approximately
            1,000 additional impressions per post (Buffer, 2M+ posts analyzed).
            Only 7.1% of LinkedIn's billion users post regularly. Consistency
            alone puts you in a rare category.
          </p>
          <p className="text-medium leading-relaxed mb-4">
            The February-March restart is exactly right: 2 posts per week,
            escalating to near-daily in March. The next 12 weeks determine
            whether the algorithm classifies you as a consistent creator or a
            sporadic one. There is no shortcut here. The compound effect requires
            uninterrupted cadence.
          </p>
          <p className="text-medium leading-relaxed mb-4">
            One constraint to respect: posting more than once in 24 hours
            suppresses performance by up to 20%. The algorithm promotes one post
            per account per day. Your current pace of 2-3 per week, with at
            least 24 hours between posts, is the optimal range.
          </p>

          <ResearchCallout>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-coral text-lg font-[700]">2-3/week</div>
                <div className="text-medium">
                  optimal for personal profiles
                </div>
              </div>
              <div>
                <div className="text-coral text-lg font-[700]">24hr min</div>
                <div className="text-medium">
                  between posts (algorithm promotes only 1/day)
                </div>
              </div>
              <div>
                <div className="text-coral text-lg font-[700]">70%</div>
                <div className="text-medium">
                  of reach determined in first 60-90 minutes
                </div>
              </div>
              <div>
                <div className="text-coral text-lg font-[700]">64%</div>
                <div className="text-medium">
                  more comments when author responds within 30 min
                </div>
              </div>
            </div>
          </ResearchCallout>
        </FadeSection>

        <Divider />

        {/* ─── 7. RECOMMENDATIONS ─── */}
        <FadeSection id="recommendations" className="print-break-before">
          <h2 className="text-3xl font-[800] text-dark mb-8 mt-4">
            Building the Engine
          </h2>

          {/* 7a: Content Mix */}
          <h3 className="text-xl font-[700] text-dark mb-4">
            The Content Mix (Funnel-Mapped)
          </h3>

          <p className="text-medium leading-relaxed mb-6">
            A monthly 8-post calendar (2/week x 4 weeks) mapped to funnel tiers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                week: "Week 1",
                post1: { tier: "top" as const, desc: "Personal story / vulnerability" },
                post2: {
                  tier: "middle" as const,
                  desc: "Industry insight through personal experience",
                },
              },
              {
                week: "Week 2",
                post1: {
                  tier: "top" as const,
                  desc: "Industry shout-out / appreciation / cultural moment",
                },
                post2: {
                  tier: "middle" as const,
                  desc: "Amazon or TikTok intelligence, framed as narrative",
                },
              },
              {
                week: "Week 3",
                post1: {
                  tier: "top" as const,
                  desc: "Personal story / nostalgia with business bridge",
                },
                post2: {
                  tier: "bottom" as const,
                  desc: "Brand Day recap, preview, or attendee tags",
                },
              },
              {
                week: "Week 4",
                post1: {
                  tier: "middle" as const,
                  desc: "Framework, playbook, or case study framed as a lesson",
                },
                post2: {
                  tier: "bottom" as const,
                  desc: "Soft sell: capability embedded in a story, never standalone",
                },
              },
            ].map((w) => (
              <div key={w.week} className="bg-white border border-border p-5">
                <div className="text-sm font-[700] text-dark mb-3">
                  {w.week}
                </div>
                {[w.post1, w.post2].map((p, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <span
                      className="text-xs px-1.5 py-0.5 text-white font-[600] shrink-0 mt-0.5"
                      style={{ backgroundColor: tierColors[p.tier] }}
                    >
                      {p.tier === "top"
                        ? "TOFU"
                        : p.tier === "middle"
                          ? "MOFU"
                          : "BOFU"}
                    </span>
                    <span className="text-sm text-medium">{p.desc}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="text-sm text-light-text mb-4">
            Ratio: 37.5% TOP / 37.5% MIDDLE / 25% BOTTOM
          </p>

          <p className="text-medium leading-relaxed mb-4">
            The funnel research is clear: you need all three working together.
            Top-of-funnel drives the reach that feeds the algorithm.
            Middle-of-funnel converts that reach into followers and establishes
            authority. Bottom-of-funnel captures the demand your top and middle
            content creates.
          </p>
          <p className="text-medium leading-relaxed mb-4">
            Most B2B creators over-index on BOFU (pitching, selling, promoting).
            Your natural instinct leans toward TOFU and MOFU, which is
            actually the stronger foundation. The recommendation is to protect
            that instinct and be disciplined about inserting BOFU content only
            25% of the time, always wrapped in story.
          </p>

          <Divider />

          {/* 7b: Format Diversification */}
          <h3 className="text-xl font-[700] text-dark mb-4">
            Format Diversification
          </h3>

          <p className="text-medium leading-relaxed mb-4">
            You currently post text-only and text+image. The algorithm data
            says carousels (PDF documents) generate 3x more reach than static
            posts, and each swipe creates an interest signal. Polls, used by only
            0.00034% of posts, generate outsized impressions especially for
            larger accounts.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { format: "Text + Image", pct: "50%", note: "Your current strength" },
              {
                format: "Carousel / PDF",
                pct: "25%",
                note: "3x reach. Swipeable frameworks.",
              },
              {
                format: "Short Video",
                pct: "15%",
                note: "30-90s, vertical, captioned",
              },
              {
                format: "Poll",
                pct: "10%",
                note: "1x/month. 206% above avg reach.",
              },
            ].map((f) => (
              <div key={f.format} className="bg-cream p-4 border border-border">
                <div className="text-coral text-2xl font-[700]">{f.pct}</div>
                <div className="text-dark text-sm font-[700]">{f.format}</div>
                <div className="text-xs text-light-text mt-1">{f.note}</div>
              </div>
            ))}
          </div>

          <p className="text-medium leading-relaxed mb-4">
            Carousels and polls are the two most underused formats on LinkedIn.
            Both trigger high dwell time and the save/bookmark signal, which the
            algorithm weights at 3-5x a reaction.
          </p>

          <Divider />

          {/* 7c: Commenting Strategy */}
          <h3 className="text-xl font-[700] text-dark mb-4">
            The Commenting Strategy
          </h3>

          <p className="text-medium leading-relaxed mb-4">
            Posting is half the equation. The other half is commenting on other
            people's content. The algorithm data:
          </p>

          <ul className="list-none space-y-2 mb-6 text-medium text-base">
            {[
              "One comment on a creator's post = 80% probability you see their next post",
              "Visiting someone's profile = 60% visibility boost",
              "Comments over 9 words boost the parent post's impressions by 3x",
              "Top 5% of LinkedIn creators leave 150+ comments per week",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold font-[700] shrink-0">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-medium leading-relaxed mb-4">
            Recommended: After each post, spend 15 minutes engaging with 3-5
            relevant posts from people in your network: brand executives,
            Amazon/TikTok leaders, industry peers. Reply to every meaningful
            comment on your own post within the first 90 minutes. This is the
            "Golden Hour" strategy that determines 70% of a post's ultimate
            reach.
          </p>

          <Divider />

          {/* 7d: Hashtag Correction */}
          <h3 className="text-xl font-[700] text-dark mb-4">
            The Hashtag Correction
          </h3>

          <p className="text-medium leading-relaxed mb-4">
            You currently use 3-6 hashtags per post. The 2025-2026 algorithm
            data shows posts with 3+ hashtags receive 29% less reach. LinkedIn's
            360Brew model now understands topics semantically without hashtag
            signals. Recommendation: 0-2 hashtags maximum. If using any, pick
            one industry-specific tag and one broad tag. Or skip them entirely.
          </p>

          <Divider />

          {/* 7e: The Batch Problem */}
          <h3 className="text-xl font-[700] text-dark mb-4">
            The Batch Problem (Solved)
          </h3>

          <p className="text-medium leading-relaxed mb-4">
            Batch Pro content (post 5: 21 reactions, 1 comment) and the Netrush
            hiring/flywheel post (post 8: 34 reactions, 0 comments) are the two
            lowest-performing post types in the audit. Both are Direct Sell.
          </p>
          <p className="text-medium leading-relaxed mb-4">
            The fix is not to stop talking about Batch or Netrush capabilities.
            It's to never let the product be the headline.
          </p>

          <PullQuote>
            Template: "A practitioner brand we work with was losing 40% of
            in-office recommendations to Amazon. The patient would hear the
            recommendation, pull out their phone, and buy from a random Amazon
            seller instead. Here's what we built to fix it."
          </PullQuote>

          <p className="text-medium leading-relaxed mb-4">
            The product appears in paragraph 3, not the headline. The story
            creates dwell time. The problem creates identification. The product
            creates conversion intent. All three funnel layers in one post.
          </p>

          <Divider />

          {/* 7f: Brand Day Content Playbook */}
          <h3 className="text-xl font-[700] text-dark mb-4">
            Brand Day Content Playbook
          </h3>

          <p className="text-medium leading-relaxed mb-4">
            Brand Day is your highest-engagement BOFU content. Build a 4-post
            sequence around each event:
          </p>

          <div className="space-y-3 mb-8">
            {[
              {
                timing: "Pre-event",
                desc: "1 week before. Teaser. Who's in the room, what you're discussing. Signature line: \"The best ideas and the strongest alignment are built around a table, not on a stage.\"",
              },
              {
                timing: "Day-of",
                desc: "Real-time photo from the room. Energy, proof, exclusivity.",
              },
              {
                timing: "Post-event",
                desc: "1-2 days after. Recap with attendee tags. This is the tagging cascade that drove the NYC post to 104 reactions and 14 comments. Every tagged person becomes a distribution node.",
              },
              {
                timing: "+1 week",
                desc: "One insight from the conversation, framed as thought leadership. Not \"Brand Day was great.\" Instead: \"Something a brand leader said at our last Brand Day that I haven't been able to stop thinking about...\"",
              },
            ].map((item) => (
              <div key={item.timing} className="flex gap-4">
                <span className="text-coral font-[700] w-24 shrink-0 text-sm">
                  {item.timing}
                </span>
                <span className="text-medium">{item.desc}</span>
              </div>
            ))}
          </div>

          <p className="text-medium leading-relaxed mb-4">
            This creates 4 BOFU posts per Brand Day event spread across 2 weeks,
            each one feeling like a different content type.
          </p>
        </FadeSection>

        <Divider />

        {/* ─── 8. THE 90-DAY BUILD ─── */}
        <FadeSection id="next-steps" className="print-break-before">
          <h2 className="text-3xl font-[800] text-dark mb-8 mt-4">
            The 90-Day Build
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-[700] text-coral mb-3">
                Immediate (this week)
              </h3>
              <ul className="list-none space-y-2 text-medium">
                {[
                  "Review this report.",
                  "Grant us access to your LinkedIn Creator Mode analytics (follower demographics, impression data by job title/industry/company size).",
                  "Confirm 2x/week posting cadence in a shared editorial calendar.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold">&#9679;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-[700] text-coral mb-3">
                Weeks 1-4: Establish the Rhythm
              </h3>
              <ul className="list-none space-y-2 text-medium">
                {[
                  "2 posts per week, Tuesday/Thursday, mapped to the funnel framework.",
                  "15-minute post-publish commenting routine (3-5 relevant posts from network).",
                  "Reply to every comment within 90 minutes of publishing.",
                  "Reduce hashtags to 0-2 per post.",
                  "First carousel experiment (industry history or framework format).",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold">&#9679;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-[700] text-coral mb-3">
                Weeks 5-8: Expand Formats
              </h3>
              <ul className="list-none space-y-2 text-medium">
                {[
                  "First poll experiment.",
                  "First short video (30-60 seconds from a Brand Day or event).",
                  "Launch weekly digest pilot (adapting LinkedIn content into email for warm contacts).",
                  "Review first month of analytics data vs. this baseline.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold">&#9679;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-[700] text-coral mb-3">
                Weeks 9-12: Connect to Pipeline
              </h3>
              <ul className="list-none space-y-2 text-medium">
                {[
                  "Link LinkedIn engagement signals to prospect database (which commenters match ICP lists?).",
                  "Build Brand Day content playbook for Q2/Q3 events.",
                  "First measurement review: follower growth rate, engagement trends, ICP commenter density.",
                  "Decision gate: Is the cadence sustainable? What format experiments worked? What gets dropped?",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold">&#9679;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Divider />

          <h3 className="text-xl font-[700] text-dark mb-4">
            The Compound Math
          </h3>

          <p className="text-medium leading-relaxed mb-4">
            At 2 posts per week for 52 weeks, you publish 104 posts per
            year. If the weekly digest extends each post into an email
            touchpoint, that's 208 brand impressions per prospect per year. The
            average B2B buyer needs 60+ touchpoints across 272 days. Two hundred
            and eight touchpoints, delivered consistently, from a trusted voice
            in the industry, doesn't just meet that bar. It exceeds it.
          </p>
          <p className="text-medium leading-relaxed mb-4">
            But only if it's consistent. The research is unambiguous: content
            marketing is a compounding asset. Posts from earlier phases continue
            circulating within interest clusters for 2-3 weeks. Each new post
            compounds on the algorithmic authority of the last. Break the chain,
            and you restart from zero.
          </p>

          <PullQuote>
            You're 8 weeks in. The foundation is here. The audience quality is
            strong. The voice is authentic. The only variable is whether the
            machine keeps running.
          </PullQuote>
        </FadeSection>

        <Divider />

        {/* ─── 9. APPENDIX A: Full Post Data ─── */}
        <FadeSection id="appendix" className="print-break-before">
          <h2 className="text-3xl font-[800] text-dark mb-8 mt-4">
            Appendix A: Full Post Data
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-gold">
                  {[
                    "#",
                    "Date",
                    "Summary",
                    "Theme",
                    "Funnel",
                    "Reactions",
                    "Comments",
                    "Reposts",
                    "Est. Impr.",
                  ].map((h) => (
                    <th
                      key={h}
                      className="py-3 pr-3 text-dark font-[700] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => {
                  const tier = funnelTiers[post.post_id];
                  return (
                    <tr
                      key={post.post_id}
                      className={i % 2 === 0 ? "bg-cream" : "bg-white"}
                    >
                      <td className="py-2 pr-3">{post.post_id}</td>
                      <td className="py-2 pr-3 whitespace-nowrap">
                        {post.date_estimated}
                      </td>
                      <td className="py-2 pr-3 max-w-48 truncate">
                        {post.post_summary}
                      </td>
                      <td className="py-2 pr-3">
                        <span
                          className="text-xs px-1.5 py-0.5 text-white whitespace-nowrap"
                          style={{
                            backgroundColor: themeColor(post.primary_theme),
                          }}
                        >
                          {post.primary_theme}
                        </span>
                      </td>
                      <td className="py-2 pr-3">
                        {tier && (
                          <span
                            className="text-xs px-1.5 py-0.5 text-white"
                            style={{ backgroundColor: tierColors[tier] }}
                          >
                            {tier === "top"
                              ? "TOFU"
                              : tier === "middle"
                                ? "MOFU"
                                : "BOFU"}
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-3 text-right">
                        {post.reactions}
                      </td>
                      <td className="py-2 pr-3 text-right">
                        {post.comments}
                      </td>
                      <td className="py-2 pr-3 text-right">
                        {post.reposts}
                      </td>
                      <td className="py-2 pr-3 text-right">
                        {post.estimated_impressions.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Divider />

          {/* ─── 10. APPENDIX B: Algorithm Research ─── */}
          <h2 className="text-3xl font-[800] text-dark mb-8 mt-4">
            Appendix B: Algorithm Research Summary
          </h2>

          <div className="space-y-6 text-sm text-medium">
            <div>
              <h4 className="font-[700] text-dark mb-2">
                Engagement Signal Hierarchy
              </h4>
              <p>
                Threaded comments = {algorithmData.engagementWeights.threadedComment}.
                Saves/bookmarks = {algorithmData.engagementWeights.saveBookmark}.
                Dwell time 61+ sec = {algorithmData.engagementWeights.dwellTime61Plus}.
                DM shares = {algorithmData.engagementWeights.dmShare}.
                Repost with commentary = {algorithmData.engagementWeights.repostWithCommentary}.
                Reactions = {algorithmData.engagementWeights.reaction}.
              </p>
            </div>

            <div>
              <h4 className="font-[700] text-dark mb-2">
                Content Format Performance
              </h4>
              <p>
                Carousels: {algorithmData.formatPerformance.carousel.reachMultiplier} reach,{" "}
                {algorithmData.formatPerformance.carousel.engagement} engagement,{" "}
                {algorithmData.formatPerformance.carousel.sweetSpot} sweet spot.
                Polls: {algorithmData.formatPerformance.polls.reachMultiplier} (only{" "}
                {algorithmData.formatPerformance.polls.usage}).
                Native video: {algorithmData.formatPerformance.nativeVideo.reachMultiplier},{" "}
                {algorithmData.formatPerformance.nativeVideo.optimal}.
                External links: {algorithmData.formatPerformance.externalLinks.reachMultiplier}.
              </p>
            </div>

            <div>
              <h4 className="font-[700] text-dark mb-2">
                Golden Hour Mechanics
              </h4>
              <p>
                {algorithmData.postingOptimal.reachDeterminedInGoldenHour} of reach
                determined in first {algorithmData.postingOptimal.goldenHourMinutes} minutes.
                Author replies within 30 min = {algorithmData.postingOptimal.authorReplyBoost}.
              </p>
            </div>

            <div>
              <h4 className="font-[700] text-dark mb-2">
                ICP Targeting Precision
              </h4>
              <p>
                360Brew semantic matching replaced hashtag-based distribution.
                Profile-content alignment drives ~40% higher impressions.
                Engagement from ICP-matching profiles triggers network expansion
                into similar professional clusters.
              </p>
            </div>

            <div>
              <h4 className="font-[700] text-dark mb-2">
                Investment Timeline
              </h4>
              <p>
                {algorithmData.investmentTimeline.phase1.weeks} weeks:{" "}
                {algorithmData.investmentTimeline.phase1.name}.{" "}
                {algorithmData.investmentTimeline.phase2.weeks} weeks:{" "}
                {algorithmData.investmentTimeline.phase2.name}.{" "}
                {algorithmData.investmentTimeline.phase3.weeks} weeks:{" "}
                {algorithmData.investmentTimeline.phase3.name}.
              </p>
            </div>

            <p className="text-xs text-light-text mt-6">
              Research compiled March 2026 from van der Blom (1.8M posts),
              Socialinsider (1.3M posts), AuthoredUp (621K posts), Metricool
              (577K posts), Dreamdata (66M sessions), Buffer (2M+ posts), Trust
              Insights Q1 2026
            </p>
          </div>
        </FadeSection>

        {/* ─── Footer ─── */}
        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-light-text">
          <p>Prepared by ERACX &middot; March 2026 &middot; Confidential</p>
        </div>
      </main>
    </div>
  );
}

// ─── Top-level Page Component ───

export default function BGLinkedInAudit() {
  return (
    <PasswordGate>
      <Report />
    </PasswordGate>
  );
}
