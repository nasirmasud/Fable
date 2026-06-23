import { requireRole } from "@/lib/core/session";

export default async function WriterLayout({ children }) {
  await requireRole("writer");
  return children;
}
