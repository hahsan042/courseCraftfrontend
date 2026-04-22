"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, ShieldCheck, Wallet, Info, Loader2, Tag } from "lucide-react";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [trxId, setTrxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  // 💰 কোর্স ডাটা স্টেট
  const [course, setCourse] = useState<any>(null);
  const [fetchingCourse, setFetchingCourse] = useState(true);

  const bkashNumber = "01709082144";

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    
    // 🔍 কোর্সের ডিটেইলস (বিশেষ করে ফি) ফেচ করা
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/courses/${params.id}`);
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
        }
      } catch (err) {
        console.error("Course fetch error:", err);
      } finally {
        setFetchingCourse(false);
      }
    };

    if (params.id) fetchCourseDetails();
  }, [params.id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bkashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!token) {
  //     Swal.fire({
  //       title: "Login First!",
  //       text: "কোর্সটি কিনতে হলে আপনাকে আগে লগইন করতে হবে।",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#2563eb",
  //       cancelButtonColor: "#64748b",
  //       confirmButtonText: "Login Now",
  //       cancelButtonText: "Later",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         router.push("/login");
  //       }
  //     });
  //     return;
  //   }

  //   if (!trxId) {
  //     Swal.fire({
  //       title: "Transaction ID?",
  //       text: "অনুগ্রহ করে Transaction ID প্রদান করুন",
  //       icon: "info",
  //       confirmButtonColor: "#2563eb",
  //     });
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/transactions`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           courseId: params.id,
  //           transactionId: trxId,
  //         }),
  //       }
  //     );

  //     const data = await res.json();

  //     if (data.success) {
  //       Swal.fire({
  //         title: "Submitted! ✅",
  //         text: "আপনার পেমেন্ট রিকোয়েস্টটি গ্রহণ করা হয়েছে। ভেরিফিকেশনের পর কোর্সটি আনলক হবে।",
  //         icon: "success",
  //         confirmButtonColor: "#2563eb",
  //       });
  //       setTrxId("");
  //     } else {
  //       Swal.fire({
  //         title: "Failed!",
  //         text: data.message || "পেমেন্ট সাবমিট করতে সমস্যা হয়েছে।",
  //         icon: "error",
  //         confirmButtonColor: "#ef4444",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Checkout Error:", error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: "সার্ভার সমস্যা। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
  //       icon: "error",
  //       confirmButtonColor: "#ef4444",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ১. টোকেন চেক (লগইন আছে কি না)
    if (!token) {
      Swal.fire({
        title: "Login First!",
        text: "কোর্সটি কিনতে হলে আপনাকে আগে লগইন করতে হবে।",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Login Now",
        cancelButtonText: "Later",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }

    // ২. TrxID চেক
    if (!trxId) {
      Swal.fire({
        title: "Transaction ID?",
        text: "অনুগ্রহ করে Transaction ID প্রদান করুন",
        icon: "info",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setLoading(true);

    try {
      // ৩. ব্যাকএন্ডে ডেটা পাঠানো
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_URI}/api/v2/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: params.id,
            transactionId: trxId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // ৪. সফল হলে ড্যাশবোর্ডে পাঠানো
        Swal.fire({
          title: "Submitted! ✅",
          text: "আপনার পেমেন্ট রিকোয়েস্টটি গ্রহণ করা হয়েছে। ভেরিফিকেশনের পর কোর্সটি আনলক হবে।",
          icon: "success",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          setTrxId("");
          router.push("/dashboard"); // এখানে রিডাইরেক্ট হবে
        });
      } else {
        // ৫. কোনো এরর থাকলে (যেমন: ডুপ্লিকেট TrxID)
        Swal.fire({
          title: "Failed!",
          text: data.message || "পেমেন্ট সাবমিট করতে সমস্যা হয়েছে।",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      Swal.fire({
        title: "Error!",
        text: "সার্ভার সমস্যা। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Checkout <span className="text-blue-600">Securely</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
                {course ? `You are buying: ${course.title}` : "কোর্সটি শুরু করতে নিচের ধাপগুলো সম্পন্ন করুন।"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full border border-green-100 self-start md:self-center">
            <ShieldCheck size={20} />
            <span className="text-sm uppercase tracking-wider">SSL Encrypted</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Instructions Card */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="bg-white px-6 py-10 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden"
            >
              {/* 💰 ডাইনামিক প্রাইজ ট্যাগ */}
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl font-black text-lg shadow-lg">
                {fetchingCourse ? "..." : `৳ ${course?.price}`}
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-[#D12053] p-3 rounded-2xl shadow-lg shadow-pink-100">
                    <Wallet className="text-white" size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">bKash Personal Payment</h2>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                {[
                  { step: "01", text: "আপনার বিকাশ অ্যাপে গিয়ে ", bold: "Send Money", normal: " অপশনটি সিলেক্ট করুন।" },
                  { step: "02", text: `নিচের নম্বরটি প্রাপক হিসেবে দিন (৳ ${course?.price || "---"} টাকা):`, isNumber: true },
                  { step: "03", text: "পিন দিয়ে ট্রানজেকশনটি সম্পন্ন করুন।" },
                  { step: "04", text: "পেমেন্ট সফল হলে প্রাপ্ত ", bold: "Transaction ID (TrxID)", normal: " টি কপি করে নিন।" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    <div className="flex-1">
                      <p className="text-slate-600 leading-relaxed font-medium">
                        {item.text} <span className="font-bold text-slate-900">{item.bold}</span>{item.normal}
                      </p>
                      {item.isNumber && (
                        <div className="mt-3 flex items-center justify-between bg-slate-50 border-2 border-dashed border-slate-200 p-4 rounded-2xl group transition-all hover:border-blue-400">
                          <span className="text-xl md:text-2xl font-black text-slate-800 tracking-wider">{bkashNumber}</span>
                          <button 
                            onClick={copyToClipboard}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'}`}
                          >
                            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                            {copied ? "Copied" : "Copy"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex gap-4 items-center">
              <Info className="text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-900 font-medium leading-snug">
                পেমেন্ট সংক্রান্ত কোনো সমস্যা হলে সরাসরি কল করুন: <span className="font-bold">01709082144</span>
              </p>
            </div>
          </div>

          {/* RIGHT: Input Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-slate-100 lg:sticky lg:top-10"
          >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Confirm Order</h3>
                <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-black">
                    <Tag size={14}/>
                    ৳ {course?.price}
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Enter Transaction ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. 9A8BC12345"
                    disabled={loading}
                    className="w-full bg-slate-50 border-2 border-slate-100 px-5 py-4 rounded-2xl text-lg font-bold placeholder:text-slate-300 focus:border-blue-500 focus:bg-white transition-all outline-none disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  token ? "Confirm Purchase" : "Login to Purchase"
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="text-blue-600 font-black text-lg">৳ {course?.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Course Duration</span>
                <span className="text-slate-900 font-bold">Lifetime Access</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}