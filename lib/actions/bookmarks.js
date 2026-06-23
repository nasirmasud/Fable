"use server";

import { dataMutation } from "../core/server";
import { getBookmarks } from "../api/bookmarks";
import { normalizeBookmark } from "../utils/bookmarks";

export const getUserBookmarks = async (email, role, bookId = null) => {
  return getBookmarks(email, role, bookId);
};

export const addBookmark = async (bookmarkData) => {
  const data = await dataMutation("/api/bookmarks", bookmarkData);
  return normalizeBookmark(data);
};

export const removeBookmark = async (id) => {
  return dataMutation(`/api/bookmarks/${id}`, {}, "DELETE");
};
