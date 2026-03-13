export const LOOM_EMBED_URL = "https://www.loom.com/embed/9761acde24dd4b82a1e0d5dcf9a6ef5a";
export const PITCH_DECK_EMBED_URL = "https://docs.google.com/presentation/d/e/2PACX-1vRI0K744Uun8myV7XDPuxvzW_1WFwEh9epNEWZXmFGvZ2iLjLb2sIzy_ADurXJla2zBgAWZ_YN2qSiL/embed?start=false&loop=false&delayms=3000";
export const PITCH_DECK_COMMENT_URL = "#";
export const OPERATOR_PLAYBOOK_URL = "https://docs.google.com/document/d/1rDhsnzxF7-mVMHtiSLtcJLCliKeyfRy_ssBTjUz6gCU/edit?tab=t.0";
export const PODCAST_URL = "https://drive.google.com/file/d/1f30txT6nFEEIJHLez8shxNvSDYUv6rUk/view?usp=drive_link";
export const ATLAS_URL = "https://app.eracx.com/client/sensay";
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

export interface Reviewer {
  name: string;
  firstName: string;
  greeting: string;
  accent: string;
}

export const REVIEWERS: Record<string, Reviewer> = {
  "jason-burby": { name: "Jason Burby", firstName: "Jason", greeting: "Really appreciate you looking through these, Jason. Your perspective on scaling ops is exactly what I need here.", accent: "#1FA7A2" },
  "gus-weigel": { name: "Gus Weigel", firstName: "Gus", greeting: "Thanks for carving out time for this, Gus. Would love your take on the go-to-market model especially.", accent: "#B85C4A" },
  "ron-carucci": { name: "Ron Carucci", firstName: "Ron", greeting: "Ron, appreciate you reviewing these. Your lens on organizational scaling would be incredibly valuable here.", accent: "#D6B26D" },
  "ben-langhans": { name: "Ben Langhans", firstName: "Ben", greeting: "Thanks for digging into these, Ben. Curious what you think about the operator model and overall thesis.", accent: "#D43D8D" },
  "rick-nash": { name: "Rick Nash", firstName: "Rick", greeting: "Rick, thanks for taking the time. Your experience building revenue teams is exactly the lens I need on this.", accent: "#1FA7A2" },
  "jason-woodley": { name: "Jason Woodley", firstName: "Jason", greeting: "Appreciate you looking through these, Jason. Would especially value your take on the platform and product strategy.", accent: "#B85C4A" },
  "chris-marantette": { name: "Chris Marantette", firstName: "Chris", greeting: "Chris, thanks for reviewing these. Your GTM perspective on the overall system would be really helpful.", accent: "#D6B26D" },
  "brian-gonsalves": { name: "Brian Gonsalves", firstName: "Brian", greeting: "Brian, you already know how Era works from the inside. Would love your honest take on where the gaps are in the plan.", accent: "#D43D8D" },
  "dan-pearce": { name: "Dan Pearce", firstName: "Dan", greeting: "Thanks for carving out time for this, Dan. Your operational and financial lens is exactly what I need on this.", accent: "#1FA7A2" },
  "teaque-lenahan": { name: "Teaque Lenahan", firstName: "Teaque", greeting: "Teaque, really appreciate you taking the time to look through these. Would love your honest take on the overall model.", accent: "#B85C4A" },
  "bill-pritchard": { name: "Bill Pritchard", firstName: "Bill", greeting: "Bill, thanks for reviewing these. Your perspective on the business and go-to-market strategy would be incredibly valuable.", accent: "#D6B26D" },
  "eddie-ibarra": { name: "Eddie Ibarra", firstName: "Eddie", greeting: "Eddie, appreciate you digging into these. Would love your take on the operator model and how it all fits together.", accent: "#D43D8D" },
  "michael-reeder": { name: "Michael Reeder", firstName: "Michael", greeting: "Michael, thanks for taking the time to review these. Your perspective here would be really valuable.", accent: "#1FA7A2" },
};
