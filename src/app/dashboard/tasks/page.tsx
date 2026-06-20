"use client";

import { motion } from "framer-motion";
import { Clock, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Script from "next/script";

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

  const handleActivate = async (taskId: string) => {
    setActivatingTaskId(taskId);
    setActivationStatus("approving");

    try {
      const res = await fetch("/api/payment/create-order", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "task_activation" })
      });
      const orderData = await res.json();

      if (orderData.error) {
        alert("Failed to initialize payment: " + orderData.error);
        setActivatingTaskId(null);
        setActivationStatus("idle");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Task Activation Fee",
        description: "Pay ₹300 to activate this typing task",
        order_id: orderData.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (verifyRes.ok) {
            setActivationStatus("approved");
            setTimeout(() => {
              router.push(`/dashboard/workspace?taskId=${taskId}`);
            }, 3000);
          } else {
            alert("Payment verification failed.");
            setActivatingTaskId(null);
            setActivationStatus("idle");
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
        setActivationStatus("idle");
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setActivatingTaskId(null);
      setActivationStatus("idle");
    }
  };

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
              
              <div className="flex gap-4 text-sm text-muted-foreground mb-8 bg-black/20 p-3 rounded-lg w-max border border-white/5">
                <span className="flex items-center gap-1 border-r border-white/10 pr-4">
                  <Clock className="w-4 h-4 text-primary" /> 
                  Validity: {validity[task.id] || "Calculating..."}
                </span>
                <span className="flex items-center gap-1 font-bold text-yellow-400 pl-2">
                  Activation Fee: ₹300
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
                    <div className="flex flex-col items-start text-sm gap-2">
                      <span className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-300" /> Platform Fee Paid
                      </span>
                      <span className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-300" /> Work Charge Paid
                      </span>
                      <span className="text-xs opacity-80 mt-1">Starting task...</span>
                    </div>
                  )}
                  {!isActivatingThis && (
                    "Pay ₹300 & Activate Task"
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
