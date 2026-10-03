"use server";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5000");

const REQUEST_TIMEOUT_MS = 8000;
const SUCCESS_TTL_MS = 60 * 1000;

// Only successful responses are ever stored here. Failures return null and are
// never cached, so a transient backend error cannot persist across requests.
const successCache = new Map();

const timeoutSignal = () => {
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  }
  const controller = new AbortController();
  setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return controller.signal;
};

export const serverFetch = async (path) => {
  const hit = successCache.get(path);
  if (hit && Date.now() - hit.at < SUCCESS_TTL_MS) {
    return hit.data;
  }

  try {
    // cache: "no-store" keeps both successes and failures out of the Next.js
    // fetch cache; successful payloads are re-cached in memory with the TTL above.
    const res = await fetch(`${baseURL}${path}`, {
      cache: "no-store",
      signal: timeoutSignal(),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    successCache.set(path, { data, at: Date.now() });

    return data;
  } catch (error) {
    const isTimeout = error?.name === "TimeoutError" || error?.name === "AbortError";
    console.error(
      `serverFetch failed for ${path}:`,
      isTimeout ? `timed out after ${REQUEST_TIMEOUT_MS}ms` : error?.message ?? error
    );
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
