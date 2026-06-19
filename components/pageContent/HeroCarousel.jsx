import {
  ArrowRight,
  BookOpen,
  Play,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { icon: BookOpen, value: "10K+", label: "Ebooks" },
  { icon: Users, value: "2K+", label: "Writers" },
  { icon: UserCheck, value: "8K+", label: "Happy Readers" },
  { icon: ShieldCheck, value: "100%", label: "Secure Payments" },
];

export default function HeroCarousel() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-[#07020f]">
      <Image
        src="/slider-1.png"
        alt="Floating ebooks glowing above an open magical book"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#07020f] via-[#07020f]/75 to-[#07020f]/10 md:to-transparent" />
      <div className="absolute inset-0 bg-[#07020f]/45 md:bg-transparent" />

      <div className="relative z-10 ml-0 flex h-full max-w-7xl flex-col justify-center px-6 py-12 sm:px-8 lg:px-40">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
            <BookOpen className="h-4 w-4 text-purple-300" />
            Your Next Great Read Awaits
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
            Discover & Read
            <br />
            <span className="text-purple-400">Original Ebooks</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
            Explore thousands of original ebooks from talented writers
            around the world. Read, share and fall in love with stories.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:opacity-90"
            >
              Browse Ebooks
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              How It Works
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Play className="h-3.5 w-3.5 fill-white text-white" />
              </span>
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-x-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-purple-300" />
                <div>
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-xl font-bold leading-tight text-white">
                    {value}
                  </dd>
                  <div className="text-sm text-white/50">{label}</div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}