"use client";

import { BookOpen, DollarSign, PenTool, Users } from "lucide-react";

export default function StatsBanner() {
  const stats = [
    {
      id: 1,
      value: "10,000+",
      label: "Ebooks Available",
      icon: BookOpen,
    },
    {
      id: 2,
      value: "2,000+",
      label: "Talented Writers",
      icon: PenTool,
    },
    {
      id: 3,
      value: "8,000+",
      label: "Happy Readers",
      icon: Users,
    },
    {
      id: 4,
      value: "$250K+",
      label: "Paid to Writers",
      icon: DollarSign,
    },
  ];

  return (
    // মেইন সেকশন র্যাপার: লাইটে ব্যাকগ্রাউন্ড সাদা, ডার্কে রিচ ডার্ক #070314
    <section className="w-full bg-white dark:bg-[#070314] py-32 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
      <div className="w-full mx-auto">

        {/* 🎨 পার্পল গ্রেডিয়েন্ট ব্যানার কন্টেইনার */}
        <div className="relative w-full bg-gradient-to-r from-[#5032e6] via-[#6344f5] to-[#8a3ffc] rounded-3xl p-8 md:p-10 lg:p-12 shadow-xl shadow-purple-500/10 overflow-hidden group">

          {/* 🌌 ব্যাকগ্রাউন্ড গ্লাসি ওয়াটারমার্ক ইফেক্ট (স্ক্রিনশটের মতো কোণার হালকা শেড) */}
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-all duration-500" />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* 🗂️ গ্রিড লেআউট: মোবাইলে ২ কলাম, ডেস্কটপে ৪ কলামে চমৎকারভাবে ডিভাইড হবে */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-6 relative z-10">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.id}
                  // ⚡ ডাইনামিক বর্ডার: শেষ আইটেম ছাড়া বাকিগুলোর ডানপাশে ডেস্কটপে বর্ডার দেখাবে (স্ক্রিনশটের মতো ডিভাইডার)
                  className={`flex flex-col items-center text-center px-2 transition-transform duration-300 hover:scale-105 ${index !== stats.length - 1
                    ? "lg:border-r lg:border-white/15"
                    : ""
                    }`}
                >
                  {/* ১. আইকন (সাদা এবং হালকা অপাসিটি ব্যাকগ্রাউন্ড সহ) */}
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 border border-white/5 text-white">
                    <IconComponent size={22} className="stroke-[2.2]" />
                  </div>

                  {/* ২. কাউন্টার ভ্যালু (বড় এবং বোল্ড টেক্সট) */}
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight font-sans">
                    {stat.value}
                  </h3>

                  {/* ৩. লেবেল টেক্সট (স্পষ্ট ও রিডঅ্যাবল) */}
                  <p className="text-sm md:text-[15px] font-medium text-purple-100/85 mt-1.5 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}