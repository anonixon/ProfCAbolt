import { supabase } from "./supabase"

export async function setupDatabase() {
  // Create profiles table
  const { error: profilesError } = await supabase.rpc("create_profiles_table")
  if (profilesError) console.error("Error creating profiles table:", profilesError)

  // Create saved_ideas table
  const { error: ideasError } = await supabase.rpc("create_saved_ideas_table")
  if (ideasError) console.error("Error creating saved_ideas table:", ideasError)

  // Create peer_reviews table
  const { error: reviewsError } = await supabase.rpc("create_peer_reviews_table")
  if (reviewsError) console.error("Error creating peer_reviews table:", reviewsError)

  // Create user_gamification table
  const { error: gamificationError } = await supabase.rpc("create_user_gamification_table")
  if (gamificationError) console.error("Error creating user_gamification table:", gamificationError)

  // Create milestones table
  const { error: milestonesError } = await supabase.rpc("create_milestones_table")
  if (milestonesError) console.error("Error creating milestones table:", milestonesError)

  // Create user_achievements table
  const { error: achievementsError } = await supabase.rpc("create_user_achievements_table")
  if (achievementsError) console.error("Error creating user_achievements table:", achievementsError)

  // Create admin_users table
  const { error: adminUsersError } = await supabase.rpc("create_admin_users_table")
  if (adminUsersError) console.error("Error creating admin_users table:", adminUsersError)

  console.log("Database setup completed")
}

export async function createInitialAdmin(email: string, password: string) {
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

