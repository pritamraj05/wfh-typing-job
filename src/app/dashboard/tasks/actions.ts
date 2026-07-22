"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function getDashboardData() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return { tasks: [], unlockedTasks: [] };

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, has_free_premium_task")
    .eq("id", clerkId)
    .single();

  if (!user) return { tasks: [], unlockedTasks: [] };

  const { data: tasks } = await supabaseAdmin
    .from("available_tasks")
    .select("*")
    .order("created_at", { ascending: false });

  // Get unlocked tasks
  const unlocked = new Set<string>();
  
  // Backwards compatibility for old premium access
  if (user.has_free_premium_task) {
    // If we have an old premium task, it won't map strictly, but we can assume "premium_typing" if it exists.
    // However, the old id "premium_typing" is gone. It's now UUIDs.
    // For now, if they had the old flag, they unlock ALL tasks or none? Let's just rely on user_task_access.
  }

  try {
    const { data: access } = await supabaseAdmin
      .from("user_task_access")
      .select("task_id")
      .eq("user_id", user.id);
      
    if (access) {
      access.forEach(a => unlocked.add(a.task_id));
    }
  } catch (e) {
    console.error("user_task_access table might not exist yet.");
  }

  return {
    tasks: tasks || [],
    unlockedTasks: Array.from(unlocked)
  };
}
