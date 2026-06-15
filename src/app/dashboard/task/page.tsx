"use client";

import { useRef, useState, useEffect } from "react";
import { submitWorkTask } from "./actions";
import { Camera, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SAMPLE_ARTICLE = `The future of remote work relies heavily on the ability to communicate effectively across digital platforms. Typing speed and accuracy are fundamental skills for data entry specialists, virtual assistants, and transcriptionists. As companies continue to expand globally, the demand for reliable remote workers who can securely process and digitize documents is at an all-time high. Maintaining a clean workspace and a secure device ensures that sensitive information remains protected. Accuracy is often more critical than sheer speed, though balancing both leads to optimal performance. Please retype this exact paragraph in the box below to demonstrate your typing proficiency and attention to detail.`;

export default function WorkTaskPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [typedText, setTypedText] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  // Initialize Camera
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or failed", err);
        setErrorMsg("Please allow camera access to complete the task.");
      }
    }

    startCamera();

    return () => {
      // Cleanup camera on unmount
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
        const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.8);
        setPhotoDataUrl(dataUrl);
      }
    }
  };

  const handleSubmit = async () => {
    if (!typedText || typedText.length < 50) {
      setErrorMsg("Please type the complete article above.");
      return;
    }
    if (!photoDataUrl) {
      setErrorMsg("Please capture a live photo to verify your identity.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const res = await submitWorkTask(typedText, photoDataUrl);
    
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
        <h2 className="text-3xl font-bold">Task Submitted Successfully!</h2>
        <p className="text-muted-foreground">Your work has been securely sent for review. Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Evaluation Task</h1>
        <p className="text-muted-foreground">Complete this typing task and capture a live photo for security verification.</p>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{errorMsg}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Typing Task */}
        <div className="space-y-4">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary">
              <span className="bg-primary/10 p-1.5 rounded-lg">📄</span> Reference Article
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed select-none">
              {SAMPLE_ARTICLE}
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-sm">Your Typing Space</label>
            <textarea
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder="Start typing the article here..."
              className="w-full h-64 p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none resize-none font-mono text-sm shadow-inner"
            ></textarea>
            <p className="text-xs text-muted-foreground text-right">Words: {typedText.split(/\s+/).filter(w => w.length > 0).length}</p>
          </div>
        </div>

        {/* Right Column: Live Camera */}
        <div className="space-y-4">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-primary">
              <span className="bg-primary/10 p-1.5 rounded-lg"><Camera className="w-4 h-4"/></span> Live Verification
            </h3>
            <p className="text-xs text-muted-foreground">Please ensure your face is clearly visible. Gallery uploads are strictly disabled for security.</p>
            
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-border">
              {!photoDataUrl ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]"></video>
              ) : (
                <img src={photoDataUrl} alt="Captured" className="w-full h-full object-cover transform scale-x-[-1]" />
              )}
            </div>
            
            <canvas ref={canvasRef} className="hidden"></canvas>

            <div className="flex gap-2">
              {!photoDataUrl ? (
                <button 
                  onClick={capturePhoto}
                  className="flex-1 bg-accent text-accent-foreground py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
                >
                  Capture Photo
                </button>
              ) : (
                <button 
                  onClick={() => setPhotoDataUrl(null)}
                  className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-xl font-semibold hover:bg-secondary/80 transition-colors"
                >
                  Retake Photo
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_-5px_rgba(59,130,246,0.5)]"
          >
            {isSubmitting ? "Uploading Securely..." : "Submit Task & Verify"}
            {!isSubmitting && <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
