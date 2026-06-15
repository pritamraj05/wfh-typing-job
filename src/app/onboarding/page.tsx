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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-semibold text-foreground">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="18"
                max="65"
                placeholder="e.g. 24"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dob" className="text-sm font-semibold text-foreground">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="mobile" className="text-sm font-semibold text-foreground">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              required
              placeholder="+91 XXXXX XXXXX"
              pattern="[0-9\-\+\s]*"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="rahul@example.com"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="jobType" className="text-sm font-semibold text-foreground">
              Selected Job Profile
            </label>
            <input
              type="text"
              id="jobType"
              name="jobType"
              readOnly
              value="Work From Home Typing Job"
              className="w-full px-4 py-3 rounded-xl border border-green-500/50 bg-green-500/10 text-green-700 font-semibold cursor-not-allowed outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="typingSpeed" className="text-sm font-semibold text-foreground">
                Typing Speed (WPM)
              </label>
              <select
                id="typingSpeed"
                name="typingSpeed"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option value="">Select speed...</option>
                <option value="beginner">Beginner (0-30)</option>
                <option value="intermediate">Intermediate (30-50)</option>
                <option value="advanced">Advanced (50+)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="deviceType" className="text-sm font-semibold text-foreground">
                Primary Device
              </label>
              <select
                id="deviceType"
                name="deviceType"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option value="">Select device...</option>
                <option value="laptop">Laptop / PC</option>
                <option value="tablet">Tablet / iPad</option>
                <option value="mobile">Mobile Phone</option>
              </select>
            </div>
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
