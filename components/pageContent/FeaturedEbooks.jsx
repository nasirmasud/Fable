"use client";

import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function FeaturedEbooks() {
  const featuredBooks = [
    {
      id: 1,
      title: "The Shadow Throne",
      author: "James Arlen",
      category: "Fantasy",
      rating: 4.8,
      price: "$4.99",
      cover: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Love in Paris",
      author: "Sophie Moore",
      category: "Romance",
      rating: 4.6,
      price: "$3.49",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Last Code",
      author: "Alex Mercer",
      category: "Sci-Fi",
      rating: 4.7,
      price: "$5.99",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Whispers in the Dark",
      author: "Emily Rhodes",
      category: "Mystery",
      rating: 4.5,
      price: "$3.99",
      cover: "https://images.unsplash.com/photo-1532012164546-f432f2c3edd0?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "The Dragon's Legacy",
      author: "Daniel Hart",
      category: "Fantasy",
      rating: 4.9,
      price: "$4.49",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Beyond the Horizon",
      author: "Olivia Bennett",
      category: "Adventure",
      rating: 4.6,
      price: "$3.49",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    // ⚡ মেইন ব্যাকগ্রাউন্ড: লাইট মোডে #f8fafc, ডার্ক মোডে নেভবারের মতো গভীর ডার্ক #070314
    <section className="w-full bg-[#f8fafc] dark:bg-[#070314] py-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
      <div className="w-full mx-auto">

        {/* 📑 হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-[4px] h-7 bg-[#6344f5] rounded-full block" />
              {/* ⚡ হেডিং কালার: লাইটে কালচে, ডার্কে পিওর হোয়াইট */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white transition-colors">
                Featured Ebooks
              </h2>
            </div>
            {/* ⚡ সাবটাইটেল কালার: ডার্কে একটু ব্রাইট গ্রে করা হলো */}
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base pl-[14px] transition-colors">
              Handpicked original ebooks just for you
            </p>
          </div>

          <Link
            href="/browse"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#6344f5] dark:text-purple-400 hover:text-[#5032e6] dark:hover:text-purple-300 transition-colors group pl-[14px] sm:pl-0"
          >
            View All
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 🗂️ ইবুক গ্রিড লেআউট */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-[#0d0724] rounded-2xl border border-gray-200/80 dark:border-purple-500/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-md dark:hover:border-purple-500/40 hover:border-purple-300 transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer"
            >
              {/* ১. বইয়ের কভার ইমেজ */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-purple-950/20">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* ২. বইয়ের ইনফরমেশন */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  {/* ⚡ টাইটেল কালার: লাইটে গাঢ় স্লেট, ডার্কে উজ্জ্বল স্লেট/হোয়াইট */}
                  <h3 className="text-base font-bold text-[#1e293b] dark:text-slate-100 line-clamp-1 mb-1.5 group-hover:text-[#6344f5] dark:group-hover:text-purple-400 transition-colors tracking-tight">
                    {book.title}
                  </h3>
                  {/* ⚡ অথর কালার */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium line-clamp-1 mb-1 transition-colors">
                    {book.author}
                  </p>
                  {/* ⚡ ক্যাটাগরি কালার: ডার্কে লাইট পার্পল ভাইব */}
                  <p className="text-xs font-semibold text-purple-600/85 dark:text-purple-400/90 uppercase tracking-wider text-[10px] transition-colors">
                    {book.category}
                  </p>
                </div>

                {/* ৩. রেটিং এবং প্রাইস */}
                {/* ⚡ বর্ডার কালার ডার্ক মোডের জন্য অ্যাডজাস্ট করা হয়েছে */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Star size={15} className="fill-[#f59e0b] text-[#f59e0b]" />
                    {/* ⚡ রেটিং টেক্সট কালার */}
                    <span className="text-sm font-bold text-[#334155] dark:text-slate-300 transition-colors">
                      {book.rating}
                    </span>
                  </div>

                  {/* ⚡ প্রাইস কালার: ডার্কে আরও ভাইব্রেন্ট পার্পল করা হলো */}
                  <span className="text-base font-extrabold text-[#6344f5] dark:text-purple-400 tracking-tight transition-colors">
                    {book.price}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}