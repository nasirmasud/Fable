"use client";

import { BookCard } from "@/components/pageContent/AllEbooks";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

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

const SORT_OPTIONS = ["Popular", "Newest", "Price: Low to High", "Price: High to Low", "Rating"];
const PER_PAGE = 14;

export default function AuthorPageClient({ author, allBooks }) {
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Popular");
  const [page, setPage] = useState(1);

  const genres = useMemo(() => {
    const unique = Array.from(
      new Set((allBooks ?? []).map((b) => b.genre).filter(Boolean))
    );
    return ["All", ...unique];
  }, [allBooks]);

  const filtered = useMemo(() => {
    let list = allBooks ?? [];

    if (activeGenre !== "All") {
      list = list.filter((b) => b.genre === activeGenre);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((b) => b.title?.toLowerCase().includes(q));
    }

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
  }, [allBooks, activeGenre, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const start = (safePage - 1) * PER_PAGE + 1;
  const end = Math.min(safePage * PER_PAGE, filtered.length);

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginationItems = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) paginationItems.push(i);
  } else {
    paginationItems.push(1, 2, 3, 4, 5, "...", totalPages);
  }

  return (
    <main className="min-h-screen bg-[#0b0c1e] text-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/all-book-cover.png"
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0b0c1e] via-[#0b0c1ecc] to-transparent" />
          <div className="absolute inset-0 bg-line-to-t from-[#0b0c1e] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 sm:px-12 lg:px-20 pt-16 pb-24 min-h-162.5 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-relaxed">
            All Books by {author}
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
            Discover thousands of original stories across fantasy, romance,
            mystery, sci-fi and more.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="relative flex-1 min-w-60 max-w-sm">
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

      {/* ── Books Grid ── */}
      <section className="w-full px-8 sm:px-12 lg:px-20 pb-16">

        <div className="flex items-center justify-between mb-6 mt-8">
          <p className="text-white/40 text-sm">
            {filtered.length === 0
              ? "No books found"
              : `Showing ${start}–${end} of ${filtered.length.toLocaleString()} books`}
          </p>

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

        {paginated.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-10">
            {paginated.map((book, index) => (
              <BookCard
                key={book._id}
                book={book}
                priority={page === 1 && index < 2}
              />
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