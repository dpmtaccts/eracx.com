import { getGlobalIntegration } from '../../lib/integrations.js'

const TEST_ENDPOINTS = {
  databar: { url: 'https://api.databar.ai/api/v1/user', header: 'Authorization', prefix: 'Bearer ' },
  clay: { url: 'https://api.clay.com/v1/me', header: 'Authorization', prefix: 'Bearer ' },
  apollo: { url: 'https://api.apollo.io/v1/auth/health', header: 'X-Api-Key', prefix: '' },
  salesforge: { url: 'https://api.salesforge.ai/v1/account', header: 'Authorization', prefix: 'Bearer ' },
  fireflies: { url: 'https://api.fireflies.ai/graphql', header: 'Authorization', prefix: 'Bearer ', method: 'POST', body: '{"query":"{ currentUser { email } }"}' },
  dripify: { url: 'https://api.dripify.io/v1/account', header: 'X-Api-Key', prefix: '' },
  reply_io: { url: 'https://api.reply.io/v1/actions/status', header: 'X-Api-Key', prefix: '' },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { toolName } = req.body || {}
  if (!toolName) return res.status(400).json({ error: 'Missing toolName' })

  // Webhook-only tools (no API key to test)
  if (toolName === 'rb2b') {
    return res.status(200).json({ ok: true, message: 'RB2B is webhook-based. No API key to verify.' })
  }

  const integration = await getGlobalIntegration(toolName)
  if (!integration || !integration.apiKey) {
    return res.status(400).json({ error: 'No API key configured for this tool' })
  }

  const endpoint = TEST_ENDPOINTS[toolName]
  if (!endpoint) {
    return res.status(400).json({ error: `No test endpoint configured for ${toolName}` })
  }

  try {
    const headers = {
      [endpoint.header]: `${endpoint.prefix}${integration.apiKey}`,
      'Content-Type': 'application/json',
    }

    const fetchOpts = { method: endpoint.method || 'GET', headers }
    if (endpoint.body) fetchOpts.body = endpoint.body

    const response = await fetch(endpoint.url, fetchOpts)

    if (response.ok) {
      // Update status to connected
      const { getSupabase } = await import('../../lib/supabase-server.js')
      const supabase = getSupabase()
      await supabase
        .from('global_integrations')
        .update({ status: 'connected', last_verified_at: new Date().toISOString() })
        .eq('tool_name', toolName)

      return res.status(200).json({ ok: true, message: 'Connection verified' })
    } else {
      const body = await response.text()
      return res.status(200).json({ ok: false, message: `API returned ${response.status}: ${body.slice(0, 200)}` })
    }
  } catch (err) {
    return res.status(200).json({ ok: false, message: `Connection failed: ${err.message}` })
  }
}
