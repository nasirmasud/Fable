"use client";

import { Search, SlidersHorizontal, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = ["Popular", "Newest", "Price: Low to High", "Price: High to Low", "Rating"];
const PER_PAGE = 14;

// ── helpers ───────────────────────────────────────────────────────────────────

function resolveAuthor(book) {
  if (book.author) return book.author;
  if (!book.writerEmail) return "Unknown Author";
  return book.writerEmail
    .split("@")[0]
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") return "Free";
  const n = Number(price);
  if (n === 0) return "Free";
  return `$${n.toFixed(2)}`;
}

// ── Book Card ─────────────────────────────────────────────────────────────────

function BookCard({ book }) {
  return (
    <div className="group relative bg-[#131428] border border-white/5 rounded overflow-hidden cursor-pointer hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-all duration-300">
      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.coverPreview}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Genre badge */}
        {book.genre && (
          <Badge className="absolute top-2 left-2 bg-purple-600/80 hover:bg-purple-600/80 text-purple-100 text-[10px] uppercase tracking-wide backdrop-blur-sm border-0 px-2 py-0.5">
            {book.genre}
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-0.5">
          {book.title}
        </h3>
        <p className="text-white/40 text-xs mb-2">{resolveAuthor(book)}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-medium">
              {book.rating ?? "—"}
            </span>
          </div>
          <span className="text-purple-400 font-bold text-sm">
            {formatPrice(book.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AllBooksClient({ ebooks }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Popular");
  const [page, setPage] = useState(1);

  // Genre list — API থেকে আসা unique genre গুলো
  const genres = useMemo(() => {
    const unique = Array.from(
      new Set((ebooks ?? []).map((b) => b.genre).filter(Boolean))
    );
    return ["All", ...unique];
  }, [ebooks]);

  // Filter
  const filtered = useMemo(() => {
    let list = ebooks ?? [];

    if (activeGenre !== "All") {
      list = list.filter((b) => b.genre === activeGenre);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          resolveAuthor(b).toLowerCase().includes(q)
      );
    }

    // Sort
    const sorted = [...list];
    if (sort === "Newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "Price: Low to High") {
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sort === "Price: High to Low") {
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (sort === "Rating") {
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return sorted;
  }, [ebooks, activeGenre, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const start = (safePage - 1) * PER_PAGE + 1;
  const end = Math.min(safePage * PER_PAGE, filtered.length);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination items
  const paginationItems = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) paginationItems.push(i);
  } else {
    paginationItems.push(1, 2, 3, 4, 5, "...", totalPages);
  }

  return (
    <main className="min-h-screen bg-[#0b0c1e] text-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/all-book-cover.png"
            alt="Hero background"
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c1e] via-[#0b0c1ecc] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c1e] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 sm:px-12 lg:px-20 pt-16 pb-24 min-h-[650px] flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-relaxed">
            All Books
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
            Discover thousands of original stories across fantasy, romance,
            mystery, sci-fi and more.
          </p>

          {/* Search + Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 z-10" />
              <Input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-purple-500/60 focus-visible:border-purple-500/60 rounded-xl backdrop-blur-sm"
              />
            </div>

            <Button
              variant="outline"
              className="bg-white/10 border-white/10 text-white/80 hover:bg-white/15 hover:text-white rounded-xl backdrop-blur-sm gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </Button>
          </div>

          {/* Genre tabs */}
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <Button
                key={g}
                variant={activeGenre === g ? "default" : "ghost"}
                size="sm"
                onClick={() => { setActiveGenre(g); setPage(1); }}
                className={cn(
                  "rounded-full text-sm font-medium transition",
                  activeGenre === g
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {g}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK GRID ── */}
      <section className="w-full px-8 sm:px-12 lg:px-20 pb-16">

        {/* Meta row */}
        <div className="flex items-center justify-between mb-6 mt-8">
          <p className="text-white/40 text-sm">
            {filtered.length === 0
              ? "No books found"
              : `Showing ${start}–${end} of ${filtered.length.toLocaleString()} books`}
          </p>

          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 bg-[#131428] border border-white/10 text-white/70 hover:text-white hover:bg-[#1a1b34] hover:border-purple-500/40 rounded-xl px-4 py-2 text-sm outline-none transition">
              Sort by: {sort}
              <span className="text-xs">▾</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 bg-[#1a1b34] border-white/10 text-white rounded-xl"
            >
              {SORT_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt}
                  onClick={() => { setSort(opt); setPage(1); }}
                  className={cn(
                    "cursor-pointer rounded-lg text-sm transition",
                    sort === opt
                      ? "bg-purple-600/20 text-purple-300 focus:bg-purple-600/30 focus:text-purple-300"
                      : "text-white/60 focus:bg-white/5 focus:text-white"
                  )}
                >
                  {opt}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-10">
            {paginated.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-white/30">
            <p className="text-lg">No books found for &ldquo;{search}&rdquo;</p>
            <Button
              variant="link"
              onClick={() => { setSearch(""); setActiveGenre("All"); }}
              className="mt-2 text-purple-400 hover:text-purple-300 p-0 h-auto text-sm"
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => safePage > 1 && handlePageChange(safePage - 1)}
                  className={cn(
                    "bg-transparent border-white/10 text-white/50 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer",
                    safePage === 1 && "opacity-30 pointer-events-none"
                  )}
                />
              </PaginationItem>

              {paginationItems.map((p, i) =>
                p === "..." ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis className="text-white/30" />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      onClick={() => handlePageChange(p)}
                      isActive={safePage === p}
                      className={cn(
                        "rounded-lg cursor-pointer border-0",
                        safePage === p
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-transparent text-white/50 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => safePage < totalPages && handlePageChange(safePage + 1)}
                  className={cn(
                    "bg-transparent border-white/10 text-white/50 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer",
                    safePage === totalPages && "opacity-30 pointer-events-none"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

      </section>
    </main>
  );
}
