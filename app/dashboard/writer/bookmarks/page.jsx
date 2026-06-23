import BookmarksPage from "@/components/pageContent/Bookmark";
import { getBookmarks } from "@/lib/api/bookmarks";
import { requireRole } from "@/lib/core/session";

export default async function Page() {
  const user = await requireRole("writer");
  const bookmarks = await getBookmarks(user.email, user.role);

  return (
    <BookmarksPage
      initialBookmarks={bookmarks}
      role={user.role}
    />
  );
}
