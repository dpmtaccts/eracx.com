import Anthropic from "@anthropic-ai/sdk";

export const config = {
  api: { bodyParser: { sizeLimit: "1mb" } },
};

export const maxDuration = 60;

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 1024;

// Convert a calibrated voice_state.preferences object into bullet points
// the model can follow. Falls back gracefully on missing fields.
function preferencesToRules(voiceState) {
  if (!voiceState || !voiceState.preferences) return "(no calibrated preferences)";
  const lines = [];
  for (const [dimension, pref] of Object.entries(voiceState.preferences)) {
    if (!pref || typeof pref !== "object") continue;
    const conf = pref.confidence || "moderate";
    lines.push(`- ${dimension}: ${pref.preference} (${conf} confidence)`);
  }
  return lines.length ? lines.join("\n") : "(no calibrated preferences)";
}

function buildPrompt({ seed_draft, voice_state, edited_draft, placeholder_fills }) {
  const rules = preferencesToRules(voice_state);
  const fillsBlock = placeholder_fills && Object.keys(placeholder_fills).length
    ? `\nPLACEHOLDER FILLS (interpolate these where the seed has matching tokens):\n${Object.entries(placeholder_fills).map(([k, v]) => `- ${k}: ${v}`).join("\n")}\n`
    : "";
  const editedBlock = edited_draft
    ? `\nSTEPHEN'S EDITED VERSION (use this as the starting point, not the original seed):\n${edited_draft}\n`
    : "";

  return `You are rewriting a LinkedIn post draft in Stephen Roesler's calibrated voice.

VOICE PROFILE (preferences derived from a 15-round A/B calibration):
${rules}

GLOBAL ANTI-RULES (never violate):
- No em dashes anywhere. Use periods or commas.
- No three short declarative sentences in a row.
- No business-tie-in endings.
- No buzzwords (synergy, leverage, unlock, paradigm shift, game-changer, 10x).
- No filler intros (hope you are well, just wanted to share, I have been thinking about).
- No thought-leadership framing (Here are 5 lessons from..., The 3 things every CMO needs to know about...).
- No CTA endings (what do you think, drop a comment, DM me).
- No numbered list hooks.

SEED DRAFT (the post in its current form):
${seed_draft}
${editedBlock}${fillsBlock}
Rewrite the post in Stephen's calibrated voice. Maintain the core idea, the specific details, and roughly the same length. Output only the rewritten post text. No preamble, no explanation, no quotation marks around the result.`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const body = req.body || {};
  const { post_number, seed_draft, voice_state, edited_draft, placeholder_fills } = body;

  if (typeof post_number !== "number") {
    return res.status(400).json({ success: false, error: "Missing post_number" });
  }
  if (typeof seed_draft !== "string" || seed_draft.length === 0) {
    return res.status(400).json({ success: false, error: "Missing seed_draft" });
  }
  if (!voice_state || typeof voice_state !== "object") {
    return res.status(400).json({ success: false, error: "Missing voice_state" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "ANTHROPIC_API_KEY not set on the server",
    });
  }

  const prompt = buildPrompt({ seed_draft, voice_state, edited_draft, placeholder_fills });

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: "user", content: prompt }],
    });

    const block = (message.content || []).find((b) => b.type === "text");
    const draft = block ? block.text.trim() : "";

    if (!draft) {
      return res.status(502).json({
        success: false,
        error: "Model returned no text content",
      });
    }

    return res.status(200).json({ success: true, draft });
  } catch (err) {
    console.error(`[halo/voice-regen] post ${post_number} failed`, err);
    const status = err && err.status ? err.status : 502;
    const message = err && err.message ? err.message : "Anthropic API call failed";
    return res.status(status).json({ success: false, error: message });
  }
}
