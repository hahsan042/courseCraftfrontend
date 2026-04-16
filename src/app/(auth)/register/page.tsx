"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react"; // ✅ Eye আইকনগুলো যুক্ত করা হয়েছে
import Link from "next/link";
import Swal from "sweetalert2";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ পাসওয়ার্ড দেখার স্টেট
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Swal.fire({
        icon: 'info',
        title: 'অসম্পূর্ণ তথ্য!',
        text: 'সবগুলো ঘর সঠিকভাবে পূরণ করুন।',
        confirmButtonColor: "#2563eb",
      });
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v2/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'অভিনন্দন!',
          text: 'আপনার অ্যাকাউন্টটি সফলভাবে তৈরি হয়েছে।',
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 2100);

      } else {
        Swal.fire({
          icon: 'error',
          title: 'রেজিস্ট্রেশন ব্যর্থ!',
          text: data.message || "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা থাকতে পারে।",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'সার্ভার এরর!',
        text: 'দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] w-full max-w-md border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4 shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 font-medium mt-2">আমাদের লার্নিং প্ল্যাটফর্মে যোগ দিন</p>
        </div>

        <div className="space-y-5">
          {/* Name Input */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type={showPassword ? "text" : "password"} // ✅ ডাইনামিক টাইপ
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* ✅ শো/হাইড বাটন */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-blue-200/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                Get Started
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-center text-slate-500 font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-black hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}