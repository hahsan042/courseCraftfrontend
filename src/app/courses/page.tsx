"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, PlayCircle, Clock, Loader2, Sparkles } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

interface Course {
  _id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  // আপনার API অনুযায়ী নিচের যে কোনো একটি নাম হতে পারে (ভিডিওর অ্যারে)
  videos?: string[]; 
  lessons?: any[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v2/courses`);
        const data = await res.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Academic Excellence</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6"
          >
            All Premium <span className="text-blue-600">Courses</span>
          </motion.h1>
          <p className="text-slate-500 text-lg font-medium">
            ব্যাকএন্ড থেকে সরাসরি ভিডিও সংখ্যা আপডেট করা হয়েছে।
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-slate-50 rounded-[2.5rem] h-[500px] animate-pulse border border-slate-100" />
            ))
          ) : (
            courses.map((course, idx) => {
              // ✅ ভিডিও বা লেসনের সংখ্যা বের করার লজিক
              // যদি 'videos' থাকে তবে তার দৈর্ঘ্য, নাহলে 'lessons' এর দৈর্ঘ্য, আর কিছুই না থাকলে ০
              const videoCount = course.videos?.length || course.lessons?.length || 0;

              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  whileHover={{ y: -12 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_60px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
                >
                  {/* Image Wrap */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-sm">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span className="text-sm font-black text-slate-800">4.9</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-5">
                      {/* ✅ ডাইনামিক ভিডিও কাউন্ট */}
                      <span className="flex items-center gap-1.5 bg-blue-50/80 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100/50 shadow-sm">
                        <PlayCircle size={14} /> 
                        {videoCount} {videoCount > 1 ? "Videos" : "Video"}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Clock size={14} className="text-blue-600" /> 24 Hours
                      </span>
                    </div>

                    <h3 className="font-black text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug h-14 mb-6">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mb-1">Total Fee</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tight">৳ {course.price}</p>
                      </div>

                      <Link
                        href={`/courses/${course._id}`}
                        className="bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 active:scale-95 flex items-center gap-2"
                      >
                        Enroll Now
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3.5rem] border-4 border-dashed border-slate-50">
             <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="text-slate-200 animate-spin" size={40} />
             </div>
            <p className="text-slate-400 font-black text-xl tracking-tight">বর্তমানে কোনো কোর্স উপলব্ধ নেই।</p>
          </div>
        )}
      </div>
    </div>
  );
}