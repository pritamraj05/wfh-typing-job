"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

export default function AdminQueue() {
  const [submissions] = useState([
    { id: "1", user: "Rahul", task: "Type 5 pages...", reward: 300, submittedText: "It was the best of times, it was the worst of times..." },
    { id: "2", user: "Priya", task: "Transcribe scanned legal document...", reward: 600, submittedText: "Herein lies the agreement between the aforementioned parties..." },
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Review & Approval Queue</h1>
        <p className="text-muted-foreground">Review user submissions and approve payouts.</p>
      </header>

      <div className="space-y-6">
        {submissions.map(sub => (
          <div key={sub.id} className="glass-card p-6 border border-red-500/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">User: {sub.user}</h3>
                <p className="text-sm text-muted-foreground">Task: {sub.task}</p>
              </div>
              <div className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm font-bold">
                Payout: ₹{sub.reward}
              </div>
            </div>
            
            <div className="bg-black/50 p-4 rounded-lg mb-6 border border-white/5 text-sm text-muted-foreground max-h-32 overflow-y-auto">
              {sub.submittedText}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all">
                <Check className="w-5 h-5" /> Approve & Pay
              </button>
              <button className="flex-1 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-foreground py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all border border-white/5 hover:border-red-500/50">
                <X className="w-5 h-5" /> Reject
              </button>
            </div>
          </div>
        ))}
        {submissions.length === 0 && (
          <div className="text-center p-12 text-muted-foreground glass-card">
            No pending submissions to review.
          </div>
        )}
      </div>
    </div>
  );
}
