"use server";

import { serverFetch } from "../core/server";

export const getAllEbooks = async () => {
  return serverFetch('/api/ebooks')
}

export const getBookById = async (id) => {
  return serverFetch(`/api/ebooks/${id}`)
}


export const getWritersEbooks = async (writerEmail, status = null) => {
  let url = `/api/ebooks?writerEmail=${writerEmail}`;

  //If status passed, then it will be added to url
  if (status) {
    url += `&status=${status}`;
  }

  return await serverFetch(url);
};