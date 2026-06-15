"use client";

import { useRef, useState, useEffect } from "react";
import { submitWorkTask } from "./actions";
import { Camera, Send, AlertCircle, CheckCircle2, PenTool } from "lucide-react";
import { useRouter } from "next/navigation";

const SAMPLE_ARTICLE = `Handwriting is an essential skill that promotes cognitive development and fine motor skills. In today's digital age, the art of writing on paper with a pen or pencil is becoming rare, yet it remains a highly valued form of personal expression. Many professional sectors still require handwritten documents for authenticity and legal verification. Taking the time to write clearly and legibly demonstrates attention to detail and patience. Please copy this entire paragraph word-for-word onto a clean sheet of paper in your notebook. Make sure your handwriting is neat, legible, and matches the text exactly as shown.`;

export default function WorkTaskPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  // Initialize Camera (Environment/Back camera preferred for documents, but user facing is fallback)
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } // Prioritize back camera for scanning notebook
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or failed", err);
        setErrorMsg("Please allow camera access to scan your notebook.");
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.9);
        setPhotoDataUrl(dataUrl);
      }
    }
  };

  const handleSubmit = async () => {
    if (!photoDataUrl) {
      setErrorMsg("Please capture a live photo of your handwritten notebook to verify your work.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    // Submit with a default string for "typed_text" since it's now handwriting
    const res = await submitWorkTask("Handwritten Notebook Submission", photoDataUrl);
    
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to main dashboard after success
      }, 3000);
    } else {
      setErrorMsg(res.error || "Failed to submit task. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
        <h2 className="text-3xl font-bold">Handwritten Work Submitted Successfully!</h2>
        <p className="text-muted-foreground">Your work has been securely sent to our QA team for review. Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Handwriting Evaluation Task</h1>
        <p className="text-muted-foreground">Copy the reference text into your notebook and use the live camera to scan it.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{errorMsg}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Reference Task */}
        <div className="space-y-4 h-full flex flex-col">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex-1">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-primary">
              <span className="bg-primary/10 p-2 rounded-xl"><PenTool className="w-5 h-5"/></span> Write This Down
            </h3>
            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl mb-4">
              <p className="text-sm font-semibold text-orange-600 mb-1">INSTRUCTIONS:</p>
              <p className="text-xs text-orange-700/80">Take a physical notebook and a pen. Handwrite the paragraph below exactly as it is. Once completed, scan it using the live camera on the right.</p>
            </div>
            <p className="text-base text-foreground/90 font-serif leading-loose tracking-wide p-4 bg-background rounded-xl border border-border/50 shadow-inner select-none">
              {SAMPLE_ARTICLE}
            </p>
          </div>
        </div>

        {/* Right Column: Live Camera */}
        <div className="space-y-4">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 text-primary">
              <span className="bg-primary/10 p-2 rounded-xl"><Camera className="w-5 h-5"/></span> Live Document Scan
            </h3>
            <p className="text-xs text-muted-foreground">Point your camera at the notebook page. Ensure good lighting so the text is perfectly legible. Gallery uploads are disabled.</p>
            
            <div className="relative aspect-[3/4] md:aspect-square bg-black rounded-xl overflow-hidden border border-border">
              {!photoDataUrl ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
              ) : (
                <img src={photoDataUrl} alt="Captured Notebook" className="w-full h-full object-cover" />
              )}
              
              {/* Scan Overlay UI */}
              {!photoDataUrl && (
                <div className="absolute inset-0 border-4 border-primary/40 rounded-xl pointer-events-none z-10 m-4 border-dashed animate-pulse" />
              )}
            </div>
            
            <canvas ref={canvasRef} className="hidden"></canvas>

            <div className="flex gap-2">
              {!photoDataUrl ? (
                <button 
                  onClick={capturePhoto}
                  className="flex-1 bg-accent text-accent-foreground py-3 rounded-xl font-bold hover:bg-accent/90 transition-colors shadow-sm"
                >
                  Capture Notebook
                </button>
              ) : (
                <button 
                  onClick={() => setPhotoDataUrl(null)}
                  className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-xl font-bold hover:bg-secondary/80 transition-colors"
                >
                  Retake Photo
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-extrabold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_-5px_rgba(59,130,246,0.5)]"
          >
            {isSubmitting ? "Uploading Securely..." : "Submit Handwriting"}
            {!isSubmitting && <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
