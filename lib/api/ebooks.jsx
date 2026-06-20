"use server";

import { serverFetch } from "../core/server";

export const getAllEbooks = async () => {
  return serverFetch('/api/ebooks')
}

export const getWritersEbooks = async (writerEmail, status = 'draft') => {
  return await serverFetch(`/api/ebooks?writerEmail=${writerEmail}&status=${status}`);
};