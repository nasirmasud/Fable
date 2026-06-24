import { getAllEbooks } from "@/lib/api/ebooks";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FloatingParticles from "../tools/FloatingParticles";

function resolveAuthor(book) {
  if (book.author) return book.author;
  if (!book.writerEmail) return "Unknown Author";
  return book.writerEmail
    .split("@")[0]
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") return "Free";
  const n = Number(price);
  if (n === 0) return "Free";
  return `$${n.toFixed(2)}`;
}

function pickRandomBooks(books, count = 6) {
  if (!Array.isArray(books) || books.length === 0) return [];
  const shuffled = [...books];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default async function FeaturedEbooks() {
  const allBooks = (await getAllEbooks()) || [];
  const featuredBooks = pickRandomBooks(allBooks, 6);

  return (
    <section className="relative overflow-hidden w-full bg-[#f8fafc] dark:bg-[#070314] py-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-1 h-7 bg-[#6344f5] rounded-full block" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white transition-colors">
                Featured Ebooks
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base pl-3.5 transition-colors">
              Handpicked original ebooks just for you
            </p>
          </div>

          <Link
            href="/all-books"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#6344f5] dark:text-purple-400 hover:text-[#5032e6] dark:hover:text-purple-300 transition-colors group pl-3.5 sm:pl-0"
          >
            View All
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6">
          {featuredBooks.map((book, index) => (
            <Link
              key={book._id}
              href={`/all-books/${book._id}`}
              className="group relative bg-[#131428] border border-white/5 rounded overflow-hidden cursor-pointer hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-all duration-300"
            >
              {/* Cover */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {book.coverPreview && (
                  <Image
                    src={book.coverPreview}
                    alt={book.title || "Book cover"}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={index < 2}
                    unoptimized
                  />
                )}
                {/* Genre badge */}
                {book.genre && (
                  <span className="absolute top-2 left-2 bg-purple-600/80 text-purple-100 text-[10px] uppercase tracking-wide backdrop-blur-sm px-2 py-0.5 rounded">
                    {book.genre}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-0.5">
                  {book.title}
                </h3>
                <p className="text-white/40 text-xs mb-2">{resolveAuthor(book)}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-medium">
                      {book.rating ?? "—"}
                    </span>
                  </div>
                  <span className="text-purple-400 font-bold text-sm">
                    {formatPrice(book.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}