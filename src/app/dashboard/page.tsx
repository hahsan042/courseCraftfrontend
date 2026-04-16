
"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  LogOut,
  LayoutDashboard,
  CreditCard,
  DollarSign,
  Edit,
  Trash2,
  XCircle,
  Search,
  Menu,
  X,
  PlusCircle,
  Video
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

// --- Interfaces ---
interface VideoItem { title: string; url: string; }
interface Course { _id: string; title: string; price: number; image: string; description: string; videos: VideoItem[]; }

// --- Main Dashboard Component ---
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, courses: 0, revenue: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // মোবাইলের জন্য

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v2/admin/stats`);
      const result = await res.json();
      if (result.success) setStats(result.data);
    } catch (err) {
      console.error("Stats loading failed", err);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      window.location.href = "/";
    } else {
      setLoading(false);
      fetchDashboardStats();
    }
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen font-black text-slate-400 uppercase tracking-widest animate-pulse">Checking Access...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* --- Mobile Top Header --- */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-1.5 rounded-lg">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-black tracking-tight text-lg">AdminPanel</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-800 rounded-xl text-blue-400 active:scale-95 transition-all">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- Sidebar (Responsive) --- */}
      <AnimatePresence>
        {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth > 768) && (
          <>
            {/* Mobile Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed md:sticky top-0 left-0 z-50 w-72 md:w-64 bg-gray-900 text-white h-screen flex flex-col p-6 shadow-2xl transition-all`}
            >
              <div className="flex items-center gap-2 mb-10">
                <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                  <LayoutDashboard size={20} />
                </div>
                <span className="text-xl font-black tracking-tighter">AdminPortal</span>
              </div>
              
              <nav className="flex-1 space-y-2">
                <NavButton active={activeTab === "overview"} onClick={() => {setActiveTab("overview"); setIsSidebarOpen(false)}} icon={<BarChart3 size={20} />} label="Overview" />
                <NavButton active={activeTab === "transactions"} onClick={() => {setActiveTab("transactions"); setIsSidebarOpen(false)}} icon={<CreditCard size={20} />} label="Transactions" />
                <NavButton active={activeTab === "courses"} onClick={() => {setActiveTab("courses"); setIsSidebarOpen(false)}} icon={<BookOpen size={20} />} label="Manage Courses" />
              </nav>

              <button 
                onClick={() => { localStorage.clear(); window.location.href = "/login"; }} 
                className="flex items-center gap-3 text-red-400 font-black p-4 hover:bg-red-500/10 rounded-2xl transition-all mt-auto border border-red-500/10"
              >
                <LogOut size={20} /> Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h1 className="text-3xl font-black text-slate-900 mb-10">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Users className="text-blue-600" />} label="Total Users" value={stats.users} color="bg-blue-50" />
                <StatCard icon={<BookOpen className="text-purple-600" />} label="Active Courses" value={stats.courses} color="bg-purple-50" />
                <StatCard icon={<DollarSign className="text-green-600" />} label="Total Revenue" value={`৳ ${stats.revenue.toLocaleString()}`} color="bg-green-50" />
              </div>
            </motion.div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === "transactions" && <ManageTransactionsComponent key="trans" />}

          {/* COURSES TAB */}
          {activeTab === "courses" && <ManageCoursesComponent key="course" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Helper UI Components ---
function NavButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 w-full p-3 rounded-xl font-bold transition-all ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
      {icon} {label}
    </button>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{label}</p>
        <h3 className="text-2xl font-black text-slate-800">{value}</h3>
      </div>
    </div>
  );
}

// ================= TRANSACTION COMPONENT =================


// ================= TRANSACTION COMPONENT =================
function ManageTransactionsComponent() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

const fetchTransactions = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
if (!token) {
  Swal.fire("Unauthorized", "আপনি লগইন করেননি!", "warning");
  return;
}
    const res = await fetch(`${BASE_URL}/api/v2/transactions`, {
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // token পাঠাও
      }
    });
    const data = await res.json();
    setTransactions(data.data || []);
  } catch (err) { 
    console.error(err); 
  } finally { 
    setLoading(false); 
  }
};
  useEffect(() => { fetchTransactions(); }, []);

 const updateStatus = async (id: string, status: string) => {
  const result = await Swal.fire({
    title: status === "verified" ? "Verify করবেন?" : "Reject করবেন?",
    text: `আপনি কি নিশ্চিতভাবে এই পেমেন্টটি ${status === "verified" ? "ভেরিফাই" : "রিজেক্ট"} করতে চান?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: status === "verified" ? "#16a34a" : "#ef4444",
    cancelButtonColor: "#64748b",
    confirmButtonText: "হ্যাঁ",
    cancelButtonText: "বাতিল"
  });

  if (result.isConfirmed) {
    try {
      Swal.fire({ title: "প্রসেসিং...", didOpen: () => Swal.showLoading(), allowOutsideClick: false });
      
      const token = localStorage.getItem("token");
      
      // ✅ রেসপন্সটি একটি ভেরিয়েবলে রাখুন
      const res = await fetch(`${BASE_URL}/api/v2/transactions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }), // এখানে 'verified' অথবা 'rejected' যাচ্ছে
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({ icon: "success", title: "সফল হয়েছে!", text: data.message, timer: 1500, showConfirmButton: false });
        fetchTransactions(); // লিস্ট রিফ্রেশ করা
      } else {
        Swal.fire("Error!", data.message || "আপডেট করা সম্ভব হয়নি", "error");
      }
    } catch (err) { 
      console.error(err);
      Swal.fire("Error!", "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না", "error");
    }
  }
};

  const filteredTransactions = transactions.filter((tx) =>
    tx.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.courseId?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-black text-slate-800">Payments & Transactions</h2>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search TrxID or Course..."
            className="w-full p-3 pl-10 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase">
              <th className="p-4 font-black">Course</th>
              <th className="p-4 font-black">Fee</th>
              <th className="p-4 font-black">TrxID</th>
              <th className="p-4 font-black">Status</th>
              <th className="p-4 font-black text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx._id} className="border-t border-slate-50">
                <td className="p-4 font-bold text-slate-700">{tx.courseId?.title || "N/A"}</td>
                <td className="p-4 font-black">৳ {tx.courseId?.price || 0}</td>
                <td className="p-4 font-mono text-blue-600">{tx.transactionId}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${tx.status === 'verified' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => updateStatus(tx._id, "verified")} className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold">Verify</button>
                  <button onClick={() => updateStatus(tx._id, "rejected")} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ================= COURSE COMPONENT =================
interface Video { title: string; url: string; }
interface Course { _id: string; title: string; price: number; image: string; description: string; videos: Video[]; }

function ManageCoursesComponent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", price: "", image: "", description: "" });
  const [videos, setVideos] = useState<Video[]>([{ title: "", url: "" }]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/v2/courses`);
      const data = await res.json();
      setCourses(data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);

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
    } catch (err) { Swal.fire("Error!", "সার্ভারে সমস্যা", "error"); }
  };

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
      } catch (err) { Swal.fire("Error!", "ডিলিট করা সম্ভব হয়নি।", "error"); }
    }
  };

  const handleUpdateCourse = async () => {
    try {
      Swal.fire({ title: "আপডেট হচ্ছে...", didOpen: () => Swal.showLoading() });
      const res = await fetch(`${BASE_URL}/api/v2/courses/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      const data = await res.json();
      
      if (data.success) {
        Swal.fire({ title: "Updated!", icon: "success", confirmButtonColor: "#2563eb" });
        setEditingId(null);
        fetchCourses();
      }
    } catch (err) { Swal.fire("Error!", "আপডেট ব্যর্থ হয়েছে", "error"); }
  };

  const handleVideoChange = (index: number, field: keyof Video, value: string, isEdit: boolean = false) => {
    if (isEdit) {
      const updatedVideos = [...editFormData.videos];
      updatedVideos[index][field] = value;
      setEditFormData({ ...editFormData, videos: updatedVideos });
    } else {
      const updatedVideos = [...videos];
      updatedVideos[index][field] = value;
      setVideos(updatedVideos);
    }
  };

  return (
    <div className="space-y-12">
      {/* ADD COURSE SECTION */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <DollarSign className="text-green-500" /> Create New Course
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Course Title" className="p-3 border rounded-xl outline-none focus:border-blue-500" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          <input type="number" placeholder="Price (৳)" className="p-3 border rounded-xl outline-none focus:border-blue-500" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
          <input type="text" placeholder="Image URL" className="p-3 border rounded-xl outline-none focus:border-blue-500 col-span-full" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
          <textarea placeholder="Description..." className="p-3 border rounded-xl outline-none focus:border-blue-500 col-span-full h-24" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>
        
        <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <h3 className="font-bold mb-4 text-slate-700">Course Syllabus (Videos)</h3>
          {videos.map((video, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input type="text" placeholder="Title" className="p-2 border rounded-lg w-1/3" value={video.title} onChange={(e) => handleVideoChange(index, "title", e.target.value)} />
              <input type="text" placeholder="URL" className="p-2 border rounded-lg w-2/3" value={video.url} onChange={(e) => handleVideoChange(index, "url", e.target.value)} />
              <button onClick={() => setVideos(videos.filter((_, i) => i !== index))} className="text-red-400 hover:text-red-600 px-2"><Trash2 size={18}/></button>
            </div>
          ))}
          <button onClick={() => setVideos([...videos, { title: "", url: "" }])} className="text-blue-600 font-bold text-sm mt-2 hover:underline">+ Add Another Video</button>
        </div>
        <button onClick={handleAddCourse} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 mt-6 hover:bg-blue-700 transition-all">Publish Course</button>
      </section>

      {/* COURSE LIST SECTION */}
      <section>
        <h2 className="text-2xl font-black text-slate-800 mb-6">Existing Courses</h2>
        <div className="grid gap-6">
          {loading ? (
              <div className="text-center p-10 text-slate-400">Loading courses...</div>
          ) : (
            courses.map((course) => (
              <motion.div layout key={course._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {editingId === course._id ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Editing Mode</span>
                      <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-red-500"><XCircle size={24} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input type="text" className="w-full p-3 border rounded-xl outline-none focus:border-blue-500" value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} />
                       <input type="number" className="w-full p-3 border rounded-xl outline-none focus:border-blue-500" value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: Number(e.target.value)})} />
                    </div>
                    <textarea className="w-full p-3 border rounded-xl h-24 outline-none focus:border-blue-500" value={editFormData.description} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} />
                      {/* 🎬 Edit Videos Section (Syllabus) */}
<div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-4">
  <p className="font-bold text-sm mb-3 text-slate-700">Course Syllabus (Videos)</p>
  <div className="space-y-2">
    {editFormData.videos.map((v: any, idx: number) => (
      <div key={idx} className="flex gap-2 items-center">
        <input 
          type="text" 
          placeholder="Video Title"
          className="p-2 border rounded-lg w-1/3 text-sm outline-none focus:border-blue-400" 
          value={v.title} 
          onChange={(e) => handleVideoChange(idx, "title", e.target.value, true)} 
        />
        <input 
          type="text" 
          placeholder="Video URL"
          className="p-2 border rounded-lg w-2/3 text-sm outline-none focus:border-blue-400" 
          value={v.url} 
          onChange={(e) => handleVideoChange(idx, "url", e.target.value, true)} 
        />
        <button 
          onClick={() => {
            const updatedVideos = editFormData.videos.filter((_: any, i: number) => i !== idx);
            setEditFormData({ ...editFormData, videos: updatedVideos });
          }}
          className="text-red-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={18}/>
        </button>
      </div>
    ))}
  </div>
  <button 
    onClick={() => setEditFormData({...editFormData, videos: [...editFormData.videos, {title: "", url: ""}]})}
    className="text-xs font-bold text-blue-600 mt-3 hover:underline flex items-center gap-1"
  >
    + Add More Video
  </button>
</div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={handleUpdateCourse} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">Save Changes</button>
                      <button onClick={() => setEditingId(null)} className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-6 items-center w-full">
                      <img src={course.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                      <div>
                        <h3 className="font-black text-lg text-slate-800">{course.title}</h3>
                        <p className="text-blue-600 font-black">৳ {course.price}</p>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">{course.videos?.length || 0} Lessons</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button onClick={() => { setEditingId(course._id); setEditFormData({ ...course }); }} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all"><Edit size={16}/> Edit</button>
                      <button onClick={() => handleDelete(course._id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16}/> Delete</button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
