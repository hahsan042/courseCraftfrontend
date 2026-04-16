"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Lock, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

export default function ResetPasswordPage() {
  const { token } = useParams(); // URL থেকে টোকেনটি ধরবে
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({ icon: 'warning', title: 'পাসওয়ার্ড মেলেনি!', text: 'দুটো পাসওয়ার্ডই একই হতে হবে।' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v2/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'সফল হয়েছে!',
          text: 'আপনার নতুন পাসওয়ার্ড সেভ করা হয়েছে। এখন লগইন করুন।',
          timer: 2000,
          showConfirmButton: false
        });
        router.push("/login");
      } else {
        Swal.fire({ icon: 'error', title: 'ব্যর্থ হয়েছে', text: data.message });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'সার্ভার সমস্যা' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Set New Password</h1>
          <p className="text-slate-500 font-medium">নিরাপদ একটি পাসওয়ার্ড বেছে নিন</p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              required
              type="password"
              placeholder="New Password"
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              required
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
              <>Reset Password <ArrowRight size={20} /></>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}