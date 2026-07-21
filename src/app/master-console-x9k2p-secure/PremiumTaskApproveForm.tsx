"use client";

import { useState } from "react";
import { grantPremiumTaskAccess } from "./actions";

export default function PremiumTaskApproveForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await grantPremiumTaskAccess(email);
      if (res.error) {
        setMessage({ text: res.error, type: "error" });
      } else {
        setMessage({ text: res.success ? res.message : "Success", type: "success" });
        setEmail(""); // Clear the input on success
      }
    } catch (err: any) {
      setMessage({ text: "Something went wrong.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-200 mb-8 bg-purple-50/30">
      <h3 className="text-lg font-bold mb-4 text-purple-900">Grant Premium Task Access</h3>
      <p className="text-sm text-gray-600 mb-4">Enter user's email to grant them free access to the Premium Computer Typing Project.</p>
      
      <form onSubmit={handleApprove} className="flex flex-col sm:flex-row gap-4">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          required
          className="flex-1 border border-purple-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button 
          type="submit" 
          disabled={loading || !email}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Granting..." : "Grant Free Access"}
        </button>
      </form>

      {message.text && (
        <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
