import { submitOnboardingForm } from "./actions";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg glass-card p-8 md:p-12 relative overflow-hidden">
        {/* Subtle Decorative Header */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <ClipboardCheck className="w-8 h-8 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-center mb-2 text-foreground">
          Application Form
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Complete your profile to proceed to the next step.
        </p>

        <form action={submitOnboardingForm} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-foreground">
              Full Legal Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="typingSpeed" className="text-sm font-semibold text-foreground">
              Estimated Typing Speed (WPM)
            </label>
            <select
              id="typingSpeed"
              name="typingSpeed"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            >
              <option value="">Select your speed...</option>
              <option value="beginner">Beginner (0 - 30 WPM)</option>
              <option value="intermediate">Intermediate (30 - 50 WPM)</option>
              <option value="advanced">Advanced (50+ WPM)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="deviceType" className="text-sm font-semibold text-foreground">
              Primary Work Device
            </label>
            <select
              id="deviceType"
              name="deviceType"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            >
              <option value="">Select your device...</option>
              <option value="laptop">Laptop / PC</option>
              <option value="tablet">Tablet / iPad</option>
              <option value="mobile">Mobile Phone</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex justify-center items-center gap-2 group"
          >
            Submit Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
