import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function OurStory() {
  const navigate = useNavigate();
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
            The best leaders I have worked with are strict about what they will not do.
          </p>

          <p style={{ marginBottom: 32 }}>
            It's infuriating how they say "No," to the meeting that could be an
            email. "No," to the introduction that goes nowhere. "No," to the
            conference, the panel, the offsite that everyone else wants an
            invite to, unless it serves one thing: the objective. They say
            "No," because they've raised their floor. And because they say no
            to almost everything, when they say, "Yes," it means something.
          </p>

          <p style={{ marginBottom: 32 }}>
            We built ERA to work alongside those people. Leaders who know
            exactly what they're building and who they're building it for.
            Executives who wake up thinking about their product, their team,
            their customers.
          </p>

          <p
            style={{
              marginBottom: 32,
              color: "#F5F0E8",
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            They care about the mission. That focus is what makes them effective.
          </p>

          <p
            style={{
              marginBottom: 32,
              color: "#F5F0E8",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Our job is to protect that focus.
          </p>

          <p style={{ marginBottom: 32 }}>
            If you have a good product and a strong sales team, you should not spend your week evaluating GTM tools, interviewing BDRs, babysitting CRM workflows, or reading agency reports on vanity metrics. You need a system that builds and keeps the relationships your product deserves. One that runs without pulling you into it.
          </p>

          <p
            style={{
              marginBottom: 32,
              color: "#F5F0E8",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            That is ERA.
          </p>

          <p style={{ marginBottom: 32 }}>
            We stay focused on real people in real companies with problems your product actually solves. We move the relationship on purpose: unknown, then known, then trusted, then the kind of trust that brings referrals, expansions, and renewals without a campaign forcing it.
          </p>

          <p style={{ marginBottom: 32 }}>
            We also believe the best companies know exactly who they serve.
            Every system we build is designed around that principle. Who are we
            trying to reach? Who are we building trust with? Who do we want to
            still be talking to in three years?
          </p>

          <p style={{ marginBottom: 32 }}>
            Focus is not a slide. It is a discipline, and it is hardest to keep when growth feels urgent.
          </p>

          <p style={{ marginBottom: 32 }}>
            We use AI and automation so that discipline can scale. Growth is hard enough. We are here so the hard work you already did keeps working.
          </p>

          <p
            style={{
              marginBottom: 0,
              color: "#F5F0E8",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            That's why we built ERA.
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
            Justin Marshall, Founder
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
            href="#contact"
            onClick={(e) => { e.preventDefault(); navigate("/#contact"); }}
            style={{
              color: "#F5F0E8",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Start a conversation
          </a>
        </div>
      </div>
    </div>
  );
}
