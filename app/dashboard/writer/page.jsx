import WriterDashboardPage from "@/components/pageContent/WriterDashboard";
import { getAllSoldBooksBySeller } from "@/lib/api/soldBooks";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const sellerEmail = session?.user?.email;
  const userName = session?.user?.name;
  const soldBooks = await getAllSoldBooksBySeller(sellerEmail);

  return <WriterDashboardPage soldBooks={soldBooks} userName={userName} />;
}