import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { User as UserIcon, Mail, Phone, Briefcase, AlertTriangle, CheckCircle, CreditCard } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const { userId } = await auth();
  
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (!user) return <div className="p-8">Profile not found.</div>;

  const hasPaid = user.has_paid;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and billing.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="glass-card p-8">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <UserIcon className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-6">{user.full_name}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5" />
              <span>{user.mobile_number}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Briefcase className="w-5 h-5" />
              <span className="capitalize">{user.job_type || "WFH Typist"}</span>
            </div>
          </div>
        </div>

        {/* Billing & Status */}
        <div className="glass-card p-8 flex flex-col">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            Billing & Status
          </h3>

          {hasPaid ? (
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl flex-1 flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h4 className="text-lg font-bold text-green-500 mb-2">Account Active</h4>
              <p className="text-sm text-green-500/80">
                Your Security Deposit is paid. You have full access to WFH tasks.
              </p>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex-1 flex flex-col items-center justify-center text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <h4 className="text-lg font-bold text-red-500 mb-2">Pending WFH Security Deposit</h4>
              <p className="text-sm text-red-500/80 mb-6">
                Your account is restricted. You must pay the ₹1,500 refundable security deposit to unlock task submissions.
              </p>
              <Link href="/payment" className="w-full">
                <button className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-white transition-all shadow-lg shadow-red-500/20">
                  Pay Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
