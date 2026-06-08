import type { Statement } from './types'

/* The seven statements. Order is the recommendation.
   Copy authored to the spec, gender-neutral. No em dashes. */

export const STATEMENTS: readonly Statement[] = [
  {
    n: 1,
    kind: 'frame',
    anchor: 'frame',
    headline: 'Your buyer decides across eleven surfaces before they ever talk to you.',
    leadLine:
      'Composite Buyer Trust Score 32 of 100, leaky. Most of these surfaces you do not control. Trust is built or broken in the center, where the buyer’s attention lands.',
    impact: null,
    scope: null,
    verdict: 'THE FRAME · EVERY STATEMENT BELOW NESTS UNDER THIS ONE',
    drawer: {
      insight:
        'Across eleven surfaces the buyer checks before first contact, buyer trust reads at 32. The strongest signals sit at the credible center: LinkedIn personal, AI agents, reviews. The center is where promise breaks the loudest.',
      meaning:
        'The buyer forms most of their opinion before sales is in the room. Around 77 percent of buyers finish the decision in twelve weeks, mostly before first contact. The chart is what they encountered while you were not watching.',
      execute: {
        from: 'A buyer view of 32 scattered across surfaces you do not control.',
        to: 'A center the buyer can verify, repaired in the order the rest of this list sets.',
        steps: ['Every statement below nests under this one.'],
      },
      assumptions:
        'The seismograph weights impact magnitude and credibility, not volume. Center channels carry the most weight because that is where buyer attention concentrates during diligence. Built on the channel reads in the data file, not BetterUp internal data.',
      bento: { kind: 'seismograph' },
    },
  },
  {
    n: 2,
    kind: 'move',
    anchor: 'leaders',
    headline:
      'The buyer searches your team on LinkedIn and finds your CEO, almost no one else.',
    goDos: [
      'Activate five to seven executive voices on a weekly cadence.',
      'Build a named CHRO 100 list and engage substantively before expecting reciprocity.',
      'Equip senior account executives to post their own substance, not company reposts.',
    ],
    impact: 'high',
    scope: 'low',
    verdict: 'HIGH IMPACT · LOW EFFORT · HIGHEST LEVERAGE',
    highestLeverage: true,
    drawer: {
      insight:
        'Five of six profile types the buyer expects to find are silent or invisible. Two of twenty-one voices publish original content. The rest repost or say nothing.',
      meaning:
        'The agent reads the silence as inconsistency and lowers its confidence in you. The buyer finds titles, not perspectives.',
      execute: {
        from:
          'The CEO posts into a room of the company’s own employees and alumni, zero enterprise buyers in the comments, while twenty of twenty-one senior voices stay silent.',
        to:
          'Five to seven executive voices publish on a cadence, the named buyers in Statement 06 show up in the comments, and the buyer can triangulate more than one perspective before first contact.',
        steps: [
          {
            title: 'Reframe the CEO’s content from philosophy to operational outcomes.',
            body:
              'That audience is currently internal. Outcome stories and a category point of view are what a CHRO engages, not the abstract uplift language those same employees applaud. Cadence: one original post a week, plus three substantive peer comments a week on buyers’ and category content.',
          },
          {
            title: 'Activate five to seven executive voices beyond the CEO.',
            body:
              'Two of twenty-one publish originals today. Stand up a weekly cadence for the senior People, Sales, and Product voices: roughly one post every other week each, plus five peer comments a week, so the buyer can find more than one perspective.',
          },
          {
            title: 'Build and work the CHRO 100.',
            body:
              'The twelve named buyers in Statement 06 are the live seed list. Engage their content substantively, thirty-plus real comments over the quarter, before expecting anything back.',
          },
          {
            title: 'Equip sellers to post their own substance, not company reposts.',
            body: 'Two posts a month each, in their own words.',
          },
        ],
        effort: 'Estimated 20–45 hrs to stand up, plus an ongoing production cadence.',
      },
      assumptions:
        'Ranked highest leverage because Leaders carries the most score weight at 35 percent and sits lowest at 24, and the fix is cheap, an executive cadence inside four weeks. Rests on a roughly 30 percent reach lift for originals over reshares, observed across comparable engagements, not BetterUp data.',
      bento: { kind: 'rich', slot: 'leaders' },
    },
  },
  {
    n: 3,
    kind: 'move',
    anchor: 'agents',
    headline: 'When the buyer asks an AI agent about you, it repeats old data from 2023.',
    goDos: [
      'Correct discontinued offerings, wrong headcount, and dead logos at the public source.',
      'Clean Crunchbase, the LinkedIn company page, Wikipedia, and G2.',
      'Re-run the agent read to confirm the answer moved.',
    ],
    impact: 'high',
    scope: 'low',
    verdict: 'HIGH IMPACT · LOW EFFORT',
    drawer: {
      insight:
        'Sharing accurate data is table stakes. The problem is not the absence of truth, it is the presence of skew: stale and wrong data already in the world that the models gather and repeat. Correcting your own pages does not fix that, because the stale source still sits in the corpus the model reads. A majority of buyers now start at an AI agent, and most rank vendors before they ever contact sales. The model’s answer is the buyer’s first impression, formed before your team is in the room.',
      meaning:
        'You do not control the model. You control what it weights. Models resolve conflicting claims by source agreement, recency, and authority. So you win the synthesis by making the truth the most authoritative, most recent, and most cross-referenced signal in the corpus. When every legitimate source agrees on the same true fact, the lone stale source becomes the outlier the model discounts. AI synthesis exposes inconsistency, so make the truth so consistent across sources that the synthesis exposes the stale data as the inconsistency, not you.',
      execute: {
        from:
          'Four agents repeat a dead $14 app, stale headcount, and 2023 logos because the false signal in the corpus outweighs the true one. Mirror Score 38.',
        to:
          'The truth is the heaviest, most-agreed signal the models read, the stale source is the outlier the synthesis discounts, and a standing monitor catches new skew before it sets. Mirror Score re-tested after one index cycle and tracked over time.',
        steps: [
          {
            title: 'Sort the skew before you touch anything.',
            body: [
              'Run a fixed buyer-mode query set against all four agents: what is BetterUp, how much does it cost, how big is it, who are its customers, and BetterUp versus a named competitor (CoachHub, Torch, Ezra). Log each claim verbatim and trace it to the source serving it.',
              'Then sort every skewing input into two bins. False skew: dead app, wrong headcount, 2023 logos, discontinued product. Correctable, and this initiative owns it. True skew: the Glassdoor read, the revenue decline, anything the proof actually supports. Not a hygiene problem and not yours to scrub. Route it to Statement 05.',
              'This sort is the first move and the honesty boundary in one. The moment the initiative tries to stop a model from gathering a true but unflattering fact, it becomes the astroturf the Buyer View sells against, and it fails anyway, because the contradiction is real.',
            ],
          },
          {
            title: 'Build the authoritative source layer.',
            body: [
              'Make the sources the models trust most carry the verified truth, structured the way machines read first. Organization schema (JSON-LD) on the homepage and About page: current numberOfEmployees, the discontinued product stripped from hasOfferCatalog, the current enterprise offerings listed, and sameAs pointing to the corrected Crunchbase, LinkedIn, Wikidata, and G2 URLs.',
              '301 the dead product pages to the current enterprise page; if one must stay for SEO, kill the price and add a sunset notice, because a live page with a price is a price an agent will quote. One canonical facts page in plain crawlable text, so every other source has a clean primary to cite.',
              'Verifying and publishing the current figures happens here. It is part of the work, not a precondition for it.',
            ],
          },
          {
            title: 'Manufacture consensus across the corpus.',
            body: [
              'This is the core move. Get every legitimate source to say the same true thing, so the model sees agreement and the stale source becomes the outlier.',
              'Crunchbase claimed and corrected. LinkedIn company page updated. Wikidata statements edited with references, because it rejects unreferenced edits on contested fields: employee count (P1128), official website (P856), the product statements, each cited to the facts page from move 2. G2 and Capterra profiles claimed, descriptions and categories corrected, screenshots refreshed to the enterprise product. Google Knowledge Panel claimed through Search Console.',
              'The point is not any one edit. It is that they all agree.',
            ],
          },
          {
            title: 'Displace what you cannot edit.',
            body: [
              'You cannot delete a Reddit thread or a 2023 article, so you outweigh it.',
              'Wikipedia by the rules: you cannot edit your own page without a conflict-of-interest reversion, so build a correction memo as a table (claim, current wording, correct fact, citation), post it to the Talk page from a declared COI account or route it through a neutral editor, and know it lands over weeks. Wikipedia will not take your own site as the source for a contested fact, so you need a reliable secondary source, which is the other job here: identify or seed the one or two authoritative articles Wikipedia and the agents will treat as canonical.',
              'Press triage: request corrections where a publication states a factual error, leave the stale but not wrong, and let fresher content outrank it. Replace the dead customer references on the owned page and resubmit current ones.',
            ],
          },
          {
            title: 'Make it standing, not one-time.',
            body: [
              'Models re-crawl and new skew appears. Submit re-crawl requests in Search Console for every page you changed, wait one index cycle, re-run the exact query set from move 1, score the Mirror Score delta, and log which sources updated and which lagged.',
              'Then run it on a cadence. The initiative is a monitor, not a project. It is how you catch the next stale source before it sets.',
            ],
          },
        ],
        boundary:
          'No fabrication, no manufactured sources, no fake reviews, no gaming a model into saying something untrue. The initiative wins by making truth the most available and authoritative signal, not by manipulating the synthesis. Where the skew is true, you do not fight the model, you fix the reality. That boundary is the difference between this and spam, and it is the same line that protects every reality-gap card.',
        effort:
          'Estimated 20–45 hrs to stand up the correction, plus an ongoing monitoring cadence. The initial fix is bounded, the standing monitor is not.',
      },
      assumptions:
        'Scoped low because this is a data-correction pass against an authoritative source layer, not a content program. Ranked here, not as the top move, because Agents carries only 15 percent weight in the composite. The fix is fast and the error is embarrassing on a credible center channel.',
      bento: { kind: 'rich', slot: 'agents' },
    },
  },
  {
    n: 4,
    kind: 'move',
    anchor: 'content',
    headline: 'The content you produce reaches the buyers who already believe you.',
    goDos: [
      'Audit content categories against the questions buyers ask at the decision stage.',
      'Introduce pricing context the buyer can actually use.',
      'Own the comparison content before the comparison sites do.',
    ],
    impact: 'medium',
    scope: 'medium',
    verdict: 'MEDIUM IMPACT · MEDIUM EFFORT',
    drawer: {
      insight:
        'Seven of eight content categories score below 50 percent alignment with what buyers actually search at the decision stage. The content investment reaches the audience that already believes in coaching, not the one still deciding.',
      meaning:
        '84 percent of category conversation is emotionally neutral, curiosity not enthusiasm. The buyer reads every pitch through that flatline. Content that opens with "AI-powered" lands as someone who drank the Kool-Aid.',
      execute: {
        from:
          'Content averages 29 of 100, plays to an audience that already bought, and leads with "AI-powered" to a buyer who has heard it two hundred times.',
        to:
          'Content answers the questions a CHRO asks at the decision stage, leads with the one proof point that scores, and meets the buyer’s comparison and cost questions before the review sites do.',
        steps: [
          {
            title: 'Audit the eight content categories against decision-stage questions.',
            body:
              'A CHRO at the decision stage is not asking the dream-stage questions. Output: kill, reframe, or build, per category, using the alignment scores already on the card.',
          },
          {
            title: 'Lead with the one signal that works.',
            body:
              'BetterUp Grow at 95 percent satisfaction is the strongest and most underused asset on the page. Build outcome case studies around the human-plus-AI hybrid. Lead with human, substantiate with AI.',
          },
          {
            title: 'Kill "AI-powered" as the lede.',
            body:
              'The buyer is 96.6 percent neutral on AI coaching because they have heard it everywhere. Reframe from "AI will change everything" to what it costs, what it returns, and what changed for a comparable buyer.',
          },
          {
            title: 'Own the comparison content before G2 and the review sites do.',
            body:
              'Publish your honest BetterUp-versus-CoachHub, Torch, Ezra, and Valence framing so the buyer meets your version first.',
          },
          {
            title: 'Pricing is the edge case.',
            body:
              'Pricing Signal sits at 15 and the agents call you opaque and expensive. The comms move is usable cost and ROI framing, [[SLOT: VERIFIED CURRENT PRICING MODEL]]. If leadership will not allow any pricing transparency, this stops being a content fix and becomes a reality gap, and the score will not move. Hand that decision up.',
          },
        ],
        effort: 'Estimated 45–90 hrs, plus an ongoing content cadence.',
      },
      assumptions:
        'Medium on both axes because the team and the tooling exist, the gap is editorial direction, not capacity. Ranked below Leaders and Agents because content compounds slower than fixing who publishes and what the agent reads.',
      bento: { kind: 'rich', slot: 'content' },
    },
  },
  {
    n: 5,
    kind: 'move',
    anchor: 'employees',
    headline: 'Your own employees contradict your promise, and it is searchable.',
    goDos: [
      'Close the values-reality gap inside HR before spending more on marketing.',
      'Invest visibly in coach-community advocacy as the counter-signal.',
      'Engage the reviews publicly and substantively.',
    ],
    impact: 'high',
    scope: 'high',
    verdict: 'HIGH IMPACT · HIGH EFFORT · STRUCTURAL',
    drawer: {
      insight:
        'The buyer checks Glassdoor before ever talking to sales. They find a 3.2, coaches surfacing pay disputes in the same forums they search, and account managers churning through accounts three or more times in twelve months.',
      meaning:
        'The contradiction between your brand promise and what your own people say is public, searchable, and currently unanswered.',
      execute: {
        from:
          'The careers page and executive posts lead with "elevate the employee experience" while the most-read reviews say the opposite, and a buyer finds the gap in one search.',
        to:
          'The external claim matches what the reviews can currently prove, the loudest negative theme has lost share, and authentic employee voice is visible without being manufactured.',
        steps: [
          {
            title: 'Read the review and coach-community themes as data.',
            body:
              'Pull the recent reviews across Glassdoor, Indeed, and Comparably, and code the recurring themes: pay disputes, communication breakdowns, the "doesn’t practice what it preaches" line, and the account-manager churn. Rank by frequency and recency. You are locating the gap, not chasing the 3.2.',
          },
          {
            title: 'Name the part marketing cannot fix and hand it up.',
            body:
              'Employee Signal at 12 and the cascade break at 22 are operational: pay, comms, and the account-manager churn cited three-plus times in twelve months. That work sits with People and leadership and runs over quarters. Stop spending marketing dollars amplifying a promise the proof contradicts until it moves.',
          },
          {
            title: 'Shrink the delta from the promise side meanwhile.',
            body:
              'If the internal reality cannot change fast, stop over-amplifying "elevate the employee experience" on surfaces where the buyer finds the 3.2 in the same search.',
          },
          {
            title: 'Engage the reviews publicly and specifically.',
            body:
              'Responses that name the issue and the change underway shift perception. Generic "thanks for the feedback" replies make it worse.',
          },
          {
            title: 'Fix the advocacy base before asking it to advocate.',
            body:
              'Coach loyalty is at 60 and declining, so the counter-signal is eroding. Repair it operationally first. No solicited reviews, no astroturf. If the authentic positive voices are not there in volume, that is itself the finding, and you are back at step two.',
          },
        ],
        effort:
          'Estimated 20–45 hrs agency-executable scope only. The real cost is client-side, structural, and measured in quarters.',
      },
      assumptions:
        'High effort because this is culture and operations, not a content fix, and it sits outside marketing’s direct control. Ranked here, not first, because the leverage moves above buy time and movement while the structural work runs.',
      bento: { kind: 'rich', slot: 'employees' },
    },
  },
  {
    n: 6,
    kind: 'urgency',
    anchor: 'buyers',
    headline:
      'Twelve senior buyers are already paying attention. Six of your voices are catching them.',
    goDos: [
      'Stand up the infrastructure to receive the attention that already exists.',
      'Distribute the relationships beyond the two or three voices carrying them now.',
    ],
    impact: 'high',
    scope: 'low',
    verdict: 'HIGH IMPACT · LOW EFFORT · WHY NOW',
    drawer: {
      insight:
        'Twelve named buyers, VPs of HR, Chief People Officers, and a sitting CEO, engaged with BetterUp content unprompted in the window. The relationships concentrate on two or three voices, primarily Jolen Anderson, Chief People and Community Officer.',
      meaning:
        'The demand is live right now, not next quarter. The buyers exist and the interest exists. The infrastructure to receive it does not. If the two voices carrying these relationships left, the public-facing buyer relationships would collapse with them.',
      execute: {
        from:
          'Twelve named buyers are engaging unprompted, six of them concentrated on a single executive’s feed, with no system to receive or route the attention.',
        to:
          'Each named buyer is mapped to the voices catching them, single-point-of-failure relationships are distributed across two or three voices, and a defined follow-up runs when a buyer engages.',
        steps: [
          {
            title: 'Map the twelve to the voices catching them and flag every single-point-of-failure relationship.',
            body:
              'Six on one voice is the risk: if that executive leaves, six relationships leave with them.',
          },
          {
            title: 'Build the reception infrastructure.',
            body:
              'The demand exists, the system to route it does not. Define what happens when a named buyer engages: who follows up, how, and on what cadence.',
          },
          {
            title: 'Distribute the relationships beyond the two or three voices.',
            body:
              'Get second and third executives and senior sellers engaging the same buyers’ content so the relationship survives a departure.',
          },
          {
            title: 'Run it as the same list as the CHRO 100 in Statement 02.',
            body: 'Do not stand up two systems for the same twelve people.',
          },
        ],
        effort:
          'Estimated 20–45 hrs to stand up, plus a relationship cadence. The low-effort read is right because you are building reception, not demand.',
      },
      assumptions:
        'Low effort because the buyers are already engaging. You are building reception, not demand. Ranked near the close because it is the reason to act now, the proof that the leverage above pays off against live attention.',
      bento: { kind: 'rich', slot: 'buyers' },
    },
  },
  {
    n: 7,
    kind: 'closer',
    anchor: 'closer',
    headline: 'Treat this as a measurement you hold, not a project you finish.',
    goDos: [
      'Re-run the audit quarterly and report the Buyer Trust Score movement.',
      'Let the board budget against the score the way it budgets against revenue.',
    ],
    impact: 'very-high',
    scope: 'low-medium',
    verdict: 'COMPOUNDS · TURNS THE LIST INTO A PROGRAM',
    drawer: {
      insight:
        'Three decisions move the Buyer Trust Score from 32 to 58 and recover 12 to 18 points of qualified-stage pipeline leaking before sales contact. The fourth decision, treating it as a measurement, is what makes the movement repeatable.',
      meaning:
        'Without the quarterly read, the score moves once and drifts back. With it, the score becomes a governance artifact the board can budget against, and the CMO defends marketing spend with a quantitative read on whether trust is rising or falling.',
      execute: {
        from: 'A one-time read of 32.',
        to: 'A standing instrument that reaches 58 and holds.',
        steps: [
          'Re-measure quarterly.',
          'Report the movement.',
          'Budget against it.',
          'Treat the roadmap as a prognosis, not a committed delivery schedule.',
        ],
      },
      assumptions:
        'Very high impact because it is the difference between a one-quarter bump and a compounding asset. Low-to-medium effort because the measurement reuses the capture already built. The score trajectory 32, 41, 51, 58 assumes the three decisions land in sequence.',
      bento: { kind: 'rich', slot: 'closer' },
    },
  },
]
