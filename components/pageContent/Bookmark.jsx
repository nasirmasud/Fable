// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { Bookmark, ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
// import { useState } from "react";

// // Swap this for real data from your API. `gradient` is a placeholder cover
// // until you have real cover art — pass a real image src instead.
// const BOOKMARKS = [
//   {
//     id: "1",
//     title: "The Lost Kingdom",
//     author: "James Arlen",
//     description: "A thrilling fantasy adventure of a kingdom lost in time.",
//     genre: "Fantasy",
//     status: "Published",
//     price: 9.99,
//     bookmarkedOnISO: "2024-05-20",
//     bookmarkedOnDisplay: "May 20, 2024",
//     gradient: "from-blue-800 to-indigo-900",
//   },
//   {
//     id: "2",
//     title: "Beyond the Stars",
//     author: "James Arlen",
//     description: "A sci-fi journey beyond the stars and into the unknown.",
//     genre: "Sci-Fi",
//     status: "Draft",
//     price: null,
//     bookmarkedOnISO: "2024-05-19",
//     bookmarkedOnDisplay: "May 19, 2024",
//     gradient: "from-violet-800 to-purple-900",
//   },
//   {
//     id: "3",
//     title: "Love & Other Worlds",
//     author: "James Arlen",
//     description: "Sometimes love finds you in the most unexpected places.",
//     genre: "Romance",
//     status: "Published",
//     price: 3.99,
//     bookmarkedOnISO: "2024-05-18",
//     bookmarkedOnDisplay: "May 18, 2024",
//     gradient: "from-rose-700 to-pink-900",
//   },
//   {
//     id: "4",
//     title: "Whispers in the Dark",
//     author: "James Arlen",
//     description: "In the dark, secrets speak louder than words.",
//     genre: "Horror",
//     status: "Draft",
//     price: null,
//     bookmarkedOnISO: "2024-05-17",
//     bookmarkedOnDisplay: "May 17, 2024",
//     gradient: "from-gray-700 to-slate-900",
//   },
//   {
//     id: "5",
//     title: "Beyond the Horizon",
//     author: "James Arlen",
//     description: "A story of courage, discovery, and the unknown ahead.",
//     genre: "Adventure",
//     status: "Published",
//     price: 4.99,
//     bookmarkedOnISO: "2024-05-16",
//     bookmarkedOnDisplay: "May 16, 2024",
//     gradient: "from-orange-700 to-amber-900",
//   },
// ];

// const TABS = [
//   { key: "all", label: "All", count: 28 },
//   { key: "draft", label: "Draft", count: 7 },
//   { key: "published", label: "Published", count: 17 },
//   { key: "archived", label: "Archived", count: 4 },
// ];

// const SORT_LABELS = {
//   recent: "Recently Added",
//   oldest: "Oldest First",
//   title: "Title (A–Z)",
//   price: "Price (High to Low)",
// };

// // Same palette family as the Sales History page's STATUS_STYLES.
// function statusStyles(status) {
//   switch (status) {
//     case "Published":
//       return { pill: "bg-green-500/15 text-green-400", dot: "bg-green-400" };
//     case "Draft":
//       return { pill: "bg-purple-500/15 text-purple-400", dot: "bg-purple-400" };
//     default:
//       return { pill: "bg-gray-500/15 text-gray-400", dot: "bg-gray-400" };
//   }
// }

// function StatusBadge({ status }) {
//   const { pill, dot } = statusStyles(status);
//   return (
//     <Badge className={cn("inline-flex w-fit items-center gap-1.5 border-0", pill)}>
//       <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
//       {status}
//     </Badge>
//   );
// }

// function CoverThumb({ title, gradient }) {
//   return (
//     <div
//       className={cn(
//         "relative h-20 w-14 shrink-0 overflow-hidden rounded-md bg-gradient-to-br ring-1 ring-white/10",
//         gradient
//       )}
//     >
//       <span className="absolute inset-x-1.5 bottom-1.5 line-clamp-3 text-[8px] font-extrabold uppercase leading-tight tracking-wide text-white/90">
//         {title}
//       </span>
//     </div>
//   );
// }

// function PageButton({ page, active, onClick }) {
//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={onClick}
//       className={cn(
//         "h-8 w-8 text-sm font-medium",
//         active
//           ? "bg-purple-600 text-white hover:bg-purple-700"
//           : "text-gray-400 hover:text-white hover:bg-white/10"
//       )}
//     >
//       {page}
//     </Button>
//   );
// }

// export default function WriterBookmarksPage() {
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [sortKey, setSortKey] = useState("recent");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filtered = BOOKMARKS.filter((item) => {
//     const matchesFilter = activeFilter === "all" || item.status.toLowerCase() === activeFilter;
//     const matchesSearch =
//       search.trim().length === 0 ||
//       item.title.toLowerCase().includes(search.toLowerCase()) ||
//       item.author.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const sorted = [...filtered].sort((a, b) => {
//     switch (sortKey) {
//       case "recent":
//         return b.bookmarkedOnISO.localeCompare(a.bookmarkedOnISO);
//       case "oldest":
//         return a.bookmarkedOnISO.localeCompare(b.bookmarkedOnISO);
//       case "title":
//         return a.title.localeCompare(b.title);
//       case "price":
//         return (b.price ?? -1) - (a.price ?? -1);
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className="min-h-screen space-y-6 bg-[#0d0d1a] p-6 text-white lg:p-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//         <div>
//           <div className="flex items-center gap-2">
//             <h1 className="text-2xl font-bold text-white">My Bookmarks</h1>
//             <Bookmark size={18} className="text-gray-500" />
//           </div>
//           <p className="mt-1 text-sm text-gray-400">Books you&apos;ve saved for later.</p>
//         </div>

//         <div className="relative w-full sm:w-72">
//           <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
//           <Input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search bookmarks..."
//             className="border-white/10 bg-[#13132a] pl-9 text-white placeholder:text-gray-500"
//           />
//         </div>
//       </div>

//       {/* Filters + sort */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex flex-wrap gap-2">
//           {TABS.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveFilter(tab.key)}
//               className={cn(
//                 "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
//                 activeFilter === tab.key
//                   ? "bg-purple-600 text-white"
//                   : "border border-white/10 bg-[#13132a] text-gray-400 hover:bg-white/5 hover:text-white"
//               )}
//             >
//               {tab.label} ({tab.count})
//             </button>
//           ))}
//         </div>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               variant="outline"
//               className="gap-2 border-white/10 bg-[#13132a] text-white hover:bg-white/5"
//             >
//               {SORT_LABELS[sortKey]}
//               <ChevronDown size={14} className="text-gray-400" />
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent align="end" className="w-48 bg-[#1a1a35] border-white/10 text-white">
//             <DropdownMenuRadioGroup value={sortKey} onValueChange={(v) => setSortKey(v)}>
//               {Object.entries(SORT_LABELS).map(([key, label]) => (
//                 <DropdownMenuRadioItem
//                   key={key}
//                   value={key}
//                   className="focus:bg-purple-500/20 cursor-pointer"
//                 >
//                   {label}
//                 </DropdownMenuRadioItem>
//               ))}
//             </DropdownMenuRadioGroup>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* List */}
//       <Card className="overflow-hidden rounded-2xl border-white/5 bg-[#13132a]">
//         {sorted.length === 0 ? (
//           <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
//             <Bookmark size={28} className="text-gray-600" />
//             <p className="text-sm text-gray-500">No bookmarks match this filter yet.</p>
//           </div>
//         ) : (
//           sorted.map((item) => (
//             <div
//               key={item.id}
//               className="flex flex-col gap-4 border-b border-white/5 px-6 py-5 last:border-0 hover:bg-white/[0.02] transition-colors lg:grid lg:grid-cols-[64px_1fr_130px_120px_70px_150px_48px] lg:items-center lg:gap-4"
//             >
//               <div className="flex gap-4 lg:contents">
//                 <CoverThumb title={item.title} gradient={item.gradient} />
//                 <div className="min-w-0">
//                   <h3 className="font-semibold text-white">{item.title}</h3>
//                   <p className="text-sm text-gray-500">
//                     by <span className="text-purple-400">{item.author}</span>
//                   </p>
//                   <p className="mt-1 line-clamp-2 text-sm text-gray-500 lg:max-w-md">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-3 pl-[80px] lg:contents lg:pl-0">
//                 <Badge className="w-fit border-0 bg-purple-500/15 text-purple-300">{item.genre}</Badge>
//                 <StatusBadge status={item.status} />
//                 <div className="text-sm font-medium text-white lg:text-right">
//                   {item.price ? `$${item.price.toFixed(2)}` : <span className="text-gray-600">—</span>}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   Bookmarked on
//                   <br />
//                   {item.bookmarkedOnDisplay}
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="h-9 w-9 border-purple-500/30 bg-[#13132a] text-purple-400 hover:bg-purple-500/10"
//                 >
//                   <Bookmark size={16} className="fill-current" />
//                 </Button>
//               </div>
//             </div>
//           ))
//         )}
//       </Card>

//       {/* Footer / pagination */}
//       <div className="flex flex-col gap-4 px-1 pt-2 sm:flex-row sm:items-center sm:justify-between">
//         <p className="text-xs text-gray-500">Showing 1 to {sorted.length} of 28 bookmarks</p>
//         <div className="flex items-center gap-1">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
//           >
//             <ChevronLeft size={15} />
//           </Button>
//           {[1, 2, 3].map((p) => (
//             <PageButton key={p} page={p} active={currentPage === p} onClick={() => setCurrentPage(p)} />
//           ))}
//           <span className="px-1 text-sm text-gray-600">...</span>
//           <PageButton page={6} active={currentPage === 6} onClick={() => setCurrentPage(6)} />
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
//           >
//             <ChevronRight size={15} />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

const SORT_LABELS = {
  recent: "Recently Added",
  oldest: "Oldest First",
  title: "Title (A–Z)",
  price: "Price (High to Low)",
};

function statusStyles(status) {
  switch (status) {
    case "Published":
      return { pill: "bg-green-500/15 text-green-400", dot: "bg-green-400" };
    case "Draft":
      return { pill: "bg-purple-500/15 text-purple-400", dot: "bg-purple-400" };
    default:
      return { pill: "bg-gray-500/15 text-gray-400", dot: "bg-gray-400" };
  }
}

function StatusBadge({ status }) {
  const { pill, dot } = statusStyles(status);
  return (
    <Badge className={cn("inline-flex w-fit items-center gap-1.5 border-0", pill)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
      {status}
    </Badge>
  );
}

function CoverThumb({ title, gradient, coverPreview }) {
  if (coverPreview) {
    return (
      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10">
        <img src={coverPreview} alt={title} className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative h-20 w-14 shrink-0 overflow-hidden rounded-md bg-gradient-to-br ring-1 ring-white/10",
        gradient ?? "from-purple-800 to-indigo-900"
      )}
    >
      <span className="absolute inset-x-1.5 bottom-1.5 line-clamp-3 text-[8px] font-extrabold uppercase leading-tight tracking-wide text-white/90">
        {title}
      </span>
    </div>
  );
}

function PageButton({ page, active, onClick }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "h-8 w-8 text-sm font-medium",
        active
          ? "bg-purple-600 text-white hover:bg-purple-700"
          : "text-gray-400 hover:text-white hover:bg-white/10"
      )}
    >
      {page}
    </Button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Props:
//   userEmail  — string  (required) — logged-in user's email
//   role       — "reader" | "writer" (optional, default "reader")
//               controls the API endpoint called
// ─────────────────────────────────────────────────────────────────────────────
export default function BookmarksPage({ userEmail, role = "reader" }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Fetch bookmarks from API ──────────────────────────────────────────────
  useEffect(() => {
    if (!userEmail) return;

    async function fetchBookmarks() {
      setLoading(true);
      setError(null);
      try {
        // Endpoint এ role পাঠাচ্ছি — backend সেটা দিয়ে ঠিক করবে কোন collection থেকে আনবে
        const res = await fetch(
          `/api/bookmarks?email=${encodeURIComponent(userEmail)}&role=${role}`
        );
        if (!res.ok) throw new Error("Failed to fetch bookmarks");
        const data = await res.json();
        setBookmarks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarks();
  }, [userEmail, role]);

  // ── Build tab counts from live data ──────────────────────────────────────
  const counts = {
    all: bookmarks.length,
    draft: bookmarks.filter((b) => b.status?.toLowerCase() === "draft").length,
    published: bookmarks.filter((b) => b.status?.toLowerCase() === "published").length,
    archived: bookmarks.filter((b) => b.status?.toLowerCase() === "archived").length,
  };

  const TABS = [
    { key: "all", label: "All", count: counts.all },
    { key: "draft", label: "Draft", count: counts.draft },
    { key: "published", label: "Published", count: counts.published },
    { key: "archived", label: "Archived", count: counts.archived },
  ];

  // ── Filter + sort ─────────────────────────────────────────────────────────
  const filtered = bookmarks.filter((item) => {
    const matchesFilter =
      activeFilter === "all" || item.status?.toLowerCase() === activeFilter;
    const matchesSearch =
      search.trim().length === 0 ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.author?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortKey) {
      case "recent":
        return (b.bookmarkedOnISO ?? "").localeCompare(a.bookmarkedOnISO ?? "");
      case "oldest":
        return (a.bookmarkedOnISO ?? "").localeCompare(b.bookmarkedOnISO ?? "");
      case "title":
        return (a.title ?? "").localeCompare(b.title ?? "");
      case "price":
        return (b.price ?? -1) - (a.price ?? -1);
      default:
        return 0;
    }
  });

  // ── Remove bookmark (optimistic) ─────────────────────────────────────────
  async function handleRemoveBookmark(bookmarkId) {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    try {
      await fetch(`/api/bookmarks/${bookmarkId}`, { method: "DELETE" });
    } catch {
      // optionally re-fetch on failure
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen space-y-6 bg-[#0d0d1a] p-6 text-white lg:p-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">My Bookmarks</h1>
            <Bookmark size={18} className="text-gray-500" />
          </div>
          <p className="mt-1 text-sm text-gray-400">Books you&apos;ve saved for later.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookmarks..."
            className="border-white/10 bg-[#13132a] pl-9 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Filters + sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeFilter === tab.key
                  ? "bg-purple-600 text-white"
                  : "border border-white/10 bg-[#13132a] text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 border-white/10 bg-[#13132a] text-white hover:bg-white/5"
            >
              {SORT_LABELS[sortKey]}
              <ChevronDown size={14} className="text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#1a1a35] border-white/10 text-white">
            <DropdownMenuRadioGroup value={sortKey} onValueChange={(v) => setSortKey(v)}>
              {Object.entries(SORT_LABELS).map(([key, label]) => (
                <DropdownMenuRadioItem
                  key={key}
                  value={key}
                  className="focus:bg-purple-500/20 cursor-pointer"
                >
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* List */}
      <Card className="overflow-hidden rounded-2xl border-white/5 bg-[#13132a]">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading bookmarks...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <Bookmark size={28} className="text-gray-600" />
            <p className="text-sm text-gray-500">No bookmarks match this filter yet.</p>
          </div>
        ) : (
          sorted.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 border-b border-white/5 px-6 py-5 last:border-0 hover:bg-white/[0.02] transition-colors lg:grid lg:grid-cols-[64px_1fr_130px_120px_70px_150px_48px] lg:items-center lg:gap-4"
            >
              <div className="flex gap-4 lg:contents">
                <CoverThumb
                  title={item.title}
                  gradient={item.gradient}
                  coverPreview={item.coverPreview}
                />
                <div className="min-w-0">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    by <span className="text-purple-400">{item.author}</span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500 lg:max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pl-[80px] lg:contents lg:pl-0">
                <Badge className="w-fit border-0 bg-purple-500/15 text-purple-300">
                  {item.genre}
                </Badge>
                <StatusBadge status={item.status} />
                <div className="text-sm font-medium text-white lg:text-right">
                  {item.price
                    ? `$${item.price.toFixed(2)}`
                    : <span className="text-gray-600">—</span>
                  }
                </div>
                <div className="text-sm text-gray-500">
                  Bookmarked on
                  <br />
                  {item.bookmarkedOnDisplay}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveBookmark(item.id)}
                  title="Remove bookmark"
                  className="h-9 w-9 border-purple-500/30 bg-[#13132a] text-purple-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
                >
                  <Bookmark size={16} className="fill-current" />
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>

      {/* Pagination */}
      <div className="flex flex-col gap-4 px-1 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500">
          Showing 1 to {sorted.length} of {bookmarks.length} bookmarks
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <ChevronLeft size={15} />
          </Button>
          {[1, 2, 3].map((p) => (
            <PageButton
              key={p}
              page={p}
              active={currentPage === p}
              onClick={() => setCurrentPage(p)}
            />
          ))}
          <span className="px-1 text-sm text-gray-600">...</span>
          <PageButton page={6} active={currentPage === 6} onClick={() => setCurrentPage(6)} />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <ChevronRight size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}