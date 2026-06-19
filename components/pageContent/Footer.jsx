"use client";

import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#060213] text-gray-300 pt-16 pb-6 px-6 md:px-10 lg:px-16 font-sans border-t border-white/5 relative">
      <div className="w-full mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6 pb-12 border-b border-white/10">

          <div className="flex flex-col items-start gap-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Fable Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-black text-white tracking-tight">Fable</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              A platform for ebook lovers, readers and writers. Discover, read and share original stories.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: FaFacebookF, href: "#" },
                { icon: FaXTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaLinkedinIn, href: "#" },
                { icon: FaYoutube, href: "#" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#6344f5] hover:border-transparent transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:pl-4">
            <h4 className="text-white font-bold text-[15px] mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {["Home", "Browse Ebooks", "Dashboard", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[15px] mb-4 tracking-wide">For Writers</h4>
            <ul className="space-y-2.5 text-sm">
              {["Write & Publish", "Writer Guidelines", "Publishing Fee", "Author Support"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[15px] mb-4 tracking-wide">Support</h4>
            <ul className="space-y-2.5 text-sm">
              {["Help Center", "Terms of Service", "Privacy Policy", "Refund Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3.5">
            <h4 className="text-white font-bold text-[15px] tracking-wide">Newsletter</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Subscribe to get updates and exclusive offers.
            </p>
            <form className="relative w-full flex items-center mt-0.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:border-[#6344f5] transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-linear-to-r from-[#6344f5] to-[#8a3ffc] hover:from-[#5032e6] hover:to-[#7c32eb] text-white rounded-lg flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Send size={13} className="transform -rotate-12" />
              </button>
            </form>
          </div>

        </div>

        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© {currentYear} Fable. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500 animate-pulse">❤️</span> for book lovers
          </p>
        </div>

      </div>
    </footer>
  );
}