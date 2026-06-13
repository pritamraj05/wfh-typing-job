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
  const typingSpeed = formData.get("typingSpeed") as string;
  const deviceType = formData.get("deviceType") as string;

  // Save to Supabase (assuming columns exist or will be added)
  const { error } = await supabase
    .from("users")
    .upsert({
      id: userId,
      full_name: fullName,
      typing_speed: typingSpeed,
      device_type: deviceType,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error("Failed to save onboarding data:", error);
    // Continue anyway to payment for MVP purposes
  }

  // Redirect to payment
  redirect("/payment");
}
