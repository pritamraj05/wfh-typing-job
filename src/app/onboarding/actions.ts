"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function submitOnboardingForm(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const fullName = formData.get("fullName") as string;
  const age = formData.get("age") as string;
  const dob = formData.get("dob") as string;
  const mobile = formData.get("mobile") as string;
  const email = formData.get("email") as string;
  const jobType = formData.get("jobType") as string;

  // Use Service Role Key to bypass any RLS issues
  const { createClient } = await import("@supabase/supabase-js");
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Save to Supabase
  const { error } = await supabaseAdmin
    .from("users")
    .upsert({
      id: userId,
      full_name: fullName,
      age: age,
      dob: dob,
      mobile_number: mobile,
      email: email,
      job_type: jobType,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error("Failed to save onboarding data:", error);
    return { success: false, error: error.message };
  }

  // Success! Let the client know so it can redirect properly.
  return { success: true };
}
