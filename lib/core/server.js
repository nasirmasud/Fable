"use server";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5000");

export const serverFetch = async (path) => {
  try {
    const res = await fetch(`${baseURL}${path}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Server Fetch Error:", error);
    return null;
  }
};

export const dataMutation = async (path, data, method = "POST") => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (data !== null && data !== undefined && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${baseURL}${path}`, options);

  if (!res.ok) {
    let message = "Something went wrong";
    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch {
      // ignore non-JSON error bodies
    }
    throw new Error(message);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
};
