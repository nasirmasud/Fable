import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Same-origin in browser; server-side falls back to BETTER_AUTH_URL env.
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, useSession } = authClient;
