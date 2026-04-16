// "use client";

// const categories = [
//   "Web Development",
//   "Programming",
//   "App Development",
//   "UI/UX Design",
//   "Digital Marketing",
//   "Data Science",
// ];

// export default function Categories() {
//   return (
//     <section className="bg-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Heading */}
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold">Categories</h2>
//           <p className="text-gray-500 mt-2">
//             আপনার পছন্দের category বেছে নিন
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {categories.map((cat, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold">{cat}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Terminal, 
  Smartphone, 
  Palette, 
  Megaphone, 
  Database,
  ArrowRight 
} from "lucide-react"; // Install with: npm install lucide-react

const categories = [
  { name: "Web Development", icon: <Code2 className="w-8 h-8" />, color: "bg-blue-500", count: "45+ Courses" },
  { name: "Programming", icon: <Terminal className="w-8 h-8" />, color: "bg-purple-500", count: "30+ Courses" },
  { name: "App Development", icon: <Smartphone className="w-8 h-8" />, color: "bg-emerald-500", count: "20+ Courses" },
  { name: "UI/UX Design", icon: <Palette className="w-8 h-8" />, color: "bg-pink-500", count: "15+ Courses" },
  { name: "Digital Marketing", icon: <Megaphone className="w-8 h-8" />, color: "bg-orange-500", count: "25+ Courses" },
  { name: "Data Science", icon: <Database className="w-8 h-8" />, color: "bg-indigo-500", count: "12+ Courses" },
];

export default function Categories() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with a side-accent */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <div className="border-l-4 border-blue-600 pl-6">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
              Top Categories
            </h2>
            <p className="text-gray-500 mt-2 text-lg italic">
              আপনার পছন্দের <span className="text-blue-600 font-bold underline">category</span> বেছে নিন এবং শিখুন
            </p>
          </div>
          <button className="text-sm font-bold bg-gray-100 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
            View All Categories
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden bg-gray-50 p-8 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl"
            >
              {/* Floating Background Glow */}
              <div className={`absolute -right-4 -top-4 w-24 h-24 ${cat.color} opacity-[0.03] rounded-full group-hover:opacity-10 transition-opacity duration-500`}></div>

              <div className="flex items-start justify-between">
                <div className={`p-4 rounded-2xl ${cat.color} text-white shadow-lg shadow-${cat.color.split('-')[1]}-200`}>
                  {cat.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 font-medium">
                  {cat.count}
                </p>
              </div>

              {/* Bottom line decorative animation */}
              <div className="absolute bottom-0 left-0 h-1 bg-blue-600 w-0 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}