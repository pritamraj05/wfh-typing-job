"use client";

import { Mail, Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function PremiumWorkspace() {
  const { user } = useUser();
  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    // Generate a short reference code based on user ID or random
    if (user) {
      const code = `PREM-${user.id.slice(-6).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
      setRefCode(code);
    }
  }, [user]);

  const handleEmailSubmit = () => {
    const subject = encodeURIComponent(`Premium Task Submission - Ref: ${refCode}`);
    const body = encodeURIComponent(`Hello Admin,\n\nHere is my completed document for the Premium Typing Project.\n\nMy Reference Code: ${refCode}\n\n[PLEASE ATTACH YOUR COMPLETED FILE HERE]\n\nThank you.`);
    window.open(`mailto:info.microdesk@gmail.com?subject=${subject}&body=${body}`);
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-background">
      <div className="glass-card max-w-2xl w-full p-10 rounded-2xl border border-purple-500/20 text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
            <FileText className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Premium Typing Task</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Download the document, type it out in Microsoft Word or Notepad, and email us the completed file.
          </p>

          <div className="bg-black/20 border border-white/10 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-white mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              <li>Click <strong>Download Document</strong> to get the source PDF.</li>
              <li>Type the contents exactly as they appear into a new file.</li>
              <li>Save your file (PDF or DOCX).</li>
              <li>Click <strong>Submit via Email</strong>. Attach your file before sending!</li>
            </ol>
            
            {refCode && (
              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
                <span className="block text-xs text-purple-300 uppercase tracking-wider mb-1">Your Unique Reference Code</span>
                <span className="font-mono text-xl font-bold text-purple-400">{refCode}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://drive.google.com/uc?export=download&id=1OkGW7M9UQOfuxDZxqDmlbQc9cqK15R5n" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white border border-neutral-200 dark:border-neutral-700 px-8 py-4 rounded-xl font-medium transition-all"
            >
              <Download className="w-5 h-5" /> Download Document
            </a>
            
            <button 
              onClick={handleEmailSubmit}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95"
            >
              <Mail className="w-5 h-5" /> Submit via Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
