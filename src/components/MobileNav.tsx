"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, CheckSquare, Wallet, User as UserIcon, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview" },
    { href: "/dashboard/tasks", icon: <CheckSquare className="w-5 h-5" />, label: "Task Board" },
    { href: "/dashboard/wallet", icon: <Wallet className="w-5 h-5" />, label: "Wallet" },
    { href: "/dashboard/profile", icon: <UserIcon className="w-5 h-5" />, label: "Profile" },
  ];

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-card/50">
      <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        WorkFlow
      </h2>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-[73px] left-0 right-0 bg-background border-b border-white/5 shadow-xl z-50 p-4">
          <nav className="flex flex-col space-y-2">
            {links.map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <span className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === item.href 
                    ? "bg-primary/20 text-primary font-bold" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5 font-medium"
                }`}>
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
