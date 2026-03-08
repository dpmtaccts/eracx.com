import { useState, useEffect, useCallback } from 'react'
import IntegrationCard from '../components/IntegrationCard'
import IntegrationModal from '../components/IntegrationModal'

interface Integration {
  id: string
  toolName: string
  category: string
  status: 'connected' | 'disconnected'
  webhookUrl: string | null
  config: Record<string, unknown>
  hasApiKey: boolean
  lastVerifiedAt: string | null
}

const TOOL_META: Record<string, { label: string; description: string; hasWebhook?: boolean; webhookOnly?: boolean }> = {
  databar: { label: 'Databar', description: 'Primary enrichment source for company data' },
  clay: { label: 'Clay', description: 'Secondary/supplemental enrichment' },
  apollo: { label: 'Apollo', description: 'Contact data and sequence management' },
  salesforge: { label: 'Salesforge', description: 'Sequence orchestration + inbound events', hasWebhook: true },
  rb2b: { label: 'RB2B', description: 'Inbound website visitor events', hasWebhook: true, webhookOnly: true },
  fireflies: { label: 'Fireflies', description: 'Meeting transcripts and intelligence' },
  dripify: { label: 'Dripify', description: 'LinkedIn automation orchestration' },
  reply_io: { label: 'Reply.io', description: 'Multi-channel outreach orchestration' },
}

export default function Admin() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const fetchIntegrations = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/integrations')
      if (res.ok) setIntegrations(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { fetchIntegrations() }, [fetchIntegrations])

  const selected = integrations.find((i) => i.id === selectedId) || null
  const meta = selected ? TOOL_META[selected.toolName] : null

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F0E8]">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex-shrink-0">
            <img
              src="/assets/era_final.png"
              alt="Era"
              className="mt-1 h-5 w-auto"
              style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(0.1) brightness(0.93)' }}
            />
          </a>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#F5F0E8]/40">Admin</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <h1 className="text-[28px] font-light tracking-tight text-[#F5F0E8]">
          Platform Integrations
        </h1>
        <p className="mt-2 text-sm text-[#F5F0E8]/50">
          Era-level API connections shared across all clients. Separate from per-client CRM integrations.
        </p>

        {loading ? (
          <div className="mt-16 text-center text-sm text-[#F5F0E8]/30">Loading integrations...</div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {integrations.map((integration) => {
              const toolMeta = TOOL_META[integration.toolName]
              return (
                <IntegrationCard
                  key={integration.id}
                  toolName={toolMeta?.label || integration.toolName}
                  category={integration.category}
                  status={integration.status}
                  lastVerifiedAt={integration.lastVerifiedAt}
                  onConfigure={() => setSelectedId(integration.id)}
                />
              )
            })}
          </div>
        )}
      </main>

      {selected && meta && (
        <IntegrationModal
          integration={selected}
          label={meta.label}
          description={meta.description}
          hasWebhook={meta.hasWebhook}
          webhookOnly={meta.webhookOnly}
          onClose={() => setSelectedId(null)}
          onSaved={fetchIntegrations}
        />
      )}
    </div>
  )
}
