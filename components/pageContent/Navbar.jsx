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

  const isLoggedIn = false;

  const mockUser = {
    role: "Recruiter",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/browse" },
    { name: "Dashboard", href: "/dashboard" },
  ];

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

          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Fable Logo"
                width={34}
                height={34}
                priority
              />
              <span className="text-2xl font-sans font-bold tracking-tight bg-linear-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
                Fable
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-medium transition-all duration-200 relative py-2 ${isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white"}`}
                >
                  {link.name}
                  {isActive && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#7c3aed] rounded-full" />}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-14 h-7 bg-white/10 dark:bg-purple-950/40 rounded-full p-1 border border-white/10 dark:border-purple-500/20 flex items-center justify-between cursor-pointer transition-colors duration-300"
              >
                <div className={`absolute w-5 h-5 bg-linear-to-r from-[#6344f5] to-[#8a3ffc] rounded-full top-0.75 transition-all duration-300 flex items-center justify-center shadow-md ${theme === "dark" ? "left-7.75" : "left-1"}`}>
                  {theme === "dark" ? <Moon size={11} className="text-white fill-current" /> : <Sun size={11} className="text-white fill-current" />}
                </div>
                <Sun size={13} className={`ml-1 text-amber-400 ${theme === "light" ? "opacity-0" : "opacity-40"}`} />
                <Moon size={13} className={`mr-1 text-purple-300 ${theme === "dark" ? "opacity-0" : "opacity-40"}`} />
              </button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center space-x-4 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-purple-500/30">
                  <Image
                    src={mockUser.avatar}
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                <button
                  onClick={() => alert("Logout clicked")}
                  className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white px-5 py-2.5 rounded-lg border border-white/10 bg-white/2 hover:bg-white/6 transition-all duration-200">
                  Login
                </Link>
                <Link href="/signup" className="text-sm font-medium bg-linear-to-r from-[#6344f5] to-[#8a3ffc] hover:from-[#5032e6] hover:to-[#782ee6] text-white px-6 py-2.5 rounded-lg shadow-lg shadow-purple-500/15 font-sans tracking-wide transition-all duration-300 transform hover:-translate-y-px">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-400 hover:text-white cursor-pointer">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0d0724] border-b border-white/5">
          <div className="px-4 pt-2 pb-5 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-3 text-gray-400 hover:text-white">
                {link.name}
              </Link>
            ))}
            <div className="border-t border-white/5 pt-4 mt-4">
              {isLoggedIn && (
                <div className="flex items-center gap-3 p-3">
                  <Image src={mockUser.avatar} alt="User" width={36} height={36} className="rounded-full object-cover" />
                  <span className="text-xs text-purple-300 uppercase">{mockUser.role}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}