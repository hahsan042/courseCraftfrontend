"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Star, BookOpen, Clock } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

interface Course {
  _id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v2/courses`);
        const data = await res.json();
        if (data.success) {
          // 🔥 only take first 3 courses
          setCourses(data.data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
              <span className="text-blue-600 font-black uppercase tracking-widest text-sm">Top Rated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Explore Our <span className="text-blue-600">Featured</span> Courses
            </h2>
            <p className="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
              এক্সপার্ট মেন্টরদের নির্দেশনায় আপনার পছন্দের স্কিলটি শিখে ক্যারিয়ারে এক ধাপ এগিয়ে থাকুন।
            </p>
          </div>
          <Link 
            href="/courses" 
            className="group flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-colors bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100"
          >
            See all courses 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            // Skeleton Loader
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-50 rounded-[2rem] h-[450px] animate-pulse" />
            ))
          ) : (
            courses.map((course, idx) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_60px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                {/* Image Wrap */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-black text-slate-800">4.9</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><BookOpen size={14} /> 12 Modules</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> 24 Hours</span>
                  </div>

                  <h3 className="font-black text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug h-14">
                    {course.title}
                  </h3>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Course Fee</p>
                      <p className="text-2xl font-black text-slate-900">৳ {course.price}</p>
                    </div>

                    <Link
                      href={`/courses/${course._id}`}
                      className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {!loading && courses.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No courses available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}