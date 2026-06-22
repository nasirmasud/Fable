
import BuyEbookPage from "@/components/pageContent/BuyEbook";
import { getBookById } from "@/lib/api/ebooks";
import { getUserSession } from "@/lib/core/session";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const ReadMorePage = async ({ params }) => {
  const user = await getUserSession();
  const { id } = await params;

  if (!user) {
    redirect(`/login?redirect=/all-books/${id}/read-more`);
  }

  const ebook = await getBookById(id);
  const isOwner = user.email === ebook?.writerEmail || user.id === ebook?.writerId;

  if (isOwner) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-5">
          <ShieldCheck size={30} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400 max-w-md text-sm">
          You cannot purchase your own book.
        </p>
        <Link
          href={`/all-books/${id}`}
          className="mt-6 flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
        >
          <ArrowLeft size={15} /> Go Back
        </Link>
      </div>
    );
  }

  return <BuyEbookPage user={user} ebook={ebook} />;
};

export default ReadMorePage;