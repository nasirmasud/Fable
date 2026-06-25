import ReaderDashboardPage from "@/components/pageContent/ReaderDashboardPage";
import { getAllSoldBooks } from "@/lib/api/soldBooks";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const buyerId = session?.user?.id;
  const userName = session?.user?.name;
  const soldBooks = await getAllSoldBooks(buyerId);

  return <ReaderDashboardPage soldBooks={soldBooks} userName={userName} />;
}