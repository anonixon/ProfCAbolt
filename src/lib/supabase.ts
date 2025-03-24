import { createClient } from '@supabase/supabase-js';
import env from './env';
import { Database } from '../types/supabase';

export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export type SupabaseClient = typeof supabase; 