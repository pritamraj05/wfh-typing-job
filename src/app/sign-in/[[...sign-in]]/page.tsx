import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />
      <div className="z-10 relative">
        <SignIn forceRedirectUrl="/dashboard" appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-card border border-white/5 shadow-2xl rounded-2xl",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "border border-white/10 text-foreground hover:bg-white/5",
            socialButtonsBlockButtonText: "font-medium",
            dividerLine: "bg-white/10",
            dividerText: "text-muted-foreground",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background border-white/10 text-foreground focus:ring-primary focus:border-primary",
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
            footerActionText: "text-muted-foreground",
            footerActionLink: "text-primary hover:text-primary/90",
          }
        }} />
      </div>
    </div>
  );
}
