"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function submitOnboardingForm(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const fullName = formData.get("fullName") as string;
  const age = formData.get("age") as string;
  const dob = formData.get("dob") as string;
  const mobile = formData.get("mobile") as string;
  const email = formData.get("email") as string;
  const jobType = formData.get("jobType") as string;

  // Save to Supabase
  const { error } = await supabase
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
    // Continue anyway to payment for MVP purposes
  }

  // Redirect to payment
  redirect("/payment");
}
