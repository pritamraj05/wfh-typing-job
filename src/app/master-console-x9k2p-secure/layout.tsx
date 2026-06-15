import { ShieldAlert } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const ADMIN_EMAILS = ["ag9988228889@gmail.com"];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Extreme Security: Check Device Footprint Cookie
  const cookieStore = await cookies();
  const deviceFootprint = cookieStore.get('device_footprint_secure');
  
  if (!deviceFootprint || deviceFootprint.value !== 'verified_admin_device_x99') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-600 font-mono text-xl p-8 text-center space-y-4">
        <h1 className="text-4xl font-bold uppercase tracking-widest">Access Denied</h1>
        <p>Error Code: 0x800A0004</p>
        <p className="text-sm text-red-900 mt-4">Unrecognized Device Footprint. Connection dropped.</p>
      </div>
    );
  }

  // 2. Auth Security: Check user session and email
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const userEmail = user.emailAddresses[0]?.emailAddress;
  if (!ADMIN_EMAILS.includes(userEmail)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold text-2xl">
        401 Unauthorized: You are not an admin.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-gray-900 text-white p-4 flex items-center gap-3 sticky top-0 z-50 shadow-md">
        <ShieldAlert className="text-red-500 w-6 h-6" />
        <h1 className="text-xl font-bold tracking-wider">SECURE ADMIN CONSOLE</h1>
      </header>
      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
