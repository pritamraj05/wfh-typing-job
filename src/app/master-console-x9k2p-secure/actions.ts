"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function manualApprovePayment(email: string) {
  if (!email) {
    return { error: "Email is required" };
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // First find the user by email
  const { data: user, error: fetchError } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (fetchError || !user) {
    return { error: "User not found with this email." };
  }

  // Update has_paid to true
  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({ has_paid: true, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (updateError) {
    return { error: "Failed to update payment status." };
  }

  revalidatePath("/master-console-x9k2p-secure");
  return { success: true, message: `Payment approved for ${email}` };
}
