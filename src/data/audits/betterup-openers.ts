import type { SectionOpenerData } from './types'

/**
 * Per-section opener content for the BetterUp audit. Keys correspond to the
 * existing FULL-view anchor ids on /audit/betterup:
 *   - "cascade"  → What employees say about you (score 41)
 *   - "leaders"  → What your leaders publish (score 24)
 *   - "signals"  → What you publish about yourself (score 29)
 *   - "mirror"   → What agents say about you (score 38)
 *   - "audience" → Audience Reality (no diagnostic score)
 *
 * Benchmark fields are intentionally absent. The deep-research pass will add
 * them as it returns; the Standard block renders without the dashed-border
 * sub-block when `benchmark` is undefined.
 */
export const BETTERUP_OPENERS: Record<string, SectionOpenerData> = {
  cascade: {
    sectionName: 'What employees say about you',
    sectionScore: 41,
    sectionHeadline:
      "What your own employees say about you doesn't match what you say about you.",
    problemStat: { value: '3.2/5', label: 'Glassdoor rating' },
    problemHeadline: 'Glassdoor reads at 3.2 of 5. Buyers find it before they find you.',
    problemProse:
      'Your buyer checks Glassdoor before she ever talks to your sales team. She finds a 3.2 rating, coaches surfacing pay disputes in the same forums prospective buyers search, and account managers churning through accounts three or more times in twelve months. The contradiction between your brand promise and what your own people say is public, searchable, and currently unanswered.',
    standardStat: { value: '1 voice', label: 'Internal = external' },
    standardHeadline:
      'Internal experience and external promise read as the same company.',
    standardProse:
      "When the chain is intact, the CHRO's due diligence reinforces your brand instead of refuting it. Employee reviews echo what marketing publishes. Frontline behavior carries the promise into customer interactions instead of working against it. The buyer reads the same company across every surface she checks.",
    actionHeadline: 'Close the values-reality gap before improving the marketing.',
    actionSteps: [
      "Address the employee experience inside HR. Marketing can't fix what's structurally broken inside the company.",
      'Invest visibly in coach community advocacy. The coaches are your best counter-signal to the Glassdoor narrative.',
      'Stop letting the Glassdoor contradiction echo unanswered. Engage the reviews, publicly and substantively.',
    ],
  },

  leaders: {
    sectionName: 'What your leaders publish',
    sectionScore: 24,
    sectionHeadline:
      'When the buyer searches your team on LinkedIn, she finds your CEO and almost no one else.',
    problemStat: { value: '5/6', label: 'Profiles silent' },
    problemHeadline:
      'Five of six profile types your buyer expects to find are silent or invisible.',
    problemProse:
      "Your buyer expects to find a chain of voices when she searches LinkedIn for your team: the CEO, the marketing leader, the sales leader, account managers, senior account executives, and client champions. She finds the CEO. After that the trail goes cold. SVP Marketing publishes three times in twelve months, all of it event promotion. Account managers and enterprise reps publish nothing she can use.",
    standardStat: { value: '5–7', label: 'Voices, not one' },
    standardHeadline: 'A chain of differentiated voices the buyer can verify across her view of you.',
    standardProse:
      'When the chain is intact, the marketing leader publishes strategy, sales leaders publish deal patterns, and senior account executives add the customer substance underneath both. The buyer encounters a chain instead of a megaphone, and the cascade reads as a company with one voice that knows what it’s doing rather than a CEO carrying the brand alone.',
    actionHeadline: 'Distribute the brand across the people the buyer already knows how to find.',
    actionSteps: [
      'Activate 5 to 7 executive voices on LinkedIn, posting original content weekly.',
      'Build a CHRO 100 list. Engage substantively with their content before expecting reciprocity.',
      'Equip senior account executives to post their own substance, not reposts of company content.',
    ],
  },

  signals: {
    sectionName: 'What you publish about yourself',
    sectionScore: 29,
    sectionHeadline:
      "The content you're producing isn't reaching buyers when they're deciding.",
    problemStat: { value: '29%', label: 'Avg alignment' },
    problemHeadline:
      'Seven of eight content categories score below 50% alignment with what buyers actually search for.',
    problemProse:
      "What your buyer is searching for at the decision stage and what your content team is publishing about you don't line up. Leadership Visibility sits at 18% alignment with buyer intent. Brand Narrative at 25%. Employee Signal at 12%. The content investment is reaching the audience that already believes in coaching, not the one still deciding.",
    standardStat: { value: 'Buyer-led', label: 'Intent matches output' },
    standardHeadline:
      "Content categories aligned with where the buyer's attention actually lives during research.",
    standardProse:
      'When the alignment is intact, pricing context unblocks self-directed evaluation, competitive comparison content owns the conversation rather than ceding it to the comparison sites, and employee signal counterweights the Glassdoor narrative instead of being absent from it. The buyer finds what she needs without having to ask sales.',
    actionHeadline:
      "Build for the buyer who hasn't decided yet, not the customer who already has.",
    actionSteps: [
      'Audit content categories against the questions buyers are actually asking, not the topics the brand wants to be known for.',
      "Introduce pricing context at the altitude buyers can use it. Right now they're guessing, and the guesses circulate publicly.",
      "Publish comparison content that owns the BetterUp vs. CoachHub vs. Torch vs. Ezra narrative. If you don't write it, the comparison sites do.",
    ],
  },

  mirror: {
    sectionName: 'What agents say about you',
    sectionScore: 38,
    sectionHeadline:
      'When a CHRO asks ChatGPT or Claude about BetterUp, the answer balances praise with caution.',
    problemHeadline:
      'The agent surfaces praise for the product alongside doubt about the organization, in the same answer.',
    problemStat: { value: '38/100', label: 'Agents score' },
    problemProse:
      "When your buyer asks an agent about you, it pulls from Glassdoor, coach forums, pricing speculation, and competitor comparisons. It synthesizes all of it into one answer balanced toward proceed with caution. That answer reaches the buyer before any human on your team has the chance to shape it.",
    standardStat: { value: 'Net-positive', label: 'AI leads with proof' },
    standardHeadline:
      'AI summaries lead with enterprise outcomes, cite operational metrics, and reference named wins.',
    standardProse:
      'When the upstream signals are intact, the composite answer surfaces a strong product, a strong organization, and strong evidence. Counter-signals are smaller and older than the proof signals. The buyer reads the agent’s answer and books the call rather than asking three more questions.',
    actionHeadline:
      "Change what the agent reads by changing what's publicly visible.",
    actionSteps: [
      "The agent's answer is downstream of what's published. Close the gaps in what employees, leaders, and your own marketing produce. The agent's answer changes.",
      'There is no prompt engineering shortcut. The fix is in the source data, not in the model.',
      "Re-run the agent's read quarterly to verify the upstream work is landing.",
    ],
  },

  audience: {
    sectionName: 'Audience Reality',
    sectionHeadline:
      "The market your brand thinks it's talking to is not the market that's actually listening.",
    problemStat: { value: '84%', label: 'Emotionally neutral' },
    problemHeadline:
      'Curiosity is the loudest positive signal in your category, not enthusiasm.',
    problemProse:
      "Your buyer is vendor-fatigued. She has heard 200 pitches this year. Curiosity is the loudest positive emotion in coaching-category conversation, and 96.6% of the conversation about AI coaching is emotionally neutral. The empathy score sits at 0.1 out of 100. Her emotional response to coaching marketing has flatlined, and she is reading every new pitch through that flatline.",
    standardStat: { value: 'Proof-led', label: 'Operational language' },
    standardHeadline:
      'Content the buyer would actually save and share internally, not content that generates public likes.',
    standardProse:
      'When the alignment is intact, you lead with the human and substantiate with the AI underneath. Operational language. Named enterprise outcomes. CFO-friendly framing. The content lands as something the buyer would forward to her board, which makes her look like a sharp operator who found an efficiency rather than someone who drank the coaching Kool-Aid.',
    actionHeadline:
      "Stop opening with 'AI-powered,' and lead with what it costs and what it returns.",
    actionSteps: [
      'Reframe content from inspiration to operational proof.',
      "Drop 'AI-powered' as the lede. Lead with the human, substantiated by the AI underneath.",
      'Build for the share test: would the buyer paste this into a board memo?',
    ],
  },
}
