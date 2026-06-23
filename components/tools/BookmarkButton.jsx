"use client";

import { Button } from "@/components/ui/button";
import { addBookmark, getUserBookmarks, removeBookmark } from "@/lib/actions/bookmarks";
import { authClient } from "@/lib/auth-client";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookmarkButton({ book, bookId }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email || !bookId) return;

    async function checkBookmark() {
      try {
        const data = await getUserBookmarks(
          session.user.email,
          session.user.role,
          String(bookId)
        );
        if (data.length > 0) {
          setBookmarked(true);
          setBookmarkId(data[0].id);
        }
      } catch {
        // ignore fetch errors for bookmark status check
      }
    }

    checkBookmark();
  }, [session?.user?.email, session?.user?.role, bookId]);

  const handleToggle = async () => {
    if (!session?.user) {
      router.push(`/login?redirect=/all-books/${bookId}`);
      return;
    }

    setLoading(true);

    try {
      if (bookmarked && bookmarkId) {
        await removeBookmark(bookmarkId);
        setBookmarked(false);
        setBookmarkId(null);
      } else {
        const created = await addBookmark({
          userEmail: session.user.email,
          role: session.user.role,
          bookId: String(bookId),
          title: book.title,
          author: book.author || book.writerEmail,
          description: book.description,
          genre: book.genre,
          status: book.status,
          price: book.price,
          coverPreview: book.coverPreview,
        });
        setBookmarked(true);
        setBookmarkId(created.id);
      }
    } catch {
      // keep previous state on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={loading}
      className="gap-2 border-white/20 text-white hover:bg-white/10"
      onClick={handleToggle}
    >
      <Bookmark
        size={16}
        className={bookmarked ? "fill-purple-400 text-purple-400" : ""}
      />
      {bookmarked ? "Bookmarked" : "Add Bookmark"}
    </Button>
  );
}
