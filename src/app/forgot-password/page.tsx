"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send, Loader2, KeyRound } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      Swal.fire({
        icon: 'info',
        title: 'ইমেইল দিন',
        text: 'পাসওয়ার্ড রিসেট করতে আপনার ইমেইলটি প্রয়োজন।',
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v2/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'ইমেইল পাঠানো হয়েছে!',
          text: 'আপনার ইমেইলে একটি রিসেট লিঙ্ক পাঠানো হয়েছে। ইনবক্স চেক করুন।',
          confirmButtonColor: "#2563eb",
        });
        setEmail(""); // ইনপুট ক্লিয়ার করা
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ব্যর্থ হয়েছে',
          text: data.message || "এই ইমেইলটি আমাদের ডাটাবেজে পাওয়া যায়নি।",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'সার্ভার সমস্যা',
        text: 'দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-50/50 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[450px]"
      >
        {/* Back to Login */}
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
              <KeyRound size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Forgot Password?</h1>
            <p className="text-slate-500 font-medium mt-2">
              চিন্তা করবেন না! আপনার ইমেইল দিন, আমরা আপনাকে একটি রিসেট লিঙ্ক পাঠিয়ে দেব।
            </p>
          </div>

          <form onSubmit={handleResetRequest} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" 
                  size={20} 
                />
                <input
                  required
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Send Reset Link
                  <Send size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400 font-medium">
              লিঙ্ক পাননি? <button onClick={handleResetRequest} className="text-blue-600 font-bold hover:underline">আবার চেষ্টা করুন</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}