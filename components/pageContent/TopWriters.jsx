"use client";

import { FadeLeft, StaggerContainer, StaggerItem } from "@/components/tools/MotionWrapper";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FloatingParticles from "../tools/FloatingParticles";

const writers = [
  {
    id: 1,
    name: "James Arlen",
    sales: "120+ Sales",
    bio: "Fantasy writer with a passion for world-building and epic storytelling.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
    bgClass: "bg-[#f3f0ff] border-[#e9e3ff] dark:bg-[#130d2e] dark:border-purple-500/15",
    badgeColor: "text-[#6344f5]",
  },
  {
    id: 2,
    name: "Sophie Moore",
    sales: "98+ Sales",
    bio: "Romance author who writes from the heart and for the heart.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    bgClass: "bg-[#fdf8e6] border-[#fbf1cf] dark:bg-[#181316] dark:border-amber-500/15",
    badgeColor: "text-[#8a3ffc]",
  },
  {
    id: 3,
    name: "Daniel Hart",
    sales: "85+ Sales",
    bio: "Fantasy & adventure writer with a love for magic and mystery.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    bgClass: "bg-[#f0f7ff] border-[#e0effe] dark:bg-[#0d1536] dark:border-blue-500/15",
    badgeColor: "text-[#6344f5]",
  },
];

export default function TopWriters() {
  return (
    <section className="relative overflow-hidden w-full bg-white dark:bg-[#070314] py-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="w-full mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <FadeLeft>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-1 h-7 bg-[#6344f5] rounded-full block" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white transition-colors">
                Top Writers
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-[15px] pl-3.5 transition-colors">
              Meet our most popular writers
            </p>
          </FadeLeft>

          <Link
            href="/writers"
            className="flex items-center gap-1.5 text-base font-semibold text-[#6344f5] dark:text-purple-400 hover:text-[#5032e6] dark:hover:text-purple-300 transition-colors group pl-3.5 sm:pl-0"
          >
            View All
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {writers.map((writer) => (
            <StaggerItem key={writer.id}>
              <div className={`p-6 md:p-7 rounded-2xl border ${writer.bgClass} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-start group h-full`}>
                <div className="w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-white dark:border-white/10 shadow-sm shrink-0">
                      <Image
                        src={writer.avatar}
                        alt={writer.name}
                        fill
                        sizes="150px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="text-xl font-bold text-[#1e293b] dark:text-slate-100 tracking-tight transition-colors">
                          {writer.name}
                        </h3>
                        <CheckCircle2 size={18} className={`${writer.badgeColor} fill-current dark:text-purple-400`} />
                      </div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {writer.sales}
                      </p>
                    </div>
                  </div>
                  <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                    {writer.bio}
                  </p>
                </div>
                <button className="text-[15px] font-bold text-[#6344f5] dark:text-purple-400 bg-white dark:bg-white/5 border border-purple-100 dark:border-white/5 px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#6344f5] hover:text-white dark:hover:bg-[#6344f5] dark:hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer w-full sm:w-auto text-center">
                  View Profile
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}