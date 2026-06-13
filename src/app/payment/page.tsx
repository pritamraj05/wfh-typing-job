"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function PaymentGatePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    // TODO: Integrate Razorpay order creation API here
    
    // Simulating Razorpay checkout popup delay
    setTimeout(() => {
      setIsLoading(false);
      alert("Razorpay Checkout will open here. Backend integration required for Order ID.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-lg w-full p-8 md:p-12 text-center relative z-10"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Unlock Your Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          You're just one step away from starting your premium typing jobs. Pay the one-time refundable platform fee to get instant access.
        </p>

        <div className="bg-background/50 border border-white/5 rounded-2xl p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
            <span className="text-muted-foreground">Premium Lifetime Access</span>
            <span className="text-2xl font-bold">₹1,500</span>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Verified high-paying tasks
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Instant wallet withdrawals
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              100% Refundable after ₹5000 earnings
            </li>
          </ul>
        </div>

        <button 
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold text-lg transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Pay with Razorpay <CreditCard className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Secure 256-bit encrypted checkout
        </p>
      </motion.div>
    </div>
  );
}
