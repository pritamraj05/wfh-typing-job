"use client";

import { motion } from "framer-motion";
import { Clock, Loader2, Play, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Script from "next/script";
import { getUserPremiumStatus } from "./actions";

const MOCK_TASKS = [
  { id: "1", title: "Offline Handwriting Assignment", reward: 500 },
  { id: "premium_typing", title: "Premium Computer Typing Project", reward: 2000 }
];

export default function TaskBoard() {
  const router = useRouter();
  const [validity, setValidity] = useState<Record<string, string>>({});
  const [activatingTaskId, setActivatingTaskId] = useState<string | null>(null);
  const [hasFreeAccess, setHasFreeAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate a random validity time between 4 to 8 hours for each user on load
    setValidity({
      "1": `${Math.floor(Math.random() * 5) + 4} Hours`,
      "premium_typing": `${Math.floor(Math.random() * 5) + 4} Hours`
    });

    getUserPremiumStatus().then((status) => {
      setHasFreeAccess(status);
      setIsLoading(false);
    });
  }, []);

  const handleActivate = async (taskId: string) => {
    const isPremium = taskId === "premium_typing";
    const requiresPayment = (isPremium && !hasFreeAccess) || taskId === "1";

    if (requiresPayment) {
      setActivatingTaskId(taskId);
      
      try {
        const res = await fetch("/api/payment/create-order", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: isPremium ? "premium_task" : "task_activation" })
        });
        const orderData = await res.json();

        if (orderData.error) {
          alert("Failed to initialize payment: " + orderData.error);
          setActivatingTaskId(null);
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key",
          amount: orderData.amount,
          currency: orderData.currency,
          name: isPremium ? "Premium Task Activation" : "Task Activation Fee",
          description: isPremium ? "Pay ₹500 to unlock this premium task forever" : "Pay ₹300 to activate this typing task",
          order_id: orderData.id,
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                type: isPremium ? "premium_task" : "task_activation"
              }),
            });

            if (verifyRes.ok) {
              if (isPremium) setHasFreeAccess(true);
              setTimeout(() => {
                if (isPremium) {
                  router.push(`/dashboard/workspace/premium`);
                } else {
                  router.push(`/dashboard/workspace?taskId=${taskId}`);
                }
              }, 1500);
            } else {
              alert("Payment verification failed.");
              setActivatingTaskId(null);
            }
          },
          prefill: {
            name: "User",
            email: "user@example.com",
          },
          theme: {
            color: "#ffffff",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          alert("Payment Failed: " + response.error.description);
          setActivatingTaskId(null);
        });
        rzp.open();
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
        setActivatingTaskId(null);
      }
      return;
    }

    // Standard Activation (for Premium task if they have free access)
    setActivatingTaskId(taskId);
    setTimeout(() => {
      router.push(`/dashboard/workspace/premium`);
    }, 1500);
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Available Tasks</h1>
          <p className="text-muted-foreground">Pick a task below to start earning.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_TASKS.map((task, i) => {
            const isActivatingThis = activatingTaskId === task.id;
            const isPremium = task.id === "premium_typing";
            const requiresPayment = (isPremium && !hasFreeAccess) || task.id === "1";
            
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={task.id} 
                className={`glass-card p-6 flex flex-col transition-all border ${
                  isActivatingThis 
                    ? "border-primary/50 bg-primary/5" 
                    : isPremium
                    ? "border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/5"
                    : "border-white/5 hover:border-primary/30 hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold line-clamp-2 pr-4 flex items-center gap-2">
                    {task.title}
                    {isPremium && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/20 uppercase">Premium</span>}
                  </h3>
                </div>
                
                <div className="flex gap-4 text-sm text-muted-foreground mb-8 bg-black/20 p-3 rounded-lg w-max border border-white/5 flex-wrap">
                  <span className="flex items-center gap-1 border-r border-white/10 pr-4">
                    <Clock className="w-4 h-4 text-primary" /> 
                    Validity: {validity[task.id] || "Calculating..."}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-green-400 pl-2">
                    Reward: ₹{task.reward}
                  </span>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => handleActivate(task.id)}
                    disabled={activatingTaskId !== null}
                    className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isActivatingThis
                        ? "bg-primary/20 text-primary border border-primary/50 cursor-wait"
                        : requiresPayment
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/20 hover:scale-[1.02] active:scale-95"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 hover:scale-[1.02] active:scale-95"
                    } ${activatingTaskId !== null && !isActivatingThis ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isActivatingThis ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Activating Task...
                      </>
                    ) : requiresPayment ? (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay ₹{isPremium ? "500" : "300"} & Activate
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Start Task {isPremium && "(Free)"}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
