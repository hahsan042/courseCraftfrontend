"use client";

import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, FileCheck, BookOpen, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "Choose Course",
    desc: "Browse and select the course you want to learn.",
    step: "01"
  },
  {
    icon: <CreditCard className="w-7 h-7" />,
    title: "Make Payment",
    desc: "Send payment via bKash/Nagad to our official number.",
    step: "02"
  },
  {
    icon: <FileCheck className="w-7 h-7" />,
    title: "Submit TrxID",
    desc: "Enter your transaction ID in the checkout page.",
    step: "03"
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Get Access",
    desc: "Instant access to your dashboard after verification.",
    step: "04"
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
            How It <span className="text-blue-600 font-outline-2">Works</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg max-w-xl mx-auto">
            খুবই সহজ ৪টি ধাপে আপনার পছন্দের কোর্সটিতে এনরোল করুন এবং শিখতে শুরু করুন।
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Desktop Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-blue-200 -translate-y-[110px] z-0"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                {/* Step Number Bubble */}
                <div className="flex justify-center mb-8 relative">
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-[10deg] border border-blue-50">
                    {item.icon}
                  </div>
                  <div className="absolute -top-3 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center border-4 border-slate-50">
                    {item.step}
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed px-4">
                    {item.desc}
                  </p>
                </div>

                {/* Mobile/Tablet Arrow (Hidden on Large screens) */}
                {index !== steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 text-blue-200">
                    <ChevronRight className="rotate-90 md:rotate-0 w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}