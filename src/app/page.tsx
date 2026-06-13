"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Wallet, Banknote } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";

const LIVE_NOTIFICATIONS = [
  "Rahul just withdrew ₹500",
  "Priya completed a typing task",
  "Amit joined the premium platform",
  "Sneha just withdrew ₹1,200",
  "Vikram's task was approved",
];

export default function LandingPage() {
  const [tickerText, setTickerText] = useState(LIVE_NOTIFICATIONS[0]);
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % LIVE_NOTIFICATIONS.length;
      setTickerText(LIVE_NOTIFICATIONS[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background selection:bg-primary/30">
      {/* Top Navigation */}
      <nav className="absolute top-0 w-full flex items-center justify-between p-6 z-50">
        <div className="text-2xl font-extrabold text-primary tracking-tight">
          MicroDesk
        </div>
        <div className="flex items-center gap-6">
          {isLoaded && isSignedIn ? (
            <>
              <Link href="/dashboard" className="text-sm font-semibold hover:text-primary transition-colors">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            isLoaded && (
              <Link href="/sign-in" className="text-sm font-semibold hover:text-primary transition-colors">
                Login
              </Link>
            )
          )}
        </div>
      </nav>

      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />

      {/* Live Proof Ticker */}
      <div className="absolute top-[80px] w-full bg-primary/10 border-b border-primary/20 py-2 flex justify-center items-center backdrop-blur-md z-40">
        <motion.div
          key={tickerText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm font-medium text-primary-foreground flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {tickerText}
        </motion.div>
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm font-medium mb-8 text-neutral-300">
            <span className="text-primary">✨</span> Welcome to the Future of Micro-Tasking
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Turn Your Free Time Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Real Income.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            A premium, invite-only micro-tasking platform where your typing skills translate directly into instant payouts. No scams, just pure work.
          </p>

          {isLoaded && !isSignedIn && (
            <Link href="/sign-up">
              <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          )}
          {isLoaded && isSignedIn && (
            <Link href="/dashboard">
              <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-full text-lg font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(217,119,6,0.5)]">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          )}
        </motion.div>

        {/* How it Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 w-full"
        >
          <h2 className="text-3xl font-bold mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "1. Create an Account",
                desc: "Sign up securely in seconds using your Google account or Phone number.",
              },
              {
                icon: <Wallet className="w-8 h-8 text-primary" />,
                title: "2. Pay Platform Fee",
                desc: "Pay a one-time refundable ₹1500 fee to unlock premium high-paying tasks.",
              },
              {
                icon: <Banknote className="w-8 h-8 text-primary" />,
                title: "3. Type & Earn",
                desc: "Complete typing assignments and get paid instantly to your wallet.",
              },
            ].map((step, i) => (
              <div key={i} className="glass-card p-8 flex flex-col items-center text-center group hover:bg-white/5 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transparency Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 w-full max-w-4xl mx-auto glass-card p-10 text-left border-l-4 border-l-primary"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-primary" />
            Why the ₹1500 One-Time Fee?
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We believe in <strong>radical transparency</strong>. The ₹1500 fee is not a hidden charge. It acts as a security deposit and quality filter to ensure only serious workers join our platform.
            </p>
            <div>
              <strong>Where does this money go?</strong>
              <ul className="list-disc list-inside mt-2 ml-2 space-y-2">
                <li>Platform maintenance and secure cloud hosting.</li>
                <li>Sourcing premium typing tasks from verified enterprises.</li>
                <li>Preventing bot spam and duplicate fake accounts.</li>
              </ul>
            </div>
            <p className="pt-4 text-sm text-primary">
              * Once you earn your first ₹5000, your ₹1500 fee becomes eligible for a full refund.
            </p>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
