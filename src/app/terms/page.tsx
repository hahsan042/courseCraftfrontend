"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Scale, AlertCircle, HelpCircle } from "lucide-react";

export default function TermsAndConditions() {
  const lastUpdated = "March 24, 2026";

  const sections = [
    {
      icon: <FileText className="text-blue-500" />,
      title: "১. সাধারণ শর্তাবলী",
      content: "আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মতি প্রদান করছেন। আমরা মূলত প্রিমিয়াম মানের দেশি ও বিদেশি কোর্সগুলো সাশ্রয়ী মূল্যে শিক্ষার্থীদের কাছে পৌঁছে দেই। আমাদের প্ল্যাটফর্মের যেকোনো তথ্য বা কোর্স আমরা যেকোনো সময় আপডেট বা পরিবর্তন করার অধিকার রাখি।"
    },
    {
      icon: <ShieldCheck className="text-blue-500" />,
      title: "২. অ্যাকাউন্ট এবং নিরাপত্তা",
      content: "কোর্স কেনার জন্য আপনাকে একটি সঠিক অ্যাকাউন্ট তৈরি করতে হবে। আপনার অ্যাকাউন্টের পাসওয়ার্ড এবং অ্যাক্সেস সম্পূর্ণ আপনার দায়িত্ব। একটি অ্যাকাউন্ট থেকে একাধিক ব্যক্তি বা ডিভাইসে শেয়ার করা নিষিদ্ধ এবং এটি ধরা পড়লে আপনার অ্যাকাউন্টটি পার্মানেন্টলি ব্যান করা হতে পারে।"
    },
    {
      icon: <Scale className="text-blue-500" />,
      title: "৩. পেমেন্ট এবং রিফান্ড পলিসি",
      content: "আমাদের সব কোর্সের পেমেন্ট অগ্রিম বিকাশ, নগদ বা রকেটের মাধ্যমে করতে হবে। যেহেতু আমরা ডিজিটাল প্রোডাক্ট (ভিডিও কোর্স) প্রদান করি, তাই কোর্স কেনার পর এবং ভিডিও দেখার পর সাধারণত কোনো রিফান্ড প্রদান করা হয় না। তবে কোনো টেকনিক্যাল সমস্যার কারণে কোর্স না পেলে আমাদের সাপোর্ট টিমে যোগাযোগ করতে হবে।"
    },
    {
      icon: <AlertCircle className="text-blue-500" />,
      title: "৪. কপিরাইট এবং ব্যবহার বিধি",
      content: "আমাদের প্ল্যাটফর্মে থাকা সমস্ত কন্টেন্ট বা কোর্স শুধুমাত্র আপনার ব্যক্তিগত শিক্ষার জন্য। কোনো ভিডিও ডাউনলোড করে অন্য কোথাও বিক্রি করা, ইউটিউবে আপলোড করা বা সোশ্যাল মিডিয়ায় শেয়ার করা আইনত দণ্ডনীয় অপরাধ। এমন কিছু প্রমাণিত হলে কঠোর আইনি ব্যবস্থা নেওয়া হবে।"
    },
    {
      icon: <HelpCircle className="text-blue-500" />,
      title: "৫. দায়বদ্ধতা",
      content: "কোর্সের ভেতরে থাকা তথ্যের সঠিকতা বা ইনস্ট্রাক্টরের মতামতের জন্য আমরা সরাসরি দায়ী নই। তবে আমরা সর্বোচ্চ চেষ্টা করি সবথেকে আপডেটেড এবং কার্যকরী কোর্সগুলো আপনাদের সামনে নিয়ে আসতে।"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-100"
          >
            <ShieldCheck size={40} className="text-blue-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Terms & <span className="text-blue-600">Conditions</span>
          </h1>
          <p className="text-slate-500 font-medium">
            সর্বশেষ আপডেট: <span className="text-slate-800 font-bold">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 md:p-12 space-y-12">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {section.title}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium pl-16">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
      

      </div>
    </div>
  );
}