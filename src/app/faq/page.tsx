"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "কোর্সগুলো কি আসলেই প্রিমিয়াম এবং অরিজিনাল?",
    answer: "হ্যাঁ, আমরা দেশি এবং বিদেশি বিভিন্ন প্ল্যাটফর্মের প্রিমিয়াম কোর্সগুলো সংগ্রহ করে আপনাদের জন্য সাশ্রয়ী মূল্যে প্রদান করি। প্রতিটি কোর্সই সম্পূর্ণ এবং আপডেট করা।"
  },
  {
    question: "কোর্স কেনার পর কতদিন পর্যন্ত অ্যাক্সেস থাকবে?",
    answer: "একবার কোর্স কিনলে আপনি আজীবনের জন্য (Lifetime Access) অ্যাক্সেস পাবেন। আপনি আপনার সুবিধামতো যেকোনো সময় লগইন করে শিখতে পারবেন।"
  },
  {
    question: "আমি কি কোর্সগুলো ডাউনলোড করতে পারব?",
    answer: "আমাদের প্ল্যাটফর্মে আপনি অনলাইনে ভিডিও দেখতে পারবেন। কিছু কোর্সের ক্ষেত্রে আমরা রিসোর্স ফাইল এবং অফলাইন ভিউয়িং এর সুবিধাও দিয়ে থাকি।"
  },
  {
    question: "পেমেন্ট করার কতক্ষণ পর কোর্স আনলক হবে?",
    answer: "পেমেন্ট সাকসেসফুল হওয়ার সাথে সাথেই অটোমেটিক আপনার 'My Courses' সেকশনে কোর্সটি আনলক হয়ে যাবে। কোনো অপেক্ষা করতে হবে না!"
  },
  {
    question: "কোর্সের সাথে কি কোনো সাপোর্ট বা গাইডলাইন পাওয়া যাবে?",
    answer: "আমাদের প্রতিটি কোর্সের জন্য আলাদা ডিসকাশন ফোরাম বা সাপোর্ট গ্রুপ রয়েছে। যেকোনো সমস্যায় আমাদের ইনস্ট্রাক্টর বা সাপোর্ট টিম আপনাকে সাহায্য করবে।"
  },
  {
    question: "বিকাশ বা নগদে কি পেমেন্ট করা যাবে?",
    answer: "অবশ্যই! আমরা বিকাশ, নগদ, রকেটসহ বাংলাদেশের সব ধরনের লোকাল পেমেন্ট মেথড সাপোর্ট করি।"
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <HelpCircle size={16} /> Have Questions?
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-slate-500 font-medium">
            আপনার মনে থাকা সাধারণ প্রশ্নগুলোর উত্তর এখানে পেয়ে যাবেন। আরও কিছু জানার থাকলে আমাদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-3xl overflow-hidden transition-all ${
                activeIndex === index ? "border-blue-200 bg-white shadow-xl shadow-blue-50" : "border-slate-100 bg-white"
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
              >
                <span className={`text-lg font-bold ${activeIndex === index ? "text-blue-600" : "text-slate-800"}`}>
                  {faq.question}
                </span>
                <div className={`shrink-0 ml-4 p-2 rounded-xl transition-all ${activeIndex === index ? "bg-blue-600 text-white rotate-180" : "bg-slate-50 text-slate-400"}`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium">
                      <div className="pt-2 border-t border-slate-50">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>


      </div>
    </div>
  );
}