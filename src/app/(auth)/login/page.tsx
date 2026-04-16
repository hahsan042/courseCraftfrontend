"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react"; // ✅ Eye আইকনগুলো ইমপোর্ট করুন
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ পাসওয়ার্ড দেখানোর জন্য স্টেট
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'লগইন সফল!',
          text: 'আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...',
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        localStorage.setItem("token", data.token);
        const userRole = data.data?.role;
        localStorage.setItem("role", userRole);

        setTimeout(() => {
          if (userRole === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/my-courses";
          }
        }, 1600);

      } else {
        Swal.fire({
          icon: 'error',
          title: 'লগইন ব্যর্থ!',
          text: data.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'দুঃখিত!',
        text: "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-100/50 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px]"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-[1.5rem] shadow-xl shadow-blue-200 mb-4">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-bold mt-2">Log in to continue your learning journey</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
                <Link href="/forgot-password" className="text-xs font-black text-blue-600 hover:underline uppercase tracking-tighter">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  required
                  type={showPassword ? "text" : "password"} // ✅ ডাইনামিক টাইপ
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* ✅ শো/হাইড বাটন */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] bg-slate-100 flex-1" />
            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">New here?</span>
            <div className="h-[1px] bg-slate-100 flex-1" />
          </div>

          <Link 
            href="/register"
            className="w-full mt-6 flex items-center justify-center gap-2 border-2 border-slate-100 text-slate-600 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all"
          >
            Create an Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}