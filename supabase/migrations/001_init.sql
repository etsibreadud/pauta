create extension if not exists "uuid-ossp";

create table if not exists agencies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  source_config jsonb not null,
  created_at timestamptz default now()
);

create table if not exists user_agencies (
  user_id uuid references auth.users on delete cascade,
  agency_id uuid references agencies on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, agency_id)
);

create table if not exists interests (
  user_id uuid primary key references auth.users on delete cascade,
  include_keywords text[] not null default '{}',
  exclude_keywords text[] not null default '{}',
  priority_themes text[] not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists agenda_items (
  id uuid primary key default uuid_generate_v4(),
  agency_id uuid references agencies on delete cascade,
  meeting_date date not null,
  title text not null,
  process_number text,
  description text,
  source_url text,
  attachments jsonb,
  raw_text text,
  hash text unique,
  created_at timestamptz default now()
);

create table if not exists relevance_scores (
  user_id uuid references auth.users on delete cascade,
  agenda_item_id uuid references agenda_items on delete cascade,
  score int not null,
  explanation text,
  user_override boolean,
  created_at timestamptz default now(),
  primary key (user_id, agenda_item_id)
);

create table if not exists uploads (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  file_path text not null,
  original_filename text,
  mime text,
  extracted_text text,
  created_at timestamptz default now()
);

create table if not exists analyses (
  upload_id uuid primary key references uploads on delete cascade,
  exec_summary text,
  legal_insights text,
  update_email_subject text,
  update_email_body text,
  key_excerpts jsonb,
  created_at timestamptz default now()
);

create table if not exists privacy_consents (
  user_id uuid primary key references auth.users on delete cascade,
  ai_opt_in boolean not null default false,
  consented_at timestamptz,
  updated_at timestamptz default now()
);

alter table agencies enable row level security;
alter table user_agencies enable row level security;
alter table interests enable row level security;
alter table agenda_items enable row level security;
alter table relevance_scores enable row level security;
alter table uploads enable row level security;
alter table analyses enable row level security;
alter table privacy_consents enable row level security;

create policy "Agencies are readable" on agencies
  for select using (true);

create policy "Users manage their agencies" on user_agencies
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their interests" on interests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Agenda items readable" on agenda_items
  for select using (true);

create policy "Users manage relevance" on relevance_scores
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage uploads" on uploads
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage analyses" on analyses
  for all using (
    auth.uid() = (select user_id from uploads where uploads.id = analyses.upload_id)
  ) with check (
    auth.uid() = (select user_id from uploads where uploads.id = analyses.upload_id)
  );

create policy "Users manage privacy consent" on privacy_consents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
