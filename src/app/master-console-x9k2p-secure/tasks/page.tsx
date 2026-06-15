"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminTasks() {
  const [tasks] = useState([
    { id: "1", title: "Type 5 pages of handwritten medical notes", reward: 300, active: true },
    { id: "2", title: "Transcribe scanned legal document to text", reward: 600, active: true },
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Task Management</h1>
          <p className="text-muted-foreground">Create, edit, and delete marketing campaigns.</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
          <Plus className="w-5 h-5" /> New Task
        </button>
      </header>

      <div className="glass-card border border-red-500/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="p-4 font-medium text-muted-foreground">Title</th>
              <th className="p-4 font-medium text-muted-foreground">Reward (₹)</th>
              <th className="p-4 font-medium text-muted-foreground">Status</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 font-medium">{t.title}</td>
                <td className="p-4 text-green-400">₹{t.reward}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-md">Active</span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="p-2 hover:bg-white/10 rounded text-muted-foreground"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-red-500/20 rounded text-red-400"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
