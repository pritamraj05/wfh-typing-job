"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function AdminWithdrawals() {
  const [requests] = useState([
    { id: "1", user: "Vikram", upi: "vikram@okhdfc", amount: 500, status: "Pending" },
    { id: "2", user: "Sneha", upi: "sneha@okicici", amount: 1200, status: "Pending" },
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Withdrawal Requests</h1>
        <p className="text-muted-foreground">Process manual payouts to user UPIs.</p>
      </header>

      <div className="glass-card border border-red-500/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="p-4 font-medium text-muted-foreground">User</th>
              <th className="p-4 font-medium text-muted-foreground">UPI ID</th>
              <th className="p-4 font-medium text-muted-foreground">Amount</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 font-medium">{req.user}</td>
                <td className="p-4 font-mono text-sm text-blue-400">{req.upi}</td>
                <td className="p-4 font-bold text-green-400">₹{req.amount}</td>
                <td className="p-4 flex justify-end">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Mark as Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
