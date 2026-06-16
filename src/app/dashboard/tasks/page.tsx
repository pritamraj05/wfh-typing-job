"use client";

import { motion } from "framer-motion";
import { Clock, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MOCK_TASKS = [
  { id: "1", title: "Offline Handwriting Assignment" },
  { id: "2", title: "Digital Online Typing Project" },
];

export default function TaskBoard() {
  const router = useRouter();
  const [validity, setValidity] = useState<Record<string, string>>({});
  const [activatingTaskId, setActivatingTaskId] = useState<string | null>(null);
  const [activationStatus, setActivationStatus] = useState<"idle" | "approving" | "approved">("idle");

  useEffect(() => {
    // Generate a random validity time between 4 to 8 hours for each user on load
    setValidity({
      "1": `${Math.floor(Math.random() * 5) + 4} Hours`,
      "2": `${Math.floor(Math.random() * 5) + 4} Hours`
    });
  }, []);

  const handleActivate = (taskId: string) => {
    setActivatingTaskId(taskId);
    setActivationStatus("approving");

    // Simulate automatic 5-second approval process
    setTimeout(() => {
      setActivationStatus("approved");
      // Redirect to workspace shortly after approval
      setTimeout(() => {
        router.push(`/dashboard/workspace?taskId=${taskId}`);
      }, 1500);
    }, 5000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Available Tasks</h1>
        <p className="text-muted-foreground">Pick a task below to start earning.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_TASKS.map((task, i) => {
          const isActivatingThis = activatingTaskId === task.id;
          
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={task.id} 
              className={`glass-card p-6 flex flex-col transition-all border ${
                isActivatingThis && activationStatus === "approving" 
                  ? "border-yellow-500/50 bg-yellow-500/5" 
                  : isActivatingThis && activationStatus === "approved"
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-white/5 hover:border-primary/30 hover:bg-white/5"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold line-clamp-2 pr-4">{task.title}</h3>
              </div>
              
              <div className="flex gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" /> 
                  Validity: {validity[task.id] || "Calculating..."}
                </span>
              </div>

              <div className="mt-auto">
                <button 
                  onClick={() => handleActivate(task.id)}
                  disabled={activatingTaskId !== null} // Disable all buttons if one is activating
                  className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                    isActivatingThis && activationStatus === "approving"
                      ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 cursor-wait"
                      : isActivatingThis && activationStatus === "approved"
                      ? "bg-green-500 text-white shadow-green-500/20"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 hover:scale-[1.02] active:scale-95"
                  } ${activatingTaskId !== null && !isActivatingThis ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isActivatingThis && activationStatus === "approving" && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Auto-Approving Task...
                    </>
                  )}
                  {isActivatingThis && activationStatus === "approved" && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Task Approved! Starting...
                    </>
                  )}
                  {!isActivatingThis && (
                    "Activate Task"
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
