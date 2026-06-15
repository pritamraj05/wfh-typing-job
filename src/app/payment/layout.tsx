import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { data: user } = await supabase
    .from("users")
    .select("full_name, has_paid")
    .eq("id", userId)
    .single();

  // If they haven't filled out the onboarding form yet, send them there first!
  if (!user || !user.full_name) {
    redirect("/onboarding");
  }

  // If they already paid, they shouldn't be on the payment page
  if (user.has_paid) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
