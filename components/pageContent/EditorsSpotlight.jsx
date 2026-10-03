import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { FadeLeft } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import GhostButton from "@/components/ui/GhostButton";
import { getAllEbooks } from "@/lib/api/ebooks";
import { editorPickFallback } from "@/lib/data/homeSections";
import FloatingParticles from "@/components/tools/FloatingParticles";

function formatPrice(price) {
  if (price === null || price === undefined || price === "") return "Free";
  const n = Number(price);
  if (!Number.isFinite(n) || n === 0) return "Free";
  return `$${n.toFixed(2)}`;
}

function pickEditorPick(books) {
  const rated = books.filter((b) => Number.isFinite(Number(b.rating)) && Number(b.rating) > 0);
  const pool = rated.length > 0 ? rated : books;
  if (pool.length === 0) return null;

  return [...pool].sort((a, b) => {
    const byRating = Number(b.rating ?? 0) - Number(a.rating ?? 0);
    if (byRating !== 0) return byRating;
    return new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0);
  })[0];
}

export default async function EditorsSpotlight() {
  const books = (await getAllEbooks()) || [];
  const book = pickEditorPick(books);

  if (!book) {
    return (
      <section className="relative w-full overflow-hidden bg-white px-6 py-20 md:px-10 md:py-24 lg:px-16 font-sans transition-colors duration-300 dark:bg-[#070314]">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-violet/20 via-transparent to-transparent blur-3xl" />
        <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
        <div className="relative mx-auto w-full max-w-7xl">
          <SectionHeader eyebrow={editorPickFallback.title} title={editorPickFallback.note} />
        </div>
      </section>
    );
  }

  const rating = Number.isFinite(Number(book.rating)) && Number(book.rating) > 0
    ? Number(book.rating).toFixed(1)
    : "-";
  const author = book.author || book.writer || "Unknown author";

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-20 md:px-10 md:py-24 lg:px-16 font-sans transition-colors duration-300 dark:bg-[#070314]">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-violet/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(139,92,246,0.18),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_70%_80%,rgba(168,85,247,0.14),transparent_75%)]" />
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="relative mx-auto w-full max-w-7xl">
        <FadeLeft>
          <SectionHeader eyebrow="Editor's spotlight" title="One book worth your evening" />
        </FadeLeft>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-7 lg:gap-16">
          <div className="relative flex justify-center lg:col-span-3">
            <div
              aria-hidden="true"
              className="absolute inset-0 mx-auto max-w-[280px] rounded-3xl bg-brand-violet/25 blur-3xl"
            />
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-3xl border border-brand-violet/25 shadow-[0_30px_120px_-40px_rgba(139,92,246,0.9)]">
              {book.coverPreview && (
                <Image
                  src={book.coverPreview}
                  alt={`Cover of ${book.title || "this ebook"}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 280px"
                  className="object-cover"
                  loading="lazy"
                  unoptimized
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-violet/10 px-3 py-1 text-xs font-semibold text-brand-violet">
              <Sparkles aria-hidden="true" className="size-3.5" />
              Editor&apos;s Spotlight of the Week
            </span>

            <h3 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl dark:text-on-surface">
              {book.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground dark:text-on-surface-variant">
              {book.genre && <span>{book.genre}</span>}
              <span aria-hidden="true" className="flex items-center gap-1">
                <Star aria-hidden="true" className="size-4 fill-[#fbbf24] text-[#fbbf24]" />
                {rating}
              </span>
              <span className="rounded-full bg-brand-violet/10 px-2 py-0.5 text-xs text-brand-violet">
                {author}
              </span>
            </div>

            {book.description && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground dark:text-on-surface-variant">
                {book.description}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <PrimaryButton href={`/all-books/${book._id}/read-more`} withArrow={false}>
                {formatPrice(book.price)}
              </PrimaryButton>
              <GhostButton href={`/all-books/${book._id}`}>Read Free Sample</GhostButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}