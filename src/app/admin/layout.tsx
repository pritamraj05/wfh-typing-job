import { ShieldAlert } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ADMIN_EMAILS = ["ag9988228889@gmail.com"];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
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
