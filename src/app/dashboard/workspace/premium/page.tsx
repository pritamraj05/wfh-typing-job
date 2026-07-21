"use client";

import { useState } from "react";
import { Mail, Maximize2, AlertCircle } from "lucide-react";

export default function PremiumWorkspace() {
  const [text, setText] = useState("");

  const handleEmailSubmit = () => {
    if (text.length < 50) return alert("Please type at least 50 characters before submitting.");
    
    const subject = encodeURIComponent("Submission for Premium Computer Typing Project");
    const body = encodeURIComponent(`Here is my typed submission:\n\n${text}\n\nThank you.`);
    window.open(`mailto:info.microdesk@gmail.com?subject=${subject}&body=${body}`);
  };

  return (
    <div className="h-screen max-h-screen flex flex-col bg-background">
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-card/30">
        <div className="flex items-center gap-4">
          <h1 className="font-bold">Premium Typing Workspace</h1>
          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-md font-medium border border-purple-500/30 uppercase tracking-wider">
            Premium Task
          </span>
        </div>
        <button 
          onClick={handleEmailSubmit}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-purple-500/20 hover:scale-[1.02] active:scale-95"
        >
          Submit via Email <Mail className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Split Screen Left: Real PDF Viewer (Google Drive) */}
        <div className="w-1/2 border-r border-white/5 flex flex-col bg-neutral-900/50 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-purple-400" /> Source Document (Google Drive)
            </span>
            <a href="https://drive.google.com/file/d/1OkGW7M9UQOfuxDZxqDmlbQc9cqK15R5n/view?usp=sharing" target="_blank" rel="noreferrer" className="p-1 hover:bg-white/10 rounded" title="Open in new tab">
              <Maximize2 className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
          <div className="flex-1 bg-white rounded-lg overflow-hidden flex items-center justify-center relative shadow-inner">
             <iframe 
                src="https://drive.google.com/file/d/1OkGW7M9UQOfuxDZxqDmlbQc9cqK15R5n/preview" 
                className="w-full h-full border-0" 
                allow="autoplay"
             ></iframe>
          </div>
        </div>

        {/* Split Screen Right: Text Editor */}
        <div className="w-1/2 flex flex-col p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Your Transcription Editor</span>
            <span className="text-xs text-muted-foreground">{text.length} chars | {text.split(/\s+/).filter(w => w.length > 0).length} words</span>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg mb-4 text-sm text-purple-200">
            <strong>Instructions:</strong> Type the document from the left exactly as it appears. Once finished, click "Submit via Email" to send your work to <code>info.microdesk@gmail.com</code>.
          </div>

          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing the document here..."
            className="flex-1 w-full bg-card border border-white/10 rounded-lg p-6 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-lg leading-relaxed shadow-inner"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
