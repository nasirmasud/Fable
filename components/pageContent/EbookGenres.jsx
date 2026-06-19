"use client";

import {
  ArrowRight,
  BookOpen,
  Compass,
  Ghost,
  Heart,
  Rocket,
  Search,
  ShieldAlert,
  Wand2
} from "lucide-react";
import Link from "next/link";

export default function EbookGenres() {
  const genres = [
    {
      id: 1,
      name: "Fiction",
      count: "2,512 Ebooks",
      icon: BookOpen,
      // লাইটে হালকা নীল, ডার্কে গ্লাসি ডার্ক-ব্লু টোন
      bgClass: "bg-[#f0f4ff] border-[#e0e8ff] dark:bg-[#0f112a] dark:border-blue-500/15",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100/60 dark:bg-blue-500/10",
    },
    {
      id: 2,
      name: "Mystery",
      count: "1,245 Ebooks",
      icon: Search,
      // লাইটে হালকা ইয়োলো/ক্রিম, ডার্কে গ্লাসি ডارک-অরেঞ্জ টোন
      bgClass: "bg-[#fdf7e7] border-[#fbeed0] dark:bg-[#161214] dark:border-amber-500/15",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100/60 dark:bg-amber-500/10",
    },
    {
      id: 3,
      name: "Romance",
      count: "1,876 Ebooks",
      icon: Heart,
      // লাইটে হালকা পিঙ্ক, ডার্কে গ্লাসি ডার্ক-রোজ টোন
      bgClass: "bg-[#fff0f5] border-[#ffe0eb] dark:bg-[#190e1a] dark:border-pink-500/15",
      iconColor: "text-pink-600 dark:text-pink-400",
      iconBg: "bg-pink-100/60 dark:bg-pink-500/10",
    },
    {
      id: 4,
      name: "Sci-Fi",
      count: "1,634 Ebooks",
      icon: Rocket,
      // লাইটে হালকা পার্পল, ডার্কে গ্লাসি ডার্ক-পার্পল টোন
      bgClass: "bg-[#f5f0ff] border-[#eae0ff] dark:bg-[#130d2e] dark:border-purple-500/15",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100/60 dark:bg-purple-500/10",
    },
    {
      id: 5,
      name: "Fantasy",
      count: "2,341 Ebooks",
      icon: Wand2,
      // লাইটে হালকা গ্রিন/মিন্ট, ডার্কে গ্লাসি ডার্ক-ইমারেল্ড টোন
      bgClass: "bg-[#effdf5] border-[#defbe9] dark:bg-[#0b161c] dark:border-emerald-500/15",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100/60 dark:bg-emerald-500/10",
    },
    {
      id: 6,
      name: "Horror",
      count: "987 Ebooks",
      icon: Ghost,
      // লাইটে হালকা অরেঞ্জ/ব্রাউন, ডার্কে গ্লাসি ডার্ক-অরেঞ্জ টোন
      bgClass: "bg-[#fef5ee] border-[#fde5d2] dark:bg-[#181114] dark:border-orange-500/15",
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100/60 dark:bg-orange-500/10",
    },
    {
      id: 7,
      name: "Thriller",
      count: "1,102 Ebooks",
      icon: ShieldAlert,
      // লাইটে হালকা টিল/সায়ান, ডার্কে গ্লাসি ডার্ক-ক্যারিবিয়ান টোন
      bgClass: "bg-[#eefcfc] border-[#daf7f7] dark:bg-[#0a1622] dark:border-cyan-500/15",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-100/60 dark:bg-cyan-500/10",
    },
    {
      id: 8,
      name: "Adventure",
      count: "1,523 Ebooks",
      icon: Compass,
      // লাইটে হালকা স্কাই ব্লু, ডার্কে গ্লাসি ডার্ক-স্কাই টোন
      bgClass: "bg-[#f0f9ff] border-[#e0f2fe] dark:bg-[#0c142e] dark:border-sky-500/15",
      iconColor: "text-sky-600 dark:text-sky-400",
      iconBg: "bg-sky-100/60 dark:bg-sky-500/10",
    },
  ];

  return (
    // মেইন ব্যাকগ্রাউন্ড: লাইট মোডে পিওর হোয়াইট, ডার্ক মোডে রিচ ডার্ক (#070314)
    <section className="w-full bg-white dark:bg-[#070314] py-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
      <div className="w-full mx-auto">

        {/* 📑 হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-[4px] h-7 bg-[#6344f5] rounded-full block" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white transition-colors">
                Ebook Genres
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-[15px] pl-[14px] transition-colors">
              Meet our ebooks by your favorite categories
            </p>
          </div>

          <Link
            href="/genres"
            className="flex items-center gap-1.5 text-base font-semibold text-[#6344f5] dark:text-purple-400 hover:text-[#5032e6] dark:hover:text-purple-300 transition-colors group pl-[14px] sm:pl-0"
          >
            View All
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 🗂️ গ্রিড লেআউট: মোবাইলে ১ কলাম, ছোট ডিভাইসে ২ কলাম, এবং ডেস্কটপে ৪ কলামে চমৎকারভাবে ফিট হবে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {genres.map((genre) => {
            const IconComponent = genre.icon;
            return (
              <div
                key={genre.id}
                className={`p-5 rounded-2xl border ${genre.bgClass} shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer group`}
              >
                {/* 🎨 আইকন র্যাপার (হালকা রাউন্ডেড ব্যাকগ্রাউন্ড সহ) */}
                <div className={`w-14 h-14 ${genre.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                  <IconComponent size={24} className={`${genre.iconColor}`} />
                </div>

                {/* 📝 টেক্সট ডিটেইলস (বড় এবং রিডঅ্যাবল সাইজ) */}
                <div>
                  <h3 className="text-lg font-bold text-[#1e293b] dark:text-slate-100 group-hover:text-[#6344f5] dark:group-hover:text-purple-400 transition-colors tracking-tight">
                    {genre.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                    {genre.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}