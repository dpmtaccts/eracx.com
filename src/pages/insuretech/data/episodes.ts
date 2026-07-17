/* Signal-and-response event model for the congruence section.
   Discrete corporate message events and the individual leader posts that
   responded (or did not). Grounded post-by-post in the LinkedIn captures under
   Sapiens/inputs/enrichment/linkedin-activity/*.json; every leaderResponse maps
   to a real captured post (relativeTs + sourceExcerpt are verbatim). Dates are
   converted from relative LinkedIn timestamps (anchor: 2026-07-16 capture) and
   are therefore APPROXIMATE. semanticAlignment, responseType and evidence values
   are ERA analytical judgments, not measurements. No monthly values interpolated. */

export type ResponseType = 'repeat' | 'translate' | 'extend' | 'prove' | 'unrelated'
// evidence/confidence/precision are display-only and arrive loosely typed from
// the per-vendor extraction, so keep them permissive.
export type Confidence = number | 'high' | 'medium' | 'low'
export type Precision = string

export interface CorporateEvent {
  id: string
  date: string // ISO, approximate
  datePrecision: Precision
  uncertaintyDays?: number
  theme: string
  label: string // 3-5 words
  strategicImportance: number // 0-1
  persistenceDays: number
  sourceBasis?: string
}

export interface LeaderResponse {
  id: string
  leaderName: string
  leaderRole?: string
  date: string // ISO, approximate
  datePrecision: Precision
  uncertaintyDays?: number
  relativeTs?: string
  matchedCorporateEventId: string | null
  semanticAlignment: number // 0-1 (1 = carries the message exactly)
  responseType: ResponseType
  evidenceType?: string
  evidenceStrength?: number // 0-1
  matchConfidence: Confidence
  lagDays?: number | null
  sourceExcerpt?: string
}

export interface VendorEpisodes {
  company: string
  name: string
  color: string
  model: string
  corporateEvents: CorporateEvent[]
  leaderResponses: LeaderResponse[]
  summary: { medianLagDays: number | null; respondedEpisodes: string; interpretationOrProof: string; pattern: string }
}

export const WINDOW_START = '2026-01-01'
export const WINDOW_END = '2026-07-31'

export const EPISODES: VendorEpisodes[] = [
  {
    company: 'sapiens', name: 'Sapiens', color: '#1845C2', model: 'Cascade model',
    corporateEvents: [
      { id: 'sap-advent', date: '2026-01-16', datePrecision: 'estimated', uncertaintyDays: 30, theme: 'Ownership and leadership change', label: 'Advent close, CEO departs', strategicImportance: 0.85, persistenceDays: 30, sourceBasis: 'Al Dor: "completion of our transaction with Advent, I’ve decided to conclude my role"' },
      { id: 'sap-domain', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 30, theme: 'Domain-expertise thesis', label: 'AI is a people problem', strategicImportance: 0.75, persistenceDays: 90, sourceBasis: 'James Hannay (CRO) series carried by leaders' },
      { id: 'sap-rebrand', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 10, theme: 'New brand, new home', label: 'Rebrand and London HQ', strategicImportance: 0.95, persistenceDays: 60, sourceBasis: 'Richardson: "New owners. New investment. New brand. New home."' },
      { id: 'sap-hyperrel', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 12, theme: 'Category positioning', label: 'Hyper-relevance', strategicImportance: 0.9, persistenceDays: 60, sourceBasis: 'ERA brandReport: hyper-relevance and a single insurance ontology' },
      { id: 'sap-agentic', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 12, theme: 'Product AI strategy', label: 'Insurance Agentification', strategicImportance: 0.9, persistenceDays: 75, sourceBasis: 'Kanga: "Insurance Agentification... Central Agentic Framework"' },
      { id: 'sap-ailab', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 14, theme: 'AI thought-leadership venue', label: 'AI Experience Lab', strategicImportance: 0.8, persistenceDays: 45, sourceBasis: 'Montgomery: "Sapiens AI Customer Experience Lab is up and running"' },
    ],
    leaderResponses: [
      { id: 'sap-roni', leaderName: 'Roni Al Dor', leaderRole: 'Former CEO at Sapiens', date: '2026-01-16', datePrecision: 'estimated', uncertaintyDays: 30, relativeTs: '6mo', matchedCorporateEventId: 'sap-advent', semanticAlignment: 0.95, responseType: 'prove', evidenceType: 'acquisition', evidenceStrength: 0.7, matchConfidence: 'high', lagDays: 0, sourceExcerpt: 'With the completion of our transaction with Advent, I’ve decided to conclude my role as President & CEO' },
      { id: 'sap-dean-hannay', leaderName: 'Dean Richardson', leaderRole: 'VP of Sales, GTM at Sapiens', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 20, relativeTs: '2mo', matchedCorporateEventId: 'sap-domain', semanticAlignment: 0.78, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.35, matchConfidence: 'medium', lagDays: 0, sourceExcerpt: 'James Hannay, Sapiens’ CRO, explains the platform architecture advantage' },
      { id: 'sap-persi-people', leaderName: 'Persi Kanga', leaderRole: 'Sapiens', date: '2026-07-02', datePrecision: 'estimated', uncertaintyDays: 8, relativeTs: '2w', matchedCorporateEventId: 'sap-domain', semanticAlignment: 0.8, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.35, matchConfidence: 'high', lagDays: 47, sourceExcerpt: 'James Hannay says AI in insurance isn’t a technology problem. It’s a people one.' },
      { id: 'sap-dean-hq', leaderName: 'Dean Richardson', leaderRole: 'VP of Sales, GTM at Sapiens', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 12, relativeTs: '1mo', matchedCorporateEventId: 'sap-rebrand', semanticAlignment: 0.92, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.35, matchConfidence: 'high', lagDays: 0, sourceExcerpt: 'New owners. New investment. New brand. New home. A new Global HQ in London' },
      { id: 'sap-einav', leaderName: 'Einav Waizman', leaderRole: 'Deputy CFO, Global VP Finance at Sapiens', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 12, relativeTs: '1mo', matchedCorporateEventId: 'sap-rebrand', semanticAlignment: 0.7, responseType: 'repeat', evidenceType: 'claim', evidenceStrength: 0.3, matchConfidence: 'high', lagDays: 0, sourceExcerpt: 'at our new London offices, following the launch of our new brand identity' },
      { id: 'sap-persi-doors', leaderName: 'Persi Kanga', leaderRole: 'Sapiens', date: '2026-06-18', datePrecision: 'estimated', uncertaintyDays: 12, relativeTs: '4w', matchedCorporateEventId: 'sap-rebrand', semanticAlignment: 0.85, responseType: 'repeat', evidenceType: 'claim', evidenceStrength: 0.3, matchConfidence: 'high', lagDays: 2, sourceExcerpt: 'Space House, London is the new home of Sapiens. A week that started with a brand launch' },
      { id: 'sap-jen-advent', leaderName: 'Jennifer Gamble', leaderRole: 'VP Commercial Operations at Sapiens', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '1w', matchedCorporateEventId: 'sap-rebrand', semanticAlignment: 0.7, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.3, matchConfidence: 'medium', lagDays: 23, sourceExcerpt: 'A new brand, a new global home in London, and our Ignite Customer Summit in Nashville' },
      { id: 'sap-persi-brand', leaderName: 'Persi Kanga', leaderRole: 'Sapiens', date: '2026-06-25', datePrecision: 'estimated', uncertaintyDays: 10, relativeTs: '3w', matchedCorporateEventId: 'sap-hyperrel', semanticAlignment: 0.72, responseType: 'repeat', evidenceType: 'claim', evidenceStrength: 0.3, matchConfidence: 'medium', lagDays: 9, sourceExcerpt: 'our new brand is leading the way... what our new brand really stands for' },
      { id: 'sap-persi-hyperrel', leaderName: 'Persi Kanga', leaderRole: 'Sapiens', date: '2026-07-02', datePrecision: 'estimated', uncertaintyDays: 8, relativeTs: '2w', matchedCorporateEventId: 'sap-hyperrel', semanticAlignment: 0.8, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.35, matchConfidence: 'high', lagDays: 16, sourceExcerpt: 'what hyper-relevance looks like in practice are what we’re there for' },
      { id: 'sap-persi-agentify', leaderName: 'Persi Kanga', leaderRole: 'Sapiens', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 12, relativeTs: '1mo', matchedCorporateEventId: 'sap-agentic', semanticAlignment: 0.95, responseType: 'repeat', evidenceType: 'release', evidenceStrength: 0.6, matchConfidence: 'high', lagDays: 0, sourceExcerpt: 'We call it Insurance Agentification... Agentic Claims, Agentic Underwriting, Agentic Policy' },
      { id: 'sap-persi-reimagine', leaderName: 'Persi Kanga', leaderRole: 'Sapiens', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 12, relativeTs: '1mo', matchedCorporateEventId: 'sap-agentic', semanticAlignment: 0.9, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.4, matchConfidence: 'high', lagDays: 0, sourceExcerpt: 'we are fundamentally reimagining what an insurance platform can do. Through our Central Agentic Framework' },
      { id: 'sap-persi-apac', leaderName: 'Persi Kanga', leaderRole: 'Sapiens', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '1w', matchedCorporateEventId: 'sap-agentic', semanticAlignment: 0.72, responseType: 'prove', evidenceType: 'release', evidenceStrength: 0.55, matchConfidence: 'high', lagDays: 23, sourceExcerpt: 'as we bring our agentic AI vision to insurers across Asia Pacific. Read the full press release' },
      { id: 'sap-denise-lab', leaderName: 'Denise Montgomery', leaderRole: 'North America Partner Coordinator at Sapiens', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '1w', matchedCorporateEventId: 'sap-ailab', semanticAlignment: 0.95, responseType: 'extend', evidenceType: 'claim', evidenceStrength: 0.4, matchConfidence: 'high', lagDays: 23, sourceExcerpt: 'The Sapiens AI Customer Experience Lab is up and running. We’re hosting a weekly series of events' },
      { id: 'sap-persi-lab', leaderName: 'Persi Kanga', leaderRole: 'Sapiens', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 12, relativeTs: '1mo', matchedCorporateEventId: 'sap-ailab', semanticAlignment: 0.85, responseType: 'repeat', evidenceType: 'claim', evidenceStrength: 0.35, matchConfidence: 'high', lagDays: 0, sourceExcerpt: 'a new headquarters and AI Customer Experience Lab in the heart of London' },
      { id: 'sap-jen-lab', leaderName: 'Jennifer Gamble', leaderRole: 'VP Commercial Operations at Sapiens', date: '2026-07-15', datePrecision: 'estimated', uncertaintyDays: 6, relativeTs: '1d', matchedCorporateEventId: 'sap-ailab', semanticAlignment: 0.82, responseType: 'extend', evidenceType: 'claim', evidenceStrength: 0.4, matchConfidence: 'high', lagDays: 29, sourceExcerpt: 'Love this! The Sapiens AI Customer Experience Lab is up and running' },
    ],
    summary: { medianLagDays: 6, respondedEpisodes: '6/6', interpretationOrProof: '13 interpret, 3 prove', pattern: 'Sustained cascade, marketing-led, thin proof' },
  },
  {
    company: 'guidewire', name: 'Guidewire', color: '#0A0A0A', model: 'Corporate-publisher model',
    corporateEvents: [
      { id: 'gw-pronavigator', date: '2026-04-16', datePrecision: 'estimated', uncertaintyDays: 20, theme: 'Embedded AI', label: 'ProNavigator embedded AI', strategicImportance: 0.95, persistenceDays: 120, sourceBasis: 'Company account: "insurance-grade AI... natively embedded"; ERA: ProNavigator launch 2026-04-16' },
      { id: 'gw-pricingcenter', date: '2026-05-01', datePrecision: 'estimated', uncertaintyDays: 20, theme: 'Pricing speed', label: 'Price in minutes, not months', strategicImportance: 0.9, persistenceDays: 120, sourceBasis: 'Company account: "PricingCenter... ending the months-long relay race"' },
      { id: 'gw-protection-gap', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 20, theme: 'Catastrophe / protection gap', label: '$220B protection gap', strategicImportance: 0.8, persistenceDays: 90, sourceBasis: 'Company account: "$220B in losses, only $107B insured"' },
      { id: 'gw-builder', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 15, theme: 'Developer velocity', label: 'Builder Assistants 41% faster', strategicImportance: 0.75, persistenceDays: 90, sourceBasis: 'Company account: "domain-specific AI 41% faster than foundation models"' },
      { id: 'gw-modernization', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 18, theme: 'Core modernization', label: 'Modern core anchors AI', strategicImportance: 0.85, persistenceDays: 120, sourceBasis: 'Company account: "Core modernization does not end at go-live"' },
      { id: 'gw-hazardhub', date: '2026-07-10', datePrecision: 'estimated', uncertaintyDays: 7, theme: 'Geospatial risk', label: 'HazardHub World Cup risk', strategicImportance: 0.7, persistenceDays: 60, sourceBasis: 'Company account: "HazardHub analyzed every USA World Cup 2026 stadium"' },
    ],
    leaderResponses: [
      { id: 'gw-rene-ki', leaderName: 'René Schoenauer', leaderRole: 'Director, Product Marketing EMEA at Guidewire', date: '2026-04-16', datePrecision: 'estimated', uncertaintyDays: 30, relativeTs: '3mo', matchedCorporateEventId: 'gw-pronavigator', semanticAlignment: 0.5, responseType: 'translate', evidenceType: 'commentary', evidenceStrength: 0.55, matchConfidence: 0.3, lagDays: 0, sourceExcerpt: 'Nur 2 % der Versicherer in der DACH-Region sind heute in der Lage, KI... zu skalieren' },
      { id: 'gw-phil-game', leaderName: 'Phil Iaccarino', leaderRole: 'Senior Director, Product Marketing at Guidewire', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 20, relativeTs: '2mo', matchedCorporateEventId: 'gw-pronavigator', semanticAlignment: 0.7, responseType: 'repeat', evidenceType: 'endorsement', evidenceStrength: 0.35, matchConfidence: 0.5, lagDays: 30, sourceExcerpt: 'Such a game changer for insurers looking to make every employee as effective as their best' },
      { id: 'gw-shyam', leaderName: 'Shyam Sundar Krovvidi', leaderRole: 'Technology & Partnerships Leader, Guidewire ANZ', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 15, relativeTs: '1mo', matchedCorporateEventId: 'gw-pronavigator', semanticAlignment: 0.85, responseType: 'translate', evidenceType: 'event recap', evidenceStrength: 0.6, matchConfidence: 0.7, lagDays: 61, sourceExcerpt: 'strong interest in the Guidewire Agentic Framework, Embedded Intelligence with ProNavigator' },
      { id: 'gw-phil-pricing', leaderName: 'Phil Iaccarino', leaderRole: 'Senior Director, Product Marketing at Guidewire', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 20, relativeTs: '2mo', matchedCorporateEventId: 'gw-pricingcenter', semanticAlignment: 0.75, responseType: 'extend', evidenceType: 'webinar', evidenceStrength: 0.55, matchConfidence: 0.65, lagDays: 15, sourceExcerpt: 'a different approach with Guidewire PricingCenter, where modeling, testing, and deployment happen in one place' },
      { id: 'gw-roopal', leaderName: 'Roopal Shah', leaderRole: 'AI-first go-to-market leader (external)', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 15, relativeTs: '1mo', matchedCorporateEventId: 'gw-builder', semanticAlignment: 0.6, responseType: 'extend', evidenceType: 'original commentary', evidenceStrength: 0.7, matchConfidence: 0.55, lagDays: 0, sourceExcerpt: 'Our Builder Assistants finished real Gosu tasks 41% faster than generic Claude Code' },
      { id: 'gw-rene-nxt', leaderName: 'René Schoenauer', leaderRole: 'Director, Product Marketing EMEA at Guidewire', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 15, relativeTs: '1mo', matchedCorporateEventId: null, semanticAlignment: 0.35, responseType: 'unrelated', evidenceType: 'event recap', evidenceStrength: 0.4, matchConfidence: 0.2, lagDays: null, sourceExcerpt: 'Was für ein Auftakt! Tag 1 der insureNXT 2026 ist vorbei' },
      { id: 'gw-daniel', leaderName: 'Daniel Lockhart', leaderRole: 'Director, Product Marketing at Guidewire', date: '2026-04-16', datePrecision: 'estimated', uncertaintyDays: 30, relativeTs: '3mo', matchedCorporateEventId: null, semanticAlignment: 0.1, responseType: 'unrelated', evidenceType: 'recruiting', evidenceStrength: 0.2, matchConfidence: 0.2, lagDays: null, sourceExcerpt: 'Roopal Shah is hiring. Know anyone who might be interested?' },
      { id: 'gw-jeff', leaderName: 'Jeff Cooper', leaderRole: 'Chief Financial Officer at Guidewire', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '1w', matchedCorporateEventId: null, semanticAlignment: 0.1, responseType: 'unrelated', evidenceType: 'recruiting', evidenceStrength: 0.2, matchConfidence: 0.2, lagDays: null, sourceExcerpt: 'Our corp dev is hiring. A great opportunity to work at an amazing company' },
      { id: 'gw-carrie', leaderName: 'Carrie Burns', leaderRole: 'Customer Marketing at Guidewire', date: '2026-01-16', datePrecision: 'estimated', uncertaintyDays: 30, relativeTs: '6mo', matchedCorporateEventId: null, semanticAlignment: 0.08, responseType: 'unrelated', evidenceType: 'recruiting', evidenceStrength: 0.2, matchConfidence: 0.2, lagDays: null, sourceExcerpt: 'We are looking for a Customer Marketing intern' },
    ],
    summary: { medianLagDays: null, respondedEpisodes: '4/6', interpretationOrProof: '1 original of 9 leader posts', pattern: 'Strong publisher, sparse and weak leader handoff' },
  },
  {
    company: 'duckcreek', name: 'Duck Creek', color: '#DD5C20', model: 'Strategic-moment model',
    corporateEvents: [
      { id: 'dc-formation', date: '2026-04-27', datePrecision: 'estimated', uncertaintyDays: 7, theme: 'Flagship event', label: "Formation '26 kickoff", strategicImportance: 0.85, persistenceDays: 30, sourceBasis: 'White: "What a way to start Formation26!"; Upadhyay: "live in Orlando"' },
      { id: 'dc-agentic', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 20, theme: 'AI operating model', label: 'Agentic Intelligent Core', strategicImportance: 0.8, persistenceDays: 45, sourceBasis: 'Raheja: "neuro-symbolic... Trusted AI, Intelligent Core"' },
      { id: 'dc-risk', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 15, theme: 'Risk intelligence', label: 'New Era Risk Intelligence', strategicImportance: 0.6, persistenceDays: 30, sourceBasis: 'Asztalos: "New Era of Risk Intelligence... Redhand 2026 RMIS Report"' },
      { id: 'dc-london', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 15, theme: 'London Market', label: 'London Market investment', strategicImportance: 0.6, persistenceDays: 30, sourceBasis: 'Asztalos: "ahead of Duck Creek ENGAGE event in London"' },
      { id: 'dc-send', date: '2026-07-08', datePrecision: 'estimated', uncertaintyDays: 2, theme: 'Acquisition', label: 'Send acquisition', strategicImportance: 1.0, persistenceDays: 21, sourceBasis: 'Gulati: "acquired Send Technology"; ERA recentNews 2026-07-08' },
    ],
    leaderResponses: [
      { id: 'dc-white-form', leaderName: 'Stephanie White', leaderRole: 'Duck Creek', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 20, relativeTs: '2mo', matchedCorporateEventId: 'dc-formation', semanticAlignment: 0.92, responseType: 'repeat', evidenceType: 'claim', evidenceStrength: 0.75, matchConfidence: 0.85, lagDays: null, sourceExcerpt: 'What a way to start Formation26! ... double-digit YoY SaaS growth' },
      { id: 'dc-upadhyay-form', leaderName: 'Naveen Upadhyay', leaderRole: 'Duck Creek', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 20, relativeTs: '2mo', matchedCorporateEventId: 'dc-formation', semanticAlignment: 0.88, responseType: 'repeat', evidenceType: 'claim', evidenceStrength: 0.65, matchConfidence: 0.8, lagDays: null, sourceExcerpt: "Formation '26 is Go. We’re live in Orlando" },
      { id: 'dc-raheja-neuro', leaderName: 'Rajesh Raheja', leaderRole: 'Chief Technology Officer at Duck Creek', date: '2026-05-16', datePrecision: 'estimated', uncertaintyDays: 20, relativeTs: '2mo', matchedCorporateEventId: 'dc-agentic', semanticAlignment: 0.9, responseType: 'prove', evidenceType: 'claim', evidenceStrength: 0.8, matchConfidence: 0.85, lagDays: 0, sourceExcerpt: 'The answer to explainable AI is neuro-symbolic... to achieve Trusted AI' },
      { id: 'dc-gulati-core', leaderName: 'Hardeep Gulati', leaderRole: 'Chief Executive Officer at Duck Creek', date: '2026-06-25', datePrecision: 'estimated', uncertaintyDays: 5, relativeTs: '3w', matchedCorporateEventId: 'dc-agentic', semanticAlignment: 0.9, responseType: 'extend', evidenceType: 'claim', evidenceStrength: 0.75, matchConfidence: 0.7, lagDays: 40, sourceExcerpt: 'building an Intelligent Core where business logic, data, and AI work together securely' },
      { id: 'dc-laszlo-risk', leaderName: 'Laszlo Asztalos', leaderRole: 'VP at Duck Creek', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 15, relativeTs: '1mo', matchedCorporateEventId: 'dc-risk', semanticAlignment: 0.9, responseType: 'prove', evidenceType: 'claim', evidenceStrength: 0.75, matchConfidence: 0.85, lagDays: 0, sourceExcerpt: 'The New Era of Risk Intelligence... recognized in Redhand Advisors’ 2026 RMIS Report' },
      { id: 'dc-laszlo-london', leaderName: 'Laszlo Asztalos', leaderRole: 'VP at Duck Creek', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 15, relativeTs: '1mo', matchedCorporateEventId: 'dc-london', semanticAlignment: 0.9, responseType: 'repeat', evidenceType: 'claim', evidenceStrength: 0.7, matchConfidence: 0.85, lagDays: 0, sourceExcerpt: 'Major product announcement ahead of our Duck Creek ENGAGE event in London!' },
      { id: 'dc-gulati-send', leaderName: 'Hardeep Gulati', leaderRole: 'Chief Executive Officer at Duck Creek', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 3, relativeTs: '1w', matchedCorporateEventId: 'dc-send', semanticAlignment: 0.98, responseType: 'repeat', evidenceType: 'acquisition', evidenceStrength: 0.95, matchConfidence: 0.98, lagDays: 1, sourceExcerpt: "I’m excited to share that Duck Creek Technologies has acquired Send Technology" },
      { id: 'dc-genard-send', leaderName: 'William Genard', leaderRole: 'National Sales Director at Duck Creek', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 3, relativeTs: '1w', matchedCorporateEventId: 'dc-send', semanticAlignment: 0.99, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.75, matchConfidence: 0.98, lagDays: 1, sourceExcerpt: 'underwriting orchestration, the Intelligent Core, and trusted AI together' },
      { id: 'dc-hatkar-send', leaderName: 'Abhijeet Hatkar', leaderRole: 'Duck Creek', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 3, relativeTs: '1w', matchedCorporateEventId: 'dc-send', semanticAlignment: 0.95, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.8, matchConfidence: 0.9, lagDays: 1, sourceExcerpt: 'Underwriting has become one of the biggest opportunities in insurance' },
      { id: 'dc-neville-send', leaderName: 'David Neville', leaderRole: 'Sales Director at Duck Creek', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 3, relativeTs: '1w', matchedCorporateEventId: 'dc-send', semanticAlignment: 0.94, responseType: 'translate', evidenceType: 'claim', evidenceStrength: 0.7, matchConfidence: 0.95, lagDays: 1, sourceExcerpt: "Duck Creek’s acquisition of Send represents an exciting new chapter" },
      { id: 'dc-cossio-letsgo', leaderName: 'Gabe Cossio', leaderRole: 'VP at Duck Creek', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 3, relativeTs: '1w', matchedCorporateEventId: 'dc-send', semanticAlignment: 0.96, responseType: 'extend', evidenceType: 'claim', evidenceStrength: 0.8, matchConfidence: 0.96, lagDays: 1, sourceExcerpt: 'acquisition of Send, creating the first Agentic-Underwriting-to-Core platform in P&C' },
      { id: 'dc-cossio-week', leaderName: 'Gabe Cossio', leaderRole: 'VP at Duck Creek', date: '2026-07-16', datePrecision: 'estimated', uncertaintyDays: 1, relativeTs: '14h', matchedCorporateEventId: 'dc-send', semanticAlignment: 0.97, responseType: 'extend', evidenceType: 'claim', evidenceStrength: 0.8, matchConfidence: 0.97, lagDays: 8, sourceExcerpt: 'a week since we announced our acquisition of Send... first Agentic Underwriting-To-Core solution' },
    ],
    summary: { medianLagDays: 1, respondedEpisodes: '5/5', interpretationOrProof: '10 interpret or prove, 2 repeat', pattern: 'Event-driven, same-week cascade around Send' },
  },
  {
    company: 'majesco', name: 'Majesco', color: '#E6195F', model: 'Repositioning model',
    corporateEvents: [
      { id: 'mj-agentic', date: '2026-03-16', datePrecision: 'estimated', uncertaintyDays: 25, theme: 'AI-native platform', label: 'AI-native agentic platform', strategicImportance: 0.9, persistenceDays: 120, sourceBasis: 'Raka: "AI isn’t coming, it’s already here"; page #AgenticAI' },
      { id: 'mj-spring26', date: '2026-04-16', datePrecision: 'estimated', uncertaintyDays: 20, theme: 'Product release', label: "Spring '26 release", strategicImportance: 0.95, persistenceDays: 90, sourceBasis: 'Page: "Majesco Launches Spring ’26 Release"' },
      { id: 'mj-customervalue', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 5, theme: 'Customer outcomes', label: 'Customer value, K2 Insurance', strategicImportance: 0.85, persistenceDays: 30, sourceBasis: 'Elster: "K2 Insurance Services is an amazing example"' },
      { id: 'mj-frontier', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 20, theme: 'Event narrative', label: "Frontier '26 conference", strategicImportance: 0.75, persistenceDays: 120, sourceBasis: 'Elster: "Save the date for Frontier ’26!"' },
      { id: 'mj-aifintech', date: '2026-07-02', datePrecision: 'estimated', uncertaintyDays: 7, theme: 'Third-party recognition', label: 'AI FinTech 100', strategicImportance: 0.7, persistenceDays: 30, sourceBasis: 'Elster: "recognized in the 2026 AI FinTech 100"' },
    ],
    leaderResponses: [
      { id: 'mj-raka-agentic', leaderName: 'Utkarsh Raka', leaderRole: 'Head of Engineering (Services) at Majesco', date: '2026-03-16', datePrecision: 'estimated', uncertaintyDays: 25, relativeTs: '4mo', matchedCorporateEventId: 'mj-agentic', semanticAlignment: 0.75, responseType: 'extend', evidenceType: 'delivery claim', evidenceStrength: 0.55, matchConfidence: 0.7, lagDays: 0, sourceExcerpt: 'build production-grade AI agents that work alongside delivery teams' },
      { id: 'mj-mcgushin-ai', leaderName: 'Brian McGushin', leaderRole: 'VP Global Alliances at Majesco', date: '2026-07-02', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '2w', matchedCorporateEventId: 'mj-agentic', semanticAlignment: 0.45, responseType: 'repeat', evidenceType: 'reshare', evidenceStrength: 0.2, matchConfidence: 0.6, lagDays: null, sourceExcerpt: 'how Majesco is reshaping insurance operations with AI' },
      { id: 'mj-raka-spring', leaderName: 'Utkarsh Raka', leaderRole: 'President & Chief Product Officer at Majesco', date: '2026-04-16', datePrecision: 'estimated', uncertaintyDays: 20, relativeTs: '3mo', matchedCorporateEventId: 'mj-spring26', semanticAlignment: 0.9, responseType: 'translate', evidenceType: 'product narrative', evidenceStrength: 0.7, matchConfidence: 0.95, lagDays: 0, sourceExcerpt: "Majesco Spring ’26 release is here. So what? Are we just shipping more features" },
      { id: 'mj-mcgushin-rating', leaderName: 'Brian McGushin', leaderRole: 'VP Global Alliances at Majesco', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 5, relativeTs: '1w', matchedCorporateEventId: 'mj-spring26', semanticAlignment: 0.35, responseType: 'repeat', evidenceType: 'product mention', evidenceStrength: 0.2, matchConfidence: 0.55, lagDays: 84, sourceExcerpt: 'Majesco Enterprise Rating is a great solution to partner' },
      { id: 'mj-elster-k2', leaderName: 'Adam Elster', leaderRole: 'CEO at Majesco', date: '2026-07-09', datePrecision: 'estimated', uncertaintyDays: 5, relativeTs: '1w', matchedCorporateEventId: 'mj-customervalue', semanticAlignment: 0.9, responseType: 'prove', evidenceType: 'named_customer', evidenceStrength: 0.7, matchConfidence: 0.95, lagDays: 0, sourceExcerpt: 'customer business value and results drive us. K2 Insurance Services is an amazing example' },
      { id: 'mj-elster-frontier', leaderName: 'Adam Elster', leaderRole: 'CEO at Majesco', date: '2026-06-16', datePrecision: 'estimated', uncertaintyDays: 20, relativeTs: '1mo', matchedCorporateEventId: 'mj-frontier', semanticAlignment: 0.7, responseType: 'repeat', evidenceType: 'event', evidenceStrength: 0.35, matchConfidence: 0.9, lagDays: 0, sourceExcerpt: "Save the date for Frontier ’26! Join us October 12-14" },
      { id: 'mj-nagpal-frontier', leaderName: 'Rohit Nagpal', leaderRole: 'Chief Strategy Officer at Majesco', date: '2026-06-25', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '3w', matchedCorporateEventId: 'mj-frontier', semanticAlignment: 0.65, responseType: 'repeat', evidenceType: 'event', evidenceStrength: 0.3, matchConfidence: 0.85, lagDays: 9, sourceExcerpt: 'an amazing keynote at our Frontier Conference... the power of AI' },
      { id: 'mj-mohanraj-frontier', leaderName: 'Sathish Mohanraj', leaderRole: 'Client Partner at Majesco', date: '2026-07-02', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '2w', matchedCorporateEventId: 'mj-frontier', semanticAlignment: 0.6, responseType: 'extend', evidenceType: 'event detail', evidenceStrength: 0.4, matchConfidence: 0.85, lagDays: 16, sourceExcerpt: 'Frontier is designed so that everyone can build an experience for their business' },
      { id: 'mj-elster-fintech', leaderName: 'Adam Elster', leaderRole: 'CEO at Majesco', date: '2026-07-02', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '2w', matchedCorporateEventId: 'mj-aifintech', semanticAlignment: 0.85, responseType: 'repeat', evidenceType: 'recognition', evidenceStrength: 0.45, matchConfidence: 0.95, lagDays: 0, sourceExcerpt: 'honored to be recognized in the 2026 AI FinTech 100. Execution is the best strategy' },
      { id: 'mj-brown-fintech', leaderName: 'John Brown', leaderRole: 'Majesco', date: '2026-07-02', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '2w', matchedCorporateEventId: 'mj-aifintech', semanticAlignment: 0.6, responseType: 'repeat', evidenceType: 'reshare', evidenceStrength: 0.3, matchConfidence: 0.9, lagDays: 0, sourceExcerpt: 'recognized by FinTech Global in the 2026 AI FinTech 100' },
      { id: 'mj-acharyya', leaderName: 'Ayan Acharyya', leaderRole: 'VP Global Alliances at Majesco', date: '2026-06-25', datePrecision: 'estimated', uncertaintyDays: 7, relativeTs: '3w', matchedCorporateEventId: null, semanticAlignment: 0.15, responseType: 'unrelated', evidenceType: 'cheerleading', evidenceStrength: 0.05, matchConfidence: 0.3, lagDays: null, sourceExcerpt: 'Majesco crushing it' },
    ],
    summary: { medianLagDays: 4, respondedEpisodes: '5/5', interpretationOrProof: '1 prove, mostly repeats', pattern: 'Fast amplification, slow strategic convergence' },
  },
]
