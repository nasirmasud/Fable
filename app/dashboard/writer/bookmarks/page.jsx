// import WriterBookmarksPage from "@/components/pageContent/WriterBookmark";

// export default function Page() { return <WriterBookmarksPage />; }

// app/writer/bookmarks/page.js

import BookmarksPage from "@/components/pageContent/Bookmark";

export default function Page() {
  return <BookmarksPage userEmail="reader@example.com" role="writer" />;
}