import AuthorPageClient from "@/components/pageContent/AuthorPageClient";
import { serverFetch } from "@/lib/core/server";

export default async function AuthorPage({ params }) {
  const author = decodeURIComponent((await params).author);
  const allBooks =
    (await serverFetch(`/api/ebooks?author=${encodeURIComponent(author)}`)) ?? [];

  return <AuthorPageClient author={author} allBooks={allBooks} />;
}