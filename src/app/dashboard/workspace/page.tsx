"use client";

import { useState } from "react";
import { Send, AlertCircle, Maximize2 } from "lucide-react";

export default function Workspace() {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (text.length < 50) return alert("Please type at least 50 characters.");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Task submitted successfully! Awaiting Admin approval.");
      setText("");
    }, 1500);
  };

  return (
    <div className="h-screen max-h-screen flex flex-col bg-background">
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-card/30">
        <div className="flex items-center gap-4">
          <h1 className="font-bold">Active Workspace</h1>
          <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-500 rounded-md font-medium border border-yellow-500/30">
            In Progress
          </span>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit for Review"} <Send className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Split Screen Left: PDF Viewer (Mock) */}
        <div className="w-1/2 border-r border-white/5 flex flex-col bg-neutral-900/50 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Source Document.pdf
            </span>
            <button className="p-1 hover:bg-white/10 rounded"><Maximize2 className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="flex-1 bg-white rounded-lg overflow-hidden flex items-center justify-center p-8 text-black relative shadow-inner">
             {/* Mock PDF Image/Content */}
             <div className="max-w-md w-full opacity-60 pointer-events-none">
                <h2 className="text-2xl font-serif mb-4 underline">Chapter 1: The Beginning</h2>
                <p className="font-serif leading-loose text-lg text-justify mb-4">
                  It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness...
                </p>
                <p className="font-serif leading-loose text-lg text-justify">
                  Please type this exactly as it appears. Do not fix grammar or spelling mistakes from the source document.
                </p>
             </div>
          </div>
        </div>

        {/* Split Screen Right: Text Editor */}
        <div className="w-1/2 flex flex-col p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Your Transcription Editor</span>
            <span className="text-xs text-muted-foreground">{text.length} chars | {text.split(/\s+/).filter(w => w.length > 0).length} words</span>
          </div>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing here..."
            className="flex-1 w-full bg-card border border-white/10 rounded-lg p-6 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg leading-relaxed shadow-inner"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
