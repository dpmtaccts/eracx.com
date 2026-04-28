import { Link } from "react-router-dom";

type Props = {
  slug: string;
  clientName: string;
  company: string;
};

export default function HaloWelcome({ slug, clientName, company }: Props) {
  const firstName = clientName.split(" ")[0];

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#383838]">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B85C4A] mb-6">
          ERA / HALO / Build mode
        </p>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          Welcome, {firstName}.
        </h1>

        <div className="w-16 h-px bg-[#B85C4A] mb-10" />

        <div className="space-y-5 text-base md:text-lg leading-relaxed text-[#383838]">
          <p>
            Most of our clients land here after we have audited a year of their
            LinkedIn activity. You do not have a year of LinkedIn activity to
            audit. That is fine. It changes the order of operations.
          </p>

          <p>
            We are not analyzing what you have posted. We are calibrating what
            you should post. The next 15 minutes are the most important 15
            minutes of this engagement, because everything downstream runs off
            what you choose here.
          </p>

          <p>
            You will read 15 short pairs of LinkedIn posts. Each pair is two
            versions of the same idea, written in two slightly different
            voices. Pick the one that sounds more like you. There are no wrong
            answers. We are not testing your taste. We are building a profile
            of yours.
          </p>

          <p>
            Some of the posts will be ours. Some of them will be variants we
            wrote on purpose to test a specific decision. Five of the pairs use
            drafts already in your content calendar. The other ten are
            standard.
          </p>

          <p>
            When you are done, we will have a calibrated voice profile for{" "}
            {company}. Every draft we generate from this point uses it. You
            review drafts in Slack. You approve, edit, or kill. We schedule.
            Thirty minutes of your time per week, that is the deal.
          </p>
        </div>

        <div className="mt-12 mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B85C4A] mb-4">
            What this produces
          </p>
          <ul className="space-y-3 text-base text-[#383838]">
            <li className="flex">
              <span className="text-[#B85C4A] mr-3 font-bold">·</span>
              <span>
                A voice profile, calibrated from your choices, not from
                adjectives we made up.
              </span>
            </li>
            <li className="flex">
              <span className="text-[#B85C4A] mr-3 font-bold">·</span>
              <span>
                Ten LinkedIn posts for the next five weeks, regenerated against
                your voice profile, ready for your review.
              </span>
            </li>
            <li className="flex">
              <span className="text-[#B85C4A] mr-3 font-bold">·</span>
              <span>
                A schedule that anchors to AICP Week NYC and your existing
                travel cadence.
              </span>
            </li>
            <li className="flex">
              <span className="text-[#B85C4A] mr-3 font-bold">·</span>
              <span>
                A feedback loop. Every edit you make on a draft updates the
                voice profile. The system gets closer to publish-ready every
                week.
              </span>
            </li>
          </ul>
        </div>

        <Link
          to={`/halo/${slug}/voice`}
          className="inline-block bg-[#383838] text-[#F6F5F2] px-8 py-4 text-base font-bold tracking-wide hover:bg-[#1a1a1a] transition-colors"
        >
          Start voice calibration
        </Link>

        <p className="mt-4 text-sm text-[#5B6670] italic">
          Roughly 15 minutes. No save state for v1, so plan to do it in one
          sitting. We will email you a link to come back if anything breaks.
        </p>

        <div className="mt-20 pt-6 border-t border-[#D7DADD]">
          <p className="text-xs text-[#5B6670] text-center tracking-wide">
            ERA / GTM SYSTEMS FOR B2B COMPANIES / ERACX.COM
          </p>
        </div>
      </div>
    </div>
  );
}
