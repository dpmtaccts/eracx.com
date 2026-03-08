import { getSupabase } from '../../lib/supabase-server.js'
import { encrypt } from '../../lib/encryption.js'

export default async function handler(req, res) {
  const supabase = getSupabase()

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('global_integrations')
      .select('id, tool_name, category, status, webhook_url, config_json, last_verified_at, created_at, updated_at')
      .order('tool_name')

    if (error) return res.status(500).json({ error: error.message })

    const integrations = data.map((row) => ({
      id: row.id,
      toolName: row.tool_name,
      category: row.category,
      status: row.status,
      webhookUrl: row.webhook_url,
      config: row.config_json || {},
      hasApiKey: !!row.api_key_encrypted,
      lastVerifiedAt: row.last_verified_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }))

    return res.status(200).json(integrations)
  }

  if (req.method === 'PUT') {
    const { id, apiKey, webhookUrl, config } = req.body || {}
    if (!id) return res.status(400).json({ error: 'Missing integration id' })

    const updates = { updated_at: new Date().toISOString() }
    if (apiKey !== undefined) updates.api_key_encrypted = apiKey ? encrypt(apiKey) : null
    if (webhookUrl !== undefined) updates.webhook_url = webhookUrl
    if (config !== undefined) updates.config_json = config

    const { error } = await supabase
      .from('global_integrations')
      .update(updates)
      .eq('id', id)

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
