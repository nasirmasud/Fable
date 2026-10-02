import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import { FadeLeft } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { getAllEbooks } from "@/lib/api/ebooks";

// TODO: replace with real weekly sales counts. /api/soldbooks exists but is
// admin-scoped (Open Question Q3), so until that is resolved this ranks by
// rating and falls back to newest. The "copies this week" figure is omitted
// rather than invented.
function formatPrice(price) {
  if (price === null || price === undefined || price === "") return "Free";
  const n = Number(price);
  if (!Number.isFinite(n) || n === 0) return "Free";
  return `$${n.toFixed(2)}`;
}

function rankBooks(books, count = 4) {
  const rated = books.filter((b) => Number(b.rating) > 0);
  const pool = rated.length > 0 ? rated : books;

  return [...pool]
    .sort((a, b) => {
      const byRating = Number(b.rating ?? 0) - Number(a.rating ?? 0);
      if (byRating !== 0) return byRating;
      return new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0);
    })
    .slice(0, count);
}

export default async function TrendingBestsellers() {
  const books = (await getAllEbooks()) || [];
  const ranked = rankBooks(books);

  if (ranked.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-16 dark:bg-surface-container-lowest/30">
      <div className="mx-auto w-full max-w-7xl">
        <FadeLeft>
          <SectionHeader
            eyebrow="Weekly velocity"
            title="Trending bestsellers"
            subtitle="The titles moving fastest across Fable right now."
            action={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-violet/10 px-3 py-1 text-xs font-medium text-brand-violet">
                <Flame aria-hidden="true" className="size-3.5" />
                Top {ranked.length}
              </span>
            }
          />
        </FadeLeft>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {ranked.map((book, index) => (
            <div
              key={book._id}
              className={`flex items-center gap-4 rounded-xl border p-3 backdrop-blur-sm transition-colors ${
                index === 0
                  ? "border-brand-violet/40 bg-brand-violet/10"
                  : "border-brand-violet/15 bg-white/70 dark:bg-surface-container/60"
              }`}
            >
              <span
                aria-hidden="true"
                className={`font-heading w-8 shrink-0 text-center text-lg font-bold ${
                  index === 0 ? "text-brand-violet" : "text-brand-muted"
                }`}
              >
                #{index + 1}
              </span>

              <Link
                href={`/all-books/${book._id}`}
                className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md border border-brand-violet/10"
              >
                {book.coverPreview && (
                  <Image
                    src={book.coverPreview}
                    alt={`Cover of ${book.title || "this ebook"}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                  />
                )}
              </Link>

              <div className="min-w-0 flex-1">
                <Link href={`/all-books/${book._id}`} className="block">
                  <h3 className="truncate text-sm font-semibold text-foreground hover:text-brand-violet dark:text-on-surface">
                    {book.title}
                  </h3>
                </Link>
                <p className="truncate text-xs text-muted-foreground dark:text-on-surface-variant">
                  {book.author || book.writer || "Unknown author"}
                </p>
              </div>

              <span className="shrink-0 text-sm font-semibold text-foreground tabular-nums dark:text-on-surface">
                {formatPrice(book.price)}
              </span>

              <Link
                href={`/all-books/${book._id}/read-more`}
                className="shrink-0 rounded-full border border-brand-violet/30 px-3.5 py-1.5 text-xs font-semibold text-brand-violet transition-colors hover:bg-brand-violet hover:text-white"
              >
                Buy
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}