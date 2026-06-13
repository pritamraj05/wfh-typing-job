import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, CheckSquare, Wallet, User as UserIcon } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-card/50 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            WorkFlow
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview" },
            { href: "/dashboard/tasks", icon: <CheckSquare className="w-5 h-5" />, label: "Task Board" },
            { href: "/dashboard/wallet", icon: <Wallet className="w-5 h-5" />, label: "Wallet" },
            { href: "/dashboard/profile", icon: <UserIcon className="w-5 h-5" />, label: "Profile" },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <span className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="glass-card p-4 flex items-center justify-between">
            <span className="text-sm font-medium">Balance</span>
            <span className="text-green-400 font-bold">₹0</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
