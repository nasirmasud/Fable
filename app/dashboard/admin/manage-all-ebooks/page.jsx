export const dynamic = 'force-dynamic';

import ManageAllEbooksPage from "@/components/pageContent/ManageAllEbooks";
import { getAllEbooks } from "@/lib/api/ebooks";

export default async function Page() {
  const ebooks = await getAllEbooks()


  return <ManageAllEbooksPage allEbooks={ebooks} />;
}