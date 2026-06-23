"use server";
import { dataMutation } from "../core/server";

export const updateUserRole = async (id, role) => {
  return dataMutation(`/api/users/${id}/role`, { role }, "PATCH");
};

export const deleteUser = async (id) => {
  return dataMutation(`/api/users/${id}`, {}, "DELETE");
};
