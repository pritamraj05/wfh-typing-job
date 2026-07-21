"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function getUserPremiumStatus() {
  const { userId } = await auth();
  if (!userId) return false;

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabaseAdmin
    .from("users")
    .select("has_free_premium_task")
    .eq("id", userId)
    .single();

  return data?.has_free_premium_task || false;
}
