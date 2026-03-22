import { getSupabase } from '../lib/supabase-server.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { provider } = req.query

  const supabase = getSupabase()
  const { data: integration } = await supabase
    .from('global_integrations')
    .select('id, tool_name, status, config_json')
    .eq('tool_name', provider)
    .single()

  if (!integration) {
    return res.status(404).json({ error: `Unknown provider: ${provider}` })
  }

  if (integration.status !== 'connected') {
    return res.status(403).json({ error: `Integration ${provider} is not active` })
  }

  // Log the inbound event
  console.log(`[webhook:${provider}]`, JSON.stringify(req.body).slice(0, 500))

  // Update last_verified_at on successful webhook receipt
  await supabase
    .from('global_integrations')
    .update({ last_verified_at: new Date().toISOString() })
    .eq('id', integration.id)

  return res.status(200).json({ ok: true, provider })
}
