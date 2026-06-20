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
