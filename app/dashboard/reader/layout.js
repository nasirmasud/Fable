import { requireRole } from "@/lib/core/session";

export default async function ReaderLayout({ children }) {
  await requireRole("reader");
  return children;
}
