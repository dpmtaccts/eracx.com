import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import {
  REVIEWERS,
  LOOM_EMBED_URL,
  PITCH_DECK_EMBED_URL,
  PITCH_DECK_COMMENT_URL,
  OPERATOR_PLAYBOOK_URL,
  PODCAST_URL,
  ATLAS_URL,
  ATLAS_PASSWORD,
  ERA_LOGO_URL,
  DPMT_LOGO_URL,
  PLAYBOOK_SCREENSHOT_URL,
  ATLAS_SCREENSHOT_URL,
  SIGNALS_FEED_SCREENSHOT_URL,
  SIGNALS_COMPANIES_SCREENSHOT_URL,
  MAP_SCREENSHOT_URL,
  GTM_DESIGN_SCREENSHOT_URL,
} from "../lib/reviewers";

// ── Inline keyframes + responsive ──
const keyframes = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.rv-container { max-width: 1060px; margin: 0 auto; padding: 0 32px; }
.rv-grid-hero { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: center; }
.rv-grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.rv-grid-tools { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.rv-grid-brands { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.rv-stat-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; }
.rv-signal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 768px) {
  .rv-container { padding: 0 20px; }
  .rv-grid-hero,
  .rv-grid-2col,
  .rv-grid-tools,
  .rv-grid-brands,
  .rv-stat-row,
  .rv-signal-grid { grid-template-columns: 1fr; gap: 32px; }
  .rv-hero-title { font-size: 32px !important; }
  .rv-section-title { font-size: 24px !important; }
}
`;

// ── Sub-components ──

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/10",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.03)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Fake browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div
          style={{
            flex: 1,
            marginLeft: 8,
            height: 20,
            borderRadius: 4,
            background: "rgba(255,255,255,0.04)",
          }}
        />
      </div>
      {/* Abstract content lines */}
      <div style={{ flex: 1, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ width: "60%", height: 10, borderRadius: 4, background: "rgba(255,255,255,0.06)" }} />
        <div style={{ width: "85%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
        <div style={{ width: "72%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
        <div style={{ width: "45%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.03)" }} />
      </div>
      <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.15)", paddingBottom: 14 }}>
        {label}
      </p>
    </div>
  );
}

function PasswordCopy({ password }: { password: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.04)",
        color: "rgba(255,255,255,0.5)",
        fontSize: 13,
        fontFamily: "'Source Sans 3', monospace",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {password}
      <span style={{ fontSize: 11, opacity: 0.6 }}>{copied ? "✓ copied" : "copy"}</span>
    </button>
  );
}

function AudioRecorder({
  slug,
  reviewerName,
  accent,
}: {
  slug: string;
  reviewerName: string;
  accent: string;
}) {
  const MAX_DURATION = 1200; // 20 minutes
  const WARN_AT = 1140; // warn at 19 minutes
  const [state, setState] = useState<"idle" | "recording" | "sending" | "sent" | "error">("idle");
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const durationRef = useRef(0);
  const recordingCountRef = useRef(0);

  const startRecording = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices) {
        setState("error");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      durationRef.current = 0;
      recordingCountRef.current += 1;
      const recordingNumber = recordingCountRef.current;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (timerRef.current) clearInterval(timerRef.current);
        setState("sending");

        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const audioType = blob.type || "audio/webm";
        const finalDuration = durationRef.current;

        const reader = new FileReader();
        reader.onloadend = async () => {
          if (reader.readyState !== 2 || typeof reader.result !== "string") {
            setState("error");
            return;
          }
          try {
            const base64 = reader.result.split(",")[1] || reader.result;
            const res = await fetch("/api/voice-feedback", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: reviewerName,
                slug,
                recording_number: recordingNumber,
                duration_seconds: finalDuration,
                timestamp: new Date().toISOString(),
                audio_base64: base64,
                audio_type: audioType,
                filename: `${slug}-${recordingNumber}.webm`,
              }),
            });
            if (!res.ok) {
              setState("error");
              return;
            }
            const data = await res.json();
            if (!data.ok) {
              setState("error");
              return;
            }
            setState("sent");
          } catch {
            setState("error");
          }
        };
        reader.onerror = () => setState("error");
        reader.readAsDataURL(blob);
      };

      // Use timeslice to ensure ondataavailable fires during recording
      recorder.start(1000);
      setDuration(0);
      durationRef.current = 0;
      timerRef.current = setInterval(() => {
        durationRef.current += 1;
        setDuration((d) => d + 1);
        if (durationRef.current >= MAX_DURATION) {
          recorder.stop();
        }
      }, 1000);
      setState("recording");
    } catch {
      setState("error");
    }
  };

  const stopRecording = () => mediaRecorderRef.current?.stop();
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ ...kicker, marginBottom: 12 }}>VOICE FEEDBACK</p>
      <p style={{ fontSize: 15, fontWeight: 300, opacity: 0.5, maxWidth: 420, margin: "0 auto 28px" }}>
        Hit record and share your honest thoughts. No need to be polished.
      </p>

      {state === "idle" && (
        <button onClick={startRecording} style={recordBtn}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: accent }} />
          Record Feedback
        </button>
      )}

      {state === "recording" && (
        <div>
          <p style={{ fontSize: 32, fontWeight: 300, fontFamily: "monospace", opacity: 0.7, marginBottom: 8 }}>
            {formatTime(duration)}
          </p>
          {duration >= WARN_AT && (
            <p style={{ fontSize: 12, color: "#e85d4a", marginBottom: 12 }}>
              Auto-stop in {formatTime(MAX_DURATION - duration)}
            </p>
          )}
          {duration < WARN_AT && (
            <p style={{ fontSize: 12, opacity: 0.3, marginBottom: 12 }}>{formatTime(MAX_DURATION)} max</p>
          )}
          <button
            onClick={stopRecording}
            style={{ ...recordBtn, borderColor: accent, color: accent }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 2, background: accent, animation: "pulse 1.5s ease-in-out infinite" }} />
            Stop &amp; send
          </button>
        </div>
      )}

      {state === "sending" && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span
            style={{
              width: 16,
              height: 16,
              border: "2px solid rgba(255,255,255,0.2)",
              borderTopColor: accent,
              borderRadius: "50%",
              animation: "spin 0.6s linear infinite",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 14, opacity: 0.5 }}>Sending your feedback...</span>
        </div>
      )}

      {state === "sent" && <p style={{ fontSize: 14, color: accent }}>Thanks — feedback received.</p>}

      {state === "error" && (
        <div>
          <p style={{ fontSize: 14, opacity: 0.5, marginBottom: 12 }}>Something went wrong.</p>
          <button onClick={() => setState("idle")} style={recordBtn}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

// ── Shared styles ──

const kicker: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  opacity: 0.35,
};

const recordBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "14px 28px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.7)",
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "'Source Sans 3', system-ui, sans-serif",
};

// ── Icons (inline SVGs) ──

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const DocIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

// ── Main page ──

export default function Review() {
  const { slug } = useParams<{ slug: string }>();
  const reviewer = slug ? REVIEWERS[slug] : undefined;

  const name = reviewer?.name ?? "Welcome";
  const firstName = reviewer?.firstName ?? "";
  const greeting = reviewer?.greeting ?? "Thanks for taking the time to review these materials.";
  const accent = reviewer?.accent ?? "#1FA7A2";

  const sectionGap = 96;

  return (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "#0d0d0d",
          color: "#F6F5F2",
          fontFamily: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
          WebkitFontSmoothing: "antialiased",
          position: "relative",
        }}
      >
        {/* Left accent stripe */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            background: `linear-gradient(180deg, ${accent} 0%, transparent 100%)`,
            zIndex: 50,
          }}
        />

        {/* Header */}
        <header className="rv-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 28, paddingBottom: 28 }}>
          <img src={ERA_LOGO_URL} alt="Era" style={{ height: 20, opacity: 0.85, filter: "invert(1)" }} />
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 12, opacity: 0.5, margin: 0, lineHeight: 1.4 }}>Prepared for {name}</p>
            <p style={{ fontSize: 11, opacity: 0.3, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0, lineHeight: 1.4 }}>
              CONFIDENTIAL
            </p>
          </div>
        </header>

        <main className="rv-container">
          {/* ── Hero: Greeting + Loom ── */}
          <section style={{ marginBottom: sectionGap, animation: "fadeUp 0.8s ease both" }}>
            <div className="rv-grid-hero">
              <div>
                <p style={{ ...kicker, marginBottom: 16 }}>ERA REVIEW</p>
                <h1 className="rv-hero-title" style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.2, marginBottom: 20 }}>
                  Hey {firstName || "there"}<span style={{ color: accent }}>.</span>
                </h1>
                <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.7, opacity: 0.7, marginBottom: 20 }}>
                  {greeting}
                </p>
                <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, opacity: 0.4 }}>
                  Start with the walkthrough, then dig into the materials at your own pace. Voice recorder at the
                  bottom if you want to talk through your thoughts: it comes straight to me.
                </p>
              </div>
              <div style={{ position: "relative", paddingBottom: "94.74%", height: 0, borderRadius: 10, overflow: "hidden" }}>
                <iframe
                  src={LOOM_EMBED_URL}
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </section>

          {/* ── Pitch Deck ── */}
          <section style={{ marginBottom: sectionGap, animation: "fadeUp 0.8s ease 0.15s both" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
              <p style={{ ...kicker, margin: 0 }}>PITCH DECK</p>
              {PITCH_DECK_COMMENT_URL && PITCH_DECK_COMMENT_URL !== "#" && (
                <a
                  href={PITCH_DECK_COMMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: accent, textDecoration: "none", opacity: 0.7 }}
                >
                  Open full version to leave comments
                </a>
              )}
            </div>
            <div
              style={{
                background: "#2C2C2C",
                padding: 16,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  paddingBottom: "58.26%",
                  height: 0,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <iframe
                  src={PITCH_DECK_EMBED_URL}
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </section>

          {/* ── Operator Playbook + Podcast ── */}
          <section style={{ marginBottom: sectionGap, animation: "fadeUp 0.8s ease 0.3s both" }}>
            <div className="rv-grid-2col">
              {/* Screenshot left */}
              <div>
                {PLAYBOOK_SCREENSHOT_URL ? (
                  <a href={OPERATOR_PLAYBOOK_URL} target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", transition: "transform 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <img src={PLAYBOOK_SCREENSHOT_URL} alt="Operator Playbook" style={{ width: "100%", borderRadius: 10 }} />
                  </a>
                ) : (
                  <ScreenshotPlaceholder label="Operator Playbook preview" />
                )}
              </div>
              {/* Text right */}
              <div>
                <p style={{ ...kicker, marginBottom: 12 }}>HOW WE OPERATE</p>
                <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16 }}>Operator Playbook</h2>
                <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, opacity: 0.6, marginBottom: 24 }}>
                  How Era operator pods work: the diagnostic framework, compensation structure, IP protection model,
                  and how engagements are scoped and delivered.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <a
                    href={OPERATOR_PLAYBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <DocIcon /> Read the playbook
                  </a>
                  <a
                    href={PODCAST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <HeadphonesIcon /> Listen to a podcast about how we work internally
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Aux Platform (reversed) ── */}
          <section style={{ marginBottom: sectionGap }}>
            <div className="rv-grid-2col">
              {/* Text left */}
              <div>
                <p style={{ ...kicker, marginBottom: 12 }}>THE PLATFORM</p>
                <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16 }}>Aux</h2>
                <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, opacity: 0.6, marginBottom: 24 }}>
                  The closed-loop system that connects Discovery, Intelligence, and Warmth scoring. See how signals
                  flow from first touch to revenue.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <a
                    href={ATLAS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <ExternalIcon /> Open Aux demo
                  </a>
                  <div>
                    <p style={{ fontSize: 12, opacity: 0.35, marginBottom: 8 }}>Password:</p>
                    <PasswordCopy password={ATLAS_PASSWORD} />
                  </div>
                </div>
              </div>
              {/* Screenshot right */}
              <div>
                {ATLAS_SCREENSHOT_URL ? (
                  <a href={ATLAS_URL} target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", transition: "transform 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <img src={ATLAS_SCREENSHOT_URL} alt="Aux Platform" style={{ width: "100%", borderRadius: 10 }} />
                  </a>
                ) : (
                  <ScreenshotPlaceholder label="Aux Platform preview" />
                )}
              </div>
            </div>
          </section>

          {/* ── Our Go-To-Market ── */}
          <section style={{ marginBottom: sectionGap }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ ...kicker, opacity: 0.4, marginBottom: 12 }}>OUR GO-TO-MARKET</p>
              <h2 className="rv-section-title" style={{ fontSize: 32, fontWeight: 300, marginBottom: 16 }}>
                Tools for buyers, influencers, and growth leaders
              </h2>
              <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, opacity: 0.5, maxWidth: 600, margin: "0 auto" }}>
                We're building signal-driven products that help revenue teams find, understand, and engage the right people at the right time.
              </p>
            </div>

            <div className="rv-grid-tools">
              {/* Signal Feed */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <a href="https://signals.eracx.com" target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  {SIGNALS_FEED_SCREENSHOT_URL ? (
                    <img src={SIGNALS_FEED_SCREENSHOT_URL} alt="Signal Feed" style={{ width: "100%", display: "block" }} />
                  ) : (
                    <ScreenshotPlaceholder label="Signal Feed preview" />
                  )}
                </a>
                <div style={{ padding: "24px 24px 28px" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>
                    signals.eracx.com
                  </p>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Signal Feed</h3>
                  <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, opacity: 0.55, marginBottom: 16 }}>
                    Real-time buying signals scored and surfaced as they happen — engagement events, demo requests, pricing page visits, and content downloads ranked by intent strength.
                  </p>
                  <a
                    href="https://signals.eracx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    Explore Signals <ExternalIcon />
                  </a>
                </div>
              </div>

              {/* Signal Companies */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <a href="https://signals.eracx.com" target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  {SIGNALS_COMPANIES_SCREENSHOT_URL ? (
                    <img src={SIGNALS_COMPANIES_SCREENSHOT_URL} alt="Signal Companies" style={{ width: "100%", display: "block" }} />
                  ) : (
                    <ScreenshotPlaceholder label="Signal Companies preview" />
                  )}
                </a>
                <div style={{ padding: "24px 24px 28px" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>
                    signals.eracx.com
                  </p>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Company Scoring</h3>
                  <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, opacity: 0.55, marginBottom: 16 }}>
                    Every account scored and ranked by warmth stage, signal count, and latest activity — so your team knows exactly which companies to prioritize right now.
                  </p>
                  <a
                    href="https://signals.eracx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    Explore Companies <ExternalIcon />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <a href="https://map.eracx.com" target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  {MAP_SCREENSHOT_URL ? (
                    <img src={MAP_SCREENSHOT_URL} alt="Map" style={{ width: "100%", display: "block" }} />
                  ) : (
                    <ScreenshotPlaceholder label="Map preview" />
                  )}
                </a>
                <div style={{ padding: "24px 24px 28px" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>
                    map.eracx.com
                  </p>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Map</h3>
                  <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, opacity: 0.55, marginBottom: 16 }}>
                    Visual account and stakeholder mapping that reveals influence networks, buying committees, and relationship pathways inside target organizations.
                  </p>
                  <a
                    href="https://map.eracx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    Explore Map <ExternalIcon />
                  </a>
                </div>
              </div>

              {/* GTM Design */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <a href="https://eracx.com/gtm-design" target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  {GTM_DESIGN_SCREENSHOT_URL ? (
                    <img src={GTM_DESIGN_SCREENSHOT_URL} alt="GTM Design" style={{ width: "100%", display: "block" }} />
                  ) : (
                    <ScreenshotPlaceholder label="GTM Design preview" />
                  )}
                </a>
                <div style={{ padding: "24px 24px 28px" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: 8 }}>
                    eracx.com/gtm-design
                  </p>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>GTM Design</h3>
                  <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, opacity: 0.55, marginBottom: 16 }}>
                    Interactive go-to-market architecture tool that helps growth leaders design, pressure-test, and align their revenue strategy in one place.
                  </p>
                  <a
                    href="https://eracx.com/gtm-design"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, color: accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    Explore GTM Design <ExternalIcon />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Who We Built This For ── */}
        </main>
        <section
          id="who-we-serve"
          style={{
            background: "linear-gradient(180deg, #F6F5F2 0%, #EDE9E4 100%)",
            color: "#383838",
            position: "relative",
            overflow: "hidden",
            animation: "fadeUp 0.8s ease 0.45s both",
          }}
        >
          {/* Decorative background elements */}
          <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`, pointerEvents: "none" }} />

          {/* Top edge: accent gradient bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}44)` }} />

          <div className="rv-container" style={{ paddingTop: 80, paddingBottom: 80 }}>
            {/* Section header */}
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>WHO WE BUILT THIS FOR</p>
            <h2 style={{ fontSize: 36, fontWeight: 300, lineHeight: 1.3, color: "#2A2A2A", maxWidth: 560, marginBottom: 64 }}>
              Built for B2B companies that have outgrown founder-led sales<span style={{ color: accent }}>.</span>
            </h2>

            {/* Block A: The ICP */}
            <div style={{ marginBottom: 72 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, marginBottom: 20 }}>THE COMPANY</p>
              <div style={{ maxWidth: 720 }}>
                <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: "#4A4A4A" }}>
                  Era's ideal client is a B2B company with $10M to $100M in revenue and 50 to 500 employees. They sell deals averaging $50K or more annually. They have a sales team but no dedicated outbound infrastructure: no SDRs, no demand gen function, no signal stack.
                </p>
                <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: "#4A4A4A", marginTop: 20 }}>
                  The verticals where this lands hardest: SaaS and software, IT services and cybersecurity, staffing and recruiting, healthcare IT, fintech, logistics and supply chain, and professional services. These industries share three traits: identifiable buyers reachable via email and LinkedIn, deal sizes that justify the investment, and competitive intensity where speed to contact matters.
                </p>
                {/* Pull quote */}
                <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 24, marginTop: 32 }}>
                  <p style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.6, color: "#2A2A2A" }}>
                    The common thread isn't industry. It's a company that's outgrown founder-led sales but hasn't yet built the pipeline machine to replace it.
                  </p>
                </div>
              </div>
            </div>

            {/* Block B: Market size */}
            <div style={{ marginBottom: 72 }}>
              <div style={{ width: 40, height: 1, background: accent, opacity: 0.4, marginBottom: 48 }} />
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, marginBottom: 36 }}>THE MARKET</p>
              <div className="rv-stat-row">
                {[
                  { number: "~85,000", label: "B2B companies in the US with $10M to $100M revenue and 50 to 500 employees across Era's target verticals" },
                  { number: "~34,000", label: "Estimated companies in the \"ready but uncommitted\" segment: experiencing GTM pain, haven't yet committed budget to solve it" },
                  { number: "$2.66B", label: "Current US outsourced B2B lead generation market (2024), projected to reach $7.33B by 2033" },
                ].map((stat) => (
                  <div key={stat.number} style={{ background: "rgba(255,255,255,0.6)", borderRadius: 12, padding: "28px 24px", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <p style={{ fontSize: 44, fontWeight: 700, color: accent, lineHeight: 1, marginBottom: 14, fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
                      {stat.number}
                    </p>
                    <div style={{ width: 24, height: 2, background: accent, opacity: 0.3, marginBottom: 14 }} />
                    <p style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.6, color: "#6B7280" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Block C: Inflection point */}
            <div style={{ marginBottom: 72 }}>
              <div style={{ width: 40, height: 1, background: accent, opacity: 0.4, marginBottom: 48 }} />
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, marginBottom: 20 }}>THE INFLECTION POINT</p>
              <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: "#4A4A4A", maxWidth: 720, marginBottom: 12 }}>
                Revenue range narrows the field, but it doesn't define the buyer. Era's real ICP filter is a company at a specific growth inflection: they've found product-market fit, they're growing, and the pipeline infrastructure hasn't kept up.
              </p>
              <p style={{ fontSize: 14, fontWeight: 400, color: "#6B7280", marginBottom: 28 }}>
                The signals that matter:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { title: "Founder is still the top seller.", desc: "Product-market fit is proven but pipeline is inconsistent because one person can't do everything." },
                  { title: "First VP of Sales just started.", desc: "New sales leader needs pipeline now, not in two quarters. They don't have time to hire and ramp an SDR team." },
                  { title: "AEs are doing their own prospecting.", desc: "When closers are also sourcing, top-of-funnel gets deprioritized every busy quarter. Feast or famine pipeline." },
                  { title: "Marketing team is brand and content only.", desc: "Marketing produces blog posts and manages the website but owns zero pipeline metrics." },
                  { title: "Recently raised Series A or B.", desc: "Board pressure to accelerate growth, but can't wait 3 to 6 months to build outbound from scratch." },
                ].map((item, i) => (
                  <div key={item.title} style={{ display: "flex", gap: 20, padding: "20px 0", borderBottom: i < 4 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                    <div style={{ width: 32, height: 32, minWidth: 32, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, marginTop: 2 }}>
                      {i + 1}
                    </div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: "#2A2A2A", marginBottom: 4 }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "#6B7280" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block D: Signals */}
            <div style={{ marginBottom: 72 }}>
              <div style={{ width: 40, height: 1, background: accent, opacity: 0.4, marginBottom: 48 }} />
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, marginBottom: 20 }}>THE SIGNALS</p>
              <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: "#4A4A4A", maxWidth: 720, marginBottom: 32 }}>
                Era uses signal-based prospecting to identify companies at the inflection point before they start shopping for solutions. These are the public data points we monitor:
              </p>
              <div className="rv-signal-grid">
                {[
                  { signal: "Sales department headcount: 3 to 15", desc: "Big enough to have a team, small enough that no one owns outbound" },
                  { signal: "Marketing department: 1 to 5 people", desc: "Content and brand focus only, no demand gen or marketing ops" },
                  { signal: "No SDR or BDR titles on staff", desc: "Outbound function doesn't exist yet" },
                  { signal: "No marketing automation detected", desc: "No HubSpot, Marketo, or Pardot: they're running email and prayer" },
                  { signal: "VP Sales hired in last 6 months", desc: "New leader needs pipeline immediately, will be receptive to outside help" },
                  { signal: "Recent funding (Series A/B)", desc: "Growth pressure from the board, budget unlocked" },
                  { signal: "Active AE job postings, no SDR postings", desc: "Expanding the closing team but not building top-of-funnel" },
                  { signal: "Headcount growth 10%+ in 6 months", desc: "Company is scaling fast, infrastructure is lagging" },
                ].map((item) => (
                  <div
                    key={item.signal}
                    style={{
                      background: "#fff",
                      borderRadius: 10,
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderTop: `2px solid ${accent}`,
                      padding: "18px 20px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#2A2A2A", marginBottom: 6 }}>
                      {item.signal}
                    </p>
                    <p style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.6, color: "#6B7280" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Block E: Budget potential */}
            <div>
              <div style={{ width: 40, height: 1, background: accent, opacity: 0.4, marginBottom: 48 }} />
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, marginBottom: 20 }}>THE OPPORTUNITY</p>
              <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: "#4A4A4A", maxWidth: 720, marginBottom: 36 }}>
                Most companies in Era's ICP are spending money on pipeline generation today. They're just spending it badly.
              </p>
              <div className="rv-stat-row" style={{ marginBottom: 36 }}>
                {[
                  { number: "$150K to $275K/yr", label: "What a single in-house SDR actually costs when you include salary, benefits, tools, management overhead, recruiting, and ramp-time productivity loss" },
                  { number: "34 to 40%", label: "Annual SDR turnover rate, meaning most companies replace their outbound person every 14 to 16 months" },
                  { number: "3 to 6 months", label: "Time from SDR hire to first productive meeting, during which the company pays full cost for partial output" },
                ].map((stat) => (
                  <div key={stat.number} style={{ background: "rgba(255,255,255,0.6)", borderRadius: 12, padding: "28px 24px", border: "1px solid rgba(0,0,0,0.04)" }}>
                    <p style={{ fontSize: 44, fontWeight: 700, color: accent, lineHeight: 1, marginBottom: 14, fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
                      {stat.number}
                    </p>
                    <div style={{ width: 24, height: 2, background: accent, opacity: 0.3, marginBottom: 14 }} />
                    <p style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.6, color: "#6B7280" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              {/* Closing statement as a highlight box */}
              <div style={{ background: "#2A2A2A", borderRadius: 12, padding: "32px 36px", maxWidth: 720, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: accent }} />
                <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: "#F6F5F2" }}>
                  Era's engagement costs $15K per month: roughly equivalent to a single fully-loaded SDR, but operational in 2 to 4 weeks instead of 3 to 6 months, with zero turnover risk, and the signal infrastructure included. For companies already spending $150K+ on underperforming outbound, the budget isn't new. <span style={{ fontWeight: 600, color: accent }}>It's reallocated.</span>
                </p>
              </div>
            </div>

            {/* Footnote */}
            <p style={{ fontSize: 9, fontWeight: 300, fontStyle: "italic", color: "#9CA3AF", marginTop: 56, lineHeight: 1.6 }}>
              Market sizing: SaaS Capital 2025, Gartner CMO Spend Survey 2025, Bridge Group SDR Metrics 2024. Company counts estimated from Apollo.io and Census Bureau data.
            </p>
          </div>

          {/* Bottom edge: accent gradient bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}44, ${accent})` }} />
        </section>
        <main className="rv-container" style={{ paddingTop: sectionGap }}>

          {/* ── Era vs DPMT ── */}

          {/* ── Era vs DPMT ── */}
          <section style={{ marginBottom: sectionGap }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ ...kicker, opacity: 0.4, marginBottom: 12 }}>TWO BRANDS, ONE MISSION</p>
            </div>

            <div className="rv-grid-brands">
              {/* ERA card */}
              <div style={{ background: "#2C2C2C", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ height: 3, background: "linear-gradient(to right, #1FA7A2, #D43D8D)" }} />
                <div style={{ padding: "40px 36px" }}>
                  <img src={ERA_LOGO_URL} alt="Era" style={{ height: 24, width: "auto", objectFit: "contain", opacity: 0.9, marginBottom: 16, filter: "invert(1)" }} />
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1FA7A2", marginBottom: 16 }}>
                    THE SYSTEM
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.6, marginBottom: 24 }}>
                    The scalable infrastructure: methodology, platform, and operator network that makes revenue growth
                    repeatable across multiple clients and teams.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                    {["Signal-based pipeline engine", "Aux platform (Discovery, Intelligence, Warmth)", "Operator pod model", "Cross-client pattern recognition"].map((b) => (
                      <li key={b} style={{ fontSize: 13, opacity: 0.55, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, top: "0.65em", width: 5, height: 5, borderRadius: "50%", background: "#1FA7A2" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href="https://eracx.com" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, color: "#1FA7A2", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    eracx.com <ExternalIcon />
                  </a>
                </div>
              </div>

              {/* DPMT card */}
              <div
                style={{
                  background: "linear-gradient(145deg, #F8F6F3 0%, #F0EDE8 40%, #EDE4DF 100%)",
                  borderRadius: 12,
                  border: "1px solid rgba(215,210,205,0.2)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(216,160,170,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(160,190,216,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ padding: "40px 36px", position: "relative" }}>
                  <img src={DPMT_LOGO_URL} alt="DPMT" style={{ height: 22, opacity: 0.85, marginBottom: 16 }} />
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#B85C4A", marginBottom: 16 }}>
                    FRACTIONAL CONSULTING
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#383838", opacity: 0.7, marginBottom: 24 }}>
                    Justin's fractional CRO consulting practice. Embedded with leadership teams to diagnose revenue
                    problems and build the systems that fix them.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                    {["90-day embedded engagements", "Diagnose, build, transfer", "Era deployed as the methodology", "Senior operator judgment"].map((b) => (
                      <li key={b} style={{ fontSize: 13, color: "#383838", opacity: 0.6, lineHeight: 1.8, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, top: "0.65em", width: 5, height: 5, borderRadius: "50%", background: "#B85C4A" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href="https://dpmt.co" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, color: "#B85C4A", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    dpmt.co <ExternalIcon />
                  </a>
                </div>
              </div>
            </div>

            <p style={{ textAlign: "center", fontSize: 14, fontWeight: 300, opacity: 0.4, maxWidth: 640, margin: "36px auto 0", lineHeight: 1.7 }}>
              Era is designed to scale operations across teams, using the best growth technology and an ever-growing playbook for B2B companies.
            </p>
          </section>

          {/* ── Voice Feedback ── */}
          <section style={{ marginBottom: sectionGap }}>
            <AudioRecorder slug={slug ?? ""} reviewerName={name} accent={accent} />
          </section>
        </main>

        {/* Footer */}
        <footer
          className="rv-container"
          style={{
            paddingTop: 32,
            paddingBottom: 48,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 13, opacity: 0.3, margin: 0, fontWeight: 300, letterSpacing: "0.04em" }}>
            Connection · Trust · Loyalty
          </p>
          <a
            href="https://eracx.com"
            style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}
          >
            eracx.com
          </a>
        </footer>
      </div>
      <Analytics />
    </>
  );
}
