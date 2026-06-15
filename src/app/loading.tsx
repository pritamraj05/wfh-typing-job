export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        {/* Inner Ring */}
        <div className="absolute w-10 h-10 border-4 border-accent/20 border-b-accent rounded-full animate-spin animate-reverse"></div>
      </div>
      <p className="mt-4 text-sm font-semibold text-muted-foreground animate-pulse">
        Processing securely...
      </p>
    </div>
  );
}
