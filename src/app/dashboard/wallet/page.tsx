"use client";

import { motion } from "framer-motion";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, IndianRupee } from "lucide-react";
import { useState } from "react";

export default function WalletPage() {
  const [balance] = useState(0); // Mock balance
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      alert("Withdrawal request submitted! It will be processed manually by admin.");
    }, 1500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Digital Wallet</h1>
        <p className="text-muted-foreground">Manage your earnings and request withdrawals.</p>
      </header>

      {/* Main Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <WalletIcon className="w-48 h-48" />
        </div>
        
        <div className="relative z-10">
          <span className="text-muted-foreground font-medium mb-2 block">Available Balance</span>
          <h2 className="text-6xl font-extrabold text-white mb-8 flex items-center">
            <IndianRupee className="w-10 h-10 mr-1 opacity-50" />
            {balance}
          </h2>

          <div className="space-y-4 max-w-md">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Withdrawal Threshold (₹200)</span>
                <span className="text-primary font-medium">{Math.min((balance/200)*100, 100)}%</span>
              </div>
              <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min((balance/200)*100, 100)}%` }}
                />
              </div>
            </div>

            <button 
              onClick={handleWithdraw}
              disabled={balance < 200 || isWithdrawing}
              className="w-full py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/30 disabled:text-primary-foreground/50 text-primary-foreground font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              {isWithdrawing ? "Processing..." : "Request Withdrawal"} <ArrowUpRight className="w-5 h-5" />
            </button>
            {balance < 200 && (
              <p className="text-xs text-center text-muted-foreground">
                Minimum withdrawal limit is ₹200. Keep typing!
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Transaction History Mock */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
        <div className="glass-card overflow-hidden">
          {/* Empty state for now */}
          <div className="p-8 text-center text-muted-foreground border-b border-white/5">
            No transactions yet. Complete your first task!
          </div>
        </div>
      </motion.div>

    </div>
  );
}
