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

drop policy if exists "Allow users to insert own profile" on public.profiles;
create policy "Allow users to insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

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
  array['Python', 'C', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Web Design', 'UI Development', 'Cross-Browser Compatibility', 'Computer Networks', 'VLAN Configuration', 'Static Routing', 'DHCP', 'Network Troubleshooting', 'Cisco Packet Tracer', 'Linux', 'Database Design', 'OOP', 'Debugging', 'Git/GitHub', 'ChatGPT', 'Claude AI', 'AI-Assisted Development'],
  '{"linkedin": "https://www.linkedin.com/in/ahladinisindhusriyenumula", "email": "mailto:ahladini@sutra.ai"}'::jsonb,
  false,
  1
where not exists (
  select 1 from public.team_members where full_name = 'Y Ahladini Sindhu Sri'
);

-- Seed Team Members Data (Dornala Amrutha Varshini)
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
  'Dornala Amrutha Varshini',
  'R&D Engineer & Full-Stack Developer',
  'Dornala Amrutha Varshini is an R&D Engineer specializing in full-stack web development, backend automation, and database design. She builds responsive frontend architectures and engineers robust workflow automation pipelines utilizing modern tools like Node.js, Python, and n8n.',
  'Building intelligent workflows and seamless user experiences to solve real-world challenges.',
  '/WhatsApp Image 2026-07-06 at 5.53.01 PM (1).jpeg',
  array['Frontend Development', 'Workflow Automation & n8n', 'Backend Service Integration', 'Database Schema & Query Tuning', 'System Testing & Optimization'],
  array['HTML & CSS', 'Tailwind CSS', 'React', 'Node.js', 'Python', 'MySQL', 'LLMs & Generative AI', 'n8n Workflows'],
  '{"linkedin": "https://www.linkedin.com/in/amruthadornala30", "github": "https://github.com/amruthadornala30", "email": "mailto:amruthadornala30@gmail.com"}'::jsonb,
  false,
  2
where not exists (
  select 1 from public.team_members where full_name = 'Dornala Amrutha Varshini'
);

-- 9. Create Customers Table
create table if not exists public.customers (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  full_name text not null,
  avatar text,
  email text,
  phone text,
  lead_score int default 0,
  buying_intent int default 0,
  sentiment text default 'neutral',
  intent text,
  revenue text default '₹0',
  orders_count int default 0,
  ai_summary text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. Create Conversations Table
create table if not exists public.conversations (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  customer_id uuid references public.customers on delete cascade not null,
  channel text not null, -- whatsapp, instagram, gmail, google_reviews, website
  unread boolean default false not null,
  priority text default 'medium', -- low, medium, high, completed
  intent text,
  sentiment text,
  snippet text,
  ai_suggested_reply text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Create Messages Table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations on delete cascade not null,
  sender text not null, -- customer, agent, system
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. Create Reviews Table
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  customer_name text not null,
  rating int not null,
  content text,
  sentiment text, -- positive, neutral, negative, urgent
  replied boolean default false not null,
  reply_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. Create Campaigns Table
create table if not exists public.campaigns (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  type text not null, -- instagram, whatsapp, email, festival_offer, coupon, google
  title text not null,
  content text not null,
  status text default 'draft' not null, -- draft, active, sent
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 14. Create Notifications Table
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  text text not null,
  type text default 'system' not null, -- lead, review, system, success
  priority text default 'low' not null, -- low, medium, high
  unread boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 15. Create Analytics Table
create table if not exists public.analytics (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  metric_date date default current_date not null,
  revenue numeric default 0 not null,
  leads_count int default 0 not null,
  conversions_count int default 0 not null,
  response_time_min numeric default 0 not null,
  csat_score numeric default 100 not null
);

-- 16. Create Integrations Table
create table if not exists public.integrations (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  name text not null, -- whatsapp, instagram, google, gmail, website, shopify, stripe, razorpay
  status text default 'disconnected' not null, -- connected, disconnected, warning
  health text default 'good' not null, -- good, poor, down
  last_sync timestamp with time zone,
  logs jsonb default '[]'::jsonb
);

-- 17. Create Knowledge Base Table
create table if not exists public.knowledge_base (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  catalog text,
  services text,
  faqs text,
  ai_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 18. Create Documents Table
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces on delete cascade not null,
  name text not null,
  file_path text not null,
  file_size int default 0,
  status text default 'processed' not null, -- processing, processed, error
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 19. Enable Row Level Security (RLS) on all new tables
alter table public.customers enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;
alter table public.campaigns enable row level security;
alter table public.notifications enable row level security;
alter table public.analytics enable row level security;
alter table public.integrations enable row level security;
alter table public.knowledge_base enable row level security;
alter table public.documents enable row level security;

-- 20. RLS Policies for Owner-based access control
-- Customers
drop policy if exists "Allow owners access to customers" on public.customers;
create policy "Allow owners access to customers" on public.customers
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = customers.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Conversations
drop policy if exists "Allow owners access to conversations" on public.conversations;
create policy "Allow owners access to conversations" on public.conversations
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = conversations.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Messages
drop policy if exists "Allow owners access to messages" on public.messages;
create policy "Allow owners access to messages" on public.messages
  for all using (
    exists (
      select 1 from public.conversations 
      join public.workspaces on conversations.workspace_id = workspaces.id
      where conversations.id = messages.conversation_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Reviews
drop policy if exists "Allow owners access to reviews" on public.reviews;
create policy "Allow owners access to reviews" on public.reviews
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = reviews.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Campaigns
drop policy if exists "Allow owners access to campaigns" on public.campaigns;
create policy "Allow owners access to campaigns" on public.campaigns
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = campaigns.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Notifications
drop policy if exists "Allow owners access to notifications" on public.notifications;
create policy "Allow owners access to notifications" on public.notifications
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = notifications.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Analytics
drop policy if exists "Allow owners access to analytics" on public.analytics;
create policy "Allow owners access to analytics" on public.analytics
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = analytics.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Integrations
drop policy if exists "Allow owners access to integrations" on public.integrations;
create policy "Allow owners access to integrations" on public.integrations
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = integrations.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Knowledge Base
drop policy if exists "Allow owners access to knowledge_base" on public.knowledge_base;
create policy "Allow owners access to knowledge_base" on public.knowledge_base
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = knowledge_base.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- Documents
drop policy if exists "Allow owners access to documents" on public.documents;
create policy "Allow owners access to documents" on public.documents
  for all using (
    exists (
      select 1 from public.workspaces 
      where workspaces.id = documents.workspace_id 
      and workspaces.owner_id = auth.uid()
    )
  );

-- 21. Performance Indexes on Foreign Keys
create index if not exists customers_workspace_id_idx on public.customers(workspace_id);
create index if not exists conversations_workspace_id_idx on public.conversations(workspace_id);
create index if not exists conversations_customer_id_idx on public.conversations(customer_id);
create index if not exists messages_conversation_id_idx on public.messages(conversation_id);
create index if not exists reviews_workspace_id_idx on public.reviews(workspace_id);
create index if not exists campaigns_workspace_id_idx on public.campaigns(workspace_id);
create index if not exists notifications_workspace_id_idx on public.notifications(workspace_id);
create index if not exists analytics_workspace_id_idx on public.analytics(workspace_id);
create index if not exists integrations_workspace_id_idx on public.integrations(workspace_id);
create index if not exists knowledge_base_workspace_id_idx on public.knowledge_base(workspace_id);
create index if not exists documents_workspace_id_idx on public.documents(workspace_id);

-- 22. Grant Schema and Table Privileges to client roles (anon and authenticated)
-- This ensures that client connections do not encounter "permission denied" (42501) errors.
-- Actual data security is enforced by Row-Level Security (RLS).
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

alter default privileges in schema public grant select, insert, update, delete on tables to anon, authenticated;
alter default privileges in schema public grant usage, select on sequences to anon, authenticated;
