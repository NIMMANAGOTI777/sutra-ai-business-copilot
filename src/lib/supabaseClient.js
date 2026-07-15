import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-supabase-project.supabase.co') {
  console.error(
    "Missing or default Supabase configuration variables! " +
    "Please create a '.env' file in the root directory and configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY. " +
    "Consult setup_instructions.md for guidance."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
