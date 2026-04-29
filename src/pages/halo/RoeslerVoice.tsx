import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SLUG = "roesler";
const AUTH_KEY = "halo-roesler-auth";
const VOICE_STATE_KEY = "halo:roesler:voice_state_calibrated";

type RoundOption = {
  label: "A" | "B";
  post_text: string;
  tags: string[];
};

type Round = {
  round: number;
  dimension: string;
  source: "stephen_specific" | "halo_default";
  calendar_post_reference?: number;
  option_a: RoundOption;
  option_b: RoundOption;
  weight: number;
};

type Choice = {
  round: number;
  dimension: string;
  selected: "A" | "B" | "neither";
  response_time_ms: number;
};

type DimensionPreference = {
  preference: string;
  confidence: "low" | "moderate" | "strong";
  notes: string[];
};

type VoiceState = {
  client_slug: string;
  version: "calibrated";
  generated_at: string;
  preferences: Record<string, DimensionPreference>;
  neither_flags: Choice[];
  operator_review_required: boolean;
};

function calibrate(choices: Choice[], rounds: Round[]): VoiceState {
  const preferences: Record<string, DimensionPreference> = {};
  const neitherFlags: Choice[] = [];

  for (const choice of choices) {
    const round = rounds.find((r) => r.round === choice.round);
    if (!round) continue;

    if (choice.selected === "neither") {
      neitherFlags.push(choice);
      continue;
    }

    const chosenOption =
      choice.selected === "A" ? round.option_a : round.option_b;
    const primaryTag = chosenOption.tags[0];

    const isFastChoice = choice.response_time_ms < 5000;
    const isSlowChoice = choice.response_time_ms > 15000;

    let confidence: "low" | "moderate" | "strong" = "moderate";
    if (isFastChoice) confidence = "strong";
    else if (isSlowChoice) confidence = "low";

    if (!preferences[round.dimension]) {
      preferences[round.dimension] = {
        preference: primaryTag,
        confidence,
        notes: [
          `Round ${round.round}: chose ${primaryTag} (${choice.response_time_ms}ms)`,
        ],
      };
    } else {
      const existing = preferences[round.dimension];
      if (existing.preference === primaryTag) {
        existing.confidence = "strong";
        existing.notes.push(
          `Round ${round.round}: confirmed ${primaryTag} (${choice.response_time_ms}ms)`
        );
      } else {
        existing.confidence = "moderate";
        existing.notes.push(
          `Round ${round.round}: chose ${primaryTag}, conflicts with prior round preference of ${existing.preference}. Operator review.`
        );
      }
    }
  }

  return {
    client_slug: SLUG,
    version: "calibrated",
    generated_at: new Date().toISOString(),
    preferences,
    neither_flags: neitherFlags,
    operator_review_required:
      Object.values(preferences).some((p) =>
        p.notes.some((n) => n.includes("Operator review"))
      ) || neitherFlags.length >= 3,
  };
}

function OptionCard({
  option,
  onClick,
}: {
  option: RoundOption;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white border border-[#D7DADD] hover:border-[#B85C4A] transition-colors p-6 md:p-8 cursor-pointer group"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B6670] group-hover:text-[#B85C4A] mb-4 transition-colors">
        Option {option.label}
      </p>
      <div className="text-base leading-relaxed whitespace-pre-line text-[#383838]">
        {option.post_text}
      </div>
      <div className="mt-6 pt-4 border-t border-[#D7DADD]">
        <p className="text-sm font-bold text-[#383838] group-hover:text-[#B85C4A] transition-colors">
          Choose {option.label} →
        </p>
      </div>
    </button>
  );
}

export default function RoeslerVoice() {
  const navigate = useNavigate();

  // Gate-check on mount. Voice flow is only reachable post-unlock.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(AUTH_KEY) !== "ok") {
      navigate("/halo/roesler", { replace: true });
    }
  }, [navigate]);

  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [neitherCount, setNeitherCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roundStartTime = useRef<number>(Date.now());

  useEffect(() => {
    document.title = "Voice discovery / Halo";
    fetch(`/data/${SLUG}/stephen_voice_pairs.json`)
      .then((res) => {
        if (!res.ok) throw new Error("pairs_load_failed");
        return res.json();
      })
      .then((data) => {
        setRounds(data.rounds);
        roundStartTime.current = Date.now();
      })
      .catch(() => setError("Could not load voice pairs."));
  }, []);

  function recordChoice(selected: "A" | "B" | "neither") {
    const round = rounds[currentRoundIndex];
    if (!round) return;

    const choice: Choice = {
      round: round.round,
      dimension: round.dimension,
      selected,
      response_time_ms: Date.now() - roundStartTime.current,
    };

    const newChoices = [...choices, choice];
    setChoices(newChoices);

    if (selected === "neither") {
      setNeitherCount(neitherCount + 1);
    }

    if (currentRoundIndex === rounds.length - 1) {
      finalize(newChoices);
    } else {
      setCurrentRoundIndex(currentRoundIndex + 1);
      roundStartTime.current = Date.now();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  function finalize(finalChoices: Choice[]) {
    setSubmitting(true);
    try {
      const voiceState = calibrate(finalChoices, rounds);
      localStorage.setItem(VOICE_STATE_KEY, JSON.stringify(voiceState));
      // Brief calibrating screen for affect, then send to dashboard.
      setTimeout(() => {
        navigate("/halo/roesler/calendar");
      }, 1200);
    } catch {
      setError("Something went wrong calibrating your choices. Refresh to try again.");
      setSubmitting(false);
    }
  }

  if (rounds.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-[#F6F5F2] text-[#383838] flex items-center justify-center">
        <p className="text-sm text-[#5B6670] italic">Loading voice pairs.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F5F2] text-[#383838] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-base mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#383838] text-[#F6F5F2] px-6 py-3 font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen bg-[#F6F5F2] text-[#383838] flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B85C4A]">
            Calibrating
          </p>
          <p className="text-base">
            Building your voice profile.
          </p>
          <p className="text-sm text-[#5B6670] italic">
            One moment.
          </p>
        </div>
      </div>
    );
  }

  const round = rounds[currentRoundIndex];
  const progress = ((currentRoundIndex + 1) / rounds.length) * 100;

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#383838]">
      <div className="w-full h-1 bg-[#D7DADD]">
        <div
          className="h-full bg-[#B85C4A] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="flex justify-between items-baseline mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B85C4A]">
            Voice discovery
          </p>
          <p className="text-sm text-[#5B6670] tabular-nums">
            Round {currentRoundIndex + 1} of {rounds.length}
          </p>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Which one sounds more like you?
        </h1>
        <p className="text-sm text-[#5B6670] italic mb-12">
          Pick the version you would be more comfortable posting under your own name.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <OptionCard
            option={round.option_a}
            onClick={() => recordChoice("A")}
          />
          <OptionCard
            option={round.option_b}
            onClick={() => recordChoice("B")}
          />
        </div>

        <div className="text-center">
          <button
            onClick={() => recordChoice("neither")}
            className="text-sm text-[#5B6670] underline hover:text-[#383838] transition-colors"
          >
            Neither sounds like me
          </button>
          {neitherCount >= 3 && (
            <p className="text-xs text-[#5B6670] italic mt-2">
              Picked &quot;neither&quot; on a few rounds. We will flag those for manual review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
