




"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Users, Star, Globe, Quote, 
  PlayCircle, X, Lock, Play, ShieldCheck, Clock 
} from "lucide-react";

// ১. ভিডিও লিঙ্ক কনভার্টার (ইউটিউব ও ড্রাইভের জন্য)
const getEmbedUrl = (url: string | null) => {
  if (!url) return null;

  // ইউটিউব হ্যান্ডেল করা
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
    else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
    else if (url.includes("embed/")) return url;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  // গুগল ড্রাইভ হ্যান্ডেল করা

  // গুগল ড্রাইভ হ্যান্ডেল করা
 if (url.includes("drive.google.com")) {
    // '/view', '/sharing' ইত্যাদি থাকলে সেটাকে '/preview'-এ কনভার্ট করবে
    const baseId = url.split('/d/')[1]?.split('/')[0];
    return `https://drive.google.com/file/d/${baseId}/preview`;
  }

  return url;
};

const REVIEWS = [
  { name: "Tanvir Ahmed", text: "এই কোর্সটি আমার লাইফ চেঞ্জ করে দিয়েছে। মেন্টর সাপোর্ট জাস্ট অসাম!" },
  { name: "Sadiya Islam", text: "খুবই সহজ ভাষায় জটিল বিষয়গুলো বোঝানো হয়েছে। বিগিনারদের জন্য সেরা।" },
  { name: "Siam Ahmed", text: "ডলারে কেনা কোর্সগুলো এত কম টাকায় পাবো ভাবিনি। ভিডিও কোয়ালিটি একদম অরিজিনাল।" },
  { name: "Rifat Chowdhury", text: "সেলার ভাই অনেক হেল্পফুল। পেমেন্ট করার ২ মিনিটের মধ্যেই এক্সেস পেয়ে গেছি।" },
  { name: "Mst. Afrin", text: "এই প্ল্যাটফর্মের কারণে অনেক দামী দামী স্কিল শিখতে পারছি। ধন্যবাদ!" }
];

export default function CourseDetailsPage() {
  const params = useParams();
  const API_URL = `${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/courses`;

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [randomReview, setRandomReview] = useState(REVIEWS[0]);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  useEffect(() => {
    setRandomReview(REVIEWS[Math.floor(Math.random() * REVIEWS.length)]);
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/${params.id}`);
        const data = await res.json();
        if (data.success) setCourse(data.data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchCourse();
  }, [params.id, API_URL]);

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-blue-600">LOADING...</div>;
  if (!course) return <h1 className="text-center mt-20 text-2xl font-bold">Course Not Found</h1>;

  const currentVideoUrl = activeVideo || course.videoUrl;

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-20 font-sans">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/courses" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors">
          <ArrowLeft size={18} /> Back to All Courses
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          
          {/* ২. ভিডিও প্লেয়ার সেকশন (Conditional Rendering fixed) */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 aspect-video shadow-2xl border border-slate-100 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isPreviewing ? (
                <motion.div 
                  key="thumbnail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative cursor-pointer w-full h-full group"
                  onClick={() => {
                    setIsPreviewing(true);
                    setIsVideoLoading(true);
                  }}
                >
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 p-5 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform">
                      <PlayCircle size={50} className="text-blue-600" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="video-player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
                  {/* সুন্দর বাফারিং লোডার */}
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-blue-200 text-xs font-black uppercase tracking-widest">Buffering...</p>
                    </div>
                  )}

                  {/* Empty String Error Fix */}
                  {currentVideoUrl ? (
                    <iframe 
                      key={currentVideoUrl}
                      className={`w-full h-full transition-opacity duration-500 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
                      src={getEmbedUrl(currentVideoUrl) || ""} 
                      onLoad={() => setIsVideoLoading(false)}
                      allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="text-white font-bold">No Video Available</div>
                  )}

                  <button 
                    onClick={() => {
                      setIsPreviewing(false);
                      setIsVideoLoading(false);
                    }} 
                    className="absolute top-4 right-4 bg-black/60 p-2 rounded-full text-white hover:bg-black z-20"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Title & Stats */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{course.title}</h1>
            <div className="flex flex-wrap gap-6 text-slate-600 font-bold">
              <div className="flex items-center gap-1 text-yellow-500"><Star size={18} fill="currentColor" /> 4.9 (2.4k)</div>
              <div className="flex items-center gap-2"><Users size={18} className="text-blue-500" /> 12k Students</div>
              <div className="flex items-center gap-2"><Globe size={18} /> English/Bangla</div>
            </div>
          </div>

          {/* Pricing Banner */}
          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black tracking-tighter">৳{course.price}</span>
                <span className="text-blue-200 line-through font-bold text-xl">৳{course.price + 500}</span>
              </div>
              <p className="text-blue-100 font-bold mt-1 uppercase tracking-widest text-xs">Limited Time Flash Sale</p>
            </div>
            <Link href={`/checkout/${course._id}`} className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
              Enroll Now
            </Link>
          </div>

          {/* Description */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Course Description</h2>
            <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-line">{course.description}</p>
          </div>

          {/* Random Review Card */}
          <motion.div key={randomReview.name} className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
            <Quote className="text-blue-500 mb-4 opacity-50" size={32} />
            <p className="font-medium italic text-lg mb-6 leading-relaxed opacity-90">"{randomReview.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-black text-xl text-white">
                {randomReview.name.charAt(0)}
              </div>
              <p className="font-black text-lg">{randomReview.name}</p>
            </div>
            <div className="absolute -right-6 -bottom-6 text-white opacity-5"><Star size={140} /></div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Video Playlist */}
                   <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-900">Course Content</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Free Preview + Premium Lessons</p>
            </div>

            <div className="p-3 space-y-2">
              {course.videos?.map((video: any, index: number) => {
                const isFree = index === 0; // First video is free
                return (
                  <button
                    key={index}
                    disabled={!isFree}
                    onClick={() => {
                      setIsPreviewing(true);
                      setActiveVideo(video.url);
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                      isFree 
                      ? "hover:bg-blue-50 cursor-pointer text-slate-700" 
                      : "opacity-60 cursor-not-allowed bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isFree ? "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" : "bg-slate-200 text-slate-400"
                      }`}>
                        {isFree ? <Play size={16} fill="currentColor" /> : <Lock size={16} />}
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight">{video.title}</p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {isFree ? "Watch Free Preview" : "Premium Lesson"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sticky Bottom Enroll in Sidebar */}
            <div className="p-6 mt-auto bg-slate-50 border-t border-slate-100">
              <div className="space-y-3 mb-6">
                 <div className="flex items-center gap-3 text-slate-600 font-bold text-xs">
                    <Clock size={16} className="text-blue-500" /> 24 Hours Video Content
                 </div>
                 <div className="flex items-center gap-3 text-slate-600 font-bold text-xs">
                    <ShieldCheck size={16} className="text-blue-500" /> Lifetime Access
                 </div>
              </div>
              <Link href={`/checkout/${course._id}`} className="block text-center bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all shadow-lg active:scale-95">
                Unlock Full Course
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}