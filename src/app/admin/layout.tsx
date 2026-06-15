import { ShieldAlert } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-gray-900 text-white p-4 flex items-center gap-3 sticky top-0 z-50 shadow-md">
        <ShieldAlert className="text-red-500 w-6 h-6" />
        <h1 className="text-xl font-bold tracking-wider">SECURE ADMIN CONSOLE</h1>
      </header>
      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
