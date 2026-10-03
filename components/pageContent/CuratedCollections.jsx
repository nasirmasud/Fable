import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { FadeLeft } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { getAllEbooks } from "@/lib/api/ebooks";
import FloatingParticles from "@/components/tools/FloatingParticles";

// TODO: replace the hardcoded 85% bundle assumption with a client-approved figure.
const BUNDLE_RATE = 0.85;

function pickCovers(books, count = 3) {
  const withCover = books.filter((b) => b.coverPreview);
  if (withCover.length >= count) return withCover.slice(0, count).map((b) => b.coverPreview);
  return withCover.map((b) => b.coverPreview);
}

function sumPrices(books) {
  return books.reduce((sum, b) => sum + (Number(b.price) > 0 ? Number(b.price) : 0), 0);
}

function buildCollections(books, count = 3) {
  const byGenre = new Map();

  for (const book of books) {
    const genre = book.genre;
    if (!genre) continue;
    if (!byGenre.has(genre)) byGenre.set(genre, []);
    byGenre.get(genre).push(book);
  }

  return [...byGenre.entries()]
    .map(([genre, items]) => ({
      genre,
      books: items,
      covers: pickCovers(items),
      count: items.length,
      fullPrice: sumPrices(items),
      bundlePrice: sumPrices(items) * BUNDLE_RATE,
    }))
    .filter((c) => c.count >= 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, count);
}

export default async function CuratedCollections() {
  const books = (await getAllEbooks()) || [];
  const collections = buildCollections(books);

  if (collections.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-20 md:px-10 md:py-24 lg:px-16 font-sans transition-colors duration-300 dark:bg-[#070314]">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-violet/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(139,92,246,0.18),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_70%_80%,rgba(168,85,247,0.14),transparent_75%)]" />
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="relative mx-auto w-full max-w-7xl">
        <FadeLeft>
          <SectionHeader
            eyebrow="Thematic journeys"
            title="Collections grouped by genre"
            subtitle="Pulled live from the catalogue, so these always reflect what is actually published."
          />
        </FadeLeft>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <SurfaceCard key={collection.genre} interactive className="flex h-full flex-col overflow-hidden">
              <div className="relative h-40 shrink-0">
                {collection.covers.length > 0 ? (
                  <div className="grid h-full grid-cols-3 gap-px">
                    {collection.covers.map((src, i) => (
                      <div key={i} className="relative overflow-hidden">
                        <Image
                          src={src}
                          alt={`${collection.genre} cover ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 33vw, 20vw"
                          className="object-cover"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#7c3aed,#6366f1)]">
                    <Layers aria-hidden="true" className="size-8 text-white/70" />
                  </div>
                )}

                <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                  {collection.count} {collection.count === 1 ? "Novel" : "Novels"} Included
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground dark:text-on-surface">
                  {collection.genre}
                </h3>

                <p className="mt-1 flex-1 text-sm text-muted-foreground dark:text-on-surface-variant">
                  Everything currently published in {collection.genre}.
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  {collection.bundlePrice > 0 ? (
                    <p className="text-sm">
                      <span className="text-brand-muted line-through">
                        ${collection.fullPrice.toFixed(2)}
                      </span>{" "}
                      <span className="font-semibold text-brand-violet">
                        ${collection.bundlePrice.toFixed(2)}
                      </span>
                    </p>
                  ) : (
                    <span />
                  )}

                  <Link
                    href={`/all-books?genre=${encodeURIComponent(collection.genre)}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet hover:gap-2.5"
                  >
                    Explore
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}