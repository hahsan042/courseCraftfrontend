"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, BookOpen, Clock, ArrowRight, Loader2 } from "lucide-react";
interface Course {
  _id: string;
  title: string;
  image: string;
  videos?: any[]; // আপনার ডেটা অনুযায়ী এখানে আরও স্পেসিফিক টাইপ দিতে পারেন
}

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

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
        const res = await fetch(`${BASE_URL}/api/v2/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const data = await res.json();

        // if (data.success) {
        //   setCourses(data.data.courses || []);
        // }
        const data = await res.json();
console.log("Full Data from Backend:", data); // এই লাইনটি যোগ করুন
if (data.success) {
  console.log("Courses Array:", data.data.courses); // এখানে দেখুন অ্যারেটি খালি কি না
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
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Loading your journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            My <span className="text-blue-600">Learning</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">
            You have {courses.length} enrolled {courses.length === 1 ? 'course' : 'courses'}
          </p>
        </div>

        {courses.length === 0 ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100"
          >
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-slate-300" size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800">No courses yet!</h2>
            <p className="text-slate-500 font-medium mt-2 mb-8">You haven't enrolled in any courses yet. <br/> Start your career today!</p>
            <Link href="/courses" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
              Browse All Courses
            </Link>
          </motion.div>
        ) : (
          /* Course Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div 
                key={course._id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      Unlocked
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                   {course.videos?.length || 0} {course.videos?.length === 1 ? 'Lesson' : 'Lessons'}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-tighter">
                      <Clock size={16} className="text-blue-500" /> Lifetime
                    </div>
                  </div>

                  <Link 
                    href={`/my-courses/${course._id}`}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-lg"
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