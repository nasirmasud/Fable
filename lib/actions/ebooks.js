"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addEbook = async (newEbookData) => {
  try {
    const res = await fetch(`${baseURL}/api/ebooks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEbookData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add ebook");
    }

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: error.message };
  }
};
