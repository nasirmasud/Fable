import AdminOverviewPage from "@/components/pageContent/AdminOverviewPage";
import { serverFetch } from "@/lib/core/server";

async function getAdminData() {
  const [users, ebooks, soldBooks] = await Promise.all([
    serverFetch("/api/users"),
    serverFetch("/api/ebooks"),
    serverFetch("/api/soldbooks"),
  ]);

  return { users: users ?? [], ebooks: ebooks ?? [], soldBooks: soldBooks ?? [] };
}

export default async function Page() {
  const { users, ebooks, soldBooks } = await getAdminData();
  return <AdminOverviewPage users={users} ebooks={ebooks} soldBooks={soldBooks} />;
}