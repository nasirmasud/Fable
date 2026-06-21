import AllBooksClient from "@/components/pageContent/AllEbooks";
import { serverFetch } from "@/lib/core/server";

export default async function AllBooksPage() {
  const ebooks = (await serverFetch("/api/ebooks")) || [];
  return <AllBooksClient ebooks={ebooks} />;
}