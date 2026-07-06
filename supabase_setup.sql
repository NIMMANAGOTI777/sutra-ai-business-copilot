-- supabase_setup.sql
-- Run this script in the Supabase SQL Editor to configure the database schema

-- 1. Create the Profiles Table with Business Onboarding fields
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone_number text,
  profile_photo text,
  login_provider text,
  
  -- Onboarding Business Details
  business_name text,
  business_category text,
  business_logo text,
  business_phone text,
  business_email text,
  business_address text,
  employees_count text,
  onboarded boolean default false not null,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_login timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the Workspaces Table
create table if not exists public.workspaces (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references auth.users on delete cascade not null,
  
  business_name text not null,
  business_category text,
  business_logo text,
  business_phone text,
  business_email text,
  business_address text,
  employees_count text,
  
  -- Step 1: Channels Connection Status (e.g. { "whatsapp": true, "instagram": false })
  connected_channels jsonb default '{}'::jsonb not null,
  
  -- Step 2 & 3: AI Knowledge Base and Assets
  ai_description text,
  ai_hours text,
  ai_pricing text,
  ai_faqs text,
  
  setup_completed boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Team Members Table (Future Team Support)
create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  role text not null,
  bio text,
  quote text,
  avatar_url text,
  responsibilities text[] default '{}'::text[],
  skills text[] default '{}'::text[],
  socials jsonb default '{}'::jsonb,
  is_featured boolean default false,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.team_members enable row level security;

-- 5. Row Level Security Policies
-- Profiles Table
drop policy if exists "Allow users to read own profile" on public.profiles;
create policy "Allow users to read own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "Allow users to update own profile" on public.profiles;
create policy "Allow users to update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Workspaces Table
drop policy if exists "Allow owners to read own workspaces" on public.workspaces;
create policy "Allow owners to read own workspaces" on public.workspaces
  for select using (auth.uid() = owner_id);

drop policy if exists "Allow owners to insert own workspaces" on public.workspaces;
create policy "Allow owners to insert own workspaces" on public.workspaces
  for insert with check (auth.uid() = owner_id);

drop policy if exists "Allow owners to update own workspaces" on public.workspaces;
create policy "Allow owners to update own workspaces" on public.workspaces
  for update using (auth.uid() = owner_id);

-- Team Members Table (Allows public viewing of the team page)
drop policy if exists "Allow public read access to team_members" on public.team_members;
create policy "Allow public read access to team_members" on public.team_members
  for select using (true);


-- 6. User Synchronization Function
-- Automatically inserts or updates user details on signup and login events.
-- Sets onboarded = false initially, without overwriting existing profiles.
create or replace function public.handle_user_sync()
returns trigger as $$
begin
  insert into public.profiles (
    id, 
    full_name, 
    email, 
    phone_number, 
    profile_photo, 
    login_provider, 
    last_login,
    onboarded
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', ''),
    new.email,
    new.phone,
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    new.app_metadata->>'provider',
    now(),
    false
  )
  on conflict (id) do update
  set 
    last_login = now(),
    full_name = coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', profiles.full_name),
    email = coalesce(new.email, profiles.email),
    phone_number = coalesce(new.phone, profiles.phone_number),
    profile_photo = coalesce(new.raw_user_meta_data->>'avatar_url', profiles.profile_photo),
    login_provider = coalesce(new.app_metadata->>'provider', profiles.login_provider);
  return new;
end;
$$ language plpgsql security definer;

-- 7. Triggers
-- Bind sync function to auth.users insert (signup) and update of sign-in timestamp (login)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_user_sync();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update of last_sign_in_at on auth.users
  for each row execute procedure public.handle_user_sync();


-- 8. Seed Team Members Data (Karthik Nimmanagoti)
insert into public.team_members (
  full_name, 
  role, 
  bio, 
  quote, 
  avatar_url, 
  responsibilities, 
  skills, 
  socials, 
  is_featured, 
  display_order
)
select 
  'Karthik Nimmanagoti',
  'Founder & Product Manager',
  'Karthik Nimmanagoti is a Product Manager, designer, and AI enthusiast passionate about building intelligent software that helps businesses work smarter. Sutra was created to simplify how local businesses manage customer relationships using AI.',
  'Building AI products that make business simpler, smarter, and more human.',
  'https://res.cloudinary.com/do4nuj2kh/image/upload/v1783330744/WhatsApp_Image_2026-07-01_at_7.32.30_PM_vbhtly.jpg',
  array['Product Strategy', 'Product Management', 'UI/UX Design', 'AI Experience Design', 'Frontend Development', 'Brand Identity', 'System Architecture'],
  array['Product Management', 'UI/UX Design', 'React', 'Supabase', 'AI Products', 'Branding', 'Marketing Strategy'],
  '{"linkedin": "https://www.linkedin.com/in/karthik-nimmanagoti-52a403324", "github": "https://github.com/NIMMANAGOTI777", "instagram": "https://www.instagram.com/nimmanagoti.karthik/", "email": "mailto:karthik@sutra.ai"}'::jsonb,
  true,
  0
where not exists (
  select 1 from public.team_members where full_name = 'Karthik Nimmanagoti'
);

-- Seed Team Members Data (Y Ahladini Sindhu Sri)
insert into public.team_members (
  full_name, 
  role, 
  bio, 
  quote, 
  avatar_url, 
  responsibilities, 
  skills, 
  socials, 
  is_featured, 
  display_order
)
select 
  'Y Ahladini Sindhu Sri',
  'R&D Lead & AI Engineer',
  'Y Ahladini Sindhu Sri is an R&D Lead specializing in artificial intelligence, machine learning, and natural language processing. She drives research and development initiatives at Sutra, designing advanced algorithms and intelligent pipelines that empower local businesses with state-of-the-art automation.',
  'Driving innovation by translating cutting-edge AI research into real-world business value.',
  'https://res.cloudinary.com/do4nuj2kh/image/upload/v1783339293/WhatsApp_Image_2026-07-06_at_5.30.28_PM_zfsz9i.jpg',
  array['AI Research & Innovation', 'Algorithm Design & Tuning', 'NLP & Large Language Models', 'Data Pipeline Architecture', 'Predictive Modeling', 'Performance Optimization', 'System Integration'],
  array['Python', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Large Language Models (LLMs)', 'Data Analytics', 'API Development', 'TensorFlow / PyTorch'],
  '{"linkedin": "https://www.linkedin.com/in/ahladinisindhusriyenumula", "email": "mailto:ahladini@sutra.ai"}'::jsonb,
  false,
  1
where not exists (
  select 1 from public.team_members where full_name = 'Y Ahladini Sindhu Sri'
);

