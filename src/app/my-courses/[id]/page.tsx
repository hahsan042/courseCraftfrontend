

// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { PlayCircle, ChevronLeft, Lock, Loader2 } from "lucide-react";
// import Link from "next/link";
// import Swal from "sweetalert2"; // SweetAlert2 ইমপোর্ট করুন

// export default function LearningPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [course, setCourse] = useState<any>(null);
//   const [activeVideo, setActiveVideo] = useState<any>(null);
//   const [isVerifying, setIsVerifying] = useState(true);

//   const getEmbedUrl = (url: string | null) => {
//     if (!url) return "";
//     if (url.includes("youtube.com") || url.includes("youtu.be")) {
//       let videoId = "";
//       if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
//       else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
//       else if (url.includes("embed/")) return url;
//       return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
//     }
//     if (url.includes("drive.google.com")) {
//       const baseId = url.split('/d/')[1]?.split('/')[0];
//       return `https://drive.google.com/file/d/${baseId}/preview`;
//     }
//     return url;
//   };

//   useEffect(() => {
//     const checkAccessAndFetchCourse = async () => {
//       const token = localStorage.getItem("token");
      
//       if (!token) {
//         Swal.fire({
//           icon: 'error',
//           title: 'অ্যাক্সেস ডিনাইড!',
//           text: 'ভিডিও দেখতে হলে আগে লগইন করুন।',
//           confirmButtonColor: '#2563eb'
//         }).then(() => {
//           router.push("/login");
//         });
//         return;
//       }

//       try {
//         // ১. ইউজারের প্রোফাইল থেকে কেনা কোর্সের লিস্ট চেক করা
//         const userRes = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/users/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const userData = await userRes.json();

//         if (userData.success) {
//           // চেক করছি এই কোর্স আইডিটি ইউজারের এনরোল করা কোর্সের মধ্যে আছে কি না
//           const hasAccess = userData.data.courses.some((c: any) => c._id === params.id);
          
//           if (!hasAccess) {
//             // যদি অ্যাক্সেস না থাকে তবে সুইট অ্যালার্ট দেখানো হবে
//             await Swal.fire({
//               icon: 'warning',
//               title: 'অ্যাক্সেস নেই!',
//               text: 'আপনার পেমেন্ট এখনও ভেরিফাই হয়নি অথবা আপনি কোর্সটি কেনেননি।',
//               confirmButtonText: 'ঠিক আছে',
//               confirmButtonColor: '#2563eb',
//               allowOutsideClick: false
//             });
//             router.push("/my-courses");
//             return;
//           }

//           // ২. যদি অ্যাক্সেস থাকে তবে কোর্সের ডিটেইলস নিয়ে আসা
//           const courseRes = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/courses/${params.id}`);
//           const courseData = await courseRes.json();
          
//           if (courseData.success) {
//             setCourse(courseData.data);
//             setActiveVideo(courseData.data.videos[0]);
//           }
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         Swal.fire('Error', 'সার্ভারে সমস্যা হচ্ছে, আবার চেষ্টা করুন।', 'error');
//       } finally {
//         setIsVerifying(false);
//       }
//     };

//     checkAccessAndFetchCourse();
//   }, [params.id, router]);

//   if (isVerifying) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
//           <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Verifying Enrollment...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!course) return null; // রিডাইরেক্ট হওয়ার সময় কিছু দেখানোর দরকার নেই

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-white">
//       {/* বাম পাশ: ভিডিও প্লেয়ার */}
//       <div className="flex-1 p-4 lg:p-8 bg-slate-50">
//         <Link href="/my-courses" className="inline-flex items-center text-slate-500 font-bold mb-6 hover:text-blue-600 transition">
//           <ChevronLeft size={20} /> Back to My Courses
//         </Link>

//         <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative">
//           {activeVideo?.url ? (
//             <iframe
//               src={getEmbedUrl(activeVideo.url)} 
//               className="w-full h-full"
//               allowFullScreen
//               allow="autoplay; encrypted-media; picture-in-picture"
//             ></iframe>
//           ) : (
//             <div className="flex items-center justify-center h-full text-white">Select a lesson to start</div>
//           )}
//         </div>
        
//         <div className="mt-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
//           <h1 className="text-3xl font-black text-slate-900 mb-2">{activeVideo?.title}</h1>
//           <p className="text-slate-500 font-medium">কোর্স: {course.title}</p>
//         </div>
//       </div>

//       {/* ডান পাশ: ভিডিও লিস্ট */}
//       <div className="w-full lg:w-[400px] bg-white border-l border-slate-100 flex flex-col h-screen overflow-hidden">
//         <div className="p-8 border-b border-slate-50 bg-white">
//           <h2 className="font-black text-xl text-slate-900">Course Lessons</h2>
//           <p className="text-xs text-blue-600 font-black uppercase mt-1 tracking-widest">
//             {course.videos.length} Videos Available
//           </p>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {course.videos.map((video: any, index: number) => {
//             const isActive = activeVideo?.url === video.url;
//             return (
//               <button
//                 key={index}
//                 onClick={() => setActiveVideo(video)}
//                 className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all text-left group ${
//                   isActive 
//                   ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
//                   : "hover:bg-blue-50 border border-transparent"
//                 }`}
//               >
//                 <div className={`w-8 h-8 min-w-[32px] rounded-xl flex items-center justify-center font-black text-xs ${
//                   isActive ? "bg-white text-blue-600" : "bg-slate-100 text-slate-500"
//                 }`}>
//                   {index + 1}
//                 </div>
//                 <div className="flex-1 overflow-hidden">
//                   <p className={`text-sm font-bold truncate ${isActive ? "text-white" : "text-slate-700"}`}>
//                     {video.title}
//                   </p>
//                 </div>
//                 <PlayCircle size={18} className={isActive ? "text-white" : "text-slate-300 group-hover:text-blue-400"} />
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlayCircle, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function LearningPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  const getEmbedUrl = (url: string | null) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";
      if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
      else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
      else if (url.includes("embed/")) return `${url}${url.includes('?') ? '&' : '?'}autoplay=1&rel=0`;
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (url.includes("drive.google.com")) {
      const baseId = url.split('/d/')[1]?.split('/')[0];
      return `https://drive.google.com/file/d/${baseId}/preview`;
    }
    return url;
  };

  useEffect(() => {
    const checkAccessAndFetchCourse = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({ icon: 'error', title: 'অ্যাক্সেস ডিনাইড!', text: 'ভিডিও দেখতে লগইন করুন।' }).then(() => router.push("/login"));
        return;
      }

      try {
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();

        if (userData.success) {
          const hasAccess = userData.data.courses.some((c: any) => c._id === params.id);
          if (!hasAccess) {
            await Swal.fire({ icon: 'warning', title: 'অ্যাক্সেস নেই!', text: 'কোর্সটি কেনা হয়নি।' });
            router.push("/my-courses");
            return;
          }

          const courseRes = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/courses/${params.id}`);
          const courseData = await courseRes.json();
          if (courseData.success) {
            setCourse(courseData.data);
            setActiveVideo(courseData.data.videos[0]);
          }
        }
      } catch (error) { console.error("Error:", error); } 
      finally { setIsVerifying(false); }
    };
    checkAccessAndFetchCourse();
  }, [params.id, router]);

  if (isVerifying) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!course) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      
      {/* বাম পাশ: ভিডিও সেকশন */}
      <div className="flex-1 bg-slate-50 flex flex-col">
        
        {/* ১. ভিডিও প্লেয়ার (মোবাইলে সবার উপরে) */}
        <div className="p-4 lg:p-8">
          <Link href="/my-courses" className="inline-flex items-center text-slate-500 font-bold mb-4 text-sm hover:text-blue-600">
            <ChevronLeft size={18} /> Back
          </Link>

          <div className="aspect-video bg-black rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white relative">
            {activeVideo?.url ? (
              <iframe
                key={activeVideo.url}
                src={getEmbedUrl(activeVideo.url)} 
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-white">Loading...</div>
            )}
          </div>
        </div>

        {/* ২. ভিডিও প্লেলিস্ট (মোবাইলে ভিডিওর ঠিক নিচে) */}
        <div className="lg:hidden px-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-50">
              <h2 className="font-black text-lg text-slate-900">COURSE PLAYLIST</h2>
              <p className="text-[10px] text-blue-600 font-bold uppercase">{course.videos.length} Lessons Available</p>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2 space-y-2">
              <PlaylistItems videos={course.videos} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
            </div>
          </div>
        </div>

        {/* ৩. কোর্স টাইটেল ও ইনফরমেশন (মোবাইলে প্লেলিস্টের নিচে) */}
        <div className="p-4 lg:p-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h1 className="text-xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">{activeVideo?.title}</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wide">Course: {course.title}</p>
          </div>
        </div>
      </div>

      {/* ডেক্সটপ সাইডবার (শুধুমাত্র বড় স্ক্রিনে দেখাবে) */}
      <div className="hidden lg:flex w-[400px] bg-white border-l border-slate-100 flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-slate-50">
          <h2 className="font-black text-xl text-slate-900">Course Lessons</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <PlaylistItems videos={course.videos} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
        </div>
      </div>
    </div>
  );
}

// কমন প্লেলিস্ট আইটেম ফাংশন
function PlaylistItems({ videos, activeVideo, setActiveVideo }: any) {
  return (
    <>
      {videos.map((video: any, index: number) => {
        const isActive = activeVideo?.url === video.url;
        return (
          <button
            key={index}
            onClick={() => {
              setActiveVideo(video);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${
              isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "hover:bg-slate-50 border border-transparent"
            }`}
          >
            <div className={`w-8 h-8 min-w-[32px] rounded-xl flex items-center justify-center font-black text-xs ${
              isActive ? "bg-white text-blue-600" : "bg-slate-100 text-slate-500"
            }`}>{index + 1}</div>
            <p className={`text-sm font-bold truncate flex-1 ${isActive ? "text-white" : "text-slate-700"}`}>{video.title}</p>
            <PlayCircle size={18} className={isActive ? "text-white" : "text-slate-300"} />
          </button>
        );
      })}
    </>
  );
}