import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Lock } from "lucide-react";
import Link from "next/link";

export default async function TaskLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("has_paid")
    .eq("id", userId)
    .single();

  if (!user?.has_paid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 max-w-lg mx-auto p-6">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
          <Lock className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-3xl font-bold">Task Locked</h2>
        <p className="text-muted-foreground text-lg">
          You must pay the ₹1,500 WFH Security Deposit to unlock the live camera and submit handwriting tasks.
        </p>
        <Link href="/payment" className="w-full">
          <button className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Pay Security Deposit Now
          </button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
