"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteBook, updateBook } from "@/lib/actions/ebooks";
import { BookOpen, CheckCircle, Clock, Eye, Send, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const GENRE_COLORS = {
  "Fiction": "from-purple-700 to-indigo-900",
  "Sci-Fi": "from-blue-700 to-cyan-900",
  "Romance": "from-pink-700 to-rose-900",
  "Thriller": "from-red-800 to-gray-900",
  "Tech": "from-emerald-700 to-teal-900",
  "Poetry": "from-amber-700 to-orange-900",
};

const PAGE_SIZE = 8;

// ── Action Buttons ─────────────────────────────────────────
function ActionButtons({ book, onTrigger }) {
  const isPublished = book.status === "published";
  const canReview = book.status === "draft";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onTrigger(isPublished ? "unpublish" : "publish", book)}
        className={`flex items-center gap-1 text-[10px] font-semibold transition ${isPublished ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300"
          }`}
      >
        <Upload size={12} /> {isPublished ? "Unpublish" : "Publish"}
      </button>
      <button
        disabled={!canReview}
        onClick={() => onTrigger("review", book)}
        className={`flex items-center gap-1 text-[10px] font-semibold transition ${canReview ? "text-blue-400 hover:text-blue-300" : "text-gray-700 cursor-not-allowed"
          }`}
      >
        <Send size={12} /> Review
      </button>
      <button
        onClick={() => onTrigger("delete", book)}
        className="flex items-center gap-1 text-[10px] font-semibold text-red-400 hover:text-red-300 transition"
      >
        <Trash2 size={12} /> Delete
      </button>
    </div>
  );
}

// ── Components ─────────────────────────────────────────────
function BookCover({ src, title, genre }) {
  const gradient = GENRE_COLORS[genre] ?? "from-purple-700 to-indigo-900";
  return src ? (
    <div className="relative w-10 h-14 flex-shrink-0">
      <Image src={src} alt={title} fill sizes="40px" className="object-cover rounded-lg" />
    </div>
  ) : (
    <div className={`w-10 h-14 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
      <BookOpen size={14} className="text-white/50" />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    published: { cls: "bg-green-500/15 text-green-400", icon: <CheckCircle size={10} /> },
    draft: { cls: "bg-purple-500/15 text-purple-400", icon: <Clock size={10} /> },
    "under review": { cls: "bg-yellow-500/15 text-yellow-400", icon: <Eye size={10} /> },
  };
  const { cls, icon } = map[status] ?? map.draft;
  return (
    <Badge variant="outline" className={`text-xs px-2 py-0 border-0 flex items-center gap-1 w-fit ${cls}`}>
      {icon} {status}
    </Badge>
  );
}

// ── Main ───────────────────────────────────────────────────
export default function ManageAllEbooksPage({ allEbooks }) {
  const [books, setBooks] = useState(allEbooks);
  const [dialog, setDialog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(books.length / PAGE_SIZE);
  const paginated = books.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleConfirm = async () => {
    const { action, book } = dialog;
    setLoading(true);

    try {
      if (action === "publish") {
        await updateBook(book._id, { status: "published" });
        setBooks((prev) => prev.map((b) => (b._id === book._id ? { ...b, status: "published" } : b)));
        toast.success("Book published successfully");
      } else if (action === "unpublish") {
        await updateBook(book._id, { status: "draft" });
        setBooks((prev) => prev.map((b) => (b._id === book._id ? { ...b, status: "draft" } : b)));
        toast.success("Book unpublished");
      } else if (action === "review") {
        await updateBook(book._id, { status: "under review" });
        setBooks((prev) => prev.map((b) => (b._id === book._id ? { ...b, status: "under review" } : b)));
        toast.success("Book sent for review");
      } else if (action === "delete") {
        await deleteBook(book._id);
        setBooks((prev) => prev.filter((b) => b._id !== book._id));
        toast.success("Book deleted successfully");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setDialog(null);
    }
  };

  const gridLayout = "grid-cols-[2fr_1fr_100px_80px_60px_120px_220px]";

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white p-6">

      {/* ── Confirm Dialog ── */}
      {dialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#13132a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 capitalize">{dialog.action} Book</h2>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to {dialog.action} &quot;{dialog.book.title}&quot;?
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setDialog(null)} disabled={loading}>
                Cancel
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleConfirm} disabled={loading}>
                {loading ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Manage Ebooks</h1>

      <Card className="bg-[#13132a] border-white/5 rounded-2xl">
        <CardContent className="px-6 py-6">

          {/* ── Header Row ── */}
          <div className={`grid ${gridLayout} gap-3 text-xs text-gray-500 uppercase pb-3 border-b border-white/5`}>
            <span>Book</span>
            <span>Author</span>
            <span>Genre</span>
            <span>Price</span>
            <span>Pages</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {/* ── Book Rows ── */}
          <div className="divide-y divide-white/[0.04]">
            {paginated.length === 0 ? (
              <p className="text-sm text-gray-500 py-8 text-center">No ebooks found.</p>
            ) : (
              paginated.map((book) => (
                <div key={book._id} className={`grid ${gridLayout} gap-3 items-center py-4`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <BookCover src={book.coverPreview} title={book.title} genre={book.genre} />
                    <p className="text-sm font-medium truncate">{book.title}</p>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{book.author}</p>
                  <Badge variant="outline" className="text-xs border-0 bg-white/5 w-fit">
                    {book.genre}
                  </Badge>
                  <p className="text-sm">${book.price}</p>
                  <p className="text-sm">{book.pages}</p>
                  <StatusBadge status={book.status} />
                  <ActionButtons
                    book={book}
                    onTrigger={(action, b) => setDialog({ action, book: b })}
                  />
                </div>
              ))
            )}
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/5 mt-4">
              <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                Previous
              </Button>
              <span className="text-xs text-gray-500">{page} / {totalPages}</span>
              <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                Next
              </Button>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}