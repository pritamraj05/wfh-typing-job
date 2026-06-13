"use client";

import { motion } from "framer-motion";
import { Users, IndianRupee, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-red-400">System Overview</h1>
        <p className="text-muted-foreground">Real-time metrics for the entire platform.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Revenue (Collected)", value: "₹45,000", icon: <IndianRupee className="text-green-400" /> },
          { label: "Total Liability (To Pay)", value: "₹12,400", icon: <IndianRupee className="text-red-400" /> },
          { label: "Active Users (Online)", value: "34", icon: <Activity className="text-blue-400" /> },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card p-6 flex flex-col border border-red-500/10 bg-card/40"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
              <div className="p-2 bg-red-500/5 rounded-lg">{stat.icon}</div>
            </div>
            <h3 className="text-4xl font-extrabold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
