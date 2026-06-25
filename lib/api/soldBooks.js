"use server";

import { serverFetch } from "../core/server";

export const getAllSoldBooks = async (buyerId) => {
  return serverFetch(`/api/soldbooks?buyerId=${buyerId}`);
};

export const getAllSoldBooksBySeller = async (sellerId) => {
  return serverFetch(`/api/soldbooks?sellerId=${sellerId}`);
};

export const getAllSoldBooksAdmin = async () => {
  return serverFetch(`/api/soldbooks`); // কোনো filter নেই = সব data
};
