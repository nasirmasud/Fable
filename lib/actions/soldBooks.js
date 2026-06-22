"use server";

import { dataMutation } from "../core/server";

export const soldEbook = async (soldEbookData) => {
  try {
    const data = await dataMutation("/api/soldbooks", soldEbookData);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};
