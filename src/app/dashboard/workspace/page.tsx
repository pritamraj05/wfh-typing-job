"use client";

import { Mail, Download, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { getTaskDetails } from "./actions";

export default function Workspace() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  
  const [refCode, setRefCode] = useState("");
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate a short reference code based on user ID or random
    if (user) {
      const code = `TASK-${user.id.slice(-6).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
      setRefCode(code);
    }
  }, [user]);

  useEffect(() => {
    if (taskId) {
      getTaskDetails(taskId).then(data => {
        setTask(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [taskId]);

  const handleEmailSubmit = () => {
    const email = task?.submission_email || "info.microdesk@gmail.com";
    const subject = encodeURIComponent(`${task?.title || "Task"} Submission - Ref: ${refCode}`);
    const body = encodeURIComponent(`Hello Admin,\n\nHere is my completed document for the Typing Task.\n\nMy Reference Code: ${refCode}\n\n[PLEASE ATTACH YOUR COMPLETED FILE HERE]\n\nThank you.`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  if (loading) {
    return <div className="p-8 flex justify-center items-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-background">
      <div className="glass-card max-w-2xl w-full p-10 rounded-2xl border border-primary/20 text-center relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <FileText className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{task?.title || "Active Workspace"}</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Download the document, type it out in Microsoft Word or Notepad, and email us the completed file.
          </p>

          <div className="bg-black/20 border border-white/10 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-white mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              <li>Click <strong>Download Document</strong> to get the source file.</li>
              <li>Type the contents exactly as they appear into a new file.</li>
              <li>Save your file (PDF or DOCX).</li>
              <li>Click <strong>Submit via Email</strong>. Attach your file before sending!</li>
            </ol>
            
            {refCode && (
              <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
                <span className="block text-xs text-primary/80 uppercase tracking-wider mb-1">Your Unique Reference Code</span>
                <span className="font-mono text-xl font-bold text-primary">{refCode}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {task?.drive_link ? (
              <a 
                href={task.drive_link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white border border-neutral-200 dark:border-neutral-700 px-8 py-4 rounded-xl font-medium transition-all"
              >
                <Download className="w-5 h-5" /> Download Document
              </a>
            ) : (
              <button 
                onClick={() => alert("Please contact admin for the source document link for this specific task.")}
                className="flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white border border-neutral-200 dark:border-neutral-700 px-8 py-4 rounded-xl font-medium transition-all"
              >
                <Download className="w-5 h-5" /> Download Document
              </button>
            )}
            
            <button 
              onClick={handleEmailSubmit}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95"
            >
              <Mail className="w-5 h-5" /> Submit via Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
