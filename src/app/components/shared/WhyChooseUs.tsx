
"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Users, Shield, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "High Quality Courses",
    desc: "Carefully crafted courses to help you master real-world skills.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Lifetime Access",
    desc: "Buy once and get lifetime access to your courses anytime, anywhere.",
    color: "from-purple-500 to-indigo-400",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Student Support",
    desc: "Dedicated support team to guide you through every hurdle in your journey.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Payment",
    desc: "Safe and trusted payment system via bKash, Nagad & Rocket.",
    color: "from-orange-500 to-red-400",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Animated Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CourseCraft</span>
          </motion.h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            আপনার ক্যারিয়ার গড়ার যাত্রায় আমরা আছি আপনার পাশে। শিখুন সেরা মেন্টরদের থেকে।
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              {/* Icon with Gradient Background */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                {item.desc}
              </p>

              {/* Decorative Corner Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-gray-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}