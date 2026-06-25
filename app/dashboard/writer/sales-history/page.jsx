import SalesHistoryPage from "@/components/pageContent/SalesHistoryPage";
import { getAllSoldBooksBySeller } from "@/lib/api/soldBooks";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const sellerId = session?.user?.email;
  const soldBooks = await getAllSoldBooksBySeller(sellerId);

  return <SalesHistoryPage soldBooks={soldBooks} />;
}