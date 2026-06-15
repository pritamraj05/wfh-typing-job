"use client";

import { submitOnboardingForm } from "./actions";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { useState } from "react";

export default function OnboardingPage() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDob = e.target.value;
    setDob(newDob);
    
    if (newDob) {
      const birthDate = new Date(newDob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge.toString());
    } else {
      setAge("");
    }
  };

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
              <label htmlFor="dob" className="text-sm font-semibold text-foreground">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                value={dob}
                onChange={handleDobChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-semibold text-foreground">
                Age (Auto Calculated)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                readOnly
                value={age}
                placeholder="Age"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground/70 cursor-not-allowed outline-none transition-all"
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
              value="Work From Home Handwriting Job"
              className="w-full px-4 py-3 rounded-xl border border-green-500/50 bg-green-500/10 text-green-700 font-semibold cursor-not-allowed outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex justify-center items-center gap-2 group shadow-lg shadow-primary/20"
          >
            Submit Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
