"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Star, Globe, Lock, Play, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

const getEmbedUrl = (url: string | null) => {
  if (!url) return null;
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
    else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
    else if (url.includes("embed/")) return `${url}${url.includes('?') ? '&' : '?'}autoplay=1&mute=1`;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;
  }
  if (url.includes("drive.google.com")) {
    const baseId = url.split('/d/')[1]?.split('/')[0];
    return `https://drive.google.com/file/d/${baseId}/preview`;
  }
  return url;
};

export default function CourseDetailsPage() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/courses/${params.id}`);
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
          setActiveVideo(data.data.videoUrl || (data.data.videos?.[0]?.url));
        }
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    if (params.id) fetchCourse();
  }, [params.id]);

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-blue-600 uppercase">Loading Course...</div>;
  if (!course) return <h1 className="text-center mt-20 text-2xl font-bold">Course Not Found</h1>;

  const currentVideoUrl = activeVideo || course.videoUrl;

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-20 font-sans">
      {/* নেভিগেশন */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Link href="/courses" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors text-sm uppercase">
          <ArrowLeft size={16} /> Back to Courses
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* ১. ভিডিও প্লেয়ার */}
          <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-black aspect-video shadow-2xl border-4 border-white">
            {isVideoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <iframe 
              className="w-full h-full"
              src={getEmbedUrl(currentVideoUrl) || ""} 
              onLoad={() => setIsVideoLoading(false)}
              allow="autoplay; encrypted-media; allowfullscreen"
              allowFullScreen
            ></iframe>
          </div>

          {/* মোবাইল প্লেলিস্ট (শুধুমাত্র মোবাইলে দেখাবে) */}
          <div className="lg:hidden">
            <PlaylistComponent course={course} setActiveVideo={setActiveVideo} setIsVideoLoading={setIsVideoLoading} />
          </div>

    {/* টাইটেল এবং ডেসক্রিপশন সেকশন */}
<div className="space-y-6 px-1">
  <div className="space-y-4">
    <div className="flex flex-wrap gap-2">
      <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Best Seller</span>
      <span className="bg-green-100 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Updated 2024</span>
    </div>
    
    {/* মেইন টাইটেল */}
    <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
      {course.title || "Course Title"}
    </h1>

    {/* স্ট্যাটস রো */}
    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-slate-500 font-bold text-xs md:text-sm">
      <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-xl border border-yellow-100">
        <Star size={16} fill="currentColor" />
        <span>4.9 (Rating)</span>
      </div>
      <div className="flex items-center gap-2">
        <Users size={18} className="text-blue-500" />
        <span>12,400+ Students</span>
      </div>
      <div className="flex items-center gap-2">
        <Globe size={18} className="text-blue-500" />
        <span>Bangla Language</span>
      </div>
    </div>
  </div>

  {/* ডেসক্রিপশন বক্স - এটাকে সুন্দর করা হয়েছে */}
  <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
    <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tight flex items-center gap-2">
      <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
      About This Course
    </h3>
    <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line font-medium">
      {course.description}
    </p>
  </div>

            {/* প্রিমিয়াম প্রাইজ কার্ড */}
            <div className="relative group overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-200">
              {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left space-y-3">
                  <p className="text-blue-100 font-black uppercase tracking-[0.2em] text-[10px]">Special Offer Price</p>
                  <div className="flex items-baseline justify-center md:justify-start gap-3">
                    <span className="text-5xl md:text-7xl font-black tracking-tighter">৳{course.price}</span>
                    <span className="text-blue-200/50 line-through font-bold text-xl md:text-2xl">৳{course.price + 500}</span>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <p className="flex items-center justify-center md:justify-start gap-2 text-blue-50 font-bold text-xs">
                      <CheckCircle2 size={16} className="text-green-400" /> Life-time Access
                    </p>
                    <p className="flex items-center justify-center md:justify-start gap-2 text-blue-50 font-bold text-xs">
                      <ShieldCheck size={16} className="text-green-400" /> 7 Days Money Back Guarantee
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <Link 
                    href={`/checkout/${course._id}`} 
                    className="group/btn relative inline-flex w-full md:w-auto items-center justify-center gap-3 bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-50 hover:-translate-y-1 active:scale-95 transition-all"
                  >
                    ENROLL NOW
                    <Play size={18} fill="currentColor" className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ডেক্সটপ সাইডবার (প্লেলিস্ট) */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-10">
            <PlaylistComponent course={course} setActiveVideo={setActiveVideo} setIsVideoLoading={setIsVideoLoading} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function PlaylistComponent({ course, setActiveVideo, setIsVideoLoading }: any) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50">
        <h3 className="text-xl font-black text-slate-900 uppercase">Course Content</h3>
        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">
          {course.videos?.length || 0} Lessons • 24+ Hours
        </p>
      </div>

      <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">
        <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />
        {course.videos?.map((video: any, index: number) => {
          const isFree = index === 0;
          return (
            <button
              key={index}
              disabled={!isFree}
              onClick={() => { 
                setIsVideoLoading(true);
                setActiveVideo(video.url); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                isFree 
                ? "hover:bg-blue-50 cursor-pointer text-slate-700 border border-transparent hover:border-blue-100" 
                : "opacity-50 cursor-not-allowed bg-slate-50/50"
              }`}
            >
              <div className="flex items-center gap-4 text-left">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  isFree ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"
                }`}>
                  {isFree ? <Play size={16} fill="currentColor" /> : <Lock size={16} />}
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight line-clamp-1">{video.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                     <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                       isFree ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"
                     }`}>
                       {isFree ? "Free Preview" : "Locked"}
                     </span>
                     <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                       <Clock size={10} /> 10:24
                     </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}