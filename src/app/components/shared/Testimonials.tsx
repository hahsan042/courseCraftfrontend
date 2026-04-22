// "use client";

// import { motion } from "framer-motion";
// import { Quote, Star } from "lucide-react";

// const testimonials = [
//   { name: "Tanvir Ahmed", text: "এই কোর্সটি আমার লাইফ চেঞ্জ করে দিয়েছে। মেন্টর সাপোর্ট জাস্ট অসাম!" },
//   { name: "Sadiya Islam", text: "খুবই সহজ ভাষায় জটিল বিষয়গুলো বোঝানো হয়েছে। বিগিনারদের জন্য সেরা।" },

//   { 
//     name: "Siam Ahmed", 
//     text: " ডলারে কেনা কোর্সগুলো এত কম টাকায় পাবো ভাবিনি। ভিডিও কোয়ালিটি একদম অরিজিনাল আর সব রিসোর্স ফাইলও পেয়েছি। সেরা ডিল!" 
//   },
//   { 
//     name: "Rifat Chowdhury", 
//     text: "সেলার ভাই অনেক হেল্পফুল। পেমেন্ট করার ২ মিনিটের মধ্যেই  এক্সেস পেয়ে গেছি। কোনো ঝামেলা ছাড়াই কোর্স শুরু করতে পেরেছি।" 
//   },
//   { 
//     name: "Mst. Afrin", 
//     text: "বিদেশি মেন্টরদের প্রিমিয়াম কোর্সগুলো ডিরেক্ট কেনা আমাদের জন্য কঠিন ছিল। এই প্ল্যাটফর্মের কারণে অনেক দামী দামী স্কিল শিখতে পারছি। ধন্যবাদ!" 
//   },
//   { 
//     name: "Kamrul Hasan", 
//     text: "প্রথমে একটু ভয় পাচ্ছিলাম টাকা মেরে দেয় কি না, কিন্তু ইনবক্সে কথা বলে বুঝলাম সেলার অনেক জেনুইন। সার্ভিস নিয়ে কোনো সন্দেহ নেই।" 
//   },
//   { 
//     name: "Nabil Ashfaq", 
//     text: "কোর্সগুলো একদম সাজানো গোছানো। অনেক জায়গায় ফেইক ফাইল দেয়, কিন্তু এখানে সব ফুল কোর্স পেয়েছি। লাইফটাইম আপডেটের সিস্টেমটা দারুন।" 
//   },
//   { 
//     name: "Tasnia Rahman", 
//     text: "বিকাশে পেমেন্ট করে এত সহজে বিদেশি কোর্স পাওয়া যাবে আগে জানতাম না। যারা কম বাজেটে ভালো কিছু শিখতে চান, তারা চোখ বন্ধ করে নিতে পারেন।" 
//   },
//   { 
//     name: "Farhan Tanvir", 
//     text: "মার্কেটপ্লেসে অনেক সেলার আছে, কিন্তু আপনার সাপোর্ট আর কোর্সের কালেকশন এক কথায় অসাধারণ। নেক্সট টাইম আবার কিনবো ইনশাআল্লাহ।" 
//   },
//   { name: "Nabil Mahmud", text: "এত কম দামে এত কোয়ালিটি কন্টেন্ট সত্যি অবিশ্বাস্য! ধন্যবাদ সবাইকে।" },
//   { name: "Ibraheem Khalil", text: "অনলাইনে অনেক কোর্স দেখেছি, কিন্তু এখানে মেন্টর নিজেই রিয়েল ওয়ার্ল্ড প্রজেক্ট করে দেখান। সেলার একদম জেনুইন!" },
//   { name: "Fahim Shahriar", text: "ভেবেছিলাম কম দামে অরিজিনাল হবে না। কিন্তু কেনার পর দেখলাম লেটেস্ট আপডেট সহ সব আছে। জাস্ট ওয়াও!" },
//   { name: "Mehedi Hasan", text: "বিদেশি প্রিমিয়াম কোর্সগুলো ডলারে কেনা সম্ভব ছিল না। ভাইয়ের জন্য কম টাকায় শিখতে পারছি।" },
//   { name: "Sumaiya Jahan", text: "একাধিক ডিভাইসে লগইন সমস্যা ইনবক্স করার সাথে সাথেই সলভ করে দিয়েছে। কোনো কমপ্লেইন নেই।" },
//   { name: "Ariful Islam", text: "সেলার খুবই প্রোফেশনাল এবং রেসপন্স অনেক ফাস্ট। ভিডিও কোয়ালিটি ভালো এবং সব সাজানো ছিল।" },
//   { name: "Joyanta Kumar", text: "মার্কেটপ্লেসে টাকা নষ্ট না করে এখান থেকে প্রিমিয়াম কোর্স নেওয়া অনেক বুদ্ধিমানের কাজ।" },
//   { name: "Nusrat Faria", text: "ইউডেমি বা কোর্সেরার কোর্সগুলো পাওয়া স্বপ্ন ছিল। মেটেরিয়ালস গুলো একদম সাজানো। ধন্যবাদ ভাইয়া!" }
// ];

// export default function Testimonials() {
//   const marqueeItems = [...testimonials, ...testimonials];

//   return (
//     <section className="bg-white py-20 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
//             What Our <span className="text-blue-600">Students</span> Say
//           </h2>
//           <div className="flex items-center justify-center gap-1 text-yellow-500">
//             {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
//             <span className="ml-2 text-slate-400 font-bold text-sm tracking-tighter">TRUSTED BY 10K+</span>
//           </div>
//         </div>

//         {/* Marquee Container */}
//         <div className="relative flex overflow-x-hidden group">
//           <motion.div
//             animate={{ x: ["0%", "-50%"] }}
//             transition={{
//               ease: "linear",
//               duration: 60, // 👈 এখানে ৬০ দিয়েছি, যা খুব স্মুথ এবং ধীরগতিতে চলবে
//               repeat: Infinity,
//             }}
//             // মাউস রাখলে স্ক্রলিং থেমে যাবে, পড়ার সুবিধার জন্য
//             whileHover={{ animationPlayState: "paused" }} 
//             className="flex gap-6 py-4"
//           >
//             {marqueeItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="w-[300px] md:w-[380px] shrink-0 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-300"
//               >
//                 <Quote className="text-blue-600/20 mb-4" size={32} />
                
//                 <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6 whitespace-normal">
//                   "{item.text}"
//                 </p>

//                 <div className="pt-4 border-t border-slate-200/60">
//                   <h3 className="font-black text-slate-900 text-base">{item.name}</h3>
//                   <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Verified Student</span>
//                 </div>
//               </div>
//             ))}
//           </motion.div>

//           {/* Fade Effects - দুই পাশের ঝাপসা ভাব */}
//           <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
//           <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "Tanvir Ahmed", text: "এই কোর্সটি আমার লাইফ চেঞ্জ করে দিয়েছে। মেন্টর সাপোর্ট জাস্ট অসাম!" },
  { name: "Sadiya Islam", text: "খুবই সহজ ভাষায় জটিল বিষয়গুলো বোঝানো হয়েছে। বিগিনারদের জন্য সেরা।" },
  { name: "Siam Ahmed", text: "ডলারে কেনা কোর্সগুলো এত কম টাকায় পাবো ভাবিনি। ভিডিও কোয়ালিটি একদম অরিজিনাল আর সব রিসোর্স ফাইলও পেয়েছি। সেরা ডিল!" },
  { name: "Rifat Chowdhury", text: "সেলার ভাই অনেক হেল্পফুল। পেমেন্ট করার ২ মিনিটের মধ্যেই এক্সেস পেয়ে গেছি। কোনো ঝামেলা ছাড়াই কোর্স শুরু করতে পেরেছি।" },
  { name: "Mst. Afrin", text: "বিদেশি মেন্টরদের প্রিমিয়াম কোর্সগুলো ডিরেক্ট কেনা আমাদের জন্য কঠিন ছিল। এই প্ল্যাটফর্মের কারণে অনেক দামী দামী স্কিল শিখতে পারছি। ধন্যবাদ!" },
  { name: "Kamrul Hasan", text: "প্রথমে একটু ভয় পাচ্ছিলাম টাকা মেরে দেয় কি না, কিন্তু ইনবক্সে কথা বলে বুঝলাম সেলার অনেক জেনুইন। সার্ভিস নিয়ে কোনো সন্দেহ নেই।" },
  { name: "Nabil Ashfaq", text: "কোর্সগুলো একদম সাজানো গোছানো। অনেক জায়গায় ফেইক ফাইল দেয়, কিন্তু এখানে সব ফুল কোর্স পেয়েছি। লাইফটাইম আপডেটের সিস্টেমটা দারুন।" },
  { name: "Tasnia Rahman", text: "বিকাশে পেমেন্ট করে এত সহজে বিদেশি কোর্স পাওয়া যাবে আগে জানতাম না। যারা কম বাজেটে ভালো কিছু শিখতে চান, তারা চোখ বন্ধ করে নিতে পারেন।" },
  { name: "Farhan Tanvir", text: "মার্কেটপ্লেসে অনেক সেলার আছে, কিন্তু আপনার সাপোর্ট আর কোর্সের কালেকশন এক কথায় অসাধারণ। নেক্সট টাইম আবার কিনবো ইনশাআল্লাহ।" },
  { name: "Nabil Mahmud", text: "এত কম দামে এত কোয়ালিটি কন্টেন্ট সত্যি অবিশ্বাস্য! ধন্যবাদ সবাইকে।" },
  { name: "Ibraheem Khalil", text: "অনলাইনে অনেক কোর্স দেখেছি, কিন্তু এখানে মেন্টর নিজেই রিয়েল ওয়ার্ল্ড প্রজেক্ট করে দেখান। সেলার একদম জেনুইন!" },
  { name: "Fahim Shahriar", text: "ভেবেছিলাম কম দামে অরিজিনাল হবে না। কিন্তু কেনার পর দেখলাম লেটেস্ট আপডেট সহ সব আছে। জাস্ট ওয়াও!" },
  { name: "Mehedi Hasan", text: "বিদেশি প্রিমিয়াম কোর্সগুলো ডলারে কেনা সম্ভব ছিল না। ভাইয়ের জন্য কম টাকায় শিখতে পারছি।" },
  { name: "Sumaiya Jahan", text: "একাধিক ডিভাইসে লগইন সমস্যা ইনবক্স করার সাথে সাথেই সলভ করে দিয়েছে। কোনো কমপ্লেইন নেই।" },
  { name: "Ariful Islam", text: "সেলার খুবই প্রোফেশনাল এবং রেসপন্স অনেক ফাস্ট। ভিডিও কোয়ালিটি ভালো এবং সব সাজানো ছিল।" },
  { name: "Joyanta Kumar", text: "মার্কেটপ্লেসে টাকা নষ্ট না করে এখান থেকে প্রিমিয়াম কোর্স নেওয়া অনেক বুদ্ধিমানের কাজ।" },
  { name: "Nusrat Faria", text: "ইউডেমি বা কোর্সেরার কোর্সগুলো পাওয়া স্বপ্ন ছিল। মেটেরিয়ালস গুলো একদম সাজানো। ধন্যবাদ ভাইয়া!" }
];

export default function Testimonials() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
            What Our <span className="text-blue-600">Students</span> Say
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-yellow-500">
            <div className="flex gap-0.5">
               {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-slate-400 font-bold text-[10px] md:text-sm tracking-widest uppercase">
              TRUSTED BY 10K+ STUDENTS
            </span>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 50, // মোবাইলে ৫০ সেকেন্ড দিলে মুভমেন্ট বেশি স্মুথ মনে হয়
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }} 
            className="flex gap-4 md:gap-6 py-4"
          >
            {marqueeItems.map((item, index) => (
              <div
                key={index}
                className="w-[280px] md:w-[380px] shrink-0 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Quote className="text-blue-600/20 mb-3 md:mb-4" size={24} />
                
                <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed mb-5 md:mb-6 whitespace-normal line-clamp-4 md:line-clamp-none">
                  "{item.text}"
                </p>

                <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm md:text-base">{item.name}</h3>
                    <span className="text-[9px] md:text-[10px] font-bold text-blue-500 uppercase tracking-widest block">Verified Student</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Fade Effects - মোবাইলে উইডথ কমানো হয়েছে যাতে কার্ড ঢাকা না পড়ে */}
          <div className="absolute top-0 left-0 h-full w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}