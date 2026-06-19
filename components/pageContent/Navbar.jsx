"use client";

import { LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // 🧪 টেস্ট করার জন্য বুনিয়ান ভ্যারিয়েবল (প্রোফাইল বাটন দেখতে চাইলে true করে দিন)
  const isLoggedIn = false;

  const mockUser = {
    role: "Recruiter",
    // ডামি প্রোফাইল পিকচার। ডাটাবেজ কানেক্ট করলে আপনার ইউজার অবজেক্টের ইমেজ লিংক বসিয়ে দেবেন
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/browse" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  // ⚡ সমাধান ১: লিন্টার এরর এড়াতে setTimeout ট্রিক ব্যবহার করা হলো
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="w-full bg-[#070314] dark:bg-[#070314] text-white border-b border-white/5 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 transition-colors duration-300">
      <div className="w-full px-6 md:px-10 lg:px-16 mx-auto">
        <div className="flex items-center justify-between h-20">

          {/* ১. লোগো সেকশন */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Fable Logo"
                width={34}
                height={34}
                priority
              />
              <span className="text-2xl font-sans font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
                Fable
              </span>
            </Link>
          </div>

          {/* ২. ডেস্কটপ নেভিগেশন লিংকসমূহ */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-medium transition-all duration-200 relative py-2 ${isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#7c3aed] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ৩. ডেস্কটপ ডানদিকের অংশ */}
          <div className="hidden md:flex items-center space-x-6">

            {/* 🌗 থিম টগল ক্যাপসুল সুইচ (স্ক্রিনশটের হুবহু ডিজাইন) */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-14 h-7 bg-white/10 dark:bg-purple-950/40 rounded-full p-1 border border-white/10 dark:border-purple-500/20 flex items-center justify-between cursor-pointer transition-colors duration-300"
                title="Toggle Theme"
              >
                {/* স্লাইডিং বাটন */}
                <div
                  className={`absolute w-5 h-5 bg-gradient-to-r from-[#6344f5] to-[#8a3ffc] rounded-full top-[3px] transition-all duration-300 flex items-center justify-center shadow-md ${theme === "dark" ? "left-[31px]" : "left-[4px]"
                    }`}
                >
                  {theme === "dark" ? (
                    <Moon size={11} className="text-white fill-current" />
                  ) : (
                    <Sun size={11} className="text-white fill-current" />
                  )}
                </div>
                <Sun size={13} className={`ml-1 text-amber-400 ${theme === "light" ? "opacity-0" : "opacity-40"}`} />
                <Moon size={13} className={`mr-1 text-purple-300 ${theme === "dark" ? "opacity-0" : "opacity-40"}`} />
              </button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center space-x-4 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
                {/* 👤 ইউজারের নাম সরিয়ে ইমেজ এবং ছোট রোল ব্যাজ দেওয়া হয়েছে */}
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-purple-500/30">
                  <img
                    src={mockUser.avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-semibold tracking-wide uppercase">
                    {mockUser.role}
                  </span>
                </div>

                <button
                  onClick={() => alert("Logout clicked")}
                  className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-200 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white px-5 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-200"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="text-sm font-medium bg-gradient-to-r from-[#6344f5] to-[#8a3ffc] hover:from-[#5032e6] hover:to-[#782ee6] text-white px-6 py-2.5 rounded-lg shadow-lg shadow-purple-500/15 font-sans tracking-wide transition-all duration-300 transform hover:-translate-y-[1px]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* ৪. মোবাইল হ্যামবার্গার ও থিম সেকশন */}
          <div className="flex md:hidden items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-400 p-2 bg-white/5 rounded-full"
              >
                {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* 📱 মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="md:hidden bg-[#0d0724] border-b border-white/5 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-2 pb-5 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${isActive ? "bg-white/10 text-white font-bold" : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="border-t border-white/5 pt-4 mt-4">
              {isLoggedIn ? (
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={mockUser.avatar}
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                    />
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-medium uppercase">
                      {mockUser.role}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 px-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 rounded-md text-sm font-medium text-gray-300 border border-white/10 bg-white/[0.02]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2.5 bg-gradient-to-r from-[#6344f5] to-[#8a3ffc] rounded-md text-sm font-medium text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}