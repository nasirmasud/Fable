export function normalizeBookmark(doc) {
  if (!doc) return null;

  const date = doc.createdAt ? new Date(doc.createdAt) : new Date();
  const status = doc.status
    ? doc.status.charAt(0).toUpperCase() + doc.status.slice(1).toLowerCase()
    : "Published";

  return {
    id: String(doc._id ?? doc.id),
    bookId: doc.bookId,
    title: doc.title,
    author: doc.author,
    description: doc.description,
    genre: doc.genre,
    status,
    price: doc.price ?? null,
    coverPreview: doc.coverPreview ?? null,
    gradient: doc.gradient ?? null,
    createdAt: doc.createdAt,
    bookmarkedOnISO: date.toISOString().slice(0, 10),
    bookmarkedOnDisplay: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

export function normalizeBookmarks(docs) {
  return (docs ?? []).map(normalizeBookmark).filter(Boolean);
}
