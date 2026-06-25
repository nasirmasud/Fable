import AllBooksClient from "@/components/pageContent/AllEbooks";
import { getAllSoldBooks } from "@/lib/api/soldBooks";
import { auth } from "@/lib/auth";
import { serverFetch } from "@/lib/core/server";
import { headers } from "next/headers";

export default async function AllBooksPage() {
  const ebooks = (await serverFetch("/api/ebooks")) || [];

  const session = await auth.api.getSession({ headers: await headers() });
  const buyerId = session?.user?.id;
  const soldBooks = buyerId ? await getAllSoldBooks(buyerId) : [];
  const purchasedBookIds = new Set(soldBooks?.map((b) => b.bookId) ?? []);

  return <AllBooksClient ebooks={ebooks} purchasedBookIds={purchasedBookIds} />;
}