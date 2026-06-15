"use client";

import { motion } from "framer-motion";
import { FileText, Clock, IndianRupee } from "lucide-react";
import Link from "next/link";

const MOCK_TASKS = [
  { id: "1", title: "Manage Instagram ad campaign for local clinic", words: 1200, deadline: "24 Hours", payout: 300 },
  { id: "2", title: "Write SEO-optimized articles for legal blog", words: 2500, deadline: "48 Hours", payout: 600 },
  { id: "3", title: "Digital Marketing: SEO analysis for blog", words: 800, deadline: "12 Hours", payout: 250 },
  { id: "4", title: "Design and launch Facebook retargeting ads", words: 3500, deadline: "3 Days", payout: 1000 },
];

export default function TaskBoard() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Available Tasks</h1>
        <p className="text-muted-foreground">Pick a task below to start earning.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_TASKS.map((task, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={task.id} 
            className="glass-card p-6 flex flex-col hover:bg-white/5 transition-colors border border-white/5 hover:border-primary/30"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold line-clamp-2 pr-4">{task.title}</h3>
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap flex items-center">
                ₹{task.payout}
              </div>
            </div>
            
            <div className="flex gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {task.words} words</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {task.deadline}</span>
            </div>

            <div className="mt-auto">
              <Link href={`/dashboard/workspace?taskId=${task.id}`}>
                <button className="w-full py-3 bg-white/5 hover:bg-primary text-foreground hover:text-primary-foreground rounded-lg font-medium transition-colors border border-white/10 hover:border-primary">
                  Accept Task
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
