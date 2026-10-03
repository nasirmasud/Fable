"use server";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5000");

const REQUEST_TIMEOUT_MS = 20000;
const SUCCESS_TTL_MS = 60 * 1000;
const RETRY_DELAY_MS = 2000;
const MAX_CACHE_ENTRIES = 200;

// Successful responses only. Entries are deliberately kept past their TTL so a
// failed refresh can fall back to the last known-good payload instead of
// returning null. Failures are never written here.
const successCache = new Map();

// Requests currently in flight, so several components asking for the same path
// during one render collapse into a single upstream request.
const inFlight = new Map();

const timeoutSignal = () => {
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  }
  const controller = new AbortController();
  setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return controller.signal;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchOnce = async (path) => {
  // cache: "no-store" keeps both successes and failures out of the Next.js
  // fetch cache, so a bad response can never be persisted to .next.
  const res = await fetch(`${baseURL}${path}`, {
    cache: "no-store",
    signal: timeoutSignal(),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
};

const rememberSuccess = (path, data) => {
  if (successCache.size >= MAX_CACHE_ENTRIES && !successCache.has(path)) {
    successCache.delete(successCache.keys().next().value);
  }
  successCache.set(path, { data, at: Date.now() });
};

export const serverFetch = async (path) => {
  const cached = successCache.get(path);
  if (cached && Date.now() - cached.at < SUCCESS_TTL_MS) {
    return cached.data;
  }

  // Join an identical request that is already running instead of starting another.
  const pending = inFlight.get(path);
  if (pending) {
    return await pending;
  }

  const run = (async () => {
    try {
      const data = await fetchOnce(path);
      rememberSuccess(path, data);
      return data;
    } catch {
      // One retry, briefly delayed, to ride out short blips.
      await sleep(RETRY_DELAY_MS);
    }

    try {
      const data = await fetchOnce(path);
      rememberSuccess(path, data);
      return data;
    } catch (error) {
      const isTimeout = error?.name === "TimeoutError" || error?.name === "AbortError";
      console.error(
        `serverFetch failed for ${path} (after 1 retry):`,
        isTimeout ? `timed out after ${REQUEST_TIMEOUT_MS}ms` : error?.message ?? error
      );

      // Last resort: serve the previous good payload rather than nothing.
      const stale = successCache.get(path);
      return stale ? stale.data : null;
    }
  })();

  inFlight.set(path, run);

  try {
    return await run;
  } finally {
    inFlight.delete(path);
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
