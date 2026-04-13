export const LOOM_EMBED_URL = "https://www.loom.com/embed/9761acde24dd4b82a1e0d5dcf9a6ef5a?speed=1";
export const PITCH_DECK_EMBED_URL = "https://docs.google.com/presentation/d/e/2PACX-1vRI0K744Uun8myV7XDPuxvzW_1WFwEh9epNEWZXmFGvZ2iLjLb2sIzy_ADurXJla2zBgAWZ_YN2qSiL/embed?start=false&loop=false&delayms=3000";
export const PITCH_DECK_PUBLISHED_URL = "https://docs.google.com/presentation/d/e/2PACX-1vRI0K744Uun8myV7XDPuxvzW_1WFwEh9epNEWZXmFGvZ2iLjLb2sIzy_ADurXJla2zBgAWZ_YN2qSiL/pub?start=false&loop=false&delayms=3000";
export const PITCH_DECK_COMMENT_URL = "#";
export const OPERATOR_PLAYBOOK_URL = "https://docs.google.com/document/d/1rDhsnzxF7-mVMHtiSLtcJLCliKeyfRy_ssBTjUz6gCU/edit?tab=t.0";
export const PODCAST_URL = "https://drive.google.com/file/d/1f30txT6nFEEIJHLez8shxNvSDYUv6rUk/view?usp=drive_link";
export const ATLAS_URL = "https://aux.eracx.com/client/sensay";
export const ATLAS_PASSWORD = "sensay2025";

export const ERA_LOGO_URL = "/images/era_final.png";
export const DPMT_LOGO_URL = "/images/dpmt_logo.png";

export const PLAYBOOK_SCREENSHOT_URL = "/images/playbook-screenshot.png";
export const ATLAS_SCREENSHOT_URL = "/images/atlas-screenshot.png";

export const SIGNALS_SCREENSHOT_URL = "/images/signals-screenshot.png";
export const SIGNALS_FEED_SCREENSHOT_URL = "/assets/signals-feed-cropped.png";
export const SIGNALS_COMPANIES_SCREENSHOT_URL = "/assets/signals-companies-cropped.png";
export const MAP_SCREENSHOT_URL = "/images/map-screenshot.png";
export const GTM_DESIGN_SCREENSHOT_URL = "/images/gtm-design-screenshot.png";

export interface KeySlide {
  number: number;
  label: string;
  prompt: string;
}

export interface Reviewer {
  name: string;
  firstName: string;
  greeting: string;
  accent: string;
  /** When set, replaces the Loom video with a linked screenshot */
  heroImage?: { src: string; href: string; alt: string };
  /** Reviewer's domain of expertise */
  expertise?: string;
  /** The specific question we want this reviewer to answer */
  specificAsk?: string;
  /** Curated slides from the deck to focus on */
  keySlides?: KeySlide[];
}

export const REVIEWERS: Record<string, Reviewer> = {
  "jason-burby": {
    name: "Jason Burby",
    firstName: "Jason",
    greeting: "Really appreciate you looking through these, Jason. Your perspective on scaling ops is exactly what I need here.",
    accent: "#1FA7A2",
    expertise: "operational scaling",
    specificAsk: "As we add operators and clients in parallel, does the pod model hold up? Where does it break?",
    keySlides: [
      { number: 7, label: "The Loop System", prompt: "Does this operating model feel scalable, or does it depend too much on individual operator talent?" },
      { number: 10, label: "Pricing", prompt: "Is the tier structure clear? Would you know which one to buy?" },
      { number: 12, label: "Signal Library", prompt: "Are these the right signals, or are we missing something obvious?" },
    ],
  },
  "gus-weigel": {
    name: "Gus Weigel",
    firstName: "Gus",
    greeting: "Thanks for carving out time for this, Gus. Would love your take on the go-to-market model especially.",
    accent: "#B85C4A",
    expertise: "go-to-market strategy",
    specificAsk: "Is the signal-based positioning differentiated enough to survive the next wave of AI-native agencies?",
    keySlides: [
      { number: 3, label: "The Relationship Gap", prompt: "Do these stats land? Would you forward this slide to a colleague?" },
      { number: 6, label: "How the Loops Work", prompt: "Is this framework intuitive or does it need more explanation?" },
      { number: 10, label: "Pricing", prompt: "Does the in-house vs. Era comparison feel honest, or too convenient?" },
    ],
  },
  "ron-carucci": {
    name: "Ron Carucci",
    firstName: "Ron",
    greeting: "Ron, appreciate you reviewing these. Your lens on organizational scaling would be incredibly valuable here.",
    accent: "#D6B26D",
    expertise: "organizational design",
    specificAsk: "Is the operator model an organizational design that scales, or a consulting practice that depends on me?",
    keySlides: [
      { number: 7, label: "The Loop System", prompt: "Can this operating rhythm survive without the founder in every meeting?" },
      { number: 9, label: "Three Loops Overview", prompt: "Is the Connection/Trust/Loyalty framework intuitive to a buyer?" },
      { number: 12, label: "Signal Library", prompt: "Does the signal approach feel systematic or ad hoc?" },
    ],
  },
  "ben-langhans": {
    name: "Ben Langhans",
    firstName: "Ben",
    greeting: "Thanks for digging into these, Ben. Curious what you think about the operator model and overall thesis.",
    accent: "#D43D8D",
    expertise: "revenue operations",
    specificAsk: "Does the unit economics model hold up? Where do the margins get thin as we scale?",
    keySlides: [
      { number: 8, label: "Revenue Model", prompt: "Are these numbers credible? What would you stress-test first?" },
      { number: 10, label: "Pricing", prompt: "Is the floor too high for the entry tier, or is it right for the value delivered?" },
      { number: 12, label: "Signal Library", prompt: "Which of these signals would you prioritize if you could only use five?" },
    ],
  },
  "rick-nash": {
    name: "Rick Nash",
    firstName: "Rick",
    greeting: "Rick, thanks for taking the time. Your experience building revenue teams is exactly the lens I need on this.",
    accent: "#1FA7A2",
    expertise: "revenue team building",
    specificAsk: "If you were a VP Sales at a $25M company, would you hire Era or build this in-house? What tips the decision?",
    keySlides: [
      { number: 4, label: "Six Barriers", prompt: "Which of these barriers resonates most with the VPs of Sales you know?" },
      { number: 7, label: "The Loop System", prompt: "Would your AEs trust this system, or would they resist it?" },
      { number: 10, label: "Pricing", prompt: "Is $15K/mo the right entry point for a company with 5-10 AEs and no SDRs?" },
    ],
  },
  "jason-woodley": {
    name: "Jason Woodley",
    firstName: "Jason",
    greeting: "Appreciate you looking through these, Jason. Would especially value your take on the platform and product strategy.",
    accent: "#B85C4A",
    expertise: "product and platform strategy",
    specificAsk: "Is Atlas a real product, or is it a dashboard dressed up as one? What would make it indispensable?",
    keySlides: [
      { number: 6, label: "How the Loops Work", prompt: "Does the system architecture feel like a platform or a service?" },
      { number: 8, label: "Revenue Model", prompt: "Does the pricing reflect a product or a consultancy?" },
      { number: 12, label: "Signal Library", prompt: "Could this signal framework become a standalone product?" },
    ],
  },
  "chris-marantette": {
    name: "Chris Marantette",
    firstName: "Chris",
    greeting: "Chris, thanks for reviewing these. Your GTM perspective on the overall system would be really helpful.",
    accent: "#D6B26D",
    expertise: "GTM execution",
    specificAsk: "If you were running Era's own outbound, what would the first 90 days look like?",
    keySlides: [
      { number: 3, label: "The Relationship Gap", prompt: "Is this problem framing compelling enough to get a meeting?" },
      { number: 7, label: "The Loop System", prompt: "How would you explain this to a prospect in 60 seconds?" },
      { number: 10, label: "Pricing", prompt: "Is the competitive positioning against in-house build defensible?" },
    ],
  },
  "brian-gonsalves": {
    name: "Brian Gonsalves",
    firstName: "Brian",
    greeting: "Brian, you already know how Era works from the inside. Would love your honest take on where the gaps are in the plan.",
    accent: "#D43D8D",
    expertise: "client experience (active Era client)",
    specificAsk: "What does the plan promise that doesn't match your actual experience? Where is it underselling what you've seen?",
    keySlides: [
      { number: 7, label: "The Loop System", prompt: "Does this match what you've experienced, or is the reality different?" },
      { number: 9, label: "Three Loops Overview", prompt: "Which loop has delivered the most value for you so far?" },
      { number: 10, label: "Pricing", prompt: "Knowing what you know now, would you have paid more? Less? The same?" },
    ],
  },
  "dan-pearce": {
    name: "Dan Pearce",
    firstName: "Dan",
    greeting: "Thanks for carving out time for this, Dan. Your operational and financial lens is exactly what I need on this.",
    accent: "#1FA7A2",
    expertise: "operations and finance",
    specificAsk: "Does the financial model survive a bad quarter? What happens when two clients churn in the same month?",
    keySlides: [
      { number: 8, label: "Revenue Model", prompt: "What assumptions would you challenge first?" },
      { number: 10, label: "Pricing", prompt: "Is the margin structure sustainable at 10 clients? At 20?" },
      { number: 12, label: "Signal Library", prompt: "From a cost perspective, which signals deliver the most ROI?" },
    ],
  },
  "justin-hayashi": {
    name: "Justin Hayashi",
    firstName: "Justin",
    greeting: "Justin, appreciate you taking a look. Your experience scaling New Engen from zero to 200 people and a billion in managed spend is the exact lens I need on this.",
    accent: "#B85C4A",
    heroImage: { src: "/images/eracx-homepage.png", href: "https://eracx.com", alt: "ERA homepage" },
    expertise: "agency scaling and operational excellence",
    specificAsk: "You built a services business that scales. Does Era's operator model have the same bones, or is it missing something structural?",
    keySlides: [
      { number: 7, label: "The Loop System", prompt: "Does this operating model scale the way New Engen's did, or does it hit a wall?" },
      { number: 8, label: "Revenue Model", prompt: "Is the unit economics strong enough to attract PE interest eventually?" },
      { number: 10, label: "Pricing", prompt: "At these margins, can you build a real company or just a good lifestyle business?" },
    ],
  },
  // Reviewers below use the legacy layout (no keySlides)
  "teaque-lenahan": { name: "Teaque Lenahan", firstName: "Teaque", greeting: "Teaque, really appreciate you taking the time to look through these. Would love your honest take on the overall model.", accent: "#B85C4A" },
  "bill-pritchard": { name: "Bill Pritchard", firstName: "Bill", greeting: "Bill, thanks for reviewing these. Your perspective on the business and go-to-market strategy would be incredibly valuable.", accent: "#D6B26D" },
  "eddie-ibarra": { name: "Eddie Ibarra", firstName: "Eddie", greeting: "Eddie, appreciate you digging into these. Would love your take on the operator model and how it all fits together.", accent: "#D43D8D" },
  "michael-reeder": { name: "Michael Reeder", firstName: "Michael", greeting: "Michael, thanks for taking the time to review these. Your perspective here would be really valuable.", accent: "#1FA7A2" },
  "lindsey-marshall": { name: "Lindsey Marshall", firstName: "Lindsey", greeting: "Lindsey, thanks for taking the time to look through these. Would love your honest take on everything.", accent: "#B85C4A" },
  "morgen-marshall": { name: "Morgen Marshall", firstName: "Morgen", greeting: "Morgen, really appreciate you checking these out. Would love to hear what you think.", accent: "#D6B26D" },
  "ted-egly": { name: "Ted Egly", firstName: "Ted", greeting: "Ted, really appreciate you taking the time to review these. Would love your honest perspective on the model.", accent: "#D43D8D" },
  "ian-mckelvie": { name: "Ian McKelvie", firstName: "Ian", greeting: "Ian, thanks for taking the time to dig into these. Would really value your perspective on the overall approach.", accent: "#1FA7A2" },
  "brad-scandrett": { name: "Brad Scandrett", firstName: "Brad", greeting: "Brad, appreciate you looking through these. Would love your honest take on the model and where you see the opportunity.", accent: "#B85C4A" },
  "kip-beelman": { name: "Kip Beelman", firstName: "Kip", greeting: "Kip, really appreciate you taking the time to look through these. Would love to hear your thoughts.", accent: "#D6B26D" },
  "nate-houghton": { name: "Nate Houghton", firstName: "Nate", greeting: "Nate, thanks for taking the time to look through these. Would really value your perspective on the model.", accent: "#D43D8D" },
  "todd-anthony": { name: "Todd Anthony", firstName: "Todd", greeting: "Todd, thanks for digging into these. Would really value your perspective on the overall approach and where you see the opportunity.", accent: "#B85C4A", heroImage: { src: "/images/eracx-homepage.png", href: "https://eracx.com", alt: "ERA homepage" } },
};

export const FAQ_ITEMS = [
  {
    question: "What stage is the business in?",
    answer: "Era has paying clients and active operators. The business plan reflects where we're headed, not where we're starting from. The model is live: the question is whether it scales."
  },
  {
    question: "What's the difference between Era and DPMT?",
    answer: "DPMT (dpmt.co) is my fractional CRO consulting practice: advisory work, strategy engagements, hands-on with individual clients. Era is the system I deploy inside those engagements, now being built into a standalone business with its own operators, platform, and client base. Think of DPMT as the consulting brand and Era as the product."
  },
  {
    question: "What kind of feedback is most useful?",
    answer: "Honest reactions. If a number feels off, flag it. If the positioning wouldn't land with someone you know, say so. If you'd pitch this differently, tell me how. The uncomfortable feedback is the most valuable."
  },
  {
    question: "What happens after I review this?",
    answer: "I'll read everything, then follow up with a short conversation. Part of that conversation will be about people in your network who might fit the profile: B2B companies with 3 to 15 in sales, no dedicated outbound, selling $50K+ deals. If introductions feel right, I'll make them easy for you. No pressure, no awkwardness."
  },
  {
    question: "Who else is reviewing this?",
    answer: "A small group of people I trust, each with a different lens: operations, finance, GTM, product, org design. Your feedback is private. Nobody else sees your comments or recordings."
  },
  {
    question: "How much time should I spend?",
    answer: "Whatever you have. If you have 10 minutes, watch the walkthrough and record one voice note. If you have an hour, dig into the curated slides and the playbook. Any input is valuable."
  },
];
