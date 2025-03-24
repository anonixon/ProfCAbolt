import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase URL or Service Role Key is missing")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createInitialAdmin(email: string, password: string) {
  const { data: user, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError) {
    console.error("Error creating admin user:", signUpError)
    return
  }

  if (user) {
    const { error: insertError } = await supabase.from("admin_users").insert({ user_id: user.id, email: user.email })

    if (insertError) {
      console.error("Error inserting admin user into admin_users table:", insertError)
    } else {
      console.log("Initial admin user created successfully")
    }
  }
}

async function main() {
  const adminEmail = "admin@example.com" // Replace with your desired admin email
  const adminPassword = "your-secure-password" // Replace with a secure password

  await createInitialAdmin(adminEmail, adminPassword)
}

main().catch(console.error)

