import { getSupabase } from './supabase-server.js'
import { decrypt } from './encryption.js'

export async function getGlobalIntegration(toolName) {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('global_integrations')
    .select('*')
    .eq('tool_name', toolName)
    .single()

  if (error || !data) return null

  let apiKey = null
  if (data.api_key_encrypted) {
    try {
      apiKey = decrypt(data.api_key_encrypted)
    } catch {
      apiKey = null
    }
  }

  return {
    id: data.id,
    toolName: data.tool_name,
    category: data.category,
    apiKey,
    webhookUrl: data.webhook_url,
    config: data.config_json || {},
    status: data.status,
    lastVerifiedAt: data.last_verified_at,
  }
}
