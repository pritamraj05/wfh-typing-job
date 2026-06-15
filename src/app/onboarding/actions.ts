"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function submitOnboardingForm(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const fullName = formData.get("fullName") as string;
  const mobile = formData.get("mobile") as string;
  const email = formData.get("email") as string;
  const jobType = formData.get("jobType") as string;

  // Save to Supabase using standard client
  try {
    const { error } = await supabaseAdmin
      .from("users")
      .upsert({
        id: userId,
        full_name: fullName,
        mobile_number: mobile,
        email: email,
        job_type: jobType,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Failed to save onboarding data:", error);
      const urlCheck = process.env.NEXT_PUBLIC_SUPABASE_URL || 'missing';
      return { success: false, error: `DB Error: ${error.message} | URL check: ${urlCheck.substring(0, 15)}` };
    }
  } catch (err: any) {
    console.error("Fetch Exception:", err);
    // Return detailed error info to the client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'missing';
    return { 
      success: false, 
      error: `Network Error: ${err.message}. Supabase URL starts with: ${supabaseUrl.substring(0, 15)}... Cause: ${err.cause ? err.cause.message : 'unknown'}`
    };
  }

  // Success! Let the client know so it can redirect properly.
  return { success: true };
}

export async function getOnboardingData() {
  const { userId } = await auth();
  if (!userId) return null;

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("full_name, mobile_number, email, job_type")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  return {
    fullName: data.full_name || "",
    mobile: data.mobile_number || "",
    email: data.email || "",
  };
}
