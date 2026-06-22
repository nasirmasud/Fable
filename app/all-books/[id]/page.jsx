import BookDetailsPage from "@/components/pageContent/BookDetailsPage";
import { getBookById } from "@/lib/api/ebooks";

export default async function Page({ params }) {
  const { id } = await params;
  const book = await getBookById(id);
  return <BookDetailsPage book={book} />;
}