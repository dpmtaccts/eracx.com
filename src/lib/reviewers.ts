export const LOOM_EMBED_URL = "https://www.loom.com/embed/d325144edc8042b8a4e15426888ba6ac";
export const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/PLACEHOLDER/PLACEHOLDER/";
export const PITCH_DECK_EMBED_URL = "https://docs.google.com/presentation/d/e/2PACX-1vRI0K744Uun8myV7XDPuxvzW_1WFwEh9epNEWZXmFGvZ2iLjLb2sIzy_ADurXJla2zBgAWZ_YN2qSiL/pub?start=false&loop=false&delayms=3000";
export const PITCH_DECK_COMMENT_URL = "#";
export const OPERATOR_PLAYBOOK_URL = "#";
export const PODCAST_URL = "https://drive.google.com/file/d/160xPft9XdWPXoQeF2NSEUXjV8gnWoQal/view?usp=drive_link";
export const ATLAS_URL = "https://app.eracx.com";
export const ATLAS_PASSWORD = "dontsweatthejourney";

export const ERA_LOGO_URL = "/images/era_final.png";
export const DPMT_LOGO_URL = "/images/dpmt_logo.png";

export const PLAYBOOK_SCREENSHOT_URL = "/images/playbook-screenshot.png";
export const ATLAS_SCREENSHOT_URL = "/images/atlas-screenshot.png";

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
};
