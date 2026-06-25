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
import { removeBookmark } from "@/lib/actions/bookmarks";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 8;

const SORT_LABELS = {
  recent: "Recently Added",
  oldest: "Oldest First",
  title: "Title (A–Z)",
  price: "Price (High to Low)",
};

function statusStyles(status) {
  switch (status?.toLowerCase()) {
    case "published":
      return { pill: "bg-green-500/15 text-green-400", dot: "bg-green-400" };
    case "draft":
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
        <Image
          src={coverPreview}
          alt={title}
          fill
          sizes="56px"
          className="object-cover"
        />
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

export default function BookmarksPage({
  initialBookmarks = [],
  role = "reader",
}) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingId, setPendingId] = useState(null);

  const counts = useMemo(
    () => ({
      all: bookmarks.length,
      draft: bookmarks.filter((b) => b.status?.toLowerCase() === "draft").length,
      published: bookmarks.filter((b) => b.status?.toLowerCase() === "published").length,
      archived: bookmarks.filter((b) => b.status?.toLowerCase() === "archived").length,
    }),
    [bookmarks]
  );

  const tabs = [
    { key: "all", label: "All", count: counts.all },
    { key: "draft", label: "Draft", count: counts.draft },
    { key: "published", label: "Published", count: counts.published },
    { key: "archived", label: "Archived", count: counts.archived },
  ];

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

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE) || 1;
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  async function handleRemoveBookmark(bookmarkId) {
    setPendingId(bookmarkId);

    const previous = bookmarks;
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));

    try {
      await removeBookmark(bookmarkId);
      toast.success("Bookmark removed");
    } catch (err) {
      setBookmarks(previous);
      toast.error(err.message || "Failed to remove bookmark");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="min-h-screen space-y-6 bg-[#0d0d1a] p-6 text-white lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">My Bookmarks</h1>
            <Bookmark size={18} className="text-gray-500" />
          </div>
          <p className="mt-1 text-sm text-gray-400">
            Books you&apos;ve saved for later as a {role}.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search bookmarks..."
            className="border-white/10 bg-[#13132a] pl-9 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveFilter(tab.key);
                setCurrentPage(1);
              }}
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
          <DropdownMenuContent align="end" className="w-48 border-white/10 bg-[#1a1a35] text-white">
            <DropdownMenuRadioGroup value={sortKey} onValueChange={setSortKey}>
              {Object.entries(SORT_LABELS).map(([key, label]) => (
                <DropdownMenuRadioItem
                  key={key}
                  value={key}
                  className="cursor-pointer focus:bg-purple-500/20"
                >
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="overflow-hidden rounded-2xl border-white/5 bg-[#13132a]">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <Bookmark size={28} className="text-gray-600" />
            <p className="text-sm text-gray-500">No bookmarks match this filter yet.</p>
          </div>
        ) : (
          paginated.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex flex-col gap-4 border-b border-white/5 px-6 py-5 last:border-0 transition-colors hover:bg-white/[0.02] lg:grid lg:grid-cols-[64px_1fr_130px_120px_70px_150px_48px] lg:items-center lg:gap-4",
                pendingId === item.id && "opacity-50"
              )}
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
                  {item.price != null ? (
                    `$${Number(item.price).toFixed(2)}`
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Bookmarked on
                  <br />
                  {item.bookmarkedOnDisplay}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={pendingId === item.id}
                  onClick={() => handleRemoveBookmark(item.id)}
                  title="Remove bookmark"
                  className="h-9 w-9 border-purple-500/30 bg-[#13132a] text-purple-400 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Bookmark size={16} className="fill-current" />
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>

      {sorted.length > 0 && (
        <div className="flex flex-col gap-4 px-1 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, sorted.length)} of {sorted.length} bookmarks
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft size={15} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PageButton
                  key={p}
                  page={p}
                  active={currentPage === p}
                  onClick={() => setCurrentPage(p)}
                />
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight size={15} />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
