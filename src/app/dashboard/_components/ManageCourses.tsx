// "use client";
// import { useEffect, useState } from "react";
// import { 
//   DollarSign, 
//   Trash2, 
//   Edit, 
//   XCircle, 
//   PlusCircle, 
//   BookOpen, 
//   Loader2, 
//   Image as ImageIcon 
// } from "lucide-react";
// import Swal from "sweetalert2";
// import { motion, AnimatePresence } from "framer-motion";

// // Types
// interface Video { title: string; url: string; }
// interface Course { 
//   _id: string; 
//   title: string; 
//   price: number; 
//   image: string; 
//   description: string; 
//   videos: Video[]; 
// }

// const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI || "http://localhost:5000";

// export default function ManageCoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({ title: "", price: "", image: "", description: "" });
//   const [videos, setVideos] = useState<Video[]>([{ title: "", url: "" }]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editFormData, setEditFormData] = useState<any>(null);

//   // Fetch All Courses
//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${BASE_URL}/api/v2/courses`);
//       const data = await res.json();
//       setCourses(data.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchCourses(); }, []);

//   // Add New Course
//   const handleAddCourse = async () => {
//     const { title, price, image, description } = formData;
//     if (!title || !price || !image || !description) {
//       return Swal.fire({ icon: "warning", title: "সব ফিল্ড পূরণ করুন", confirmButtonColor: "#2563eb" });
//     }

//     try {
//       Swal.fire({ title: "পাবলিশ হচ্ছে...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//       const res = await fetch(`${BASE_URL}/api/v2/courses`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, price: Number(price), videos }),
//       });
//       const data = await res.json();

//       if (data.success) {
//         Swal.fire({ icon: "success", title: "Course added ✅", confirmButtonColor: "#2563eb" });
//         fetchCourses();
//         setFormData({ title: "", price: "", image: "", description: "" });
//         setVideos([{ title: "", url: "" }]);
//       }
//     } catch (err) {
//       Swal.fire("Error!", "সার্ভারে সমস্যা", "error");
//     }
//   };

//   // Delete Course
//   const handleDelete = async (id: string) => {
//     const result = await Swal.fire({
//       title: "আপনি কি নিশ্চিত?",
//       text: "এটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#64748b",
//       confirmButtonText: "হ্যাঁ, ডিলিট করুন!"
//     });

//     if (result.isConfirmed) {
//       try {
//         await fetch(`${BASE_URL}/api/v2/courses/${id}`, { method: "DELETE" });
//         setCourses(courses.filter((c) => c._id !== id));
//         Swal.fire("Deleted!", "কোর্সটি ডিলিট করা হয়েছে।", "success");
//       } catch (err) {
//         Swal.fire("Error!", "ডিলিট করা সম্ভব হয়নি।", "error");
//       }
//     }
//   };

//   // Update Course
//   const handleUpdateCourse = async () => {
//     try {
//       Swal.fire({ title: "আপডেট হচ্ছে...", didOpen: () => Swal.showLoading() });
//       const res = await fetch(`${BASE_URL}/api/v2/courses/${editingId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editFormData),
//       });
//       const data = await res.json();
      
//       if (data.success) {
//         Swal.fire({ title: "Updated!", icon: "success", confirmButtonColor: "#2563eb" });
//         setEditingId(null);
//         fetchCourses();
//       }
//     } catch (err) {
//       Swal.fire("Error!", "আপডেট ব্যর্থ হয়েছে", "error");
//     }
//   };

//   const handleVideoChange = (index: number, field: keyof Video, value: string, isEdit: boolean = false) => {
//     if (isEdit) {
//       const updatedVideos = [...editFormData.videos];
//       updatedVideos[index][field] = value;
//       setEditFormData({ ...editFormData, videos: updatedVideos });
//     } else {
//       const updatedVideos = [...videos];
//       updatedVideos[index][field] = value;
//       setVideos(updatedVideos);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-12 pb-20">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8">
//         <div>
//           <h1 className="text-4xl font-black text-slate-900">Manage <span className="text-blue-600">Courses</span></h1>
//           <p className="text-slate-500 font-medium mt-1">কোর্স তৈরি করুন, এডিট করুন অথবা ডিলিট করুন।</p>
//         </div>
//         <div className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-2xl text-blue-700 font-bold">
//           <BookOpen size={20} /> Total Courses: {courses.length}
//         </div>
//       </div>

//       {/* CREATE COURSE SECTION */}
//       <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100">
//         <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
//           <PlusCircle className="text-blue-600" /> Create New Course
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-bold text-slate-600 ml-1">Course Title</label>
//             <input type="text" placeholder="e.g. Full Stack Web Development" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-bold text-slate-600 ml-1">Price (৳)</label>
//             <input type="number" placeholder="e.g. 5000" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
//           </div>
//           <div className="space-y-2 col-span-full">
//             <label className="text-sm font-bold text-slate-600 ml-1">Thumbnail URL</label>
//             <input type="text" placeholder="https://image-link.com" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
//           </div>
//           <div className="space-y-2 col-span-full">
//             <label className="text-sm font-bold text-slate-600 ml-1">Course Description</label>
//             <textarea placeholder="বিস্তারিত লিখুন..." className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32 resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
//           </div>
//         </div>
        
//         {/* SYLLABUS SECTION */}
//         <div className="mt-8 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
//           <h3 className="font-black mb-6 text-slate-700 flex items-center gap-2">Course Syllabus (Videos)</h3>
//           <div className="space-y-4">
//             {videos.map((video, index) => (
//               <div key={index} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
//                 <input type="text" placeholder="Video Title" className="p-3 bg-slate-50 rounded-xl flex-1 outline-none" value={video.title} onChange={(e) => handleVideoChange(index, "title", e.target.value)} />
//                 <input type="text" placeholder="Video URL (YouTube/Vimeo)" className="p-3 bg-slate-50 rounded-xl flex-[2] outline-none" value={video.url} onChange={(e) => handleVideoChange(index, "url", e.target.value)} />
//                 <button onClick={() => setVideos(videos.filter((_, i) => i !== index))} className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all self-center md:self-auto"><Trash2 size={20}/></button>
//               </div>
//             ))}
//           </div>
//           <button onClick={() => setVideos([...videos, { title: "", url: "" }])} className="mt-6 flex items-center gap-2 text-blue-600 font-black hover:text-blue-800 transition-all px-4 py-2 rounded-xl bg-blue-50">
//             <PlusCircle size={18} /> Add Another Video
//           </button>
//         </div>

//         <button onClick={handleAddCourse} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-100 mt-10 hover:bg-blue-700 hover:-translate-y-1 transition-all">
//           🚀 Publish New Course
//         </button>
//       </section>

//       {/* EXISTING COURSES LIST */}
//       <section className="space-y-6">
//         <h2 className="text-3xl font-black text-slate-800">Existing <span className="text-blue-600">Courses</span></h2>
        
//         <div className="grid gap-6">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center p-20 text-slate-400 bg-white rounded-3xl border">
//               <Loader2 className="animate-spin mb-2" size={40} />
//               <p className="font-bold">Loading your courses...</p>
//             </div>
//           ) : (
//             courses.map((course) => (
//               <motion.div layout key={course._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
//                 <AnimatePresence mode="wait">
//                   {editingId === course._id ? (
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//                       <div className="flex justify-between items-center bg-orange-50 p-4 rounded-2xl border border-orange-100">
//                         <span className="text-orange-600 font-black uppercase tracking-wider text-sm flex items-center gap-2">
//                           <Edit size={16} /> Editing Mode
//                         </span>
//                         <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-red-500 transition-all">
//                           <XCircle size={24} />
//                         </button>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <input type="text" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} />
//                         <input type="number" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: Number(e.target.value)})} />
//                       </div>

//                       <div className="p-6 bg-slate-50 rounded-[1.5rem] space-y-4">
//                         <p className="font-black text-slate-700">Update Syllabus</p>
//                         {editFormData.videos.map((v: any, idx: number) => (
//                           <div key={idx} className="flex flex-col md:flex-row gap-3">
//                             <input type="text" className="p-3 bg-white border border-slate-200 rounded-xl flex-1 outline-none" value={v.title} onChange={(e) => handleVideoChange(idx, "title", e.target.value, true)} />
//                             <input type="text" className="p-3 bg-white border border-slate-200 rounded-xl flex-[2] outline-none" value={v.url} onChange={(e) => handleVideoChange(idx, "url", e.target.value, true)} />
//                             <button onClick={() => {
//                               const updatedVideos = editFormData.videos.filter((_: any, i: number) => i !== idx);
//                               setEditFormData({ ...editFormData, videos: updatedVideos });
//                             }} className="text-red-400 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
//                           </div>
//                         ))}
//                         <button onClick={() => setEditFormData({...editFormData, videos: [...editFormData.videos, {title: "", url: ""}]})} className="text-sm font-black text-blue-600">+ Add More Video</button>
//                       </div>

//                       <div className="flex gap-4">
//                         <button onClick={handleUpdateCourse} className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black hover:bg-green-700 shadow-lg shadow-green-100 transition-all">Save Changes</button>
//                         <button onClick={() => setEditingId(null)} className="px-8 py-4 bg-slate-100 rounded-2xl font-black text-slate-500 hover:bg-slate-200 transition-all">Discard</button>
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//                       <div className="flex gap-6 items-center w-full">
//                         <div className="relative group">
//                           <img src={course.image} className="w-24 h-24 rounded-[1.5rem] object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" alt="" />
//                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-[1.5rem] transition-all">
//                             <ImageIcon className="text-white" size={20} />
//                           </div>
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-black text-xl text-slate-800 leading-tight">{course.title}</h3>
//                           <div className="flex items-center gap-4 mt-2">
//                             <p className="text-blue-600 font-black text-lg">৳ {course.price}</p>
//                             <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-lg text-slate-500 font-black uppercase tracking-wider">{course.videos?.length || 0} Lessons</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex gap-3 w-full md:w-auto">
//                         <button onClick={() => { setEditingId(course._id); setEditFormData({ ...course }); }} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all">
//                           <Edit size={18}/> Edit
//                         </button>
//                         <button onClick={() => handleDelete(course._id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all">
//                           <Trash2 size={18}/> Delete
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { 
  DollarSign, 
  Trash2, 
  Edit, 
  XCircle, 
  PlusCircle, 
  BookOpen, 
  Loader2, 
  Image as ImageIcon,
  Save,
  Plus
} from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface Video { title: string; url: string; }
interface Course { 
  _id: string; 
  title: string; 
  price: number; 
  image: string; 
  description: string; 
  videos: Video[]; 
}

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI || "http://localhost:5000";

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Create Course State
  const [formData, setFormData] = useState({ title: "", price: "", image: "", description: "" });
  const [videos, setVideos] = useState<Video[]>([{ title: "", url: "" }]);
  
  // Edit Course State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Course | null>(null);

  // Fetch All Courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/v2/courses`);
      const data = await res.json();
      setCourses(data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  // --- ADD NEW COURSE ---
  const handleAddCourse = async () => {
    const { title, price, image, description } = formData;
    if (!title || !price || !image || !description) {
      return Swal.fire({ icon: "warning", title: "সব ফিল্ড পূরণ করুন", confirmButtonColor: "#2563eb" });
    }

    try {
      Swal.fire({ title: "পাবলিশ হচ্ছে...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      const res = await fetch(`${BASE_URL}/api/v2/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(price), videos }),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({ icon: "success", title: "Course added ✅", confirmButtonColor: "#2563eb" });
        fetchCourses();
        setFormData({ title: "", price: "", image: "", description: "" });
        setVideos([{ title: "", url: "" }]);
      }
    } catch (err) {
      Swal.fire("Error!", "সার্ভারে সমস্যা", "error");
    }
  };

  // --- UPDATE EXISTING COURSE ---
  const handleUpdateCourse = async () => {
    if (!editFormData) return;

    try {
      Swal.fire({ title: "আপডেট হচ্ছে...", didOpen: () => Swal.showLoading() });
      const res = await fetch(`${BASE_URL}/api/v2/courses/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      const data = await res.json();
      
      if (data.success) {
        Swal.fire({ title: "Updated!", icon: "success", confirmButtonColor: "#2563eb", timer: 1500 });
        setEditingId(null);
        setEditFormData(null);
        fetchCourses();
      }
    } catch (err) {
      Swal.fire("Error!", "আপডেট ব্যর্থ হয়েছে", "error");
    }
  };

  // --- DELETE COURSE ---
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!"
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${BASE_URL}/api/v2/courses/${id}`, { method: "DELETE" });
        setCourses(courses.filter((c) => c._id !== id));
        Swal.fire("Deleted!", "কোর্সটি ডিলিট করা হয়েছে।", "success");
      } catch (err) {
        Swal.fire("Error!", "ডিলিট করা সম্ভব হয়নি।", "error");
      }
    }
  };

  // --- DYNAMIC VIDEO HANDLER ---
  const handleVideoChange = (index: number, field: keyof Video, value: string, isEdit: boolean = false) => {
    if (isEdit && editFormData) {
      const updatedVideos = [...editFormData.videos];
      updatedVideos[index] = { ...updatedVideos[index], [field]: value };
      setEditFormData({ ...editFormData, videos: updatedVideos });
    } else {
      const updatedVideos = [...videos];
      updatedVideos[index] = { ...updatedVideos[index], [field]: value };
      setVideos(updatedVideos);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Manage <span className="text-blue-600">Courses</span></h1>
          <p className="text-slate-500 font-medium mt-1">ফুল-স্ট্যাক প্রজেক্টের কোর্সগুলো এখান থেকে নিয়ন্ত্রণ করুন।</p>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-2xl text-blue-700 font-bold">
          <BookOpen size={20} /> Total Courses: {courses.length}
        </div>
      </div>

      {/* 1. CREATE NEW COURSE SECTION */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100">
        <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
          <PlusCircle className="text-blue-600" /> Create New Course
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">Course Title</label>
            <input type="text" placeholder="e.g. Next.js Masterclass" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 ml-1">Price (৳)</label>
            <input type="number" placeholder="e.g. 5000" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>
          <div className="space-y-2 col-span-full">
            <label className="text-sm font-bold text-slate-600 ml-1">Thumbnail Image URL</label>
            <input type="text" placeholder="https://your-image-link.com" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
          </div>
          <div className="space-y-2 col-span-full">
            <label className="text-sm font-bold text-slate-600 ml-1">Course Description</label>
            <textarea placeholder="কোর্স সম্পর্কে বিস্তারিত লিখুন..." className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32 resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
        </div>
        
        {/* Create Syllabus */}
        <div className="mt-8 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          <h3 className="font-black mb-6 text-slate-700 flex items-center gap-2">Course Syllabus (Videos)</h3>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <input type="text" placeholder="Video Title" className="p-3 bg-slate-50 rounded-xl flex-1 outline-none" value={video.title} onChange={(e) => handleVideoChange(index, "title", e.target.value)} />
                <input type="text" placeholder="Video URL (YouTube/Vimeo)" className="p-3 bg-slate-50 rounded-xl flex-[2] outline-none" value={video.url} onChange={(e) => handleVideoChange(index, "url", e.target.value)} />
                <button onClick={() => setVideos(videos.filter((_, i) => i !== index))} className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
          <button onClick={() => setVideos([...videos, { title: "", url: "" }])} className="mt-6 flex items-center gap-2 text-blue-600 font-black hover:text-blue-800 transition-all px-4 py-2 rounded-xl bg-blue-50">
            <Plus size={18} /> Add Another Video
          </button>
        </div>

        <button onClick={handleAddCourse} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-100 mt-10 hover:bg-blue-700 hover:-translate-y-1 transition-all">
          🚀 Publish New Course
        </button>
      </section>

      {/* 2. EXISTING COURSES LIST & EDITING */}
      <section className="space-y-6">
        <h2 className="text-3xl font-black text-slate-800">Existing <span className="text-blue-600">Courses</span></h2>
        
        <div className="grid gap-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 text-slate-400 bg-white rounded-3xl border">
              <Loader2 className="animate-spin mb-2" size={40} />
              <p className="font-bold tracking-widest uppercase text-xs">Fetching Database...</p>
            </div>
          ) : (
            courses.map((course) => (
              <motion.div layout key={course._id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <AnimatePresence mode="wait">
                  {editingId === course._id && editFormData ? (
                    // --- EDIT MODE UI ---
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8 space-y-6 bg-slate-50/50">
                      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-blue-100">
                        <span className="text-blue-600 font-black uppercase tracking-wider text-xs flex items-center gap-2">
                          <Edit size={16} /> Now Editing: {course.title}
                        </span>
                        <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-red-500 transition-all">
                          <XCircle size={24} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-slate-400 ml-2 uppercase">Title</p>
                           <input type="text" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black text-slate-400 ml-2 uppercase">Price (৳)</p>
                           <input type="number" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: Number(e.target.value)})} />
                        </div>
                        <div className="space-y-1 col-span-full">
                           <p className="text-[10px] font-black text-slate-400 ml-2 uppercase">Image URL</p>
                           <input type="text" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" value={editFormData.image} onChange={(e) => setEditFormData({...editFormData, image: e.target.value})} />
                        </div>
                        <div className="space-y-1 col-span-full">
                           <p className="text-[10px] font-black text-slate-400 ml-2 uppercase">Description</p>
                           <textarea className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 h-28" value={editFormData.description} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} />
                        </div>
                      </div>

                      {/* Edit Syllabus */}
                      <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-inner">
                        <p className="font-black text-slate-700 mb-4 flex items-center gap-2"><ImageIcon size={18} className="text-blue-500" /> Syllabus Update</p>
                        <div className="space-y-3">
                          {editFormData.videos.map((v: any, idx: number) => (
                            <div key={idx} className="flex flex-col md:flex-row gap-3">
                              <input type="text" placeholder="Lesson Title" className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex-1 outline-none text-sm" value={v.title} onChange={(e) => handleVideoChange(idx, "title", e.target.value, true)} />
                              <input type="text" placeholder="URL" className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex-[2] outline-none text-sm" value={v.url} onChange={(e) => handleVideoChange(idx, "url", e.target.value, true)} />
                              <button onClick={() => {
                                const updatedVideos = editFormData.videos.filter((_: any, i: number) => i !== idx);
                                setEditFormData({ ...editFormData, videos: updatedVideos });
                              }} className="text-red-400 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setEditFormData({...editFormData, videos: [...editFormData.videos, {title: "", url: ""}]})} className="text-xs font-black text-blue-600 mt-4 flex items-center gap-1 hover:underline">
                          <Plus size={14} /> Add New Lesson
                        </button>
                      </div>

                      <div className="flex gap-4">
                        <button onClick={handleUpdateCourse} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                          <Save size={20} /> Save Changes
                        </button>
                        <button onClick={() => setEditingId(null)} className="px-8 py-4 bg-slate-200 rounded-2xl font-black text-slate-500 hover:bg-slate-300 transition-all">Discard</button>
                      </div>
                    </motion.div>
                  ) : (
                    // --- VIEW MODE UI ---
                    <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex gap-6 items-center w-full">
                        <div className="relative group overflow-hidden rounded-[1.5rem] w-24 h-24">
                          <img src={course.image} className="w-full h-full object-cover shadow-sm group-hover:scale-110 transition-transform duration-500" alt="" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <ImageIcon className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-xl text-slate-800 leading-tight">{course.title}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-blue-600 font-black text-lg">৳ {course.price}</p>
                            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-lg text-slate-500 font-black uppercase tracking-wider">{course.videos?.length || 0} Lessons</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <button onClick={() => { setEditingId(course._id); setEditFormData({ ...course }); }} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all">
                          <Edit size={18}/> Edit
                        </button>
                        <button onClick={() => handleDelete(course._id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-black hover:bg-red-600 hover:text-white transition-all">
                          <Trash2 size={18}/> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}