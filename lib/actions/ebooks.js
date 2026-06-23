"use server";

import { dataMutation } from "../core/server";

export const addEbook = async (newEbookData) => {
  try {
    const data = await dataMutation("/api/ebooks", newEbookData);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const updateBook = async (id, data) => {
  return dataMutation(`/api/ebooks/${id}`, data, "PATCH");
};

export const deleteBook = async (id) => {
  return dataMutation(`/api/ebooks/${id}`, {}, "DELETE");
};
