
import { getWritersEbooks } from "@/lib/api/ebooks";
import {
  BookMarked,
  BookOpen,
  Eye,
  FileText,
  Pencil,
  Search,
  ShoppingBag,
  Trash2
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
    green: "bg-green-600/20  text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    blue: "bg-blue-600/20   text-blue-400",
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
  const isPublished = status === "published";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isPublished
      ? "bg-green-500/15 text-green-400 border border-green-500/25"
      : "bg-purple-500/20 text-purple-300 border border-purple-500/25"
      }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-green-400" : "bg-purple-400"}`} />
      {isPublished ? "Published" : "Draft"}
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

// ── filter tabs + search (presentational — wire up state/handlers as needed) ──
function FilterBar() {
  const tabs = ["All Books", "Published", "Drafts"];
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

      <div className="relative w-full sm:w-64">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search books..."
          className="w-full bg-[#13132a] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-purple-500/50 transition-colors"
        />
      </div>
    </div>
  );
}

export default async function WritersEbooks() {
  const writerEmail = "writer@writer.com";
  const ebooks = await getWritersEbooks(writerEmail);

  const totalBooks = ebooks.length;
  const published = ebooks.filter((b) => b.status === "published");
  const drafts = ebooks.filter((b) => b.status !== "published");
  const totalSales = ebooks.reduce((acc, b) => acc + (b.sales ?? 0), 0);

  return (
    <div className="bg-[#0d0d1a] text-white pb-10">

      {/* Breadcrumb */}
      <div className="px-6 pt-6 pb-2 text-sm text-gray-400 flex items-center gap-2">
        <span className="hover:text-purple-400 cursor-pointer transition-colors">Dashboard</span>
        <span className="text-gray-600">›</span>
        <span className="text-white font-medium">Manage My Books</span>
      </div>

      {/* ── Hero Banner ── */}
      <div
        className="mx-6 mt-3 mb-6 rounded-2xl px-8 py-8 flex items-center justify-between overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1a0a3d 0%, #2d1065 55%, #3d1580 100%)" }}
      >
        {/* sparkles */}
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
            <h1 className="text-2xl font-bold">My Books</h1>
          </div>
          <p className="text-purple-200/70 text-sm leading-relaxed">
            Manage, edit and track all your published<br />and draft ebooks from one place.
          </p>
        </div>

        {/* Right decorative book stack */}
        <div className="hidden md:block relative w-32 h-28 shrink-0 mr-8">
          {/* back book */}
          <div className="absolute right-0 top-2 w-20 h-24 rounded-xl bg-linear-to-br from-purple-600 to-purple-900 border border-purple-400/20 rotate-6 shadow-xl" />
          {/* front book */}
          <div className="absolute right-4 top-0 w-20 h-24 rounded-xl bg-linear-to-br from-purple-500 to-indigo-700 border border-purple-300/20 -rotate-3 shadow-xl flex items-center justify-center">
            <BookOpen size={28} className="text-purple-200/50" />
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="px-6 mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookMarked} label="Total Books" value={totalBooks} color="purple" />
        <StatCard icon={BookOpen} label="Published" value={published.length} color="green" />
        <StatCard icon={FileText} label="Drafts" value={drafts.length} color="yellow" />
        <StatCard icon={ShoppingBag} label="Total Sales" value={totalSales} color="blue" />
      </div>

      {/* ── Filter Tabs + Search ── */}
      <FilterBar />

      {/* ── Table ── */}
      <div className="mx-6 mb-10 bg-[#13132a] border border-white/5 rounded-2xl overflow-hidden pl-5">

        {/* Table header */}
        <div className="grid w-full items-center gap-x-4 px-5 py-3 border-b border-white/5 text-xs text-gray-500 font-medium uppercase tracking-wider"
          style={{
            gridTemplateColumns: "minmax(100px, 1fr) 2fr minmax(100px, 1fr) 1fr 1fr 1fr 1fr 100px"
          }}

        >
          <span>Cover</span>
          <span>Title</span>
          <span>Genre</span>
          <span>Status</span>
          <span>Price</span>
          <span>Sales</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {ebooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <BookOpen size={36} className="text-gray-700" />
            <p className="text-sm text-gray-600">No books found.</p>
          </div>
        ) : (
          ebooks.map((book, idx) => (
            <div
              key={book._id ?? idx}
              className="grid w-full items-center gap-x-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors group"
              style={{
                gridTemplateColumns: "minmax(100px, 1fr) 2fr minmax(100px, 1fr) 1fr 1fr 1fr 1fr 100px"
              }}
            >
              {/* Cover */}
              <div className="w-20 h-28 rounded overflow-hidden bg-[#1a1035] border border-white/5 relative shrink-0">
                {book.coverPreview ? (
                  <Image
                    src={book.coverPreview}
                    alt={book.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={16} className="text-purple-500/30" />
                  </div>
                )}
              </div>

              {/* Title + date */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                  {book.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Created on {formatDate(book.createdAt)}
                </p>
              </div>

              {/* Genre */}
              <div>
                <GenreBadge genre={book.genre} />
              </div>

              {/* Status */}
              <div>
                <StatusBadge status={book.status} />
              </div>

              {/* Price */}
              <div className="text-sm font-semibold text-white">
                {book.price ? `$${Number(book.price).toFixed(2)}` : "—"}
              </div>

              {/* Sales */}
              <div className="text-sm text-gray-300">
                {book.status === "published" ? (book.sales ?? "—") : "—"}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                {/* Actions (Update this block) */}
                <div className="flex items-center justify-end gap-3 pr-2">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Eye size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-400/80 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}