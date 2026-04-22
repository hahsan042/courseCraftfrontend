"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0c10] text-white">
      {/* Decorative Background Blobs - Reduced size for mobile to prevent horizontal overflow */}
      <div className="absolute top-0 -left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-5 py-16 md:py-24 lg:py-32 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left order-2 md:order-1"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            🚀 Next-Gen Learning Platform
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.2] md:leading-[1.1] tracking-tight">
            Learn Skills That <br className="hidden sm:block" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Build Your Future
            </span>
          </h1>

          <p className="mt-6 text-base md:text-xl text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
            উচ্চ মানের <span className="text-white font-medium">premium courses</span> দিয়ে আপনার ক্যারিয়ারকে নতুন উচ্চতায় নিয়ে যান। আজই শুরু করুন আপনার শেখার যাত্রা।
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-5">
            <Link
              href="/courses"
              className="w-full sm:w-auto text-center group relative px-8 py-4 bg-blue-600 rounded-full font-bold transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
            >
              Browse Courses
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto text-center px-8 py-4 border border-gray-700 rounded-full font-bold backdrop-blur-sm hover:bg-white hover:text-black transition-all"
            >
              Get Started
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-10 pt-10 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0c10] bg-gray-700"></div>
              ))}
            </div>
            <p>Join <span className="text-white font-semibold">10,000+</span> successful students</p>
          </div>
        </motion.div>

        {/* Right Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 md:order-2"
        >
          {/* Glassmorphism Card Overlay - Positioned carefully for mobile */}
          <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-6 bg-white/10 backdrop-blur-xl border border-white/10 p-3 sm:p-4 rounded-2xl shadow-2xl z-10">
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter sm:tracking-normal">Success Rate</p>
            <p className="text-xl sm:text-2xl font-bold">98%</p>
          </div>

          <div className="relative z-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <img
              src="https://cdn.elearningindustry.com/wp-content/uploads/2021/07/shutterstock_1155561859.png"
              alt="Learning"
              className="relative w-full rounded-2xl shadow-2xl animate-float object-cover border border-white/10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}