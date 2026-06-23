import ManageUsersPage from "@/components/pageContent/ManageUsersPage";
import { serverFetch } from "@/lib/core/server";

export default async function Page() {
  const users = await serverFetch("/api/users");
  return <ManageUsersPage allUsers={users} />;
}