"use server";

import { serverFetch } from "../core/server";
import { normalizeBookmark, normalizeBookmarks } from "../utils/bookmarks";

export const getBookmarks = async (email, role, bookId = null) => {
  const params = new URLSearchParams({
    email,
    role,
  });

  if (bookId) {
    params.set("bookId", bookId);
  }

  const data = (await serverFetch(`/api/bookmarks?${params.toString()}`)) || [];
  return normalizeBookmarks(data);
};
