"use client";

import {
  ArrowRight,
  BookHeart,
  BookOpen,
  Compass,
  Play,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// ─── Slide Data ───────────────────────────────────────────────────────────────

const slides = [
  {
    id: 1,
    image: "/slider-1.png",
    bg: "#07020f",
    badge: { icon: BookOpen, color: "text-purple-300", borderColor: "border-white/10", bgColor: "bg-white/5", textColor: "text-white/80", text: "Your Next Great Read Awaits" },
    heading: { line1: "Discover & Read", line2: "Original Ebooks", color: "text-white", accentColor: "text-purple-400", hasAccent: true },
    body: "Explore thousands of original ebooks from talented writers around the world. Read, share and fall in love with stories.",
    cta: { primary: { text: "Browse Ebooks", href: "/ebooks", className: "bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-purple-900/40" }, secondary: { text: "How It Works", href: "#how-it-works" } },
    stats: [
      { icon: BookOpen, value: "10K+", label: "Ebooks", iconColor: "text-purple-300" },
      { icon: Users, value: "2K+", label: "Writers", iconColor: "text-purple-300" },
      { icon: UserCheck, value: "8K+", label: "Happy Readers", iconColor: "text-purple-300" },
      { icon: ShieldCheck, value: "100%", label: "Secure Payments", iconColor: "text-purple-300" },
    ],
    borderColor: "border-white/10",
    dividerColor: "bg-white/10",
  },
  {
    id: 2,
    image: "/slider-2.png",
    bg: "#05080f",
    badge: { icon: BookOpen, color: "text-[#e8b84b]", borderColor: "border-[#c9972c]/30", bgColor: "bg-[#c9972c]/10", textColor: "text-[#e8b84b]/90", text: "Your Next Heroic Journey Awaits" },
    heading: { line1: "Quest for", line2: "Untold Legends", color: "text-[#e8b84b]", hasAccent: false },
    body: "Forge your path through forgotten realms. Dive into epic fantasy, mythology, and thrilling heroic sagas.",
    cta: { primary: { text: "Explore Quests", href: "/quests", className: "bg-[#c9972c] text-[#05080f] shadow-amber-900/40" }, secondary: { text: "How It Works", href: "#how-it-works" } },
    stats: [
      { icon: Compass, value: "12K+", label: "Epic Quests", iconColor: "text-[#e8b84b]" },
      { icon: Users, value: "3K+", label: "Renowned Authors", iconColor: "text-[#e8b84b]" },
      { icon: UserCheck, value: "9K+", label: "Inspired Readers", iconColor: "text-[#e8b84b]" },
      { icon: ShieldCheck, value: "100%", label: "Secure Payments", iconColor: "text-[#e8b84b]" },
    ],
    borderColor: "border-[#c9972c]/20",
    dividerColor: "bg-[#c9972c]/20",
  },
  {
    id: 3,
    image: "/slider-3.png",
    bg: "#080612",
    badge: { icon: BookHeart, color: "text-[#f472b6]", borderColor: "border-[#e91e8c]/40", bgColor: "bg-[#e91e8c]/10", textColor: "text-[#f472b6]/90", text: "Discover New Hearts & Minds" },
    heading: { line1: "Stories that", line2: "Stay with You", color: "text-[#f01e8f]", hasAccent: false },
    body: "Explore complex relationships, cosmic mysteries, and hidden realms. Read original fiction from diverse, talented voices.",
    cta: { primary: { text: "Explore Stories", href: "/stories", className: "bg-[#e91e8c] text-white shadow-pink-900/40" }, secondary: { text: "How It Works", href: "#how-it-works" } },
    stats: [
      { icon: BookHeart, value: "11K+", label: "Diverse Stories", iconColor: "text-[#f472b6]" },
      { icon: Users, value: "2.5K+", label: "Talent Writers", iconColor: "text-[#f472b6]" },
      { icon: UserCheck, value: "8.5K+", label: "Passionate Readers", iconColor: "text-[#f472b6]" },
      { icon: ShieldCheck, value: "100%", label: "Secure Payments", iconColor: "text-[#f472b6]" },
    ],
    borderColor: "border-[#e91e8c]/20",
    dividerColor: "bg-[#e91e8c]/20",
  },
  {
    id: 4,
    image: "/slider-4.png",
    bg: "#0d0a1a",
    badge: { icon: BookOpen, color: "text-[#a78bfa]", borderColor: "border-[#7c3aed]/40", bgColor: "bg-[#7c3aed]/10", textColor: "text-[#a78bfa]/90", text: "Your Reading World Expanded" },
    heading: { line1: "Unlock Infinite", line2: "Possibilities", color: "text-[#a78bfa]", hasAccent: false },
    body: "Step through portals to distant planets, magical empires, and forgotten pasts. Immerse yourself in total escapism.",
    cta: { primary: { text: "Start Your Voyage", href: "/voyage", className: "bg-[#6d28d9] text-white shadow-violet-900/50" }, secondary: { text: "How It Works", href: "#how-it-works" } },
    stats: [
      { icon: Compass, value: "15K+", label: "Worldly Tales", iconColor: "text-[#a78bfa]" },
      { icon: Users, value: "4K+", label: "Creative Imaginations", iconColor: "text-[#a78bfa]" },
      { icon: UserCheck, value: "10K+", label: "Global Readers", iconColor: "text-[#a78bfa]" },
      { icon: ShieldCheck, value: "100%", label: "Secure Payments", iconColor: "text-[#a78bfa]" },
    ],
    borderColor: "border-[#7c3aed]/20",
    dividerColor: "bg-[#7c3aed]/25",
  },
];

// ─── Single Slide ─────────────────────────────────────────────────────────────

function HeroSlide({ slide }) {
  return (
    <div
      className="relative w-full h-[90vh] overflow-hidden"
      style={{
        backgroundImage: `url(${slide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: slide.bg,
      }}
    >
      {/* Dark overlay left-to-right */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${slide.bg} 0%, ${slide.bg}dd 35%, ${slide.bg}88 60%, transparent 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center px-6 py-12 sm:px-8 lg:px-40">
        <div className="max-w-xl">

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 rounded-full border ${slide.badge.borderColor} ${slide.badge.bgColor} px-4 py-1.5 text-sm ${slide.badge.textColor} backdrop-blur-sm`}>
            <slide.badge.icon className={`h-4 w-4 ${slide.badge.color}`} />
            {slide.badge.text}
          </div>

          {/* Heading */}
          <h1 className={`mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem] ${slide.heading.color}`}>
            {slide.heading.line1}
            <br />
            {slide.heading.hasAccent ? (
              <span className={slide.heading.accentColor}>{slide.heading.line2}</span>
            ) : (
              slide.heading.line2
            )}
          </h1>

          {/* Body */}
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
            {slide.body}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={slide.cta.primary.href}
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-lg transition hover:brightness-110 ${slide.cta.primary.className}`}
            >
              {slide.cta.primary.text}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={slide.cta.secondary.href}
              className="inline-flex items-center gap-3 rounded-lg border border-white/20 bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {slide.cta.secondary.text}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Play className="h-3.5 w-3.5 fill-white text-white" />
              </span>
            </Link>
          </div>

          {/* Stats */}
          <dl className={`mt-14 grid grid-cols-2 gap-y-6 border-t ${slide.borderColor} pt-8 sm:grid-cols-4 sm:gap-x-6`}>
            {slide.stats.map(({ icon: Icon, value, label, iconColor }, i) => (
              <div key={label} className="flex items-center gap-3">
                {i > 0 && (
                  <div className={`hidden h-10 w-px sm:block ${slide.dividerColor}`} />
                )}
                <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />
                <div>
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-xl font-bold leading-tight text-white">{value}</dd>
                  <div className="text-sm text-white/50">{label}</div>
                </div>
              </div>
            ))}
          </dl>

        </div>
      </div>
    </div>
  );
}

// ─── Main Slider ──────────────────────────────────────────────────────────────

export default function HeroSlider() {
  return (
    <>
      <style>{`
        .hero-swiper {
          width: 100%;
        }
        .hero-swiper .swiper-pagination {
          bottom: 24px;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 4px;
          background: white;
        }
      `}</style>

      <Swiper
        className="hero-swiper"
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: false }}
        loop={true}
        speed={600}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}