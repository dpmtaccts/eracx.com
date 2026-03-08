interface Props {
  toolName: string
  category: string
  status: 'connected' | 'disconnected'
  lastVerifiedAt: string | null
  onConfigure: () => void
}

export default function IntegrationCard({ toolName, category, status, lastVerifiedAt, onConfigure }: Props) {
  const isConnected = status === 'connected'

  return (
    <div className="rounded-lg border border-[#B85C4A]/30 bg-[#1A1A1A] p-5 transition-colors hover:border-[#B85C4A]/60">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[15px] font-medium text-[#F5F0E8]">{toolName}</h3>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-[#B85C4A]">{category}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
            isConnected
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-white/5 text-[#F5F0E8]/30'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-[#F5F0E8]/20'}`} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {lastVerifiedAt && (
        <p className="mt-3 text-[11px] text-[#F5F0E8]/30">
          Verified {new Date(lastVerifiedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      )}

      <button
        onClick={onConfigure}
        className="mt-4 w-full rounded border border-[#B85C4A]/40 px-3 py-1.5 text-[12px] uppercase tracking-[0.15em] text-[#B85C4A] transition-colors hover:bg-[#B85C4A]/10"
      >
        Configure
      </button>
    </div>
  )
}
