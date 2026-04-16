"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, ArrowRight, ExternalLink, Facebook } from "lucide-react";

export default function ContactPage() {
  const phoneNumber = "+8801709082144"; 
  const discordLink = "https://discord.gg/4rX8jXab"; 
  const facebookLink = "https://www.facebook.com/ridhi.jahan.643836";
  return (
    <div className="min-h-screen bg-[#FDFDFF] py-20 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto text-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black text-slate-900 mb-4">
            Contact <span className="text-blue-600">Support</span>
          </h1>
          <p className="text-slate-500 font-medium">
            কোর্স নিয়ে কোনো সমস্যা হলে বা কিছু জানার থাকলে নিচের মাধ্যমে যোগাযোগ করুন।
          </p>
        </motion.div>

        <div className="grid gap-6">
          
          {/* Call Section */}
          <motion.a 
            href={`tel:${phoneNumber}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all"
          >
            <div className="flex items-center gap-6 text-left">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl tracking-tight">Call Us Directly</h3>
                <p className="text-slate-500 font-bold">{phoneNumber}</p>
              </div>
            </div>
            <ArrowRight className="text-slate-300 group-hover:text-blue-600 transition-all" />
          </motion.a>

          {/* Facebook Section */}
          <motion.a 
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-[#1877F2] p-8 rounded-[2.5rem] flex items-center justify-between shadow-xl shadow-blue-100 transition-all"
          >
            <div className="flex items-center gap-6 text-left">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                <Facebook size={28} />
              </div>
              <div>
                <h3 className="font-black text-white text-xl tracking-tight">Messenger Support</h3>
                <p className="text-white/80 font-bold uppercase text-sm tracking-wide">Official Page</p>
              </div>
            </div>
            <ExternalLink className="text-white/50 group-hover:text-white transition-all" />
          </motion.a>

          {/* Discord Section */}
          <motion.a 
            href={discordLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-[#5865F2] p-8 rounded-[2.5rem] flex items-center justify-between shadow-xl shadow-indigo-100 transition-all"
          >
            <div className="flex items-center gap-6 text-left">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                <MessageSquare size={28} />
              </div>
              <div>
                <h3 className="font-black text-white text-xl tracking-tight">Join Our Discord</h3>
                <p className="text-white/80 font-bold uppercase text-sm tracking-wide">Fastest Support</p>
              </div>
            </div>
            <ExternalLink className="text-white/50 group-hover:text-white transition-all" />
          </motion.a>

        </div>

        {/* Footer Note */}
        <p className="mt-12 text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
          Available 10 AM - 10 PM
        </p>
      </div>
    </div>
  );
}