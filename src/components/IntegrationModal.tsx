import { useState } from 'react'

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

interface Props {
  integration: Integration
  label: string
  description: string
  hasWebhook?: boolean
  webhookOnly?: boolean
  onClose: () => void
  onSaved: () => void
}

export default function IntegrationModal({ integration, label, description, hasWebhook, webhookOnly, onClose, onSaved }: Props) {
  const [apiKey, setApiKey] = useState('')
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null)
  const [saved, setSaved] = useState(false)

  const webhookUrl = `${window.location.origin}/api/webhooks/${integration.toolName}`

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/admin/integrations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: integration.id, apiKey: apiKey || undefined }),
      })
      if (res.ok) {
        setSaved(true)
        onSaved()
      }
    } catch { /* ignore */ }
    setSaving(false)
  }

  async function handleTest() {
    setTesting(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/admin/integrations/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolName: integration.toolName }),
      })
      const data = await res.json()
      setTestResult({ ok: data.ok, message: data.message || data.error || 'Unknown result' })
      if (data.ok) onSaved()
    } catch {
      setTestResult({ ok: false, message: 'Request failed' })
    }
    setTesting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-lg rounded-xl border border-[#B85C4A]/30 bg-[#1A1A1A] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[20px] font-medium text-[#F5F0E8]">{label}</h2>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-[#B85C4A]">{integration.category}</p>
            <p className="mt-2 text-[13px] text-[#F5F0E8]/50">{description}</p>
          </div>
          <button onClick={onClose} className="text-[#F5F0E8]/30 transition-colors hover:text-[#F5F0E8]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {/* API Key */}
          {!webhookOnly && (
            <div>
              <label className="block text-[12px] uppercase tracking-[0.15em] text-[#F5F0E8]/50">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={integration.hasApiKey ? '••••••••••••••••' : 'Enter API key'}
                className="mt-1.5 w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-[14px] text-[#F5F0E8] placeholder:text-[#F5F0E8]/20 focus:border-[#B85C4A]/50 focus:outline-none"
              />
            </div>
          )}

          {/* Webhook URL */}
          {(hasWebhook || webhookOnly) && (
            <div>
              <label className="block text-[12px] uppercase tracking-[0.15em] text-[#F5F0E8]/50">
                Webhook URL
              </label>
              <p className="mt-0.5 mb-1.5 text-[11px] text-[#F5F0E8]/30">
                Configure {label} to POST events to this URL
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={webhookUrl}
                  className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-[#F5F0E8]/70 focus:outline-none"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(webhookUrl)}
                  className="shrink-0 rounded border border-white/10 px-3 py-2 text-[11px] uppercase tracking-wider text-[#F5F0E8]/50 transition-colors hover:text-[#F5F0E8]"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Usage stats */}
          <div className="rounded border border-white/5 bg-white/[0.02] p-3">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#F5F0E8]/30">Status</p>
            <div className="mt-2 flex items-center gap-4">
              <div>
                <span className={`text-[13px] font-medium ${integration.status === 'connected' ? 'text-emerald-400' : 'text-[#F5F0E8]/30'}`}>
                  {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              {integration.lastVerifiedAt && (
                <div className="text-[11px] text-[#F5F0E8]/30">
                  Last verified: {new Date(integration.lastVerifiedAt).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test result */}
        {testResult && (
          <div className={`mt-4 rounded p-3 text-[13px] ${testResult.ok ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {testResult.message}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          {!webhookOnly && (
            <>
              <button
                onClick={handleSave}
                disabled={saving || !apiKey}
                className="rounded bg-[#B85C4A] px-4 py-2 text-[12px] uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {saving ? 'Saving...' : 'Save Key'}
              </button>
              <button
                onClick={handleTest}
                disabled={testing}
                className="rounded border border-[#B85C4A]/40 px-4 py-2 text-[12px] uppercase tracking-[0.15em] text-[#B85C4A] transition-colors hover:bg-[#B85C4A]/10 disabled:opacity-40"
              >
                {testing ? 'Testing...' : 'Test Connection'}
              </button>
            </>
          )}
          {saved && <span className="text-[12px] text-emerald-400">Saved</span>}
        </div>
      </div>
    </div>
  )
}
