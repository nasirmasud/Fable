"use client";

import { ArrowRight, Quote, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ReadersFeedback() {
  // ইন্ডিকেটর ডট টেস্ট করার জন্য লোকাল স্টেট (আপাতত ১ নম্বর ডট অ্যাক্টিভ)
  const [activeDot, setActiveDot] = useState(0);

  const feedbacks = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Fable has completely changed the way I read. The collection is amazing and I found my favorite author here!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "David Wilson",
      rating: 5,
      text: "A fantastic platform for both readers and writers. The interface is beautiful and easy to use.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Emily Carter",
      rating: 5,
      text: "I published my first ebook on Fable and the support has been incredible. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    // মেইন সেকশন ব্যাকগ্রাউন্ড: লাইটে হোয়াইট, ডার্ক মোডে রিচ ডার্ক (#070314)
    <section className="w-full bg-white dark:bg-[#070314] py-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
      <div className="w-full mx-auto">

        {/* 📑 হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white transition-colors">
              What Readers Say
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-[15px] mt-2 transition-colors">
              Join thousands of happy readers
            </p>
          </div>

          <Link
            href="/feedbacks"
            className="flex items-center gap-1.5 text-base font-semibold text-[#6344f5] dark:text-purple-400 hover:text-[#5032e6] dark:hover:text-purple-300 transition-colors group"
          >
            View All
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 🗂️ কার্ড গ্রিড: মোবাইলে ১ কলাম, ডেস্কটপে ৩ কলাম */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {feedbacks.map((item) => (
            <div
              key={item.id}
              // লাইট মোডে হালকা সফট অফ-হোয়াইট ব্যাকগ্রাউন্ড, ডার্ক মোডে গ্লাসি নেভি-ব্ল্যাক
              className="p-6 md:p-8 rounded-2xl bg-[#f8fafc] dark:bg-[#0d0821] border border-slate-100 dark:border-purple-500/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-start group relative"
            >

              {/* কোটেশন মার্ক আইকন (স্ক্রিনশটের মতো বাম পাশে পজিশনড) */}
              <div className="text-[#6344f5] dark:text-purple-400 mb-4 opacity-80">
                <Quote size={28} className="fill-current transform rotate-180" />
              </div>

              {/* ফিডব্যাক টেক্সট (বড় এবং রিডঅ্যাবল সাইজ) */}
              <p className="text-[15px] md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6 flex-grow">
                {item.text}
              </p>

              {/* ইউজার ইনফো ও রেটিং স্টার */}
              <div className="flex items-center gap-4 mt-auto">
                {/* প্রোফাইল ইমেজ */}
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 shadow-inner flex-shrink-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* নাম এবং ৫ স্টার রেটিং */}
                <div>
                  <h3 className="text-base font-bold text-[#1e293b] dark:text-slate-100 tracking-tight transition-colors">
                    {item.name}
                  </h3>

                  {/* ৫টি গোল্ডেন স্টার জেনারেট করা হলো */}
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 🔘 ক্যারোসেল ডট ইন্ডিকেটর (স্ক্রিনশটের হুবহু ডিজাইন) */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setActiveDot(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeDot === index
                ? "w-7 bg-[#6344f5] dark:bg-purple-500" // অ্যাক্টিভ ডটটি একটু চওড়া (Capsule shape)
                : "w-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}