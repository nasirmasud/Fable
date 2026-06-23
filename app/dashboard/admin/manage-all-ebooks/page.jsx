import ManageAllEbooksPage from "@/components/pageContent/ManageAllEbooks";
import { getAllEbooks } from "@/lib/api/ebooks";

export default async function Page() {
  const ebooks = await getAllEbooks()
  console.log(ebooks.length);


  return <ManageAllEbooksPage allEbooks={ebooks} />;
}