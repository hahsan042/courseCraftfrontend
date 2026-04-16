"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 "
      >
        <div className="relative overflow-hidden bg-[#0f172a] p-8 md:p-16 lg:p-20 shadow-2xl">
          
          {/* Animated Mesh Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-indigo-600/30 pointer-events-none"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
            
            {/* Left Side: Text */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                <Sparkles size={14} />
                <span className="uppercase tracking-wider">Limited Time Offer</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Level Up</span> <br /> 
                Your Career?
              </h2>

              <p className="mt-6 text-gray-400 text-lg md:text-xl leading-relaxed max-w-md">
                Join <span className="text-white font-semibold">CourseCraft</span> and master high-demand skills. নিজের ভবিষ্যৎ গড়ার যাত্রা শুরু হোক আজ থেকেই।
              </p>
            </div>

            {/* Right Side: Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-5 items-center justify-center md:justify-end">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/courses"
                  className="relative group overflow-hidden bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:shadow-blue-500/50 transition-all"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover:animate-shimmer"></div>
                  
                  Browse Courses
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <Link
                href="/register"
                className="px-10 py-5 rounded-2xl border border-gray-700 text-white font-bold text-lg hover:bg-white hover:text-black transition-all backdrop-blur-sm"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Decorative Rocket Icon */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none hidden lg:block"
          >
            <Rocket size={300} className="text-white" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}