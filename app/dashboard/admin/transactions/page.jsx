import TransactionsPage from "@/components/pageContent/TransactionsPage";
import { getAllSoldBooksAdmin } from "@/lib/api/soldBooks";

export default async function Page() {
  const soldBooks = await getAllSoldBooksAdmin();
  return <TransactionsPage soldBooks={soldBooks} />;
}