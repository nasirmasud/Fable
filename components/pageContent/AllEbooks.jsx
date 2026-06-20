"use client";

import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const PAGE_SIZE = 12;

// ── helpers ──────────────────────────────────────────────────────────────────

// NOTE: the ebook schema has no `author` field — derived here from writerEmail
// as a fallback. Swap this out once a real author/display-name field exists.
function authorFromEmail(email) {
  if (!email) return "Unknown Author";
  return email
    .split("@")[0]
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") return "Free";
  return `$${Number(price).toFixed(2)}`;
}

function getPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = new Set([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...keep].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("ellipsis-" + p);
    out.push(p);
  });
  return out;
}

// ── sub-components ───────────────────────────────────────────────────────────

function GenreTabs({ genres, active, onSelect }) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {genres.map((g) => (
        <button
          key={g}
          onClick={() => onSelect(g)}
          className={`shrink-0 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${active === g
              ? "bg-purple-600 text-white"
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}

function FloatingCover({ book, className }) {
  return (
    <div
      className={`absolute h-44 w-32 overflow-hidden rounded-lg border border-white/10 bg-[#1a1730] shadow-2xl shadow-purple-900/50 ${className}`}
    >
      {book?.coverPreview ? (
        <Image
          src={book.coverPreview}
          alt={book.title ?? "Book cover"}
          fill
          unoptimized
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <BookOpen size={24} className="text-purple-500/30" />
        </div>
      )}
    </div>
  );
}

function BookCard({ book }) {
  const author = authorFromEmail(book.writerEmail);
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/5 bg-[#12101f] transition-colors hover:border-purple-500/30">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1730]">
        {book.coverPreview ? (
          <Image
            src={book.coverPreview}
            alt={book.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen size={28} className="text-purple-500/30" />
          </div>
        )}
      </div>

      <div className="p-3.5">
        <p className="truncate text-sm font-semibold text-white">{book.title}</p>
        <p className="mt-0.5 truncate text-xs text-gray-500">{author}</p>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 truncate text-xs text-gray-400">
            <Clock size={12} className="shrink-0 text-purple-400" />
            {book.pages ? `${book.pages} pages` : book.genre}
          </span>
          <span className="shrink-0 text-sm font-bold text-purple-300">
            {formatPrice(book.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="mb-12 flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={15} />
      </button>

      {getPageList(page, totalPages).map((p) =>
        typeof p === "string" ? (
          <span key={p} className="px-1 text-sm text-gray-500">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${p === page
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────

export default function AllBooksClient({ ebooks }) {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);

  // Public browse page — only published books are shown.
  const published = useMemo(
    () => (ebooks ?? []).filter((b) => b.status === "published"),
    [ebooks]
  );

  const genres = useMemo(() => {
    const unique = Array.from(new Set(published.map((b) => b.genre).filter(Boolean)));
    return ["All", ...unique];
  }, [published]);

  const filtered = useMemo(() => {
    let list = published;

    if (activeGenre !== "All") {
      list = list.filter((b) => b.genre === activeGenre);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          authorFromEmail(b.writerEmail).toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    if (sortBy === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "price-low") {
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }
    // "popular" has no real signal in the data yet, so it keeps original order.

    return sorted;
  }, [published, activeGenre, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const heroCovers = published.slice(0, 3);

  function handlePageChange(next) {
    setPage(next);
  }

  function handleGenreChange(g) {
    setActiveGenre(g);
    setPage(1);
  }

  function handleQueryChange(value) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="bg-[#07020f] text-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-8 pt-10 md:px-10">
        <div className="pointer-events-none absolute -right-16 top-0 h-[420px] w-[420px] rounded-full bg-purple-600/15 blur-3xl" />

        <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: heading, search, tabs */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              All Books
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-400">
              Discover thousands of original stories across fantasy, romance, mystery,
              sci-fi and more.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Search books..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-purple-500/60"
                />
              </div>
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white"
              >
                <SlidersHorizontal size={15} />
                Filter
              </Button>
            </div>

            <div className="mt-5">
              <GenreTabs genres={genres} active={activeGenre} onSelect={handleGenreChange} />
            </div>
          </div>

          {/* Right: floating covers illustration */}
          <div className="relative hidden h-[300px] md:block">
            <div className="absolute left-1/2 top-1/2 h-full w-full max-w-sm -translate-x-1/2 -translate-y-1/2">
              {/* ambient glow */}
              <div className="absolute bottom-2 left-1/2 h-36 w-64 -translate-x-1/2 rounded-full bg-purple-500/35 blur-3xl" />

              {/* decorative accents */}
              <BookOpen size={20} className="absolute left-2 top-4 text-purple-300/60" />
              <Heart size={16} className="absolute right-4 top-12 text-purple-300/50" />
              <Sparkles size={16} className="absolute right-10 top-0 text-purple-200/60" />

              <FloatingCover
                book={heroCovers[0]}
                className="left-1/2 top-8 -translate-x-[125%] -rotate-6"
              />
              <FloatingCover
                book={heroCovers[1]}
                className="left-1/2 top-0 -translate-x-1/2"
              />
              <FloatingCover
                book={heroCovers[2]}
                className="left-1/2 top-8 translate-x-[25%] rotate-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Results meta + sort ── */}
      <div className="mx-6 mb-6 flex flex-wrap items-center justify-between gap-3 md:mx-10">
        <p className="text-sm text-gray-500">
          {filtered.length === 0
            ? "No books found"
            : `Showing ${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(
              safePage * PAGE_SIZE,
              filtered.length
            )} of ${filtered.length} books`}
        </p>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 outline-none transition-colors focus:border-purple-500/60"
        >
          <option value="popular">Sort by: Popular</option>
          <option value="newest">Sort by: Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* ── Grid ── */}
      {paginated.length === 0 ? (
        <div className="mx-6 mb-12 flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-[#12101f] py-20 md:mx-10">
          <BookOpen size={32} className="text-gray-700" />
          <p className="text-sm text-gray-500">No books match your search.</p>
        </div>
      ) : (
        <div className="mx-6 mb-10 grid grid-cols-2 gap-5 md:mx-10 md:grid-cols-3 lg:grid-cols-4">
          {paginated.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      <Pagination page={safePage} totalPages={totalPages} onChange={handlePageChange} />
    </div>
  );
}