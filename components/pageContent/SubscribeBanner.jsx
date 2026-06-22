"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import FloatingParticles from "../tools/FloatingParticles";

export default function SubscribeBanner() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden w-full bg-white dark:bg-[#070314] pt-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="w-full mx-auto">

        <div className="w-full bg-[#0b061f] dark:bg-[#090518] rounded-t-3xl rounded-b-none p-6 md:p-8 lg:p-10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">

          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#6344f5]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 text-center sm:text-left relative z-10 max-w-xl">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-purple-300 shrink-0 shadow-inner">
              <Mail size={26} className="stroke-[1.8]" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1.5">
                Stay in the Loop
              </h3>
              <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed">
                Subscribe to get the latest ebooks, offers and updates delivered to your inbox.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-120 flex flex-col gap-2 relative z-10 shrink-0">
            <form onSubmit={handleSubmit} className="w-full flex flex-row items-center gap-3">

              <div className="grow">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-[15px] px-5 py-3.5 rounded-xl focus:outline-none focus:border-[#6344f5] focus:ring-2 focus:ring-[#6344f5]/20 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="bg-liner-to-r from-[#6344f5] to-[#8a3ffc] hover:from-[#5032e6] hover:to-[#7c32eb] text-white font-bold text-[15px] px-7 py-3.5 rounded-xl shadow-lg shadow-purple-600/20 active:scale-[0.98] transition-all duration-300 cursor-pointer text-center whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <span className="text-xs text-gray-500 pl-1 hidden sm:block">
              No spam, unsubscribe anytime.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}