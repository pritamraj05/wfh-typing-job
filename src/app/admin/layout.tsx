import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, FileText, ListChecks, ArrowDownToLine, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // In a real app, verify this userId belongs to an Admin role from your DB
  // For now, if no userId, redirect to sign in.
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-red-500/10 bg-red-950/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-red-500/10 flex items-center gap-2 text-red-500">
          <ShieldAlert className="w-6 h-6" />
          <h2 className="text-xl font-bold">God Mode</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { href: "/admin", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
            { href: "/admin/tasks", icon: <FileText className="w-5 h-5" />, label: "Manage Tasks" },
            { href: "/admin/queue", icon: <ListChecks className="w-5 h-5" />, label: "Review Queue" },
            { href: "/admin/withdrawals", icon: <ArrowDownToLine className="w-5 h-5" />, label: "Withdrawals" },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <span className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black/50">
        {children}
      </main>
    </div>
  );
}
