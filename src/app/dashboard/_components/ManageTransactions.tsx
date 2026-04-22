"use client";

import { useState, useEffect } from "react";
import { Search, CheckCircle, XCircle, Clock, Hash, BookOpen, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

export default function ManageTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${BASE_URL}/api/v2/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setTransactions(data.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const isVerify = status === "verified";
    
    const result = await Swal.fire({
      title: isVerify ? "পেমেন্ট কি ভেরিফাই করবেন?" : "পেমেন্ট কি রিজেক্ট করবেন?",
      text: `আপনি কি নিশ্চিতভাবে এই ট্রানজেকশনটি ${isVerify ? "Verified" : "Rejected"} করতে চান?`,
      icon: isVerify ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: isVerify ? "#10b981" : "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: isVerify ? "হ্যাঁ, ভেরিফাই করুন" : "হ্যাঁ, রিজেক্ট করুন",
      cancelButtonText: "বাতিল"
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({ title: "প্রসেসিং...", didOpen: () => Swal.showLoading(), allowOutsideClick: false });
        
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/v2/transactions/${id}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify({ status }),
        });
        
        const data = await res.json();
        
        if (data.success) {
          Swal.fire({ 
            icon: "success", 
            title: isVerify ? "ভেরিফাই সফল!" : "রিজেক্ট সফল!", 
            timer: 1500, 
            showConfirmButton: false 
          });
          fetchTransactions(); // UI আপডেট করার জন্য ডাটা আবার লোড করবে
        } else {
          Swal.fire("Error!", data.message || "আপডেট করা সম্ভব হয়নি", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না", "error");
      }
    }
  };

  const filtered = transactions.filter(tx => 
    tx.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tx.courseId?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Payment Ledger</h2>
          <p className="text-slate-400 font-medium text-sm mt-1">Review and manage student enrollments</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search TrxID or Course..." 
            className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl outline-none ring-2 ring-transparent focus:ring-blue-500/10 transition-all font-medium text-slate-600"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-2xl border border-slate-50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase tracking-[0.15em] font-black">
              <th className="p-5 flex items-center gap-2"><BookOpen size={14}/> Course</th>
              <th className="p-5"><Banknote size={14} className="inline mr-1"/> Amount</th>
              <th className="p-5"><Hash size={14} className="inline mr-1"/> Transaction ID</th>
              <th className="p-5"><Clock size={14} className="inline mr-1"/> Status</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={5} className="p-10 text-center text-slate-400 font-bold animate-pulse">ডাটা লোড হচ্ছে...</td></tr>
            ) : filtered.length > 0 ? (
              filtered.map((tx) => (
                <tr key={tx._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 font-bold text-slate-800">{tx.courseId?.title || "N/A"}</td>
                  <td className="p-5 font-black text-slate-900">৳ {tx.courseId?.price || 0}</td>
                  <td className="p-5 font-mono text-sm text-blue-600 font-semibold">{tx.transactionId}</td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      tx.status === 'verified' 
                        ? 'bg-green-100 text-green-600 border border-green-200' 
                        : tx.status === 'rejected'
                        ? 'bg-red-100 text-red-600 border border-red-200'
                        : 'bg-amber-100 text-amber-600 border border-amber-200'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-5 flex justify-center gap-3">
                    {tx.status !== 'verified' && (
                      <button 
                        onClick={() => updateStatus(tx._id, "verified")} 
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all active:scale-90"
                        title="Verify"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    {tx.status !== 'rejected' && (
                      <button 
                        onClick={() => updateStatus(tx._id, "rejected")} 
                        className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all active:scale-90"
                        title="Reject"
                      >
                        <XCircle size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-10 text-center text-slate-400 font-medium">কোন ডাটা পাওয়া যায়নি।</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}