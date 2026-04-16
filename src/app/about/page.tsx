"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Users, BarChart3, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  // Stats counter data
  const stats = [
    { label: "Active Students", value: "10K+", icon: <Users size={20}/> },
    { label: "Courses Available", value: "50+", icon: <BarChart3 size={20}/> },
    { label: "Expert Mentors", value: "25+", icon: <Zap size={20}/> },
    { label: "Success Rate", value: "95%", icon: <Target size={20}/> },
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* 1. Enhanced, Overlapping Header Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 text-white pt-24 pb-32 overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-200 uppercase bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
               ⚡️  সবার জন্য মানসম্মত শিক্ষা
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              আমাদের সম্পর্কে জানুন
            </h1>
            <p className="text-xl text-blue-100 mt-4 max-w-xl mx-auto font-medium">
              আপনার <span className="text-yellow-300 font-extrabold underline decoration-yellow-300 underline-offset-4">ভবিষ্যৎ ক্যারিয়ার</span> গড়তে আমরা আপনাকে দক্ষ করে তুলবো।
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Overlapping Bento-style Stats Bar */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 -mt-16 mb-24">
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_30px_60px_rgba(37,99,235,0.15)] border border-blue-50 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {stats.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.15 }}
              className="group flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-blue-50/50 p-5 rounded-2xl hover:bg-blue-600 transition-colors"
            >
              <div className="bg-white text-blue-600 p-4 rounded-xl shadow-sm shadow-blue-100 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                {item.icon}
              </div>
              <div>
                <p className="text-4xl font-extrabold text-blue-700 group-hover:text-white transition-colors">{item.value}</p>
                <p className="text-sm font-medium text-blue-900 group-hover:text-white/80 transition-colors">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Immersive Mission & Vision (Merged Into One Section) */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-5 gap-16 items-center">
        
        {/* Asymmetric Text Layout (Takes up 3/5 on desktop) */}
        <div className="md:col-span-3 space-y-12 text-left">
          {/* Mission Card */}
          <motion.div whileHover={{ y: -5 }} className="relative bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
            <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-3">
              আমাদের লক্ষ্য
              <span className="h-1 flex-grow bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed font-medium">
              CourseCraft একটি আধুনিক অনলাইন লার্নিং প্ল্যাটফর্ম, যেখানে শিক্ষার্থী ও প্রফেশনালরা সাশ্রয়ী মূল্যে <span className="text-white bg-blue-600 px-2 py-0.5 rounded-md font-bold">উচ্চমানের কোর্সের</span> মাধ্যমে বাস্তব জীবনের দক্ষতা অর্জন করতে পারে। 
              আমরা Practical Knowledge, সহজ Access এবং একটি সমৃদ্ধ লার্নিং এনভায়রনমেন্ট নিশ্চিত করতে সর্বদা সচেষ্ট।
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div whileHover={{ y: -5 }} className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <h2 className="text-4xl font-black mb-6">আমাদের ভিশন</h2>
            <p className="text-lg text-slate-300 leading-relaxed font-medium max-w-2xl">
              একটি শীর্ষস্থানীয় অনলাইন লার্নিং প্ল্যাটফর্ম হিসেবে গড়ে ওঠা, যেখানে যে কেউ নতুন স্কিল শিখে নিজের ক্যারিয়ার উন্নত করতে পারবে এবং Financial Independence অর্জন করতে পারবে। আমরা চাই সবার জন্য শিক্ষার দ্বার উন্মোচন করতে।
            </p>
          </motion.div>
          
          {/* Enhanced CTA Button */}
          <Link href="/courses" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] group transition-all">
            আজই শেখা শুরু করুন
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Bento Box Right Side (Takes up 2/5 on desktop) */}
        <div className="md:col-span-2 relative grid grid-cols-2 grid-rows-2 gap-4 h-[400px]">
          
          {/* Large Image Card */}
          <div className="col-span-2 bg-white rounded-3xl p-3 shadow-lg flex items-center justify-center border border-slate-100">
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop" 
                 alt="CourseCraft সম্পর্কে" 
                 className="rounded-2xl w-full h-full object-cover"/>
          </div>

          {/* Small Feature Box */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between items-start hover:shadow-xl transition-all">
            <Zap className="text-blue-600 w-10 h-10" />
            <p className="font-bold text-slate-800 text-sm">Interactive Courses</p>
          </div>

          {/* Smaller Accent Box (Matches stats) */}
          <div className="bg-blue-600 rounded-3xl p-6 text-white flex flex-col justify-between items-start">
             <ShieldCheck className="text-white w-10 h-10"/>
             <p className="font-bold text-sm">Real-World Skills</p>
          </div>
        </div>

      </section>
    </main>
  );
}