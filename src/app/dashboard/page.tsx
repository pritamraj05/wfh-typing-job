"use client";

import { motion } from "framer-motion";
import { TrendingUp, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">Here's your work overview for today.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Earned", value: "₹0", icon: <TrendingUp className="text-green-400" /> },
          { label: "Pending Balance", value: "₹0", icon: <TrendingUp className="text-yellow-400" /> },
          { label: "Tasks Completed", value: "0", icon: <CheckCircle className="text-primary" /> },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
              <div className="p-2 bg-white/5 rounded-lg">{stat.icon}</div>
            </div>
            <h3 className="text-4xl font-extrabold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 glass-card p-6 min-h-[300px]">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm">
            <FileText className="w-12 h-12 mb-4 opacity-20" />
            No recent activity found. Start a task!
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col bg-gradient-to-b from-primary/10 to-transparent">
          <h2 className="text-xl font-bold mb-4">Action Required</h2>
          <p className="text-sm text-muted-foreground mb-8 flex-1">
            You must complete your mandatory live verification task to unlock work.
          </p>
          <Link href="/dashboard/task">
            <button className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-white transition-transform active:scale-95 shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)]">
              Start Live Verification Task
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
