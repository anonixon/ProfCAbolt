import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase URL or Service Role Key is missing")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  // Create ideas table
  const { error: ideasError } = await supabase.rpc("create_ideas_table")
  if (ideasError) console.error("Error creating ideas table:", ideasError)

  // Create feedback table
  const { error: feedbackError } = await supabase.rpc("create_feedback_table")
  if (feedbackError) console.error("Error creating feedback table:", feedbackError)

  console.log("Database setup completed")
}

setupDatabase().catch(console.error)

