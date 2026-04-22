"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, BookOpen, Clock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  image: string;
  videos?: any[];
}

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;
const token = localStorage.getItem("token");
console.log("LocalStorage Token:", token); // এটি কি Null নাকি ডাটা আছে?
export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        // ইউজারের প্রোফাইল থেকে কোর্সগুলো নিয়ে আসা
        // সাধারণত ভেরিফাই হওয়ার পরই ব্যাকএন্ড এখানে কোর্সগুলো পাঠায়
        const res = await fetch(`${BASE_URL}/api/v2/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await res.json();
        console.log(data);
        

        if (data.success) {
          // যদি আপনার ব্যাকএন্ড ডাটা data.data.enrolledCourses এ থাকে তবে সেটা চেক করুন
          // আমরা এখানে আপনার দেওয়া স্ট্রাকচার অনুযায়ী data.data.courses নিচ্ছি
          setCourses(data.data.courses || []);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="font-black text-slate-400 uppercase tracking-widest text-xs">বুকশেলফ সাজানো হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              My <span className="text-blue-600">Learning</span>
            </h1>
            <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              You have {courses.length} verified {courses.length === 1 ? 'course' : 'courses'}
            </p>
          </div>
          
          {courses.length > 0 && (
            <Link href="/courses" className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">
              Browse More +
            </Link>
          )}
        </div>

        {courses.length === 0 ? (
          /* Empty State: যখন কোনো ভেরিফাইড কোর্স নেই */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 shadow-sm"
          >
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="text-slate-200" size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-800">কোনো কোর্স পাওয়া যায়নি!</h2>
            <p className="text-slate-400 font-medium mt-3 mb-10 max-w-sm mx-auto">
              আপনার কেনা কোর্সটি এখনো ভেরিফাই করা হয়নি অথবা আপনি কোনো কোর্সে এনরোল করেননি।
            </p>
            <Link href="/courses" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl active:scale-95 inline-block">
              কোর্স কিনুন
            </Link>
          </motion.div>
        ) : (
          /* Course Grid: ভেরিফাইড কোর্সগুলোর লিস্ট */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, idx) => (
              <motion.div 
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] group"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <PlayCircle className="text-white w-12 h-12" />
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-6 mb-8 border-b border-slate-50 pb-6">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                      <PlayCircle size={14} className="text-blue-500" />
                      {course.videos?.length || 0} Lessons
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                      <Clock size={14} className="text-blue-500" /> 
                      Lifetime
                    </div>
                  </div>

                  <Link 
                    href={`/my-courses/${course._id}`} // এখান থেকে কোর্স ডিটেইলস বা প্লেয়ারে যাবে
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-[1.5rem] font-black hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                  >
                    Continue Learning
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}