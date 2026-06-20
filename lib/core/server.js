"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const dataMutation = async (path, data) => {
  const res = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // handle 401, 402, 403
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return res.json();
};
