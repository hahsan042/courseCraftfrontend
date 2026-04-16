// "use client";

// import Link from "next/link";

// export default function Hero() {
//   return (
//     <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
//       <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">
        
//         {/* Left Content */}
//         <div>
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//             Learn Skills That <br /> Build Your Future 🚀
//           </h1>

//           <p className="mt-4 text-lg text-gray-200">
//             উচ্চ মানের course দিয়ে আপনার skill বাড়ান এবং career grow করুন।
//           </p>

//           <div className="mt-6 flex gap-4">
//             <Link
//               href="/courses"
//               className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-200"
//             >
//               Browse Courses
//             </Link>

//             <Link
//               href="/register"
//               className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-600"
//             >
//               Get Started
//             </Link>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div>
//           <img
//             src="https://cdn.elearningindustry.com/wp-content/uploads/2021/07/shutterstock_1155561859.png"
//             alt="Learning"
//             className="w-full rounded-xl shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0c10] text-white">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 grid md:grid-cols-2 items-center gap-16">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            🚀 Next-Gen Learning Platform
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Learn Skills That <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Build Your Future
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
            উচ্চ মানের <span className="text-white font-medium">premium courses</span> দিয়ে আপনার ক্যারিয়ারকে নতুন উচ্চতায় নিয়ে যান। আজই শুরু করুন আপনার শেখার যাত্রা।
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              href="/courses"
              className="group relative px-8 py-4 bg-blue-600 rounded-full font-bold transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
            >
              Browse Courses
            </Link>

            <Link
              href="/register"
              className="px-8 py-4 border border-gray-700 rounded-full font-bold backdrop-blur-sm hover:bg-white hover:text-black transition-all"
            >
              Get Started
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-10 pt-10 border-t border-gray-800 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0c10] bg-gray-700"></div>
              ))}
            </div>
            <p>Join <span className="text-white font-semibold">10,000+</span> successful students</p>
          </div>
        </motion.div>

        {/* Right Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glassmorphism Card Overlay */}
          <div className="absolute -top-6 -left-6 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-10 hidden sm:block">
            <p className="text-xs text-blue-400 font-bold uppercase">Success Rate</p>
            <p className="text-2xl font-bold">98%</p>
          </div>

          <div className="relative z-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src="https://cdn.elearningindustry.com/wp-content/uploads/2021/07/shutterstock_1155561859.png"
              alt="Learning"
              className="relative w-full rounded-2xl shadow-2xl object-cover border border-white/10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}