import { createClient } from "@supabase/supabase-js"

// Ensure environment variables are properly typed and available
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing required environment variables: REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

