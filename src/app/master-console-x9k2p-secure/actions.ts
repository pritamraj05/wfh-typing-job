"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ----------------- PLATFORM FEE APPROVAL -----------------
export async function manualApprovePayment(email: string) {
  if (!email) return { error: "Email is required" };
  const supabase = getAdminClient();

  const { data: users, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email);

  if (fetchError || !users || users.length === 0) {
    return { error: "User not found with this email." };
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ has_paid: true, updated_at: new Date().toISOString() })
    .in("id", users.map(u => u.id));

  if (updateError) return { error: "Failed to update payment status." };

  revalidatePath("/master-console-x9k2p-secure");
  return { success: true, message: `Payment approved for ${email}` };
}

// ----------------- TASK MANAGEMENT -----------------
export async function createTask(formData: FormData) {
  const supabase = getAdminClient();
  
  const title = formData.get("title") as string;
  const reward = parseInt(formData.get("reward") as string);
  const fee = parseInt(formData.get("fee") as string) || 0;
  const drive_link = formData.get("drive_link") as string;
  const email = formData.get("submission_email") as string || 'info.microdesk@gmail.com';

  const { error } = await supabase.from("available_tasks").insert([
    { 
      title, 
      reward_amount: reward, 
      activation_fee: fee, 
      drive_link, 
      submission_email: email
    }
  ]);

  if (error) return { error: error.message };
  revalidatePath("/master-console-x9k2p-secure");
  return { success: true, message: "Task created successfully." };
}

export async function deleteTask(taskId: string) {
  const supabase = getAdminClient();
  const { error } = await supabase.from("available_tasks").delete().eq("task_id", taskId);
  if (error) return { error: error.message };
  revalidatePath("/master-console-x9k2p-secure");
  return { success: true, message: "Task deleted successfully." };
}

// ----------------- ACCESS MANAGEMENT -----------------
export async function grantTaskAccess(email: string, taskId: string) {
  if (!email || !taskId) return { error: "Email and Task are required" };
  const supabase = getAdminClient();

  const { data: users, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email);

  if (fetchError || !users || users.length === 0) {
    return { error: "User not found with this email." };
  }

  // Grant access for the first matched user (emails should be unique anyway)
  const userId = users[0].id;

  const { error: insertError } = await supabase
    .from("user_task_access")
    .upsert({ user_id: userId, task_id: taskId, granted_by: 'admin' }, { onConflict: 'user_id,task_id' });

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath("/master-console-x9k2p-secure");
  return { success: true, message: `Access granted to ${email}` };
}

