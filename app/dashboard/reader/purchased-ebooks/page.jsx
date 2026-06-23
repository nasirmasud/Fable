// // এইটা সরাও:
// const books = MOCK_BOOKS;

// // এইটা দাও:
// const books = await getPurchasedBooks(readerEmail);
// ৩. Component-কে async করো (এটা Next.js Server Component, তাই সরাসরি await চলবে):
// jsexport default async function PurchasedBooks() {
//   const readerEmail = "reader@example.com"; // session থেকে নাও
//   const books = await getPurchasedBooks(readerEmail);
//   ...
// }
// Session থেকে email নিতে চাইলে (Next Auth ব্যবহার করলে):
// jsimport { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// export default async function PurchasedBooks() {
//   const session = await getServerSession(authOptions);
//   const readerEmail = session?.user?.email;
//   const books = await getPurchasedBooks(readerEmail);
//   ...
// }


import {
  BookMarked,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Heart,
  MoreVertical,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StatCard({ icon: Icon, label, value, color }) {
  const colorMap = {
    purple: "bg-purple-600/20 text-purple-400",
    blue: "bg-blue-600/20   text-blue-400",
    green: "bg-green-600/20  text-green-400",
    amber: "bg-yellow-500/20 text-yellow-400",
  };
  return (
    <div className="flex items-center gap-3 bg-[#13132a] border border-white/5 rounded-2xl px-5 py-5">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorMap[color]}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-white leading-tight">{value ?? 0}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    downloaded: {
      cls: "bg-green-500/15 text-green-400 border border-green-500/25",
      dot: "bg-green-400",
      label: "Downloaded",
    },
    reading: {
      cls: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
      dot: "bg-blue-400",
      label: "Reading",
    },
    unread: {
      cls: "bg-purple-500/20 text-purple-300 border border-purple-500/25",
      dot: "bg-purple-400",
      label: "Unread",
    },
  };
  const s = map[status] ?? map.unread;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function GenreBadge({ genre }) {
  return (
    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-[#1e1040] text-purple-300 border border-purple-500/20 whitespace-nowrap">
      {genre}
    </span>
  );
}

function FilterBar() {
  const tabs = ["All Books", "Downloaded", "Unread"];
  return (
    <div className="px-6 mb-6 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0
              ? "bg-purple-600 text-white"
              : "bg-[#13132a] text-gray-300 border border-white/5 hover:bg-white/5 hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search your books..."
            className="w-full bg-[#13132a] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 bg-[#13132a] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap">
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>
    </div>
  );
}

// ── Mock data — replace with real API call ──────────────────────────────────
const MOCK_BOOKS = [
  { _id: "1", title: "The Lost Kingdom", author: "Luna Everhart", genre: "Fantasy", purchasedAt: "2024-05-20", price: 9.99, status: "downloaded", coverPreview: null },
  { _id: "2", title: "Beyond the Stars", author: "Orion Blake", genre: "Sci-Fi", purchasedAt: "2024-05-18", price: 5.99, status: "reading", coverPreview: null },
  { _id: "3", title: "Love & Other Worlds", author: "Aurora West", genre: "Romance", purchasedAt: "2024-05-15", price: 3.99, status: "downloaded", coverPreview: null },
  { _id: "4", title: "Whispers in the Dark", author: "M. R. Shadow", genre: "Horror", purchasedAt: "2024-05-10", price: 4.99, status: "downloaded", coverPreview: null },
  { _id: "5", title: "Beyond the Horizon", author: "Ethan Walker", genre: "Adventure", purchasedAt: "2024-05-05", price: 4.99, status: "downloaded", coverPreview: null },
  { _id: "6", title: "The Dragon's Legacy", author: "Luna Everhart", genre: "Fantasy", purchasedAt: "2024-05-01", price: 6.99, status: "unread", coverPreview: null },
];

export default function PurchasedBooks() {
  // Replace MOCK_BOOKS with: const books = await getPurchasedBooks(readerEmail);
  const books = MOCK_BOOKS;

  const totalBooks = books.length;
  const totalSpent = books.reduce((acc, b) => acc + (b.price ?? 0), 0);
  const thisMonth = books.filter((b) => {
    const d = new Date(b.purchasedAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const wishlist = 7; // replace with real wishlist count

  return (
    <div className="bg-[#0d0d1a] text-white pb-10 min-h-screen">

      {/* Hero Banner */}
      <div
        className="mx-6 mt-3 mb-6 rounded-2xl px-8 py-8 flex items-center justify-between overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1a0a3d 0%, #2d1065 55%, #3d1580 100%)" }}
      >
        {/* Sparkles */}
        {[
          { top: "20%", left: "55%" },
          { top: "15%", left: "68%" },
          { top: "55%", left: "74%" },
          { top: "20%", left: "82%" },
          { top: "40%", left: "90%" },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute text-purple-300/50 text-lg pointer-events-none select-none"
            style={{ top: s.top, left: s.left }}
          >
            ✦
          </span>
        ))}

        {/* Left text */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-purple-500/30 flex items-center justify-center">
              <BookOpen size={18} className="text-purple-300" />
            </div>
            <h1 className="text-2xl font-bold">Purchased Books</h1>
          </div>
          <p className="text-purple-200/70 text-sm leading-relaxed">
            Books you've purchased and added<br />to your personal library.
          </p>
        </div>

        {/* Right decorative shopping bag */}
        <div className="hidden md:flex items-end gap-2 relative z-10 mr-8 opacity-30">
          <BookOpen size={28} className="text-purple-200 mb-4" />
          <div className="w-20 h-24 rounded-xl border border-purple-300/20 bg-purple-500/20 flex items-center justify-center rotate-3">
            <BookMarked size={28} className="text-purple-200/60" />
          </div>
          <div className="w-20 h-24 rounded-xl border border-purple-300/20 bg-indigo-600/20 flex items-center justify-center -rotate-3 -ml-6">
            <BookOpen size={28} className="text-purple-200/60" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="px-6 mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookMarked} label="Total Books" value={totalBooks} color="purple" />
        <StatCard icon={DollarSign} label="Total Spent" value={`$${totalSpent.toFixed(2)}`} color="blue" />
        <StatCard icon={CalendarDays} label="This Month" value={thisMonth} color="green" />
        <StatCard icon={Heart} label="Wishlist" value={wishlist} color="amber" />
      </div>

      {/* Filter Tabs + Search */}
      <FilterBar />

      {/* Table */}
      <div className="mx-6 bg-[#13132a] border border-white/5 rounded-2xl overflow-hidden">

        {/* Table header */}
        <div
          className="grid items-center gap-x-4 px-6 py-3 border-b border-white/5 text-xs text-gray-500 font-medium uppercase tracking-wider"
          style={{ gridTemplateColumns: "80px 2fr 1.2fr 1fr 80px 110px 100px" }}
        >
          <span>Cover</span>
          <span>Title</span>
          <span>Author</span>
          <span>Purchased On</span>
          <span>Price</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <BookOpen size={36} className="text-gray-700" />
            <p className="text-sm text-gray-600">No purchased books found.</p>
          </div>
        ) : (
          books.map((book, idx) => (
            <div
              key={book._id ?? idx}
              className="grid items-center gap-x-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
              style={{ gridTemplateColumns: "80px 2fr 1.2fr 1fr 80px 110px 100px" }}
            >
              {/* Cover */}
              <div className="w-14 h-20 rounded-lg overflow-hidden bg-[#1a1035] border border-white/5 relative shrink-0">
                {book.coverPreview ? (
                  <Image src={book.coverPreview} alt={book.title} fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={16} className="text-purple-500/30" />
                  </div>
                )}
              </div>

              {/* Title + genre */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                  {book.title}
                </p>
                <div className="mt-1.5">
                  <GenreBadge genre={book.genre} />
                </div>
              </div>

              {/* Author */}
              <div className="text-sm text-gray-300 truncate">{book.author}</div>

              {/* Purchased On */}
              <div className="text-xs text-gray-500">{formatDate(book.purchasedAt)}</div>

              {/* Price */}
              <div className="text-sm font-semibold text-white">
                {book.price ? `$${Number(book.price).toFixed(2)}` : "—"}
              </div>

              {/* Status */}
              <div>
                <StatusBadge status={book.status} />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1040] border border-purple-500/25 rounded-lg text-xs text-purple-300 hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white transition-colors">
                  <BookOpenCheck size={14} />
                  Read
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/7 text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                  <MoreVertical size={15} />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
          <p className="text-xs text-gray-500">Showing 1 to 6 of 18 books</p>

          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/5 bg-transparent text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === 1
                  ? "bg-purple-600 text-white"
                  : "border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {p}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/5 bg-transparent text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <select className="bg-[#13132a] border border-white/5 rounded-lg px-3 py-1.5 text-gray-300 text-xs outline-none focus:border-purple-500/50 cursor-pointer">
              <option>6 per page</option>
              <option>12 per page</option>
              <option>24 per page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}