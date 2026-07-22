"use server";

import { createClient } from "@supabase/supabase-js";

export async function getTaskDetails(taskId: string) {
  if (!taskId) return null;

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabaseAdmin
    .from("available_tasks")
    .select("title, drive_link, submission_email")
    .eq("task_id", taskId)
    .single();

  return data;
}
