import type { AuditInstance } from './types'
import { BETTERUP_OPENERS } from './betterup-openers'
import { BETTERUP_ROADMAP } from './betterup-roadmap'

export const betterupAudit: AuditInstance = {
  slug: 'betterup',
  companyName: 'BetterUp',
  reportDate: 'April 2026',
  companyFacts: {
    founded: '2013, Austin TX',
    revenue: '~$214.6M ARR (2024, est. ~14% YoY decline)',
    valuation: '$4.7B (Oct 2021)',
    employees: '~2,751',
    primaryBuyer: 'CHRO, CLO, VP of Talent at 1,000+ employee enterprises',
    notableClients: 'Microsoft, Salesforce, Google, Hilton, NASA, Chevron, Adobe, SpaceX',
  },
  currentScores: {
    brandCascade: 41,
    gtmSignalChain: 24,
    contentToPipeline: 29,
    aiMirror: 38,
  },
  projectedScores: {
    brandCascade: 62,
    gtmSignalChain: 58,
    contentToPipeline: 55,
    aiMirror: 58,
  },
  sections: [
    { id: 'summary', label: 'Summary' },
    { id: 'score', label: 'Score' },
    { id: 'cascade', label: 'Employees' },
    { id: 'leaders', label: 'Leaders' },
    { id: 'population', label: 'Population' },
    { id: 'signals', label: 'Your content' },
    { id: 'mirror', label: 'Agents' },
    { id: 'audience', label: 'Audience' },
    { id: 'investment', label: 'Concentration' },
    { id: 'build', label: 'Build' },
  ],
  openers: BETTERUP_OPENERS,
  roadmap: BETTERUP_ROADMAP,
}
