-- Global Integrations table
-- Era-level API connections shared across all clients
create table if not exists global_integrations (
  id uuid primary key default gen_random_uuid(),
  tool_name text not null unique,
  category text not null,
  api_key_encrypted text,
  webhook_url text,
  config_json jsonb default '{}'::jsonb,
  status text not null default 'disconnected' check (status in ('connected', 'disconnected')),
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger global_integrations_updated_at
  before update on global_integrations
  for each row execute function update_updated_at();

-- Seed the 8 platform tools
insert into global_integrations (tool_name, category) values
  ('databar', 'Enrichment'),
  ('clay', 'Enrichment'),
  ('apollo', 'Enrichment + Orchestration'),
  ('salesforge', 'Orchestration'),
  ('rb2b', 'Website Tracking'),
  ('fireflies', 'Meeting Intelligence'),
  ('dripify', 'Orchestration'),
  ('reply_io', 'Orchestration')
on conflict (tool_name) do nothing;
