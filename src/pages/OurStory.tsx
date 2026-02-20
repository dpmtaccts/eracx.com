import TopNav from "../components/TopNav";

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <TopNav />

      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "160px 24px 120px",
        }}
      >
        {/* Header */}
        <p
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#C4522A",
            marginBottom: 24,
          }}
        >
          Our Story
        </p>

        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#F5F0E8",
            lineHeight: 1.1,
            marginBottom: 64,
          }}
        >
          On Focus
        </h1>

        <div
          style={{
            height: 1,
            backgroundColor: "rgba(245,240,232,0.1)",
            marginBottom: 64,
          }}
        />

        {/* Body */}
        <div
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: "rgba(245,240,232,0.8)",
          }}
        >
          <p style={{ marginBottom: 32 }}>
            The best leaders we've ever worked with share one trait. They are
            ruthless about what they don't do.
          </p>

          <p style={{ marginBottom: 32 }}>
            No to the meeting that could be an email. No to the introduction
            that goes nowhere. No to the conference, the panel, the offsite —
            unless it serves one thing: the objective. They raise their floor
            constantly. And because they say no to almost everything, when they
            say yes, it means something.
          </p>

          <p style={{ marginBottom: 32 }}>
            We built Era to work alongside those people. Founders who know
            exactly what they're building and who they're building it for.
            Executives who wake up thinking about their product, their team,
            their customers — not their inbox.
          </p>

          <p
            style={{
              marginBottom: 32,
              color: "#F5F0E8",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            They are missional. And that focus is what makes them great.
          </p>

          <p
            style={{
              marginBottom: 32,
              color: "#F5F0E8",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Our job is to protect it.
          </p>

          <p style={{ marginBottom: 32 }}>
            If you have a good product and a strong team, you don't need to
            spend your time evaluating GTM tools, interviewing BDR candidates,
            or managing agencies who report on activity instead of outcomes.
            You need a system that builds and maintains the relationships that
            matter — and runs without pulling you into it.
          </p>

          <p
            style={{
              marginBottom: 32,
              color: "#F5F0E8",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            That's what Era is.
          </p>

          <p style={{ marginBottom: 32 }}>
            We don't get your calendar full. We don't blast messages to
            everyone who fits a vague ICP. We focus. Real people, in real
            companies, with real problems that your product actually solves. We
            build toward that relationship deliberately — from unknown to
            known, from known to trusted, from trusted to the kind of
            relationship that generates referrals, expansions, and renewals
            without anyone having to remember to follow up.
          </p>

          <p style={{ marginBottom: 32 }}>
            We also believe the best companies know exactly who they serve.
            Not all people. The right people. Every system we build is designed
            around that principle. Who are we trying to reach? Who are we
            building trust with? Who do we want to still be talking to in
            three years?
          </p>

          <p style={{ marginBottom: 32 }}>
            Focus isn't a strategy. It's a discipline. And it's the hardest
            thing to maintain when growth feels urgent.
          </p>

          <p style={{ marginBottom: 32 }}>
            We use the best in AI and automation to make that discipline
            scalable. Growth is hard enough. We're not here to make it harder
            — we're here to make sure the hard work you've already done
            compounds into something that keeps working.
          </p>

          <p
            style={{
              marginBottom: 0,
              color: "#F5F0E8",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            That's why we built Era.
          </p>
        </div>

        {/* Signature */}
        <div style={{ marginTop: 48 }}>
          <div
            style={{
              height: 1,
              backgroundColor: "rgba(245,240,232,0.1)",
              marginBottom: 32,
            }}
          />
          <p
            style={{
              color: "rgba(245,240,232,0.6)",
              fontSize: 14,
              fontStyle: "italic",
            }}
          >
            — Justin Marshall, Founder
          </p>
        </div>

        {/* Closing CTA */}
        <div style={{ marginTop: 80 }}>
          <p
            style={{
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#C4522A",
              marginBottom: 16,
            }}
          >
            Ready to Focus?
          </p>
          <a
            href="/#contact"
            style={{
              color: "#F5F0E8",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Start a conversation →
          </a>
        </div>
      </div>
    </div>
  );
}
