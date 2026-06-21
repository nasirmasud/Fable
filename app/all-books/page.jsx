// "use client";

// import { Search, SlidersHorizontal, Star } from "lucide-react";
// import { useState } from "react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { cn } from "@/lib/utils";

// // ─── Sample data ──────────────────────────────────────────────────────────────
// const ebooks = [
//   {
//     _id: "6a36a6cd918a3ed9c6b78396",
//     coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg",
//     title: "Provident Illum Et",
//     genre: "Mystery",
//     language: "English",
//     price: 55,
//     pages: 38,
//     readingTime: "In expedita et sit o",
//     status: "draft",
//     tags: ["Fantasy", "Adventure", "Magic"],
//     description: "Et molestiae consequatur.",
//     content: "At consequatur offi",
//     writerEmail: "writer@writer.com",
//     createdAt: "2026-06-20T14:42:21.675Z",
//     rating: 4.5,
//     author: "James Arlen",
//   },
//   { _id: "2", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "The Shadow Throne", genre: "Fantasy", price: 499, rating: 4.8, author: "Sophie Martin", tags: ["Fantasy"] },
//   { _id: "3", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "Love in Paris", genre: "Romance", price: 349, rating: 4.6, author: "Liam Harper", tags: ["Romance"] },
//   { _id: "4", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "The Last Code", genre: "Sci-Fi", price: 599, rating: 4.7, author: "Emily Foster", tags: ["Sci-Fi"] },
//   { _id: "5", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "Whispers in the Dark", genre: "Horror", price: 399, rating: 4.5, author: "Noah Bennett", tags: ["Horror"] },
//   { _id: "6", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "Beyond the Horizon", genre: "Adventure", price: 299, rating: 4.6, author: "Chris Ford", tags: ["Adventure"] },
//   { _id: "7", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "The Dragon's Legacy", genre: "Fantasy", price: 449, rating: 4.9, author: "Ava Mitchell", tags: ["Fantasy"] },
//   { _id: "8", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "Broken Rebirth", genre: "Mystery", price: 349, rating: 4.4, author: "Isabella Monroe", tags: ["Mystery"] },
//   { _id: "9", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "Hearts Unwritten", genre: "Romance", price: 399, rating: 4.7, author: "Daniel Price", tags: ["Romance"] },
//   { _id: "10", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "Starfall Initiative", genre: "Sci-Fi", price: 499, rating: 4.6, author: "Victoria Lane", tags: ["Sci-Fi"] },
//   { _id: "11", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "Secrets of the Mansion", genre: "Mystery", price: 349, rating: 4.3, author: "Ethan Cole", tags: ["Mystery"] },
//   { _id: "12", coverPreview: "https://i.ibb.co/4wptX79S/715n-YO-Wqf-L-SY466.jpg", title: "Ashes of War", genre: "Adventure", price: 499, rating: 4.8, author: "Lily Evans", tags: ["Adventure"] },
// ];

// const GENRES = ["All", "Fantasy", "Romance", "Mystery", "Sci-Fi", "Horror", "Adventure"];
// const SORT_OPTIONS = ["Popular", "Newest", "Price: Low to High", "Price: High to Low", "Rating"];
// const TOTAL_BOOKS = 1200;
// const PER_PAGE = 12;
// const TOTAL_PAGES = Math.ceil(TOTAL_BOOKS / PER_PAGE);

// // ─── Price helper ─────────────────────────────────────────────────────────────
// function formatPrice(price) {
//   if (price > 100) return `$${(price / 100).toFixed(2)}`;
//   return `$${parseFloat(price).toFixed(2)}`;
// }

// // ─── Book Card ────────────────────────────────────────────────────────────────
// function BookCard({ book }) {
//   return (
//     <div className="group relative bg-[#131428] border border-white/5 rounded overflow-hidden cursor-pointer hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-all duration-300">
//       {/* Cover */}
//       <div className="relative aspect-[3/4] overflow-hidden">
//         <img
//           src={book.coverPreview}
//           alt={book.title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//         {/* shadcn Badge — genre */}
//         {book.genre && (
//           <Badge className="absolute top-2 left-2 bg-purple-600/80 hover:bg-purple-600/80 text-purple-100 text-[10px] uppercase tracking-wide backdrop-blur-sm border-0 px-2 py-0.5">
//             {book.genre}
//           </Badge>
//         )}
//       </div>

//       {/* Info */}
//       <div className="p-3">
//         <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-0.5">
//           {book.title}
//         </h3>
//         <p className="text-white/40 text-xs mb-2">{book.author || book.writerEmail}</p>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-1">
//             <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//             <span className="text-yellow-400 text-xs font-medium">
//               {book.rating ?? "—"}
//             </span>
//           </div>
//           <span className="text-purple-400 font-bold text-sm">
//             {formatPrice(book.price)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function AllBooksPage() {
//   const [activeGenre, setActiveGenre] = useState("All");
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("Popular");
//   const [page, setPage] = useState(1);

//   const filtered = ebooks.filter((b) => {
//     const matchGenre = activeGenre === "All" || b.genre === activeGenre;
//     const matchSearch =
//       !search ||
//       b.title.toLowerCase().includes(search.toLowerCase()) ||
//       (b.author || "").toLowerCase().includes(search.toLowerCase());
//     return matchGenre && matchSearch;
//   });

//   const start = (page - 1) * PER_PAGE + 1;
//   const end = Math.min(page * PER_PAGE, TOTAL_BOOKS);

//   const handlePageChange = (p) => {
//     setPage(p);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Build pagination items: 1 2 3 4 5 … 100
//   const paginationItems = [];
//   if (TOTAL_PAGES <= 7) {
//     for (let i = 1; i <= TOTAL_PAGES; i++) paginationItems.push(i);
//   } else {
//     paginationItems.push(1, 2, 3, 4, 5, "...", TOTAL_PAGES);
//   }

//   return (
//     <main className="min-h-screen bg-[#0b0c1e] text-white">

//       {/* ── HERO ──────────────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden">
//         {/* Background image */}
//         <div className="absolute inset-0">
//           <img
//             src="/all-book-cover.png"
//             alt="Hero background"
//             className="w-full h-full object-cover object-center opacity-60"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c1e] via-[#0b0c1ecc] to-transparent" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c1e] via-transparent to-transparent" />
//         </div>

//         <div className="relative z-10 w-full px-8 sm:px-12 lg:px-20 pt-16 pb-24 min-h-[650px] flex flex-col justify-center">
//           <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-relaxed">
//             All Books
//           </h1>
//           <p className="text-white/60 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
//             Discover thousands of original stories across fantasy, romance,
//             mystery, sci-fi and more.
//           </p>

//           {/* Search + Filter — shadcn Input & Button */}
//           <div className="flex flex-wrap gap-3 mb-8">
//             <div className="relative flex-1 min-w-[240px] max-w-sm">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 z-10" />
//               <Input
//                 type="text"
//                 placeholder="Search books..."
//                 value={search}
//                 onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//                 className="pl-9 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-purple-500/60 focus-visible:border-purple-500/60 rounded-xl backdrop-blur-sm"
//               />
//             </div>

//             <Button
//               variant="outline"
//               className="bg-white/10 border-white/10 text-white/80 hover:bg-white/15 hover:text-white rounded-xl backdrop-blur-sm gap-2"
//             >
//               <SlidersHorizontal className="w-4 h-4" />
//               Filter
//             </Button>
//           </div>

//           {/* Genre tabs — shadcn Button */}
//           <div className="flex flex-wrap gap-2">
//             {GENRES.map((g) => (
//               <Button
//                 key={g}
//                 variant={activeGenre === g ? "default" : "ghost"}
//                 size="sm"
//                 onClick={() => { setActiveGenre(g); setPage(1); }}
//                 className={cn(
//                   "rounded-full text-sm font-medium transition",
//                   activeGenre === g
//                     ? "bg-purple-600 hover:bg-purple-700 text-white"
//                     : "text-white/60 hover:text-white hover:bg-white/10"
//                 )}
//               >
//                 {g}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── BOOK GRID ─────────────────────────────────────────────────── */}
//       <section className="w-full px-8 sm:px-12 lg:px-20 pb-16">

//         {/* Meta row */}
//         <div className="flex items-center justify-between mb-6 mt-8">
//           <p className="text-white/40 text-sm">
//             Showing {start}–{end} of {TOTAL_BOOKS.toLocaleString()}+ books
//           </p>

//           {/* Sort — shadcn DropdownMenu */}
//           <DropdownMenu>
//             <DropdownMenuTrigger className="flex items-center gap-2 bg-[#131428] border border-white/10 text-white/70 hover:text-white hover:bg-[#1a1b34] hover:border-purple-500/40 rounded-xl px-4 py-2 text-sm outline-none transition">
//               Sort by: {sort}
//               <span className="text-xs">▾</span>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent
//               align="end"
//               className="w-52 bg-[#1a1b34] border-white/10 text-white rounded-xl"
//             >
//               {SORT_OPTIONS.map((opt) => (
//                 <DropdownMenuItem
//                   key={opt}
//                   onClick={() => setSort(opt)}
//                   className={cn(
//                     "cursor-pointer rounded-lg text-sm transition",
//                     sort === opt
//                       ? "bg-purple-600/20 text-purple-300 focus:bg-purple-600/30 focus:text-purple-300"
//                       : "text-white/60 focus:bg-white/5 focus:text-white"
//                   )}
//                 >
//                   {opt}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Grid */}
//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-10">
//             {filtered.map((book) => (
//               <BookCard key={book._id} book={book} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-24 text-white/30">
//             <p className="text-lg">No books found for &ldquo;{search}&rdquo;</p>
//             <Button
//               variant="link"
//               onClick={() => { setSearch(""); setActiveGenre("All"); }}
//               className="mt-2 text-purple-400 hover:text-purple-300 p-0 h-auto text-sm"
//             >
//               Clear filters
//             </Button>
//           </div>
//         )}

//         {/* Pagination — shadcn Pagination */}
//         <Pagination className="mt-10">
//           <PaginationContent>
//             {/* Prev */}
//             <PaginationItem>
//               <PaginationPrevious
//                 onClick={() => page > 1 && handlePageChange(page - 1)}
//                 className={cn(
//                   "bg-transparent border-white/10 text-white/50 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer",
//                   page === 1 && "opacity-30 pointer-events-none"
//                 )}
//               />
//             </PaginationItem>

//             {/* Page numbers */}
//             {paginationItems.map((p, i) =>
//               p === "..." ? (
//                 <PaginationItem key={`ellipsis-${i}`}>
//                   <PaginationEllipsis className="text-white/30" />
//                 </PaginationItem>
//               ) : (
//                 <PaginationItem key={p}>
//                   <PaginationLink
//                     onClick={() => handlePageChange(p)}
//                     isActive={page === p}
//                     className={cn(
//                       "rounded-lg cursor-pointer border-0",
//                       page === p
//                         ? "bg-purple-600 text-white hover:bg-purple-700"
//                         : "bg-transparent text-white/50 hover:bg-white/10 hover:text-white"
//                     )}
//                   >
//                     {p}
//                   </PaginationLink>
//                 </PaginationItem>
//               )
//             )}

//             {/* Next */}
//             <PaginationItem>
//               <PaginationNext
//                 onClick={() => page < TOTAL_PAGES && handlePageChange(page + 1)}
//                 className={cn(
//                   "bg-transparent border-white/10 text-white/50 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer",
//                   page === TOTAL_PAGES && "opacity-30 pointer-events-none"
//                 )}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>

//       </section>
//     </main>
//   );
// }

// app/browse/page.jsx
import AllBooksClient from "@/components/pageContent/AllEbooks";
import { serverFetch } from "@/lib/core/server";

export default async function AllBooksPage() {
  const ebooks = (await serverFetch("/api/ebooks")) || [];
  return <AllBooksClient ebooks={ebooks} />;
}